import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../lib/supabase.js';
import { sendPaymentConfirmationEmail } from '../lib/email.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { registrationId } = req.body;

    if (!registrationId) {
      return res.status(400).json({ error: 'Registration ID is required' });
    }

    // Update registration status to 'verifying'
    const { data, error } = await supabase
      .from('registrations')
      .update({
        status: 'verifying',
      })
      .eq('id', registrationId)
      .eq('payment_method', 'bank_transfer')
      .in('status', ['pending', 'verifying'])
      .select();

    if (error) {
      console.error('Supabase update error:', error);
      return res.status(500).json({ error: 'Failed to update registration', details: error.message, code: error.code });
    }

    if (!data || data.length === 0) {
      // Maybe already confirmed - that's OK
      return res.status(200).json({
        success: true,
        message: 'Registration confirmed'
      });
    }

    // Send confirmation email
    const registration = data[0];
    sendPaymentConfirmationEmail({
      fullName: registration.full_name,
      email: registration.email,
      category: registration.category,
      fideId: registration.fide_id,
      amountRon: registration.amount_ron,
    });

    return res.status(200).json({
      success: true,
      message: 'Registration marked as awaiting verification'
    });

  } catch (error: any) {
    console.error('Confirm transfer error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
