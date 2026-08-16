import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase, type NewRegistration } from '../lib/supabase.js';
import { stripe, PRODUCT_DESCRIPTIONS, type ProductCategory } from '../lib/stripe.js';
import { calculatePrice, isValidCategory } from '../lib/pricing.js';
import { sendRegistrationEmail, sendBankTransferEmail } from '../lib/email.js';
import { randomUUID } from 'crypto';

type Language = 'ro' | 'en';

interface RegisterRequestBody {
  fullName: string;
  email: string;
  phone: string;
  fideId: string;
  club: string;
  category: string;
  fideTitle?: string;
  paymentMethod?: 'stripe' | 'bank_transfer';
  language?: Language;
}

// Validation helpers
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone: string): boolean {
  return /^(\+?[0-9]{7,15}|07[0-9]{8})$/.test(phone);
}

function validateFideId(fideId: string): boolean {
  return /^[0-9]{5,10}$/.test(fideId);
}

function sanitize(str: string): string {
  return str.trim().slice(0, 255);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body as RegisterRequestBody;

    // Validate required fields
    const { fullName, email, phone, fideId, club, category, fideTitle, paymentMethod, language = 'ro' } = body;
    const userLanguage: Language = language === 'en' ? 'en' : 'ro';

    if (!fullName || !email || !phone || !fideId || !club || !category) {
      return res.status(400).json({ error: 'Toate câmpurile obligatorii trebuie completate.' });
    }

    // Sanitize inputs
    const sanitizedData = {
      fullName: sanitize(fullName),
      email: sanitize(email).toLowerCase(),
      phone: sanitize(phone).replace(/\s/g, ''),
      fideId: sanitize(fideId),
      club: sanitize(club),
      category: sanitize(category),
      fideTitle: fideTitle ? sanitize(fideTitle) : undefined,
    };

    // Validate formats
    if (sanitizedData.fullName.length < 3) {
      return res.status(400).json({ error: 'Numele trebuie să aibă minim 3 caractere.' });
    }

    if (!validateEmail(sanitizedData.email)) {
      return res.status(400).json({ error: 'Adresa de email nu este validă.' });
    }

    if (!validatePhone(sanitizedData.phone)) {
      return res.status(400).json({ error: 'Numărul de telefon nu este valid.' });
    }

    if (!validateFideId(sanitizedData.fideId)) {
      return res.status(400).json({ error: 'ID-ul FIDE trebuie să conțină 5-10 cifre.' });
    }

    if (!isValidCategory(sanitizedData.category)) {
      return res.status(400).json({ error: 'Categoria selectată nu este validă.' });
    }

    // Check for duplicate registration (same FIDE ID + category)
    const { data: existing } = await supabase
      .from('registrations')
      .select('id, status')
      .eq('fide_id', sanitizedData.fideId)
      .eq('category', sanitizedData.category)
      .not('status', 'eq', 'cancelled')
      .single();

    if (existing) {
      return res.status(409).json({
        error: 'Există deja o înscriere cu acest ID FIDE pentru această categorie.',
      });
    }

    // Calculate price
    const priceResult = calculatePrice(sanitizedData.category, sanitizedData.fideTitle);

    // Determine payment method (default to stripe)
    const selectedPaymentMethod = paymentMethod === 'bank_transfer' ? 'bank_transfer' : 'stripe';

    // Generate bank transfer reference if needed
    const bankTransferReference = selectedPaymentMethod === 'bank_transfer'
      ? `OTS-${randomUUID().slice(0, 8).toUpperCase()}`
      : undefined;

    // Create registration record
    const registration: NewRegistration = {
      full_name: sanitizedData.fullName,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      fide_id: sanitizedData.fideId,
      club: sanitizedData.club,
      category: sanitizedData.category,
      amount_ron: priceResult.amountBani, // Store in bani
      status: priceResult.isFreeEntry ? 'confirmed' : 'pending',
      is_free_entry: priceResult.isFreeEntry,
      free_entry_reason: priceResult.freeEntryReason,
      agreement_accepted_at: new Date().toISOString(),
      payment_method: selectedPaymentMethod,
      bank_transfer_reference: bankTransferReference,
    };

    const { data: insertedReg, error: insertError } = await supabase
      .from('registrations')
      .insert(registration)
      .select()
      .single();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return res.status(500).json({ error: 'Eroare la salvarea înscrierii. Încearcă din nou.' });
    }

    // If free entry, send confirmation email and return success directly
    if (priceResult.isFreeEntry) {
      sendRegistrationEmail({
        fullName: sanitizedData.fullName,
        email: sanitizedData.email,
        category: sanitizedData.category,
        fideId: sanitizedData.fideId,
        club: sanitizedData.club,
        isFreeEntry: true,
        freeEntryReason: priceResult.freeEntryReason,
        amountRon: priceResult.amountBani,
        language: userLanguage,
      });

      return res.status(200).json({
        success: true,
        isFreeEntry: true,
        message: `Înscriere confirmată! Intrare gratuită pentru ${priceResult.freeEntryReason}.`,
        registrationId: insertedReg.id,
      });
    }

    // If bank transfer, send email and return bank details
    if (selectedPaymentMethod === 'bank_transfer') {
      // Send bank transfer email with instructions
      sendBankTransferEmail({
        fullName: sanitizedData.fullName,
        email: sanitizedData.email,
        category: sanitizedData.category,
        fideId: sanitizedData.fideId,
        club: sanitizedData.club,
        amountRon: priceResult.amountBani,
        bankTransferReference: bankTransferReference!,
        language: userLanguage,
      });

      return res.status(200).json({
        success: true,
        isBankTransfer: true,
        bankTransferReference: bankTransferReference,
        amountRon: priceResult.amountBani / 100, // Convert from bani to RON
        registrationId: insertedReg.id,
      });
    }

    // Create Stripe Checkout Session
    const productName = PRODUCT_DESCRIPTIONS[sanitizedData.category as ProductCategory];
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      currency: 'ron',
      line_items: [
        {
          price_data: {
            currency: 'ron',
            product_data: {
              name: productName,
              description: `Participant: ${sanitizedData.fullName} | FIDE: ${sanitizedData.fideId}`,
            },
            unit_amount: priceResult.amountBani,
          },
          quantity: 1,
        },
      ],
      customer_email: sanitizedData.email,
      metadata: {
        registration_id: insertedReg.id,
        fide_id: sanitizedData.fideId,
        category: sanitizedData.category,
      },
      success_url: `${baseUrl}/success-register.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/index.html#register`,
    });

    // Update registration with Stripe session ID
    await supabase
      .from('registrations')
      .update({ stripe_checkout_session_id: checkoutSession.id })
      .eq('id', insertedReg.id);

    return res.status(200).json({
      success: true,
      isFreeEntry: false,
      checkoutUrl: checkoutSession.url,
      registrationId: insertedReg.id,
    });

  } catch (error: any) {
    console.error('Registration error:', error);
    const errorMessage = error?.message || error?.raw?.message || 'Unknown error';
    const errorType = error?.type || error?.constructor?.name || 'UnknownError';
    return res.status(500).json({
      error: `Eroare ${errorType}: ${errorMessage}`,
    });
  }
}
