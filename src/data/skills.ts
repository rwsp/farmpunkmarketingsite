/**
 * Manager Skill Tree — 17 skills, all 10 levels each, scrip-purchased.
 * Mirrors the AgriCorpSkills catalog from the mod README.
 */

export type SkillGroup =
  | 'Production'
  | 'Vehicle'
  | 'Storage'
  | 'Finance'
  | 'Resilience';

export type Skill = {
  id: string;          // console-facing id, used by farmPunkBuySkill
  name: string;
  group: SkillGroup;
  formula: string;     // raw formula in the mod
  maxEffect: string;   // human-readable max at L10
  blurb: string;       // 1-2 sentence what it does, in plain language
  notes?: string;      // optional player-facing edge case (NEVER dev-speak)
};

/** Per-level scrip cost ladder. Sums to 1,070 scrip per skill to L10. */
export const SCRIP_COST: number[] = [10, 15, 25, 35, 50, 75, 110, 160, 240, 350];
export const TOTAL_TO_L10 = SCRIP_COST.reduce((a, b) => a + b, 0);

export const SKILLS: Skill[] = [
  // ── Production ─────────────────────────────────────────────────
  {
    id: 'cropYield',
    name: 'Crop Yield',
    group: 'Production',
    formula: '+10% per level',
    maxEffect: '+100% yield at L10 — every field grows twice as much',
    blurb: 'Every harvestable crop produces more grain per square meter. Level 1 is +10% yield, level 10 doubles your harvest.'
  },
  {
    id: 'salePrice',
    name: 'Sale Price',
    group: 'Production',
    formula: '+10% per level',
    maxEffect: '+100% sale price at L10',
    blurb: 'Every selling station pays you more for what you deliver. At max level, every load earns double.'
  },
  {
    id: 'boutique',
    name: 'Boutique',
    group: 'Production',
    formula: '+1% per level (tier 1) / +2% per level (tier 2)',
    maxEffect: 'Novelty bonus climbs from +15% / +25% up to +25% / +45%',
    blurb: 'Boosts the Crop Novelty bonus you get for rotating crops. Does nothing on a crop that\'s not getting the rotation bonus already — this is an amplifier, not a base.',
    notes: 'Useless without active novelty boosts. Pair with a serious crop rotation strategy or skip it.'
  },

  // ── Vehicle ────────────────────────────────────────────────────
  {
    id: 'headerWidth',
    name: 'Header Width',
    group: 'Vehicle',
    formula: '+10% per level',
    maxEffect: '+100% cutter width at L10',
    blurb: 'Every harvester header cuts a wider strip. At max level, your combine clears twice as much in a single pass.'
  },
  {
    id: 'combineCapacity',
    name: 'Combine Capacity',
    group: 'Vehicle',
    formula: '+10% per level',
    maxEffect: '+100% grain tank at L10',
    blurb: 'The grain tank on every combine holds more before it has to be unloaded. Half as many trips back to the auger wagon.'
  },
  {
    id: 'tractorWorkingSpeed',
    name: 'Tractor Working Speed',
    group: 'Vehicle',
    formula: 'Cap = 8 + (level × 3) km/h',
    maxEffect: 'Speed cap rises from 8 to 38 km/h while working',
    blurb: 'Lifts the speed cap on tractors and other non-combine vehicles when they\'re actively working a field. The faster you can plow, sow, and fertilize, the faster the year moves.'
  },
  {
    id: 'combineWorkingSpeed',
    name: 'Combine Working Speed',
    group: 'Vehicle',
    formula: 'Cap = 8 + (level × 3) km/h',
    maxEffect: 'Speed cap rises from 8 to 38 km/h while harvesting',
    blurb: 'Same as Tractor Working Speed but for combines.'
  },
  {
    id: 'enginePower',
    name: 'Engine Power',
    group: 'Vehicle',
    formula: '+25% per level',
    maxEffect: '3.5× engine power at L10',
    blurb: 'Your engines pull harder. Big difference on hills and when towing heavy implements like loaded grain carts or seeders.',
    notes: 'New vehicles get the bonus the moment you buy them. Vehicles you already own update after the next save and reload.'
  },
  {
    id: 'fuelUsage',
    name: 'Fuel Usage',
    group: 'Vehicle',
    formula: '−5% per level',
    maxEffect: '−50% fuel burn at L10',
    blurb: 'Diesel, methane, electric — every fueled vehicle burns less per minute of work. Air brakes are not affected (they don\'t consume "fuel" in the meaningful sense).',
    notes: 'New vehicles get the bonus immediately. Existing fleet updates after a save and reload.'
  },
  {
    id: 'maintenance',
    name: 'Maintenance',
    group: 'Vehicle',
    formula: '−7.5% per level',
    maxEffect: '−75% wear and damage rate at L10',
    blurb: 'Every vehicle and implement breaks down four times slower at max level. Affects both wear (the tan bar) and damage (the red bar) on tractors, combines, plows, cultivators — anything wearable.'
  },
  {
    id: 'traction',
    name: 'Traction',
    group: 'Vehicle',
    formula: '+3% per level',
    maxEffect: '+30% tire grip at L10',
    blurb: 'Tires grip better on every surface. You\'ll notice it most on hills, wet fields, and when towing heavy loads.'
  },

  // ── Storage ────────────────────────────────────────────────────
  {
    id: 'bulkStorage',
    name: 'Bulk Storage',
    group: 'Storage',
    formula: '+10% per level',
    maxEffect: '+100% capacity at L10',
    blurb: 'Every grain silo and grain trailer holds twice as much at max level. Fewer trips, fewer overflow situations.',
    notes: 'Covers placeable silos and grain trailers. The shared farm silo (the centralized one some maps come with) is not boosted yet.'
  },

  // ── Finance ────────────────────────────────────────────────────
  {
    id: 'loanInterest',
    name: 'Loan Interest',
    group: 'Finance',
    formula: '−0.5% per level',
    maxEffect: '−5% at L10 — base rate drops from 12% to 7%',
    blurb: 'Cuts the interest rate on new loans. Stacks with the discount you get from a good Credit Rating, so a max-level skill plus an A-rated farm bottoms out at 2% interest.',
    notes: 'Only applies to loans you take out from now on. Existing loans keep the rate they were created at.'
  },
  {
    id: 'downPayment',
    name: 'Down Payment Reduction',
    group: 'Finance',
    formula: '−1.2% per level',
    maxEffect: '8% down payment at L10 (default is 20%)',
    blurb: 'When you finance a tractor, building, or piece of land, you normally have to pay 20% of the price upfront in cash. This skill cuts that upfront cash requirement. At max level you only pay 8% upfront instead of 20%, freeing up real cash you would otherwise have spent.',
    notes: 'The financed portion stays the same — you still owe 80% to the bank. This skill saves you cash today, it does not add to your debt.'
  },
  {
    id: 'landBogo',
    name: 'Land Purchase BOGO',
    group: 'Finance',
    formula: '−5% per level on every other land buy',
    maxEffect: '−50% off every other land purchase at L10',
    blurb: 'A buy-one-get-one discount on land. Every other land purchase gets a discount; the alternating purchase pays full price. The discount applies before the down payment and surcharge are calculated, so all of those shrink too.',
    notes: 'The toggle saves across saves. The map dialog shows "(BOGO applied)" when you\'re about to use the discount.'
  },

  // ── Resilience ─────────────────────────────────────────────────
  {
    id: 'spoilageImmunity',
    name: 'Spoilage Immunity',
    group: 'Resilience',
    formula: '−0.5% per level',
    maxEffect: '−5% off the monthly spoilage rate at L10',
    blurb: 'Grain stored in your silos and trailers spoils slower. By default, 3% of every stored crop rots away each month. Each level shaves another 0.5% off that rate — at max, the base rate drops from 3% all the way down to 0% (in good weather years). Bad weather can still cause some spoilage on top of the base rate.',
    notes: 'The rate never goes negative — you can\'t magically gain grain by waiting.'
  },
  {
    id: 'weatherShield',
    name: 'Weather Shield',
    group: 'Resilience',
    formula: '+0.5% per level (negative-weather only)',
    maxEffect: 'Up to 5% of bad weather absorbed at L10',
    blurb: 'Once a year FarmPunk rolls a weather event from a 45-entry catalog. Some are good (like a bumper year giving +5% yield). Some are brutal (like a blight giving −10% yield). This skill cushions you against the bad ones — each level erases up to 0.5% of weather damage on yield. At max level, you can shrug off up to 5% of a bad-weather year.',
    notes: 'Only helps in bad-weather years. Good weather rolls pass through normally — the shield can erase damage but can\'t turn a hailstorm into sunshine.'
  }
];

export const SKILLS_BY_GROUP = SKILLS.reduce<Record<SkillGroup, Skill[]>>(
  (acc, s) => {
    (acc[s.group] ||= []).push(s);
    return acc;
  },
  {} as Record<SkillGroup, Skill[]>
);

export const GROUP_BLURB: Record<SkillGroup, string> = {
  Production: 'Make every field worth more.',
  Vehicle: 'Faster, stronger, cheaper to run.',
  Storage: 'Hold more grain in silos and trailers.',
  Finance: 'Cheaper loans, smaller down payments, BOGO land.',
  Resilience: 'Survive bad weather and slow grain rot.'
};

export const GROUP_ORDER: SkillGroup[] = [
  'Production',
  'Vehicle',
  'Storage',
  'Finance',
  'Resilience'
];
