// Tournament pricing configuration
// Prices are stored in bani (1 RON = 100 bani) for Stripe compatibility

export const TOURNAMENT_PRICES = {
  'Open Șah Rapid': 25000, // 250 RON
  'Open Blitz': 15000,      // 150 RON
  'Rapid + Blitz': 35000,   // 350 RON
} as const;

export type TournamentCategory = keyof typeof TOURNAMENT_PRICES;

export const FREE_ENTRY_TITLES = ['GM', 'IM', 'WGM'] as const;
export type FreeEntryTitle = typeof FREE_ENTRY_TITLES[number];

export interface PriceResult {
  amountBani: number;
  amountRon: number;
  isFreeEntry: boolean;
  freeEntryReason?: FreeEntryTitle;
}

/**
 * Calculate price for a registration
 * @param category - Tournament category
 * @param fideTitle - Optional FIDE title (GM, IM, WGM for free entry)
 */
export function calculatePrice(
  category: string,
  fideTitle?: string
): PriceResult {
  const normalizedTitle = fideTitle?.toUpperCase().trim();
  const isFreeEntry = FREE_ENTRY_TITLES.includes(normalizedTitle as FreeEntryTitle);

  if (isFreeEntry) {
    return {
      amountBani: 0,
      amountRon: 0,
      isFreeEntry: true,
      freeEntryReason: normalizedTitle as FreeEntryTitle,
    };
  }

  const amountBani = TOURNAMENT_PRICES[category as TournamentCategory] || 0;

  return {
    amountBani,
    amountRon: amountBani / 100,
    isFreeEntry: false,
  };
}

/**
 * Validate tournament category
 */
export function isValidCategory(category: string): category is TournamentCategory {
  return category in TOURNAMENT_PRICES;
}

/**
 * Format price for display
 */
export function formatPrice(amountBani: number): string {
  return `${amountBani / 100} RON`;
}
