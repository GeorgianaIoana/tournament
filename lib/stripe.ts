import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

export const stripe = new Stripe(stripeSecretKey);

// Stripe product descriptions for checkout
export const PRODUCT_DESCRIPTIONS = {
  'Open Șah Rapid': 'Open THE SQUARE 2026 - Șah Rapid (7 runde, 15+10)',
  'Open Blitz': 'Open THE SQUARE 2026 - Blitz (7 runde, 3+2)',
  'Rapid + Blitz': 'Open THE SQUARE 2026 - Rapid + Blitz (pachet complet)',
} as const;

export type ProductCategory = keyof typeof PRODUCT_DESCRIPTIONS;
