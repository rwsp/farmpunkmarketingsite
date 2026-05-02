/**
 * Black Markets — data + rolling logic for the interactive showcase page.
 *
 * Mirrors the mod's tier ladder (BACKROAD → LIBERATING) and roll rules
 * documented in FARMPUNK_MOD_README.md. This is a flavor sandbox, not a
 * faithful re-implementation — vendor names are made up for the website,
 * and `vanillaPricePerLiter` uses representative rough numbers.
 */

export type Tier =
  | 'BACKROAD'
  | 'OFF_BOOK'
  | 'UNDERGROUND'
  | 'INSURGENT'
  | 'LIBERATING';

export type TierConfig = {
  tier: Tier;
  display: string;
  prestigeReq: number;
  slots: number;
  spawnChance: number; // 0–1, per slot
  goalRange: [number, number]; // liters
  cashMult: number;
  scripRange: [number, number];
  fameMult: number;
};

export const TIERS: TierConfig[] = [
  { tier: 'BACKROAD',    display: 'Backroad',    prestigeReq: 0,  slots: 2, spawnChance: 1.00, goalRange: [5_000, 10_000],   cashMult: 1.00, scripRange: [1, 2],   fameMult: 0.25 },
  { tier: 'OFF_BOOK',    display: 'Off-Book',    prestigeReq: 10, slots: 2, spawnChance: 1.00, goalRange: [10_000, 30_000],  cashMult: 1.00, scripRange: [3, 5],   fameMult: 0.50 },
  { tier: 'UNDERGROUND', display: 'Underground', prestigeReq: 20, slots: 1, spawnChance: 0.30, goalRange: [30_000, 100_000], cashMult: 1.25, scripRange: [8, 12],  fameMult: 0.75 },
  { tier: 'INSURGENT',   display: 'Insurgent',   prestigeReq: 30, slots: 1, spawnChance: 0.20, goalRange: [100_000, 300_000],cashMult: 1.50, scripRange: [20, 30], fameMult: 1.00 },
  { tier: 'LIBERATING',  display: 'Liberating',  prestigeReq: 40, slots: 1, spawnChance: 0.10, goalRange: [500_000, 1_000_000], cashMult: 1.75, scripRange: [40, 50], fameMult: 1.50 }
];

/** Rough per-liter prices for cash-payout math. Not authoritative. */
export const CROP_PRICES: Record<string, number> = {
  WHEAT: 0.35,
  BARLEY: 0.32,
  CANOLA: 0.45,
  OATS: 0.30,
  SUGARBEET: 0.05,
  POTATO: 0.18,
  MAIZE: 0.30,
  SUNFLOWER: 0.40,
  SOYBEAN: 0.50,
  COTTON: 1.10,
  SUGARCANE: 0.06
};

export const CROPS = Object.keys(CROP_PRICES);

/** Vendor names per tier — flavor only, no in-game equivalent. */
export const VENDORS: Record<Tier, string[]> = {
  BACKROAD: [
    "Ma's Mill Out On 17",
    "Cousin Pete's Co-op",
    "Roadside Grain Exchange",
    "Old Henry's Stockpile",
    "Two-Lane Feed Barn",
    "The Crooked Scale"
  ],
  OFF_BOOK: [
    "Northside Feed & Storage",
    "The Loading Dock Boys",
    "Riverbed Trading Post",
    "Shrew's Backhaul",
    "Three-Acre Holdings",
    "Junker's Yard Co."
  ],
  UNDERGROUND: [
    "The Whispering Silo",
    "South Quarter Syndicate",
    "Black Earth Brokers",
    "The Iron Granary",
    "Ditchwater Logistics",
    "Old Smelter Exchange"
  ],
  INSURGENT: [
    "The Free Valley Pact",
    "Thirteen Bushels Down",
    "The Burned Barn Network",
    "Outlaw Logistics",
    "Hollow Hill Coalition",
    "Sons of the Threshing Floor"
  ],
  LIBERATING: [
    "The Reclamation Front",
    "Salt of the Earth Resistance",
    "Free Soil Liberation",
    "The Last Honest Mill",
    "Valley-Wide Mutual Aid",
    "The Quiet Network"
  ]
};

export type Market = {
  id: string;
  tier: Tier;
  display: string;
  vendor: string;
  crop: string;
  goal: number;
  progress: number;
  cashPayout: number;
  scripPayout: number;
  famePayout: number;
  prestigeReq: number;
  masteryReq: number;
  isEligible: boolean;
  isComplete: boolean;
};

const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const randInt = (min: number, max: number) => Math.floor(rand(min, max + 1));
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const pickN = <T,>(arr: T[], n: number): T[] => {
  const copy = [...arr];
  const out: T[] = [];
  while (out.length < n && copy.length > 0) {
    const idx = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
};

let mid = 0;
const nextId = () => `m-${++mid}-${Date.now().toString(36)}`;

export function rollRoster(prestige: number): Market[] {
  const out: Market[] = [];
  for (const cfg of TIERS) {
    if (prestige < cfg.prestigeReq) continue;
    const cropsForTier = pickN(CROPS, cfg.slots);
    for (let s = 0; s < cfg.slots; s++) {
      if (Math.random() > cfg.spawnChance) continue;
      const crop = cropsForTier[s] ?? pick(CROPS);
      const goal = Math.floor(rand(cfg.goalRange[0], cfg.goalRange[1]));
      const cashPayout = Math.floor(goal * (CROP_PRICES[crop] ?? 0.35) * cfg.cashMult);
      const scripPayout = randInt(cfg.scripRange[0], cfg.scripRange[1]);
      const famePayout = Math.floor(goal * cfg.fameMult);
      // per-market gates can exceed tier floor — Liberating example: P40-49 + mastery 15-40
      const prestigeReq = cfg.tier === 'BACKROAD'
        ? 0
        : cfg.prestigeReq + randInt(0, 9);
      const masteryReq = cfg.tier === 'BACKROAD'
        ? 0
        : cfg.tier === 'OFF_BOOK' ? randInt(1, 15)
        : cfg.tier === 'UNDERGROUND' ? randInt(5, 20)
        : cfg.tier === 'INSURGENT' ? randInt(10, 30)
        : randInt(15, 40);
      out.push({
        id: nextId(),
        tier: cfg.tier,
        display: cfg.display,
        vendor: pick(VENDORS[cfg.tier]),
        crop,
        goal,
        progress: 0,
        cashPayout,
        scripPayout,
        famePayout,
        prestigeReq,
        masteryReq,
        isEligible: prestige >= prestigeReq, // mastery isn't simulated here
        isComplete: false
      });
    }
  }
  return out;
}

export const formatLiters = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M L`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k L`;
  return `${n} L`;
};

export const formatCash = (n: number) => `$${n.toLocaleString()}`;
