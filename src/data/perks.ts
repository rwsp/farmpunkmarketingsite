/**
 * Farmer Prestige Perks — the 12-perk rotation cycle.
 * Order matters: perks fire in sequence as Prestige climbs.
 */

export type Perk = {
  position: number;     // 1–12, fixed order
  name: string;
  effect: string;       // single-occurrence effect
  cap: number | null;   // null = uncapped
  notes?: string;       // edge cases or system interactions
};

export const PERKS: Perk[] = [
  { position: 1,  name: 'Industrial Subsidy',     effect: 'Adds +10 scrip to your year-end paycheck. Stacks every level.', cap: null, notes: 'The slow, steady scrip drip. Uncapped — keeps paying off forever.' },
  { position: 2,  name: 'Guard Dogs',             effect: 'Every month, the Cartel rolls dice on your stored equipment to decide if vandals or thieves show up. By default, that\'s a 10% chance of vandals and a 5% chance of theft. Each Guard Dogs level shaves 1% off the vandal chance; every other level also shaves 1% off the theft chance. Maxed at level 8, you\'re down to 2% vandals and 1% theft — most months pass quietly.', cap: 8 },
  { position: 3,  name: 'Credit Indemnity',       effect: 'Lets your farm balance dip lower before your Credit Rating downgrades. Each level pushes the danger floor down by another $5,000. Maxed: you can sit at −$50,000 before the credit rating drops.', cap: 10 },
  { position: 4,  name: 'Generous Banker',        effect: 'Boosts how much debt the bank will let you carry. Maxed: 30% larger debt cap — your land and equipment count for more when calculating how much you can borrow.', cap: 10 },
  { position: 5,  name: 'Negotiator',             effect: 'Cuts the farmland surcharge (the upfront acquisition fee on land purchases). Maxed: 30% off the surcharge, on every land buy.', cap: 10 },
  { position: 6,  name: 'Insurance Policy',       effect: 'When the Cartel steals one of your vehicles, you get a partial cash refund. Each level adds +25% to the refund. Maxed: 75% refund. Equipment only — pallets, big bags, and IBCs don\'t count.', cap: 3, notes: 'Lore-wise: insurance only covers big-ticket gear. The cartel doesn\'t care about a few stolen pallets.' },
  { position: 7,  name: 'Tax Shelter',            effect: 'Cuts your equipment tax bill. Each level drops it by another 5%. Maxed: 50% off the equipment tax that fires every February.', cap: 10 },
  { position: 8,  name: 'Super Payday Advance',   effect: 'Raises the cap on the vanilla emergency loan by $10,000 each level. Default cap is $50,000 (and 3× normal interest). Maxed: $100,000 emergency cap.', cap: 5, notes: 'Vanilla loan is a trap. This perk just makes it a slightly larger trap.' },
  { position: 9,  name: 'Mastery Catalyst',       effect: '+5% Crop Mastery fame per liter sold, every level. Crop-specific mastery builds faster. Doesn\'t affect Farmer Prestige fame.', cap: null },
  { position: 10, name: 'Land Lawyer',            effect: 'Cuts your land tax bill. Each level drops it by another 5%. Maxed: 50% off your annual land tax.', cap: 10 },
  { position: 11, name: 'Forecasting Leveraging', effect: 'Squeezes more out of good-weather years without making bad-weather years worse. Each level adds +1% on the favorable side of every weather effect (yield, spoilage, exposure). Bad rolls pass through unchanged.', cap: 10 },
  { position: 12, name: 'Backroom Dealers',       effect: 'Lets you sell some equipment or land each year — bypassing the normal "no selling, ever" rule. Each level gives you +1 sell slot per year. Slots reset every March.', cap: 3, notes: 'The only perk that actually lets you sell things. Use slots on bad investments you regret.' }
];

// ── Reward levels (the levels where Farmer Prestige hands you a free vehicle)
export const REWARD_LEVELS = new Set<number>([3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 100]);

// ── Schedule generator ───────────────────────────────────────────
// Reproduces the cadence rule from the README:
//   - Cycle K skips K-1 non-reward levels between perk grants
//   - Reward levels don't count for cadence (they're free "rest" levels)
//   - When a perk hits its cap during cycle K, it drops out for cycle K+1

export type ScheduleEntry = {
  lvl: number;
  type: 'perk' | 'reward' | 'skip';
  label: string;
  cycle?: number;
  highlight?: boolean; // first-time perks, capped final occurrences
};

const ordinal = (n: number): string => {
  const last = n % 10;
  const lastTwo = n % 100;
  if (lastTwo >= 11 && lastTwo <= 13) return `${n}th`;
  if (last === 1) return `${n}st`;
  if (last === 2) return `${n}nd`;
  if (last === 3) return `${n}rd`;
  return `${n}th`;
};

export function generateSchedule(maxLevel: number): ScheduleEntry[] {
  const perkList = PERKS.map(p => ({ name: p.name, cap: p.cap ?? Infinity }));
  const occurrences: Record<string, number> = {};
  perkList.forEach(p => occurrences[p.name] = 0);

  let cycle = 1;
  let positionInCycle = 0;
  let skipsLeft = 0;
  let currentRotation = perkList.filter(p => occurrences[p.name] < p.cap);

  const out: ScheduleEntry[] = [];

  for (let lvl = 1; lvl <= maxLevel; lvl++) {
    if (REWARD_LEVELS.has(lvl)) {
      out.push({ lvl, type: 'reward', label: 'Vehicle reward — free gift from Farmer Prestige' });
      continue;
    }

    // non-reward level
    if (skipsLeft > 0) {
      out.push({ lvl, type: 'skip', label: 'Building up to next perk…', cycle });
      skipsLeft--;
      continue;
    }

    // grant a perk — start a new cycle if we exhausted the current one
    if (positionInCycle >= currentRotation.length) {
      cycle++;
      currentRotation = perkList.filter(p => occurrences[p.name] < p.cap);
      positionInCycle = 0;

      // if no perks left to grant (everything capped), every level becomes a skip
      if (currentRotation.length === 0) {
        out.push({ lvl, type: 'skip', label: 'All perks maxed out — nothing more to gain', cycle });
        continue;
      }

      // new cycle leads with K-1 skips before the first perk
      skipsLeft = cycle - 1;
      if (skipsLeft > 0) {
        out.push({ lvl, type: 'skip', label: 'Building up to next perk…', cycle });
        skipsLeft--;
        continue;
      }
    }

    const perk = currentRotation[positionInCycle];
    occurrences[perk.name]++;
    const isCapped = perk.cap !== Infinity;
    const isFinal = isCapped && occurrences[perk.name] === perk.cap;
    const isFirst = occurrences[perk.name] === 1;

    let label: string;
    if (isCapped) {
      label = `${perk.name} (${ordinal(occurrences[perk.name])} of ${perk.cap})`;
      if (isFinal) label += ' — MAXED';
    } else {
      label = `${perk.name} (${ordinal(occurrences[perk.name])} time)`;
    }

    out.push({
      lvl,
      type: 'perk',
      label,
      cycle,
      highlight: isFirst || isFinal
    });

    positionInCycle++;
    skipsLeft = cycle - 1; // skips before the next perk grant
  }

  return out;
}
