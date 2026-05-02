/**
 * Mechanics catalog for the Field Manual.
 *
 * Each entry defines a wiki page following the standard FarmPunk schema:
 *   summary, whatItDoes, whyItMatters, howYouProgress, importantNumbers,
 *   relatedSystems, beginnerAdvice, consoleCommands, fieldNote.
 *
 * The catalog drives both the Field Manual index and the dynamic
 * /field-manual/:slug routes. Add a new mechanic here and it shows up
 * everywhere automatically.
 */

export type Mechanic = {
  slug: string;
  category: 'Money' | 'RPG' | 'Production' | 'Resistance' | 'Operations';
  title: string;
  oneLiner: string;
  summary: string;
  whatItDoes: string[];
  whyItMatters: string;
  howYouProgress: string[];
  importantNumbers: { label: string; value: string }[];
  relatedSystems: string[];
  beginnerAdvice: string[];
  consoleCommands: { cmd: string; note: string }[];
  fieldNote: string;
};

export const MECHANICS: Mechanic[] = [
  {
    slug: 'cartel-franchise-fee',
    category: 'Money',
    title: 'Cartel Franchise Extortion Fee',
    oneLiner:
      "The Cartel's annual cut. Pays per revenue bracket. Each share owned shaves 1% off the bill.",
    summary:
      "You lost the farm. You're leasing it back via franchise agreement. The fee is the Cartel's cut for letting you keep working your own land.",
    whatItDoes: [
      'Fires once per year at period 12 (February).',
      'Progressive on annual revenue, US-tax-bracket style — each bracket\'s rate applies only to the portion of revenue inside it.',
      'Each share you own reduces the gross fee by 1% (linear). At 100 shares the fee is zero.',
      'Reduction is `min(1, sharesOwned × 0.01)`. Net fee is deducted as expenditure.'
    ],
    whyItMatters:
      "This is the biggest single expense in the game. It's also the only meaningful reason to buy shares — every share you own is a permanent cut to the bill, forever. The fee scales faster than revenue, so the more you grow, the harder the Cartel squeezes.",
    howYouProgress: [
      'Drive revenue up so you can afford the bill.',
      'Drive shares up so the bill shrinks.',
      'Sequence them — go a few years of high revenue, take the hit, save scrip, then unlock the next eligibility tier.'
    ],
    importantNumbers: [
      { label: '< $50,000', value: '0% (untaxed)' },
      { label: '$50k – $250k', value: '5%' },
      { label: '$250k – $500k', value: '8%' },
      { label: '$500k – $1M', value: '12%' },
      { label: '$1M – $5M', value: '15%' },
      { label: '> $5M', value: '20%' },
      { label: 'Reduction per share', value: '1% off gross' },
      { label: 'Worked example @ $6M', value: '$890k gross · $0 net @ 100 shares' }
    ],
    relatedSystems: [
      'Shares System (only escape from the fee)',
      'Annual Taxes (land + equipment, fired in the same period-12 tick)',
      'Dividend Tier (gated on lifetime gross fees assessed)',
      'Credit Rating (a fee that pushes balance negative downgrades you)'
    ],
    beginnerAdvice: [
      'Plan your year-end balance to absorb the hit. The CRITICAL HUD card at period 12 is not a surprise — preview it any time with `farmPunkFranchiseFee`.',
      'Dividends pay in farm cash. They fire right after the fee. A solid dividend tier softens the blow.',
      'The fee scales with revenue, not profit. Buying expensive equipment to "lower profit" does NOT lower this fee.'
    ],
    consoleCommands: [
      { cmd: 'farmPunkFranchiseFee', note: 'Preview the current year\'s fee with bracket-by-bracket breakdown. Read-only.' },
      { cmd: 'farmPunkForceShares <delta>', note: 'Testing — add or remove shares without spending scrip.' },
      { cmd: 'farmPunkForceFranchiseFund <delta>', note: 'Testing — bump lifetime fees to unlock a dividend tier.' }
    ],
    fieldNote:
      "The Cartel's books record every dollar they tried to take. The longer that ledger gets, the more dividends they're forced to cough up. Buying out doesn't soft-lock the dividend tier — the cartel keeps assessing the fee, you just don't owe any of it. That's the joke."
  },
  {
    slug: 'reclamation-warchest',
    category: 'Resistance',
    title: 'Reclamation Warchest',
    oneLiner:
      'A one-way fund that frees the valley. Cap is one billion dollars. The money never comes back.',
    summary:
      "The Warchest is bigger than your farm. Every dollar deposited is funneled into the long fight to free the rest of the valley: legal pressure, sabotage defense, community relief, underground logistics, organizing.",
    whatItDoes: [
      'Player-driven only. No automatic contributions, no period subscriber.',
      'Deposits go through a silent channel: do NOT count as expenditure for the year, do NOT depress profit, do NOT trigger Credit Rating downgrade.',
      'Validation rejects: non-integers, non-positive amounts, insufficient funds, and amounts that would exceed the cap.',
      'Every dollar in the Warchest cancels Cartel pressure (see Opposition Events). Every $10M = 1 share of pressure cancelled.'
    ],
    whyItMatters:
      "The Warchest is one of two endgame win conditions. It's also your single best defense against Cartel retaliation as your share count climbs. Without it, 100 shares means peak harassment.",
    howYouProgress: [
      'Deposit any time the farm has spare cash. There is no minimum or maximum per year.',
      'Pace deposits against opposition events — landing a deposit before period 1 affects next year\'s roll.',
      'Reaching the cap fires a CRITICAL HUD card and satisfies one of the two win conditions.'
    ],
    importantNumbers: [
      { label: 'Cap', value: '$1,000,000,000' },
      { label: 'Pressure cancelled per dollar', value: '1 share / $10M' },
      { label: 'Withdrawals', value: '0. Money is gone.' },
      { label: 'Per-deposit cost to scrip bonus', value: 'Zero — silent channel' }
    ],
    relatedSystems: [
      'Opposition Events (defense calc)',
      'Shares (combined win condition)',
      'Stats (deposits do not appear here — by design)'
    ],
    beginnerAdvice: [
      'Don\'t deposit money you need. The Warchest does not validate against your reserve requirement; it will let you go broke.',
      'Big lump-sum deposits before period 1 reduce next year\'s opposition cascade.',
      '$10M chunks are a clean rule of thumb — each one cancels exactly one share of pressure.'
    ],
    consoleCommands: [
      { cmd: 'farmPunkWarchestDeposit <amount>', note: 'Deposit `<amount>` farm cash. One-way. Rejects fractions, negatives, overage.' },
      { cmd: 'farmPunkWarchest', note: 'Read-only summary: balance, percent to win, full deposit ledger.' }
    ],
    fieldNote:
      "Lore: the money is spent, but it's not a farm operating expense. It's the farmer personally funding the resistance. So the cartel's books don't see it. So your scrip bonus doesn't see it. So your credit rating doesn't see it. Only the valley sees it."
  },
  {
    slug: 'opposition-events',
    category: 'Resistance',
    title: 'Opposition Events',
    oneLiner:
      'The Cartel retaliates. Each year a randomized set of effects activates. Pressure scales with shares; defense scales with the Warchest.',
    summary:
      'Annual rolls determine how many distinct effects activate this year. Pressure score = sharesOwned − floor(warchestBalance / $10M). Higher score → more events, more often.',
    whatItDoes: [
      'Cascading roll at period 1: per-position chance is `1/(N+1) + pressureScore × 0.005`, clamped [0, 1]. Cascade breaks on first failure.',
      'Sample N distinct effects from the 10-event pool, excluding any active last year (1-year cooldown).',
      'Effects last the calendar year, then clear at the next P1.',
      'One-shot effects (Crop Poisoning, Goon Visit) fire their consequence immediately on activation.'
    ],
    whyItMatters:
      'This is the system that makes the share grind interesting. Every share you buy makes the Cartel angrier; every dollar in the Warchest dampens it. The push-pull is the fight.',
    howYouProgress: [
      'Front-load Warchest deposits before crossing share thresholds (50, 75, 100).',
      'At 100 shares + $1B Warchest the score lands at 0 — minimum harassment.',
      'At 100 shares + $0 Warchest the score is 100 — peak harassment, ~4 effects/year on average.'
    ],
    importantNumbers: [
      { label: 'Pressure score 0', value: '~0.7 effects/year (50sh + $500M, or 100sh + $1B)' },
      { label: 'Pressure score 50', value: '~1.5 effects/year' },
      { label: 'Pressure score 100', value: '~4 effects/year (peak harassment)' },
      { label: 'Effect pool', value: '10 distinct effects, 1-year cooldown' }
    ],
    relatedSystems: [
      'Warchest (defense)',
      'Shares (pressure)',
      'Crop Novelty (Embargo and Smear ride this chain)',
      'Annual Taxes (Cartel Audit fires from inside the tax block)'
    ],
    beginnerAdvice: [
      'Cartel Tariff (10% per-sale skim) is silent — no per-tick HUD. Watch `farmPunkOpposition` for the YTD total.',
      'Crop Embargo + Smear Campaign together can wreck a year — front-load sales in case both roll.',
      'The 1-year cooldown means a brutal year is followed by a different brutal year, not a repeat.'
    ],
    consoleCommands: [
      { cmd: 'farmPunkOpposition', note: 'Pressure score breakdown, active effects, last year cooldown set, next-year forecast.' },
      { cmd: 'farmPunkForceOpposition <effectName>', note: 'Testing — force-activate an effect mid-year.' },
      { cmd: 'farmPunkClearOpposition', note: 'Testing — clear active set without re-rolling. One-shot consequences NOT undone.' },
      { cmd: 'farmPunkRerollOpposition', note: 'Testing — re-roll the annual sample now, captures current as cooldown.' }
    ],
    fieldNote:
      "Pressure score can technically exceed ±100. It's not a hard cap. The cascade clamp [0, 1] is the real bound. The Warchest can drag the score deep negative — opposition is dampened far below baseline if you're sitting on more cash than threats."
  }
];

export const MECHANICS_BY_CATEGORY = MECHANICS.reduce<Record<string, Mechanic[]>>(
  (acc, m) => {
    (acc[m.category] ||= []).push(m);
    return acc;
  },
  {}
);
