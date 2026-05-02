/**
 * Catalog of every FarmPunk system.
 *
 * Three tiers:
 *   - MECHANICS — full wiki dossiers with the standard 9-section schema.
 *     These render at /field-manual/:slug.
 *   - FAMILIES  — collapsed catalogs that have their own dedicated page
 *     (Skills, Perks, Cartel Attacks, Black Markets).
 *   - STUBS     — known shipped systems whose deep wiki page hasn't been
 *     written yet. They render as simple stub pages with a "DOCS PENDING"
 *     callout and a linked related-systems sidebar.
 *
 * Every entry carries a `related: { slug, note }[]` graph pointing to its
 * neighbors. Each note explains *how* the two systems interact, so the
 * sidebar gives readers context, not just a link list.
 */

export type Category = 'RPG' | 'Resistance' | 'Production' | 'Money';

export type Status = 'live' | 'pending';

export type Relation = { slug: string; note: string };

export type CatalogEntry = {
  slug: string;
  title: string;
  oneLiner: string;
  category: Category;
  status: Status;        // live = has dedicated page; pending = stub
  href?: string;         // present iff status === 'live'
  count?: string;        // family page count badge ("17 skills")
  isFamily?: boolean;    // family vs single-mechanic visual treatment
  version?: string;      // ships-in version string
  related?: Relation[];  // graph of related entries (for the sidebar)
};

export type Mechanic = CatalogEntry & {
  summary: string;
  whatItDoes: string[];
  whyItMatters: string;
  howYouProgress: string[];
  importantNumbers: { label: string; value: string }[];
  beginnerAdvice: string[];
  consoleCommands: { cmd: string; note: string }[];
  fieldNote: string;
};

const VERSION = '0.0.34';

// ── Full dossier mechanics ──────────────────────────────────────
export const MECHANICS: Mechanic[] = [
  {
    slug: 'win-condition',
    category: 'RPG',
    title: 'Win Condition',
    oneLiner:
      'There are two. You have to satisfy both to win FarmPunk: own all 100 shares AND fill the Reclamation Warchest.',
    status: 'live',
    href: '/field-manual/win-condition',
    version: VERSION,
    related: [
      { slug: 'shares', note: 'One half of the win condition. 100 shares = 100% off the franchise fee.' },
      { slug: 'reclamation-warchest', note: 'The other half. $1B in the Warchest = the valley is funded.' },
      { slug: 'cartel-franchise-fee', note: 'Shares exist to escape this. 100 shares zeros it out.' },
      { slug: 'cartel-attacks', note: 'More shares = angrier Cartel. The Warchest is the counterweight.' },
      { slug: 'farmer-prestige', note: "Doesn't directly affect the win, but unlocks vehicles and perks that help you reach it." }
    ],
    summary:
      "FarmPunk isn't about getting rich. It's about taking back what was stolen. The Cartel didn't beat your family with one weapon — they used debt, contracts, taxes, franchise fees, market control, and fear. Reclaiming the valley means beating them on both fronts: ownership and resistance. The win condition has two halves. You need both.",
    whatItDoes: [
      "Tracks two independent endgame goals: shares owned (out of 100) and Reclamation Warchest balance (out of $1,000,000,000).",
      "When you hit both, the game fires a CRITICAL HUD card declaring the valley reclaimed.",
      "The two halves do different jobs. Shares zero out the Cartel's cut of your farm income. The Warchest funds the resistance that frees the rest of the valley.",
      "Hitting only one half doesn't win. 100 shares with an empty Warchest = peak Cartel harassment (~4 attacks/year). Full Warchest with 0 shares = you're still paying the franchise fee."
    ],
    whyItMatters:
      "Both halves are necessary because they pressure each other. Buying shares makes the Cartel angrier — and the Warchest is your only defense against the resulting attacks. Filling the Warchest takes huge cash flow — and the only way to keep that cash flow coming through high-share-count years is to keep the franchise fee small (i.e. own a lot of shares). The two systems force each other into balance. You can't ignore either one.",
    howYouProgress: [
      "Buy shares slowly. Each share knocks 1% off the franchise fee, forever. There's a per-year purchase cap that scales with your revenue bracket.",
      "Deposit Warchest cash whenever you have spare money. There's no minimum and no schedule — you decide when to fund the resistance.",
      "Pace the two against each other. A common rhythm: every $10M Warchest deposit cancels one share of Cartel anger, so consider depositing in $10M chunks to match share purchases.",
      "Late game: the Insurgent and Liberating tier Black Markets pay massive cash. Use them to feed Warchest deposits."
    ],
    importantNumbers: [
      { label: 'Total shares', value: '100' },
      { label: 'Warchest cap', value: '$1,000,000,000' },
      { label: 'Reduction per share', value: '1% off the franchise fee' },
      { label: 'Defense per dollar', value: '1 share of Cartel pressure cancelled per $10M' },
      { label: 'Win condition state at 100 shares + $0 Warchest', value: 'Peak Cartel harassment (~4 attacks/year)' },
      { label: 'Win condition state at $1B Warchest + 0 shares', value: "You don't win — franchise fee still applies" },
      { label: 'Win condition state at 100 shares + $1B Warchest', value: 'Reclamation. Game complete.' }
    ],
    beginnerAdvice: [
      "Don't panic about the win condition early. The first 5–10 in-game years are about surviving and growing. Shares come on the table once your 3-year average revenue hits $50,000.",
      "Plan deposits around the year flip (March). The Cartel rolls its annual attacks at that moment — a fat Warchest dampens that roll for the year.",
      "When you're approaching 100 shares, don't let the Warchest go empty or you'll be eaten alive."
    ],
    consoleCommands: [
      { cmd: 'farmPunkShares', note: 'Shares owned, eligibility tier this year, dividend block. Read-only.' },
      { cmd: 'farmPunkWarchest', note: 'Warchest balance, percent to win, deposit ledger. Read-only.' },
      { cmd: 'farmPunkOpposition', note: 'Pressure score (shares minus Warchest defense), this year\'s active attacks. Read-only.' }
    ],
    fieldNote:
      "Ownership takes back your farm. The Warchest helps take back the valley. Do both, and the Cartel doesn't just lose control of you — it loses control of the land."
  },
  {
    slug: 'cartel-franchise-fee',
    category: 'Money',
    title: 'Cartel Franchise Extortion Fee',
    oneLiner:
      "The Cartel's annual cut. Pays per revenue bracket. Each share owned shaves 1% off the bill.",
    status: 'live',
    href: '/field-manual/cartel-franchise-fee',
    version: VERSION,
    related: [
      { slug: 'shares', note: 'The only way to reduce this fee. Each share knocks 1% off forever.' },
      { slug: 'annual-taxes', note: 'Both fire at the same year-end (period 12) tick.' },
      { slug: 'dividends', note: 'Paid in farm cash right after the franchise fee. Same module.' },
      { slug: 'credit-rating', note: 'A franchise fee that pushes your balance negative triggers a credit downgrade.' },
      { slug: 'profit-tracking', note: 'Source of the revenue number the bracket math runs on.' }
    ],
    summary:
      "You lost the farm. You're leasing it back via franchise agreement. The fee is the Cartel's cut for letting you keep working your own land.",
    whatItDoes: [
      'Fires once per year at period 12 (February).',
      "Progressive on annual revenue, US-tax-bracket style — each bracket's rate applies only to the portion of revenue inside it.",
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
    beginnerAdvice: [
      'Plan your year-end balance to absorb the hit. The CRITICAL HUD card at period 12 is not a surprise — preview it any time with `farmPunkFranchiseFee`.',
      'Dividends pay in farm cash. They fire right after the fee. A solid dividend tier softens the blow.',
      'The fee scales with revenue, not profit. Buying expensive equipment to "lower profit" does NOT lower this fee.'
    ],
    consoleCommands: [
      { cmd: 'farmPunkFranchiseFee', note: "Preview the current year's fee with bracket-by-bracket breakdown. Read-only." },
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
      'A one-way savings fund that funds the resistance. Cap is one billion dollars. The money never comes back.',
    status: 'live',
    href: '/field-manual/reclamation-warchest',
    version: VERSION,
    related: [
      { slug: 'cartel-attacks', note: "Every $10M in the Warchest cancels one share's worth of Cartel anger." },
      { slug: 'shares', note: 'The other half of the win condition. Shares + Warchest = reclamation.' },
      { slug: 'win-condition', note: 'Filling the Warchest to $1B is half of how you win FarmPunk.' },
      { slug: 'profit-tracking', note: "Deposits are intentionally invisible to your annual P&L — they don't count as expenditure." }
    ],
    summary:
      "The Warchest is bigger than your farm. It's how you fund the rest of the valley's fight against the Cartel — paying for legal pressure, sabotage defense, community relief, underground logistics, and organizers. Money you put in is gone forever, on purpose. You're not saving it. You're spending it on the resistance.",
    whatItDoes: [
      "You deposit cash whenever you want. Nothing is ever taken automatically — you're always the one who decides.",
      "Every dollar you deposit is gone. There is no withdrawal, no refund, no balance to pull from later. The point is to spend it, not to save it.",
      "Deposits don't count as a business expense. They don't lower your profit, shrink your year-end scrip bonus, or hurt your credit rating — even if a deposit takes your cash to zero. (Lore: this isn't a farm cost; it's the farmer personally funding the cause. The Cartel's books don't see it.)",
      "Every $10 million in the Warchest cancels one share's worth of Cartel anger. The fuller it gets, the less the Cartel attacks you. (See Cartel Attacks for the math.)"
    ],
    whyItMatters:
      "The Warchest does two big jobs. First, it's your only real defense against the Cartel as you start buying back shares — without it, owning 100 shares means peak harassment, four attacks a year on average. Second, filling it to $1 billion is one of the two endgame win conditions (the other is owning all 100 shares). You can't win FarmPunk without it.",
    howYouProgress: [
      "Deposit whenever the farm has spare cash. There's no minimum, no maximum, no schedule.",
      "Try to deposit before each March (the year flip), since that's when the Cartel rolls its annual attacks. A bigger Warchest at that moment means fewer attacks for the year.",
      "Hitting $1 billion fires a big CRITICAL win-condition card. If you also own all 100 shares, you've reclaimed the valley."
    ],
    importantNumbers: [
      { label: 'Cap (the win condition)', value: '$1,000,000,000' },
      { label: 'Cancels Cartel anger at', value: '1 share per $10 million' },
      { label: 'Withdrawals', value: 'None. Ever.' },
      { label: 'Effect on profit / scrip bonus', value: 'None. Invisible to the books.' }
    ],
    beginnerAdvice: [
      "Don't deposit money you actually need. The Warchest doesn't check whether you can afford the deposit — it'll let you take yourself to $0 cash.",
      "Big lump-sum deposits right before March reduce that year's Cartel attacks. Time your deposits with intent.",
      "Think in $10 million chunks. Every one cancels one share of Cartel pressure. Easy mental math when planning."
    ],
    consoleCommands: [
      { cmd: 'farmPunkWarchestDeposit <amount>', note: 'Deposit cash into the Warchest. One-way — there is no "withdraw" command.' },
      { cmd: 'farmPunkWarchest', note: "Read-only. Shows current balance, percent to win, and the list of every deposit you've ever made." }
    ],
    fieldNote:
      "The Cartel's books never see this money move. Your stats screen never shows it. Your credit rating never reacts to it. The only thing that notices is the valley. That's the whole point."
  }
];

// ── Family pages (their own dedicated route) ────────────────────
export const FAMILIES: CatalogEntry[] = [
  {
    slug: 'skills',
    category: 'RPG',
    title: 'Manager Skill Tree',
    oneLiner: '17 scrip-purchased skills × 10 levels each. Yield, sale price, vehicle stats, finance, resilience.',
    status: 'live',
    href: '/field-manual/skills',
    count: '17 skills',
    isFamily: true,
    version: VERSION,
    related: [
      { slug: 'perks', note: "Different progression track — perks are passive grants from prestige, skills are active scrip purchases." },
      { slug: 'crop-mastery', note: "Crop Yield + Sale Price skills compound with mastery's per-crop yield + price tiers." },
      { slug: 'crop-novelty', note: 'Boutique skill amplifies the rotation bonus.' },
      { slug: 'crop-spoilage', note: 'Spoilage Immunity skill cuts the monthly rot rate.' },
      { slug: 'weather', note: 'Weather Shield skill absorbs bad-weather penalties on yield.' },
      { slug: 'mandatory-financing', note: 'Loan Interest + Down Payment skills cut the cost of new loans.' },
      { slug: 'farmland-surcharge', note: 'Land BOGO skill discounts every other land buy, applied before the surcharge.' },
      { slug: 'wallet-scrip', note: 'All 17 skills are bought with scrip from your wallet.' }
    ]
  },
  {
    slug: 'perks',
    category: 'RPG',
    title: 'Farmer Prestige Perks',
    oneLiner: 'A 12-perk rotation that fires as Farmer Prestige climbs. Each lap through the rotation gets one level slower than the last.',
    status: 'live',
    href: '/field-manual/perks',
    count: '12 perks',
    isFamily: true,
    version: VERSION,
    related: [
      { slug: 'farmer-prestige', note: 'Perks unlock automatically as Prestige levels up.' },
      { slug: 'prestige-rewards', note: "Reward levels are skipped by perk cadence — they're free 'rest' levels." },
      { slug: 'farmer-titles', note: 'Both derive from prestige levels.' },
      { slug: 'crop-mastery', note: 'Mastery Catalyst perk speeds up per-crop fame gain.' },
      { slug: 'vehicle-storage', note: 'Insurance Policy + Guard Dogs perks reduce theft and vandal pain.' },
      { slug: 'credit-rating', note: 'Credit Indemnity perk widens the negative-balance floor before downgrade fires.' },
      { slug: 'debt-cap', note: 'Generous Banker perk boosts both debt-cap multipliers.' },
      { slug: 'farmland-surcharge', note: 'Negotiator perk cuts the surcharge by up to 30%.' },
      { slug: 'annual-taxes', note: 'Tax Shelter cuts equipment tax. Land Lawyer cuts land tax.' },
      { slug: 'vanilla-loan', note: 'Super Payday Advance perk raises the vanilla loan cap.' },
      { slug: 'weather', note: 'Forecasting Leveraging amplifies the favorable side of every weather mod.' },
      { slug: 'asset-sell-block', note: 'Backroom Dealers perk is the only way to sell anything — N sells per year.' },
      { slug: 'skills', note: 'Two parallel progression systems. Perks are passive; skills are scrip purchases.' }
    ]
  },
  {
    slug: 'cartel-attacks',
    category: 'Resistance',
    title: 'Cartel Attacks',
    oneLiner: 'Ten distinct retaliations. Pressure score (shares minus Warchest defense) drives how many activate per year.',
    status: 'live',
    href: '/field-manual/cartel-attacks',
    count: '10 attacks',
    isFamily: true,
    version: VERSION,
    related: [
      { slug: 'shares', note: 'Buying shares makes the Cartel angrier — pressure scales linearly with share count.' },
      { slug: 'reclamation-warchest', note: 'The Warchest is the defense. Every $10M cancels one share of pressure.' },
      { slug: 'crop-licensing', note: 'License Revocation drops one of your crop license tiers for the year.' },
      { slug: 'crop-novelty', note: 'Smear Campaign zeros out novelty bonuses for the year.' },
      { slug: 'crop-spoilage', note: 'Crop Poisoning is a one-shot silo grain raid — separate from natural spoilage.' },
      { slug: 'annual-taxes', note: 'Cartel Audit fires from inside the year-end tax block.' },
      { slug: 'vehicle-storage', note: "Goon Visit wrecks one tractor regardless of shelter — it's the only attack storage can't block." },
      { slug: 'mandatory-financing', note: 'Loan Rate Hike adds +3% to new loans for the active year.' },
      { slug: 'win-condition', note: 'Owning all 100 shares with no Warchest = peak harassment.' }
    ]
  },
  {
    slug: 'black-markets',
    category: 'Resistance',
    title: 'Black Markets',
    oneLiner: '5-tier underground buyer roster. Refreshes annually. Interactive simulator included.',
    status: 'live',
    href: '/black-markets',
    count: '5 tiers',
    isFamily: true,
    version: VERSION,
    related: [
      { slug: 'crop-mastery', note: 'Higher tier markets gate on per-crop mastery levels.' },
      { slug: 'farmer-prestige', note: 'Higher tier markets gate on Prestige. Completions also pay prestige fame.' },
      { slug: 'crop-licensing', note: 'License penalty applies to ALL sales — including Black Market deliveries.' },
      { slug: 'wallet-scrip', note: 'Completions pay scrip in addition to cash and fame.' }
    ]
  }
];

// ── Stubs — shipped, but no deep wiki page yet ──────────────────
export const STUBS: CatalogEntry[] = [
  // RPG & Progression
  {
    slug: 'crop-mastery', category: 'RPG', title: 'Crop Mastery',
    oneLiner: 'Per-crop fame counter. Yield + price tier every 5/10 levels. Uncapped.',
    status: 'pending', version: VERSION,
    related: [
      { slug: 'skills', note: 'Crop Yield + Sale Price skills compound with mastery yield/price tiers.' },
      { slug: 'perks', note: 'Mastery Catalyst perk speeds up fame gain.' },
      { slug: 'farmer-prestige', note: 'Both grow on the same sale ticks. Prestige is global; mastery is per-crop.' },
      { slug: 'crop-novelty', note: 'Mastery price tier stacks with the novelty rotation bonus.' },
      { slug: 'black-markets', note: 'Higher tier markets gate on per-crop mastery levels.' }
    ]
  },
  {
    slug: 'farmer-prestige', category: 'RPG', title: 'Farmer Prestige',
    oneLiner: 'Global level. Vehicle gifts at L3, 5, 10, 15… up to L100.',
    status: 'pending', version: VERSION,
    related: [
      { slug: 'crop-mastery', note: 'Both grow per liter sold. Prestige is global, mastery is per-crop.' },
      { slug: 'prestige-rewards', note: 'Reward vehicles unlock at preset prestige levels.' },
      { slug: 'perks', note: 'Perks unlock automatically as prestige climbs.' },
      { slug: 'farmer-titles', note: 'Title is derived from current prestige level.' },
      { slug: 'black-markets', note: 'Higher tier markets gate on prestige.' },
      { slug: 'win-condition', note: "Doesn't directly affect the win, but unlocks the perks + rewards that help you reach it." }
    ]
  },
  {
    slug: 'prestige-rewards', category: 'RPG', title: 'Prestige Reward Catalog',
    oneLiner: '13 default vehicle gifts at preset prestige levels. Authoring tool included.',
    status: 'pending', version: VERSION,
    related: [
      { slug: 'farmer-prestige', note: 'Reward vehicles deliver at preset prestige levels.' },
      { slug: 'perks', note: "Perk cadence skips reward levels — they're free 'rest' levels." },
      { slug: 'asset-sell-block', note: "Reward vehicles can't be sold — the museum doctrine applies to them too." }
    ]
  },
  {
    slug: 'farmer-titles', category: 'RPG', title: 'Farmer Titles',
    oneLiner: 'Field Serf → Rebel Baron, derived from Prestige.',
    status: 'pending', version: VERSION,
    related: [
      { slug: 'farmer-prestige', note: 'Title is purely a derived display from your current prestige level.' }
    ]
  },
  {
    slug: 'vehicle-storage', category: 'RPG', title: 'Vehicle Storage Enforcement',
    oneLiner: 'Wear, vandals, theft on exposed gear every month. Build sheds.',
    status: 'pending', version: VERSION,
    related: [
      { slug: 'cartel-attacks', note: "Goon Visit wrecks one tractor regardless of shelter — the only attack that ignores storage." },
      { slug: 'skills', note: "Maintenance skill slows wear, but doesn't prevent exposure damage." },
      { slug: 'perks', note: 'Insurance Policy refunds part of theft loss. Guard Dogs lowers vandal/theft chance.' },
      { slug: 'weather', note: 'Bad-weather years amplify exposure damage.' }
    ]
  },

  // Resistance
  {
    slug: 'shares', category: 'Resistance', title: 'Shares',
    oneLiner: '0–100. Each weakens Cartel grip 1%. The franchise-fee escape hatch.',
    status: 'pending', version: VERSION,
    related: [
      { slug: 'cartel-franchise-fee', note: 'Each share knocks 1% off the fee. The only way to reduce it.' },
      { slug: 'dividends', note: 'Each share earns annual dividends in farm cash.' },
      { slug: 'cartel-attacks', note: 'Buying shares makes the Cartel angrier — pressure scales linearly.' },
      { slug: 'reclamation-warchest', note: 'Owning shares without funding the Warchest = peak harassment.' },
      { slug: 'win-condition', note: 'Owning all 100 = half the win.' }
    ]
  },
  {
    slug: 'dividends', category: 'Resistance', title: 'Dividends',
    oneLiner: 'Cash. Lifetime-fund tier ladder $2k → $10k per share.',
    status: 'pending', version: VERSION,
    related: [
      { slug: 'shares', note: 'Pays per share owned. No shares, no dividends.' },
      { slug: 'cartel-franchise-fee', note: 'Lifetime franchise fees assessed (gross) drives the dividend tier.' },
      { slug: 'annual-taxes', note: 'Fires at the same year-end tick as the tax block.' }
    ]
  },

  // Production & Markets
  {
    slug: 'crop-licensing', category: 'Production', title: 'Crop Licensing',
    oneLiner: '6-tier per-crop sell volume cap. −80% over the cap.',
    status: 'pending', version: VERSION,
    related: [
      { slug: 'crop-novelty', note: 'Both modify per-station sale price through the same writer.' },
      { slug: 'cartel-attacks', note: 'License Revocation drops one of your tiers for the year.' },
      { slug: 'black-markets', note: 'License penalty applies to ALL sales, including Black Market deliveries.' },
      { slug: 'crop-mastery', note: 'Both contribute to crop-specific progression.' }
    ]
  },
  {
    slug: 'crop-novelty', category: 'Production', title: 'Crop Novelty Bonus',
    oneLiner: '+15% / +25% rotation incentive. Locked at year start.',
    status: 'pending', version: VERSION,
    related: [
      { slug: 'crop-licensing', note: 'Both modify per-station sale price through the same writer.' },
      { slug: 'crop-mastery', note: 'Mastery price tier stacks multiplicatively.' },
      { slug: 'skills', note: 'Boutique skill amplifies the novelty bonus.' },
      { slug: 'cartel-attacks', note: 'Smear Campaign zeros novelty bonuses for the year.' }
    ]
  },
  {
    slug: 'crop-spoilage', category: 'Production', title: 'Crop Spoilage',
    oneLiner: "3% of grain per month. Don't hoard.",
    status: 'pending', version: VERSION,
    related: [
      { slug: 'skills', note: 'Spoilage Immunity skill reduces the monthly rot rate.' },
      { slug: 'weather', note: 'Bad-weather years can add to the spoilage rate.' },
      { slug: 'cartel-attacks', note: 'Crop Poisoning is a separate one-shot raid on a single silo.' }
    ]
  },
  {
    slug: 'weather', category: 'Production', title: 'Weather System',
    oneLiner: '45 entries × 5 rarity tiers. One year = one weather, locked at P1.',
    status: 'pending', version: VERSION,
    related: [
      { slug: 'crop-spoilage', note: 'Weather modifier adds to the monthly spoilage rate.' },
      { slug: 'skills', note: 'Weather Shield skill absorbs negative weather mods on yield.' },
      { slug: 'perks', note: 'Forecasting Leveraging perk amplifies the favorable side of every weather mod.' },
      { slug: 'vehicle-storage', note: 'Weather modifier applies to per-period exposure damage.' }
    ]
  },

  // Money & Credit
  {
    slug: 'annual-taxes', category: 'Money', title: 'Annual Taxes',
    oneLiner: 'Land + equipment, fired at Feb each year. Exponential land curve.',
    status: 'pending', version: VERSION,
    related: [
      { slug: 'cartel-franchise-fee', note: 'Both fire at the same period-12 tick.' },
      { slug: 'perks', note: 'Tax Shelter cuts equipment tax. Land Lawyer cuts land tax.' },
      { slug: 'profit-tracking', note: 'Records the tax deduction as expenditure for the year.' },
      { slug: 'credit-rating', note: 'A tax bill that pushes you negative triggers a downgrade.' }
    ]
  },
  {
    slug: 'mandatory-financing', category: 'Money', title: 'Mandatory Financing',
    oneLiner: '20% down, 12% interest, 36 months. Lease is gone.',
    status: 'pending', version: VERSION,
    related: [
      { slug: 'debt-cap', note: 'Every new loan checks the cap before going through.' },
      { slug: 'cash-reserve', note: 'Every purchase checks post-down-payment balance against the reserve.' },
      { slug: 'credit-rating', note: 'Loan rate is captured at creation; rating affects only NEW loans.' },
      { slug: 'vanilla-loan', note: "Vanilla loan is a separate emergency channel — doesn't count toward the debt cap." },
      { slug: 'skills', note: 'Loan Interest + Down Payment skills cut new-loan cost.' },
      { slug: 'cartel-attacks', note: 'Loan Rate Hike adds +3% to new loans for the active year.' }
    ]
  },
  {
    slug: 'debt-cap', category: 'Money', title: 'Debt Cap',
    oneLiner: 'Scales with land + equipment + balance. Min $100k.',
    status: 'pending', version: VERSION,
    related: [
      { slug: 'mandatory-financing', note: 'All financed purchases check the cap.' },
      { slug: 'perks', note: 'Generous Banker perk boosts both multipliers.' },
      { slug: 'cash-reserve', note: 'Both gate purchases — cap is about total debt; reserve is about post-payment liquidity.' }
    ]
  },
  {
    slug: 'credit-rating', category: 'Money', title: 'Credit Rating F→A',
    oneLiner: 'Drops on default. Climbs on a clean year.',
    status: 'pending', version: VERSION,
    related: [
      { slug: 'mandatory-financing', note: 'Rating affects new-loan interest rate. Existing loans keep their rate.' },
      { slug: 'vanilla-loan', note: 'Vanilla loan interest payments can also push balance negative and trigger downgrade.' },
      { slug: 'annual-taxes', note: 'Tax bill that goes negative triggers downgrade.' },
      { slug: 'skills', note: 'Loan Interest skill stacks with the rating discount on new loans.' },
      { slug: 'perks', note: 'Credit Indemnity perk widens the negative-balance floor before downgrade fires.' }
    ]
  },
  {
    slug: 'vanilla-loan', category: 'Money', title: 'Vanilla Loan Override',
    oneLiner: '$50k cap, 3× interest. Emergency only.',
    status: 'pending', version: VERSION,
    related: [
      { slug: 'credit-rating', note: 'Vanilla interest deductions can push you negative and downgrade your rating.' },
      { slug: 'mandatory-financing', note: 'Vanilla is a separate emergency channel — runs in parallel to FarmPunk financing.' },
      { slug: 'perks', note: 'Super Payday Advance perk raises the vanilla cap.' }
    ]
  },
  {
    slug: 'cash-reserve', category: 'Money', title: 'Minimum Cash Reserve',
    oneLiner: '3× monthly obligations. Purchases blocked below.',
    status: 'pending', version: VERSION,
    related: [
      { slug: 'mandatory-financing', note: 'Reserve gates every financed purchase.' },
      { slug: 'debt-cap', note: 'Both are pre-purchase gates — debt cap on total debt, reserve on liquidity.' }
    ]
  },
  {
    slug: 'farmland-surcharge', category: 'Money', title: 'Farmland Surcharge',
    oneLiner: '2% to 40% acquisition fee. Scales with acres held.',
    status: 'pending', version: VERSION,
    related: [
      { slug: 'mandatory-financing', note: 'Land buys run through the same financing flow plus this surcharge.' },
      { slug: 'perks', note: 'Negotiator perk reduces the surcharge by up to 30%.' },
      { slug: 'skills', note: 'Land BOGO skill discounts land prices, applied before the surcharge calc.' }
    ]
  },
  {
    slug: 'profit-tracking', category: 'Money', title: 'Annual Profit & Expenditure Tracking',
    oneLiner: 'Per-year revenue + expense ledger. Drives bonuses, brackets, dividends.',
    status: 'pending', version: VERSION,
    related: [
      { slug: 'annual-taxes', note: 'Records the tax deduction as expenditure.' },
      { slug: 'cartel-franchise-fee', note: 'Source of the revenue number the bracket math runs on.' },
      { slug: 'reclamation-warchest', note: 'Warchest deposits are intentionally invisible to this ledger.' },
      { slug: 'wallet-scrip', note: 'Annual scrip bonus is computed from current-year profit.' }
    ]
  },
  {
    slug: 'wallet-scrip', category: 'Money', title: 'Farmer Wallet (Scrip)',
    oneLiner: 'Secondary currency for skills, shares, licenses. Cannot be exchanged.',
    status: 'pending', version: VERSION,
    related: [
      { slug: 'skills', note: 'All 17 skills are bought with scrip.' },
      { slug: 'shares', note: 'Shares are bought with scrip, not farm cash.' },
      { slug: 'crop-licensing', note: 'License upgrades cost scrip.' },
      { slug: 'profit-tracking', note: 'Annual scrip bonus = floor(profit × 0.001).' },
      { slug: 'black-markets', note: 'Black Market completions pay scrip in addition to cash + fame.' }
    ]
  },
  {
    slug: 'asset-sell-block', category: 'Money', title: 'Asset Sell Block',
    oneLiner: 'Once bought, always bought. The museum doctrine.',
    status: 'pending', version: VERSION,
    related: [
      { slug: 'perks', note: 'Backroom Dealers perk is the only way around it — N sells per year.' },
      { slug: 'prestige-rewards', note: "Reward vehicles can't be sold either — museum doctrine applies." }
    ]
  },
  {
    slug: 'no-generators', category: 'Money', title: 'No Generators',
    oneLiner: 'Solar + wind placeables refused. The company keeps the meter.',
    status: 'pending', version: VERSION,
    related: []
  }
];

// ── Combined catalog for the Field Manual index ─────────────────
export const ALL_CATALOG: CatalogEntry[] = [...MECHANICS, ...FAMILIES, ...STUBS];

export const CATALOG_BY_CATEGORY = ALL_CATALOG.reduce<Record<Category, CatalogEntry[]>>(
  (acc, entry) => {
    (acc[entry.category] ||= []).push(entry);
    return acc;
  },
  {} as Record<Category, CatalogEntry[]>
);

/** Find an entry by slug (across all tiers). */
export function findEntry(slug: string): CatalogEntry | undefined {
  return ALL_CATALOG.find(e => e.slug === slug);
}

/** Resolve a slug to its display title + correct href (family route or /field-manual/:slug). */
export function resolveRelated(slug: string): { title: string; href: string } | null {
  const e = findEntry(slug);
  if (!e) return null;
  return {
    title: e.title,
    href: e.href ?? `/field-manual/${e.slug}`
  };
}

// ── Counts (used by Home + Field Manual headers) ────────────────
export const TOTAL_SHIPPED_SYSTEMS = ALL_CATALOG.length; // top-level systems
// Counting individual skills (17), perks (12), and cartel attacks (10) as
// distinct shipped behaviours, plus every other catalog entry once:
export const TOTAL_SHIPPED_BEHAVIOURS =
  17 + 12 + 10 + ALL_CATALOG.filter(e => !e.isFamily).length;
