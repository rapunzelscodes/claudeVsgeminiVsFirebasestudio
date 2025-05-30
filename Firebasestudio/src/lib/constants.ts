export const BASE_CREDIT_PRICE_USD = 0.15;

export interface Currency {
  code: 'USD' | 'EUR' | 'TRY' | 'CNY';
  symbol: string;
  rate: number; // Rate relative to USD
}

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', rate: 1 },
  { code: 'EUR', symbol: '€', rate: 0.92 }, // Example rate
  { code: 'TRY', symbol: '₺', rate: 32.0 }, // Example rate
  { code: 'CNY', symbol: '¥', rate: 7.2 },  // Example rate
];

export interface PricingTier {
  minCredits: number;
  maxCredits: number | null; // null for the highest tier
  discountPercent: number;
  tierName: string;
}

export const PRICING_TIERS: PricingTier[] = [
  { minCredits: 0, maxCredits: 99, discountPercent: 0, tierName: 'Starter' },
  { minCredits: 100, maxCredits: 499, discountPercent: 10, tierName: 'Basic' },
  { minCredits: 500, maxCredits: 1499, discountPercent: 20, tierName: 'Pro' },
  { minCredits: 1500, maxCredits: 2999, discountPercent: 30, tierName: 'Business' },
  { minCredits: 3000, maxCredits: 4999, discountPercent: 40, tierName: 'Enterprise Lite' },
  { minCredits: 5000, maxCredits: null, discountPercent: 50, tierName: 'Enterprise+' },
];

export const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#benefits', label: 'Benefits' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#savings', label: 'Savings Forecaster' },
  { href: '#testimonials', label: 'Testimonials' },
];

export const FOOTER_LINKS = {
  product: [
    { href: '#', label: 'Documentation' },
    { href: '#', label: 'Case Studies' },
    { href: '#', label: 'Updates' },
  ],
  company: [
    { href: '#', label: 'About Us' },
    { href: '#', label: 'Careers' },
    { href: '#', label: 'Contact' },
  ],
  resources: [
    { href: '#', label: 'System Status' },
    { href: '#', label: 'API Reference' },
    { href: '#', label: 'Security' },
  ],
};

export const MIN_DAILY_SEARCHES = 1;
export const MAX_DAILY_SEARCHES = 500;
export const DAILY_SEARCH_STEP = 1;
export const DEFAULT_DAILY_SEARCHES = 50;
