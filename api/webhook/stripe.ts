import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { supabase } from '../../lib/supabase.js';
import { sendPaymentConfirmationEmail } from '../../lib/email.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to read raw body
async function getRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!webhookSecret) {
    console.error('Missing STRIPE_WEBHOOK_SECRET');
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers['stripe-signature'] as string;

    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      // Extract registration ID from metadata
      const registrationId = session.metadata?.registration_id;

      if (!registrationId) {
        console.error('No registration_id in session metadata:', session.id);
        return res.status(400).json({ error: 'Missing registration_id' });
      }

      // Fetch registration details for email
      const { data: registration } = await supabase
        .from('registrations')
        .select('*')
        .eq('id', registrationId)
        .single();

      // Update registration status to paid
      const { error: updateError } = await supabase
        .from('registrations')
        .update({
          status: 'paid',
          paid_at: new Date().toISOString(),
        })
        .eq('id', registrationId)
        .eq('stripe_checkout_session_id', session.id);

      if (updateError) {
        console.error('Failed to update registration:', updateError);
        return res.status(500).json({ error: 'Failed to update registration' });
      }

      // Send payment confirmation email
      if (registration) {
        sendPaymentConfirmationEmail({
          fullName: registration.full_name,
          email: registration.email,
          category: registration.category,
          fideId: registration.fide_id,
          amountRon: registration.amount_ron,
        });
      }

      console.log(`Payment completed for registration ${registrationId}`);
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;
      const registrationId = session.metadata?.registration_id;

      if (registrationId) {
        // Mark as cancelled if session expired without payment
        await supabase
          .from('registrations')
          .update({ status: 'cancelled' })
          .eq('id', registrationId)
          .eq('status', 'pending');

        console.log(`Session expired for registration ${registrationId}`);
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`Payment failed: ${paymentIntent.id}`);
      // Could send notification email here
      break;
    }

    default:
      // Unhandled event type
      console.log(`Unhandled event type: ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return res.status(200).json({ received: true });
}
