import { Resend } from 'resend';

// Debug logging
console.log('[Email Init] RESEND_API_KEY present:', !!process.env.RESEND_API_KEY);
console.log('[Email Init] EMAIL_FROM:', process.env.EMAIL_FROM);

// Make email optional - if no API key, emails will be skipped
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

console.log('[Email Init] Resend client created:', !!resend);

const EMAIL_FROM = process.env.EMAIL_FROM || 'Open THE SQUARE <onboarding@resend.dev>';

type Language = 'ro' | 'en';

interface RegistrationEmailData {
  fullName: string;
  email: string;
  category: string;
  fideId: string;
  club: string;
  isFreeEntry: boolean;
  freeEntryReason?: string;
  amountRon?: number;
  language?: Language;
}

interface PaymentConfirmationData {
  fullName: string;
  email: string;
  category: string;
  fideId: string;
  amountRon: number;
  language?: Language;
}

interface BankTransferEmailData {
  fullName: string;
  email: string;
  category: string;
  fideId: string;
  club: string;
  amountRon: number;
  bankTransferReference: string;
  language?: Language;
}

// Email translations
const emailTranslations = {
  ro: {
    registrationConfirmed: 'Confirmare Înscriere - Open THE SQUARE 2026',
    registrationPending: 'Înscriere în așteptare - Open THE SQUARE 2026',
    freeEntryConfirmed: (reason: string) => `<p style="color: #059669; font-weight: 600;">Înscrierea ta a fost confirmată! Intrare gratuită pentru ${reason}.</p>`,
    pendingPayment: (amount: number) => `<p>Înscrierea ta a fost înregistrată și așteaptă plata.</p>
       <p>Taxa de înscriere: <strong>${amount} RON</strong></p>
       <p>Vei primi un email de confirmare după ce plata a fost procesată.</p>`,
    hello: 'Salut',
    registrationDetails: 'Detalii înscriere:',
    category: 'Categorie:',
    fideId: 'ID FIDE:',
    club: 'Club:',
    amountPaid: 'Sumă plătită:',
    questions: 'Dacă ai întrebări, nu ezita să ne contactezi la',
    paymentConfirmedSubject: 'Plată Confirmată - Open THE SQUARE 2026',
    paymentConfirmedTitle: 'Plata confirmată!',
    registrationConfirmedMessage: '✓ Înscrierea ta la Open THE SQUARE 2026 a fost confirmată!',
    receivedPayment: (name: string, amount: number, category: string) => `<p>Salut, ${name}!</p><p>Am primit plata ta de <strong>${amount} RON</strong> pentru ${category}.</p>`,
    seeYouThere: 'Te așteptăm pe <strong>14-15 Noiembrie 2026</strong> la <strong>Aurrum Palace</strong>, București!',
    bankTransferSubject: 'Instrucțiuni Transfer Bancar - Open THE SQUARE 2026',
    bankTransferPending: 'Înscrierea ta a fost înregistrată și așteaptă plata prin transfer bancar.',
    bankTransferDetails: 'Detalii pentru transfer bancar:',
    iban: 'IBAN:',
    beneficiary: 'Beneficiar:',
    bank: 'Banca:',
    amount: 'Sumă:',
    importantReference: '⚠️ IMPORTANT: Include referința de mai jos în detaliile transferului!',
    afterTransfer: 'După efectuarea transferului, înscrierea ta va fi confirmată manual în maxim 24-48 de ore lucrătoare.',
  },
  en: {
    registrationConfirmed: 'Registration Confirmed - Open THE SQUARE 2026',
    registrationPending: 'Registration Pending - Open THE SQUARE 2026',
    freeEntryConfirmed: (reason: string) => `<p style="color: #059669; font-weight: 600;">Your registration has been confirmed! Free entry for ${reason}.</p>`,
    pendingPayment: (amount: number) => `<p>Your registration has been recorded and is awaiting payment.</p>
       <p>Registration fee: <strong>${amount} RON</strong></p>
       <p>You will receive a confirmation email after payment is processed.</p>`,
    hello: 'Hello',
    registrationDetails: 'Registration details:',
    category: 'Category:',
    fideId: 'FIDE ID:',
    club: 'Club:',
    amountPaid: 'Amount paid:',
    questions: 'If you have any questions, please contact us at',
    paymentConfirmedSubject: 'Payment Confirmed - Open THE SQUARE 2026',
    paymentConfirmedTitle: 'Payment confirmed!',
    registrationConfirmedMessage: '✓ Your registration for Open THE SQUARE 2026 has been confirmed!',
    receivedPayment: (name: string, amount: number, category: string) => `<p>Hello, ${name}!</p><p>We have received your payment of <strong>${amount} RON</strong> for ${category}.</p>`,
    seeYouThere: 'We look forward to seeing you on <strong>November 14-15, 2026</strong> at <strong>Aurrum Palace</strong>, Bucharest!',
    bankTransferSubject: 'Bank Transfer Instructions - Open THE SQUARE 2026',
    bankTransferPending: 'Your registration has been recorded and is awaiting bank transfer payment.',
    bankTransferDetails: 'Bank transfer details:',
    iban: 'IBAN:',
    beneficiary: 'Beneficiary:',
    bank: 'Bank:',
    amount: 'Amount:',
    importantReference: '⚠️ IMPORTANT: Include the reference below in your transfer details!',
    afterTransfer: 'After making the transfer, your registration will be manually confirmed within 24-48 business hours.',
  }
};

export async function sendRegistrationEmail(data: RegistrationEmailData): Promise<void> {
  const { fullName, email, category, fideId, club, isFreeEntry, freeEntryReason, amountRon, language = 'ro' } = data;
  const t = emailTranslations[language];

  const subject = isFreeEntry ? t.registrationConfirmed : t.registrationPending;

  const statusMessage = isFreeEntry
    ? t.freeEntryConfirmed(freeEntryReason || '')
    : t.pendingPayment(Math.round(amountRon! / 100));

  const html = `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #233d36; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #a6b6e0 0%, #badad5 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="margin: 0; color: #1a2e28; font-size: 24px; font-weight: 700; text-shadow: 0 1px 2px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3);">Open THE SQUARE 2026</h1>
  </div>

  <div style="background: #ffffff; padding: 30px; border: 1px solid #e2e6f0; border-top: none;">
    <p style="margin: 0 0 20px; color: #233d36; font-size: 16px;">Bună ziua!</p>

    <p style="margin: 0 0 20px; color: #233d36;">Înscrierea dvs. la competiția <strong>${category}</strong> a fost înregistrată.</p>

    <p style="margin: 0 0 20px; color: #233d36;">Vă așteptăm <strong>14-15 Noiembrie 2026</strong> la <strong>Aurrum Palace</strong>, București!</p>

    <p style="margin: 0; color: #233d36; font-weight: 600;">Mult succes!</p>
  </div>

  <div style="background: #233d36; padding: 20px; border-radius: 0 0 12px 12px; text-align: center;">
    <p style="margin: 0; color: #badad5; font-size: 14px;">THE SQUARE Chess Club</p>
    <p style="margin: 8px 0 0; color: rgba(186, 218, 213, 0.8); font-size: 12px;">contact@thesquarechessclub.com | 0765 815 641</p>
  </div>
</body>
</html>
`;

  if (!resend) {
    console.log(`[Email skipped - no API key] Registration email would be sent to ${email}`);
    return;
  }

  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject,
      html,
    });
    console.log(`Registration email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send registration email:', error);
    // Don't throw - email failure shouldn't break registration
  }
}

export async function sendPaymentConfirmationEmail(data: PaymentConfirmationData): Promise<void> {
  const { fullName, email, category, fideId, amountRon, language = 'ro' } = data;
  const t = emailTranslations[language];
  const amountInRon = Math.round(amountRon / 100);

  const html = `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #233d36; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #a6b6e0 0%, #badad5 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="margin: 0; color: #1a2e28; font-size: 24px; font-weight: 700; text-shadow: 0 1px 2px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3);">Open THE SQUARE 2026</h1>
  </div>

  <div style="background: #ffffff; padding: 30px; border: 1px solid #e2e6f0; border-top: none;">
    <p style="margin: 0 0 20px; color: #233d36; font-size: 16px;">Bună ziua!</p>

    <p style="margin: 0 0 20px; color: #233d36;">Vă confirmăm participarea la competiția <strong>${category}</strong>.</p>

    <p style="margin: 0 0 20px; color: #233d36;">Vă așteptăm <strong>14-15 Noiembrie 2026</strong> la <strong>Aurrum Palace</strong>, București!</p>

    <p style="margin: 0; color: #233d36; font-weight: 600;">Mult succes!</p>
  </div>

  <div style="background: #233d36; padding: 20px; border-radius: 0 0 12px 12px; text-align: center;">
    <p style="margin: 0; color: #badad5; font-size: 14px;">THE SQUARE Chess Club</p>
    <p style="margin: 8px 0 0; color: rgba(186, 218, 213, 0.8); font-size: 12px;">contact@thesquarechessclub.com | 0765 815 641</p>
  </div>
</body>
</html>
`;

  if (!resend) {
    console.log(`[Email skipped - no API key] Payment confirmation email would be sent to ${email}`);
    return;
  }

  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: t.paymentConfirmedSubject,
      html,
    });
    console.log(`Payment confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send payment confirmation email:', error);
    // Don't throw - email failure shouldn't break the webhook
  }
}

export async function sendBankTransferEmail(data: BankTransferEmailData): Promise<void> {
  console.log('[sendBankTransferEmail] Called with email:', data.email);
  const { fullName, email, category, fideId, club, amountRon, bankTransferReference, language = 'ro' } = data;
  const t = emailTranslations[language];
  const amountInRon = Math.round(amountRon / 100);

  const html = `
<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #233d36; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #a6b6e0 0%, #badad5 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="margin: 0; color: #233d36; font-size: 24px;">Open THE SQUARE 2026</h1>
    <p style="margin: 8px 0 0; color: #233d36; opacity: 0.8;">14-15 ${language === 'en' ? 'November' : 'Noiembrie'} 2026 | Aurrum Palace</p>
  </div>

  <div style="background: #ffffff; padding: 30px; border: 1px solid #e2e6f0; border-top: none;">
    <h2 style="margin: 0 0 20px; color: #233d36;">${t.hello}, ${fullName}!</h2>

    <p>${t.bankTransferPending}</p>

    <div style="background: #f8f9fc; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin: 0 0 15px; color: #233d36; font-size: 16px;">${t.bankTransferDetails}</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #5a6a8a;">${t.iban}</td>
          <td style="padding: 8px 0; font-weight: 600; font-family: monospace; font-size: 14px;">RO51INGB0000999916814361</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #5a6a8a;">${t.beneficiary}</td>
          <td style="padding: 8px 0; font-weight: 500;">ASOCIAȚIA CLUB SPORTIV DE ȘAH "THE SQUARE"</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #5a6a8a;">${t.bank}</td>
          <td style="padding: 8px 0; font-weight: 500;">ING BANK NV</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #5a6a8a;">${t.amount}</td>
          <td style="padding: 8px 0; font-weight: 600; color: #233d36; font-size: 18px;">${amountInRon} RON</td>
        </tr>
      </table>
    </div>

    <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0; color: #92400e; font-weight: 600;">
        ${t.importantReference}
      </p>
      <p style="margin: 10px 0 0; text-align: center;">
        <span style="display: inline-block; background: #fff; padding: 10px 20px; border-radius: 6px; font-family: monospace; font-size: 18px; font-weight: 700; color: #233d36; letter-spacing: 2px;">${bankTransferReference}</span>
      </p>
    </div>

    <div style="background: #f8f9fc; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin: 0 0 15px; color: #233d36; font-size: 16px;">${t.registrationDetails}</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #5a6a8a;">${t.category}</td>
          <td style="padding: 8px 0; font-weight: 500;">${category}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #5a6a8a;">${t.fideId}</td>
          <td style="padding: 8px 0; font-weight: 500;">${fideId}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #5a6a8a;">${t.club}</td>
          <td style="padding: 8px 0; font-weight: 500;">${club}</td>
        </tr>
      </table>
    </div>

    <p>${t.afterTransfer}</p>

    <p style="color: #5a6a8a; font-size: 14px; margin-top: 20px;">${t.questions} <a href="mailto:contact@thesquarechessclub.com" style="color: #7868a8;">contact@thesquarechessclub.com</a></p>
  </div>

  <div style="background: #233d36; padding: 20px; border-radius: 0 0 12px 12px; text-align: center;">
    <p style="margin: 0; color: #badad5; font-size: 14px;">THE SQUARE Chess Club</p>
    <p style="margin: 8px 0 0; color: rgba(186, 218, 213, 0.6); font-size: 12px;">${language === 'en' ? 'Bucharest, Romania' : 'București, România'}</p>
  </div>
</body>
</html>
`;

  if (!resend) {
    console.log(`[Email skipped - no API key] Bank transfer email would be sent to ${email}`);
    return;
  }

  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: t.bankTransferSubject,
      html,
    });
    console.log(`Bank transfer email sent to ${email}`);
  } catch (error) {
    console.error('Failed to send bank transfer email:', error);
    // Don't throw - email failure shouldn't break registration
  }
}
