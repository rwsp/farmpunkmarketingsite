/**
 * The Cartel's 10-event opposition catalog.
 * Rolled annually at period 1, sampled by pressure score, 1-year cooldown.
 */

export type AttackType =
  | 'continuous'   // active all year
  | 'monthly'      // fires every period change while active
  | 'oneshot'     // fires once at activation, consequence permanent
  | 'deferred';    // active but doesn't fire until period 12

export type CartelAttack = {
  num: number;
  name: string;
  type: AttackType;
  typeLabel: string;
  effect: string;
  mitigation: string;
};

export const CARTEL_ATTACKS: CartelAttack[] = [
  {
    num: 1,
    name: 'Cartel Tariff',
    type: 'continuous',
    typeLabel: 'All year · per sale',
    effect: 'Every time you sell something, the Cartel skims 10% off the top. The deduction happens silently — no popup per sale, just a year-end total in the opposition console readout.',
    mitigation: 'There\'s no way to dodge it once it\'s active. Sell in fewer, larger batches if you want to feel it less per transaction.'
  },
  {
    num: 2,
    name: 'Inflation Decree',
    type: 'continuous',
    typeLabel: 'All year · price markup',
    effect: 'Vehicles and buildings cost 20% more this year. Land prices are unaffected — that\'s a separate market.',
    mitigation: 'Buy big-ticket equipment before the year starts, or wait until next March when the markup expires.'
  },
  {
    num: 3,
    name: 'Crop Poisoning',
    type: 'oneshot',
    typeLabel: 'One-shot · permanent',
    effect: 'The Cartel sneaks into one of your silos and poisons half the grain. They pick a single silo and a single crop type at random. Whatever gets poisoned is gone for good — you can\'t sell it.',
    mitigation: 'Sell down your stockpiles before each March. The Cartel can only poison what\'s actually sitting in storage when the year flips over — empty silos are safe.'
  },
  {
    num: 4,
    name: 'Crop Embargo',
    type: 'continuous',
    typeLabel: 'All year · sale price',
    effect: 'One random crop\'s sale price is cut in half for the entire year. Buyers everywhere refuse to pay more.',
    mitigation: 'Diversify what you grow. If the embargo lands on a crop you barely farm, it\'s a free year. If it lands on your main crop, switch to something else for a season.'
  },
  {
    num: 5,
    name: 'Smear Campaign',
    type: 'continuous',
    typeLabel: 'All year · novelty zeroed',
    effect: 'The Cartel tells everyone your crops are bad. The Crop Novelty bonus (the +15% / +25% you get for rotating crops) is wiped out for the year. Boutique perk gets nothing to amplify either.',
    mitigation: 'Don\'t plan a year around the novelty bonus. Volume still pays — just not the rotation premium.'
  },
  {
    num: 6,
    name: 'Cartel Audit',
    type: 'deferred',
    typeLabel: 'Fires at year-end',
    effect: 'The Cartel "audits" your books at the end of the year and takes 5% of your annual revenue.',
    mitigation: 'No way to dodge it once it\'s active. Plan your year-end balance to absorb the audit, the franchise fee, and the regular taxes all hitting at once.'
  },
  {
    num: 7,
    name: 'Asset Registration Fee',
    type: 'monthly',
    typeLabel: 'Monthly · per vehicle',
    effect: 'Every month the Cartel charges $50 per vehicle you own. Fires 12 times a year for as long as it\'s active.',
    mitigation: 'A smaller fleet means a smaller bill. In practice this is the gentlest attack — usually under $1,000 a month even with a sizeable fleet.'
  },
  {
    num: 8,
    name: 'License Revocation',
    type: 'continuous',
    typeLabel: 'All year · resets in spring',
    effect: 'One of your crop licenses gets knocked down a tier. Your annual sell cap on that crop shrinks for the year.',
    mitigation: 'One of the few attacks that fully unwinds — the tier comes back next March. For one year, plan around the lower cap or grow a different crop.'
  },
  {
    num: 9,
    name: 'Loan Rate Hike',
    type: 'continuous',
    typeLabel: 'All year · new loans only',
    effect: 'Any new loan you take out this year costs +3% extra interest. Existing loans keep their old rate — they\'re locked at creation.',
    mitigation: 'Postpone big financing decisions to next year if you can. If you must finance now, downgrade what you buy or save for cash.'
  },
  {
    num: 10,
    name: 'Goon Visit',
    type: 'oneshot',
    typeLabel: 'One-shot · permanent',
    effect: 'The Cartel sends people to wreck a random tractor. Damage jumps to 100% — totally broken until you repair it. Only one tractor takes the hit, and NO, your sheds don\'t help here. The goons walk into the barn. That\'s the point.',
    mitigation: 'There isn\'t one. Repair the tractor and move on. It\'s one tractor a year, at worst.'
  }
];
