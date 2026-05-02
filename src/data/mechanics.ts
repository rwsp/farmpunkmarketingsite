/**
 * Catalog of every FarmPunk system.
 *
 *   - MECHANICS — full wiki dossiers with the standard 9-section schema,
 *     rendered at /field-manual/:slug.
 *   - CUSTOM_PAGES — live systems with their own dedicated page (Skills,
 *     Perks, Cartel Attacks, Black Markets). Each has unique content that
 *     doesn't fit the standard 9-section dossier, but renders in the same
 *     dossier shell with a Related Systems sidebar.
 *   - STUBS — shipped systems whose deep dossier hasn't been written yet.
 *     Render as a "DOCS PENDING" page with the related-systems sidebar.
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
  status: Status;        // live = has a dedicated page; pending = stub
  href?: string;         // present iff status === 'live'
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
      "FarmPunk has two endgame requirements. Buy back all 100 of the Cartel's shares to break their grip on your farm. Fill the Reclamation Warchest with $1 billion to bankroll the rest of the valley's fight. They're designed to pressure each other into balance, and you'll need both to win.",
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
      "The Cartel Franchise Extortion Fee is their annual cut of your gross revenue, dressed up as paperwork and collected like tribute. Buying shares reduces the fee, but every share you reclaim makes the Cartel angrier — freedom gets cheaper on paper and more dangerous in the field.",
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
    slug: 'crop-mastery',
    category: 'RPG',
    title: 'Crop Mastery',
    oneLiner:
      "Crop Mastery is your reputation written in seed, soil, and receipts: every crop you sell teaches you how to grow it better and proves to buyers you know what you are doing. Each crop levels separately, permanently boosting its yield and sale price with no cap — because the Cartel can control the market, but it cannot stop you from getting dangerously good.",
    status: 'live',
    href: '/field-manual/crop-mastery',
    version: VERSION,
    related: [
      { slug: 'skills', note: 'Crop Yield + Sale Price skills compound with mastery yield/price tiers.' },
      { slug: 'perks', note: 'Mastery Catalyst perk speeds up fame gain.' },
      { slug: 'farmer-prestige', note: 'Both grow on the same sale ticks. Prestige is global; mastery is per-crop.' },
      { slug: 'crop-novelty', note: 'Mastery price tier stacks with the novelty rotation bonus.' },
      { slug: 'black-markets', note: 'Higher tier markets gate on per-crop mastery levels.' }
    ],
    summary:
      "The Cartel sets the prices, writes the licenses, and decides what your harvest is worth on paper. Crop Mastery is the one number on the farm they cannot tax, throttle, or revoke. Every liter of a specific crop you push through the scales makes you permanently better at that crop — better yields out of the dirt, better prices at the silo. It is slow, quiet progression that rewards farmers who actually learn their crops instead of chasing whatever the market is paying that month. The longer you grow something, the more dangerous you become at growing it.",
    whatItDoes: [
      "Tracks one independent level per harvestable crop. Every liter you sell of that specific crop adds 1 fame to that crop's mastery counter — selling wheat does not raise corn mastery.",
      "Awards a yield tier every ten levels starting at level 5 (so L5, L15, L25, L35, …). Each tier adds +5% to that crop's yield per square meter.",
      "Awards a price tier every ten levels starting at level 10 (so L10, L20, L30, L40, …). Each tier adds +5% to that crop's sale price at every station.",
      "Has no level cap. Mastery counters never reset across years or saves — once you have earned the fame, it is yours."
    ],
    whyItMatters:
      "This is the only progression system in FarmPunk that is permanent, free, and quietly compounding in the background while you do everything else. The Cartel can revoke licenses, smear novelty, audit your books, and embargo a crop for the year — but they cannot take a yield tier off your records. Mastery also gates the higher-paying Black Markets: the deep-cash buyers will not deal with someone who cannot prove they know the crop. And because mastery levels each crop independently, it pays farmers who specialize. The valley remembers what you are good at.",
    howYouProgress: [
      "Sell the crop. There is no menu, no purchase, no console step — fame ticks up automatically with every liter that crosses the scale at a selling station.",
      "Specialize. Because mastery is per-crop, focusing on two or three crops levels them far faster than spreading harvests across the whole catalog.",
      "Pick up the Mastery Catalyst perk as Farmer Prestige climbs. It is one of only two uncapped perks in the game: every occurrence adds another +5% to crop fame gained per liter sold, forever.",
      "Stack mastery with the Crop Yield and Sale Price skills from the Manager Skill Tree. They modify the same yield and price the mastery tiers do, so the bonuses compound."
    ],
    importantNumbers: [
      { label: 'Fame per liter sold', value: "1 (of that crop's mastery counter)" },
      { label: 'Liters to reach L1', value: '10,000' },
      { label: 'Liters from L1 to L2', value: '11,000' },
      { label: 'Curve', value: 'Each level costs 10% more fame than the last (geometric, growth 1.10)' },
      { label: 'Yield tier cadence', value: 'Every 10 levels, starting at L5' },
      { label: 'Yield bonus per tier', value: '+5% per square meter on that crop' },
      { label: 'Price tier cadence', value: 'Every 10 levels, starting at L10' },
      { label: 'Price bonus per tier', value: '+5% sale price on that crop, every station' },
      { label: 'Level cap', value: 'None' },
      { label: 'WHEAT at L5', value: '+5% yield, +0% price' },
      { label: 'WHEAT at L25', value: '+15% yield, +10% price' },
      { label: 'WHEAT at L100', value: '+50% yield, +50% price' },
      { label: 'Black Market mastery gates', value: 'Backroad: none · Off-Book: 1–15 · Underground: 5–20 · Insurgent: 10–30 · Liberating: 15–40' }
    ],
    beginnerAdvice: [
      "Pick your crops on purpose. Two or three crops grown deliberately will outpace eight crops grown casually, because every liter you spread thin is a liter not compounding a tier you actually want.",
      "Crossing a yield tier mid-harvest does not retroactively rescale a crop already in the ground. The bigger numbers show up on the next grow cycle, not the field you are currently combining. Plan accordingly.",
      "Black Market completions do not grow Crop Mastery — that fame goes to Farmer Prestige instead. If you want a specific crop's mastery to climb, you have to sell that crop yourself.",
      "Mastery is sale-driven, not harvest-driven. Grain sitting in a silo does nothing for your level. Move the crop to count it."
    ],
    consoleCommands: [
      { cmd: 'farmPunkMastery', note: "Read-only. Prints Farmer Prestige level and fame, plus every crop's current mastery level, fame, and progress to the next level. Also shows the active +X% yield / +Y% price for each crop." },
      { cmd: 'farmPunkSetMastery <CROPNAME> <level>', note: 'Testing tool. Sets a single crop’s mastery to exactly the requested level (uppercase crop name, e.g. WHEAT). Reapplies the new yield and price tiers immediately.' }
    ],
    fieldNote:
      "The Cartel keeps an inventory of everything they think they own — your land, your machines, your debt, your future. They do not have a column for what you have learned. Every liter you sell scrawls another tally on a ledger they cannot read, and the only people who can read it are the buyers willing to pay you what the crop is actually worth."
  },
  {
    slug: 'reclamation-warchest',
    category: 'Resistance',
    title: 'Reclamation Warchest',
    oneLiner:
      "The Reclamation Warchest is a one-way fund for the valley’s fight, bankrolling the people and networks pushing back against the Cartel’s grip. Filling it is half the win condition, and every dollar sabotages their hostilities.",
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
  },
  {
    slug: 'farmer-prestige',
    category: 'RPG',
    title: 'Farmer Prestige',
    oneLiner:
      "Farmer Prestige tracks how loudly your name travels through the valley — trusted by locals, watched by buyers, and cursed by the Cartel. Higher Prestige unlocks perks, better Black Market access, and occasional one-time support from people who believe your farm might become the crack in their empire.",
    status: 'live',
    href: '/field-manual/farmer-prestige',
    version: VERSION,
    related: [
      { slug: 'crop-mastery', note: 'Both grow per liter sold. Prestige is global, mastery is per-crop.' },
      { slug: 'rebel-supply-chain', note: 'Reward vehicles unlock at preset prestige levels.' },
      { slug: 'perks', note: 'Perks unlock automatically as prestige climbs.' },
      { slug: 'farmer-titles', note: 'Title is derived from current prestige level.' },
      { slug: 'black-markets', note: 'Higher tier markets gate on prestige.' },
      { slug: 'win-condition', note: "Doesn't directly affect the win, but unlocks the perks + rewards that help you reach it." }
    ],
    summary:
      "Prestige is a single global reputation level that climbs every time you sell crops. It is the line under your name in the valley's quiet ledger — every liter through the scales counts, no matter what crop, what station, or what year. Mastery is per-crop. Prestige is everywhere. The number does not go down, does not reset between years or saves, and has no ceiling. It is the slow background measure of how serious a farmer you have become.",
    whatItDoes: [
      "Tracks one global level driven by total liters sold across every harvestable crop. One liter sold = one point of Prestige fame, regardless of which crop, which station, or which year.",
      "Levels up automatically as you cross fame thresholds. The first level takes 24,000 liters; each level after that costs 10% more fame than the last.",
      "Has no level cap and never resets. Prestige keeps climbing across years and across saves — once you have earned a level, it is yours.",
      "Drives three downstream systems: Farmer Titles (the honorific the valley uses for you), the Rebel Supply Chain (machines, parts, and trailers quietly redirected onto your dealer's pad as the valley starts betting on you), and Farmer Prestige Perks (a rotating set of recurring bonuses unlocked on every level-up).",
      "Unlocks the higher-tier Black Markets — the deeper-cash buyers will not deal with someone the valley has not heard of yet. Black Market completions also pay direct Prestige fame on top of cash and scrip."
    ],
    whyItMatters:
      "Crop Mastery makes you better at one specific crop. Prestige makes the whole valley pay attention. Every perk that softens taxes, widens loan ceilings, refunds stolen equipment, or speeds up mastery comes through this number — perks unlock automatically as Prestige climbs. At specific levels, equipment also starts showing up on the dealer's pad with no purchase, no financing, and no Cartel signoff — the Cartel calls it fraud and unauthorized redistribution; the valley calls it field support, betting on you with the only things that matter out here. And the better Black Markets — the ones that pay seven figures and feed Warchest deposits — only open up to farmers with the reputation to back the deal. Prestige is the trunk that all of FarmPunk's RPG progression branches off of.",
    howYouProgress: [
      "Sell crops. Any crop, at any station — every liter counts as one point of Prestige fame. There is no menu, no purchase, no console step.",
      "Pick up the Mastery Catalyst perk on the way up. It speeds up Crop Mastery, not Prestige itself, but a faster mastery climb means more Black Market completions and more reward unlocks down the road.",
      "Take Black Market jobs once they appear on the board. Completed deliveries pay a direct Prestige fame bonus on top of cash and scrip — far faster than grinding pure liters.",
      "Do not chase the curve. Prestige is meant to feel earned, not farmed — keep selling, keep finishing markets, and the levels will come."
    ],
    importantNumbers: [
      { label: 'Fame per liter sold (any crop)', value: '1' },
      { label: 'Liters to reach L1', value: '24,000' },
      { label: 'Curve', value: 'Each level costs 10% more fame than the last (geometric, growth 1.10)' },
      { label: 'Level cap', value: 'None' },
      { label: 'Counter resets', value: 'Never. Persists across years and saves.' },
      { label: 'Title bands', value: 'L0 / L10 / L20 / L30 / L40 / L50 — six titles' },
      { label: 'Reward levels (free vehicles)', value: 'L3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 100' },
      { label: 'Black Market unlocks', value: 'Backroad 0 · Off-Book 10 · Underground 20 · Insurgent 30 · Liberating 40' }
    ],
    beginnerAdvice: [
      "Do not try to grind Prestige directly — it grows on every sale anyway. Focus on running the farm well; Prestige is the receipt.",
      "Once Prestige starts crossing Rebel Supply Chain levels, machines, headers, and trailers start appearing on the dealer's pad — the valley redirecting gear onto your operation, paperwork left vague on purpose. Check the lot after a level-up so a $400,000 combine is not sitting there for a week.",
      "Black Market completions are the fastest way to climb after the early years. The fame payout per market dwarfs what selling a single grain trailer adds.",
      "Title bands change every ten levels until L50. Crossing into a new band does not change any numbers — the bonuses come from perks and rewards, which are tied to the level itself, not the title."
    ],
    consoleCommands: [
      { cmd: 'farmPunkMastery', note: 'Read-only. Prints current Farmer Prestige level + fame and progress to the next level, alongside per-crop mastery.' },
      { cmd: 'farmPunkPerks', note: "Read-only. Shows current Prestige level + title, every perk's level/cap, and the level of the next perk grant." },
      { cmd: 'farmPunkStats', note: 'Read-only. Prints your farmer title (derived from Prestige) plus year-over-year revenue, expenditure, profit, and 3-year average.' }
    ],
    fieldNote:
      "Mastery is what you know. Prestige is what they say about you when you walk away from the scales."
  },
  {
    slug: 'rebel-supply-chain',
    category: 'RPG',
    title: 'Rebel Supply Chain',
    oneLiner:
      "The Cartel calls it fraud, theft, and unauthorized redistribution. The valley calls it field support. As your Farmer Prestige rises, people start betting on you with the only things that matter out here: machines, parts, trailers, and trust.",
    status: 'live',
    href: '/field-manual/rebel-supply-chain',
    version: VERSION,
    related: [
      { slug: 'farmer-prestige', note: 'Reward vehicles deliver at preset prestige levels.' },
      { slug: 'perks', note: "Perk cadence skips reward levels — they're free 'rest' levels." },
      { slug: 'asset-sell-block', note: "Reward vehicles can't be sold — the museum doctrine applies to them too." }
    ],
    summary:
      "Reaching certain Prestige levels delivers vehicles, headers, trailers, and tools to the dealer's spawn pad — free, fully configured, and registered to your farm before you set foot in the shop. Not every level has a reward; the list is hand-picked and uneven on purpose. The valley does not promote you on a schedule. They send what they think you can use, when they think you have earned it.",
    whatItDoes: [
      "Delivers preconfigured equipment to the dealer's spawn pad at specific Prestige levels, free of charge. Each delivery shows up where a normal purchase would, already tied to your farm.",
      "Some levels deliver a single item; others deliver a bundle. The L20 level drops a Case IH Axial-Flow 7160 combine paired with its 3050 TerraFlex header. The L100 level drops the AF11 combine plus its FD250 FlexDraper header.",
      "Every reward in the shipped Supply Chain is a vanilla Farming Simulator 25 storeItem — no extra mods required.",
      "Reward levels are invisible to the Perks rotation. They do not grant a perk and do not count as a 'skip,' so the perk cadence keeps moving past them. A reward level is effectively a free rest level — equipment instead of a perk.",
      "Catch-up on load: when a save loads, any reward level at or below your current Prestige that has not been claimed yet will be delivered. The Supply Chain can grow in future updates without skipping rewards on existing saves.",
      "Once delivered, reward vehicles obey the same museum rule as everything else you own — they cannot be sold."
    ],
    whyItMatters:
      "FarmPunk forces every major piece of equipment through financing — leasing is dead, down payments are real, and bad purchases stay parked in your shed forever. The Rebel Supply Chain is the one channel where serious gear shows up without a loan, without a surcharge, and without the Cartel's signature on the paperwork. A free combine, a free articulated tractor, a free grain cart — these are the tools that let a working farm punch above its credit rating. It is also one of the only places in FarmPunk where the game hands you something outright instead of charging for it.",
    howYouProgress: [
      "Climb Prestige. The reward levels are 3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 75, and 100 — every level on that list delivers something.",
      "After a level-up, walk to the dealer's spawn pad. The reward will already be there, fully configured, registered to your farm. The HUD card on level-up tells you what was delivered.",
      "Do not sell what you cannot replace. Reward vehicles cannot be unloaded — once they arrive, they are part of your collection until the end of the save.",
      "Treat bundled rewards as bundles. Some levels deliver a harvester paired with its specific header (L20, L100). Selling them apart is not an option anyway — the museum rule covers reward vehicles too."
    ],
    importantNumbers: [
      { label: 'L3', value: 'Zetor PROXIMA HS — compact tractor with front loader' },
      { label: 'L5', value: 'Claas ARION 570-530 — mid tractor with front loader' },
      { label: 'L10', value: 'Mack Anthem 6x4 — semi truck, black' },
      { label: 'L15', value: 'Deutz-Fahr Series 8 TTV — large tractor' },
      { label: 'L20', value: 'Case IH Axial-Flow 7160 + 3050 TerraFlex 28FT header' },
      { label: 'L25', value: 'Lode King Prestige Super-B — grain trailer' },
      { label: 'L30', value: 'New Holland T8 GENESIS Series — large tractor' },
      { label: 'L35', value: "Elmer's HaulMaster — grain cart" },
      { label: 'L40', value: 'Väderstad NZ Extreme 1425 — seedbed cultivator' },
      { label: 'L45', value: 'John Deere CP690 — cotton picker' },
      { label: 'L50', value: 'John Deere 9RX Series 710-830 — articulated tracked tractor' },
      { label: 'L75', value: 'Pöttinger ROTOCARE V 12400 — rotary hoe' },
      { label: 'L100', value: 'Case IH AF11 combine + FD250 FlexDraper header' },
      { label: 'Total levels with rewards', value: '13' },
      { label: 'Sellable', value: 'No. Reward vehicles are permanent like every other purchase.' }
    ],
    beginnerAdvice: [
      "The first three rewards (L3, L5, L10) come fast and matter — the early tractors and semi truck are real upgrades for a farm still running on starter equipment. Keep an eye on the dealer's pad.",
      "Multi-item levels deliver every piece in the bundle. The L20 and L100 levels are designed to drop both items at once.",
      "If you load a save on a newer version of FarmPunk and a level you already crossed was not in the Supply Chain before, you will get the reward on map load. Older saves do not miss out on new entries.",
      "Do not expect a reward at every level-up. The Supply Chain skips most levels. The next reward level, not the next level, is what to plan around."
    ],
    consoleCommands: [
      { cmd: 'farmPunkRewards', note: "Read-only. Prints the full Supply Chain: each level's reward name, status (CLAIMED / PENDING / LOCKED), and source path." },
      { cmd: 'farmPunkClaimReward <level>', note: 'Force-claim a reward for testing. Bypasses the Prestige-level gate but still respects the once-per-save claim flag.' },
      { cmd: 'farmPunkResetReward <level>', note: "Clear a level's claimed flag so it becomes claimable again. Does not despawn or remove anything that was already delivered." }
    ],
    fieldNote:
      "The Cartel mails you bills. The valley sends you a tractor."
  },
  {
    slug: 'farmer-titles',
    category: 'RPG',
    title: 'Farmer Titles',
    oneLiner:
      "Farmer Titles are what the valley calls you as your reputation grows, from another operator in the dirt to a name the Cartel cannot ignore. They do not change the math — they mark how far you have climbed in a world that was built to keep you small.",
    status: 'live',
    href: '/field-manual/farmer-titles',
    version: VERSION,
    related: [
      { slug: 'farmer-prestige', note: 'Title is purely a derived display from your current prestige level.' }
    ],
    summary:
      "Titles are the names the valley uses for you as your Prestige climbs. They do not change yields, prices, or fees — they are flavor, not bonus. But they mark how far you have come in a world built to keep you small, and they are how anyone reading your save's stats line knows whether you are a debt farmer holding on or a rebel baron the Cartel can no longer ignore.",
    whatItDoes: [
      "Assigns one of six titles based on your current Prestige level. The title updates the moment you cross a band threshold.",
      "Has no mechanical effect — yields, prices, taxes, and Cartel pressure ignore the title entirely. Titles do not grant perks; perks do that on their own track.",
      "Surfaces in the farmer stats summary line. As of this version, that is the title's primary appearance — future surfaces will pull from the same source.",
      "Recomputed on the fly from your live Prestige level. There is no separate ledger to corrupt and no migration needed when the bands are retuned in a future update."
    ],
    whyItMatters:
      "Most progression in FarmPunk comes with a number attached — yield, price, fame, scrip, dollars saved on a tax bill. Titles are deliberately not that. They are the long-term mood meter of the run, the marker that turns a save from 'a small farm trying to survive' into 'the operation in the corner of the map that the Cartel is starting to take seriously.' Crossing into a new title is also a rough proxy for which Black Markets have opened, which perks have likely fired, and which reward vehicles are already in your shed — the band thresholds line up with the major shifts in what your farm can do.",
    howYouProgress: [
      "Climb Prestige. There is no other input — every title is a direct read off the current Prestige level.",
      "Do not farm for the title itself. The title appears the instant you cross the band threshold; chasing the band only makes sense as a side effect of chasing the perks and rewards on those levels.",
      "Use the band as a planning rule of thumb. Field Serf is the survival window. Debt Farmer is when the valley starts noticing. Dirt Owner means you have a real operation. Farm Operator is high-mid game. Land Boss is endgame approach. Rebel Baron is everything past L50, including the L75 and L100 rewards."
    ],
    importantNumbers: [
      { label: 'L0 – L9', value: 'Field Serf' },
      { label: 'L10 – L19', value: 'Debt Farmer' },
      { label: 'L20 – L29', value: 'Dirt Owner' },
      { label: 'L30 – L39', value: 'Farm Operator' },
      { label: 'L40 – L49', value: 'Land Boss' },
      { label: 'L50+', value: 'Rebel Baron' },
      { label: 'Mechanical effect', value: 'None. Pure honorific.' },
      { label: 'Persisted state', value: 'None. Recomputed live from Prestige.' }
    ],
    beginnerAdvice: [
      "Field Serf is not an insult — it is the first ten levels of every save. Almost every farmer who ever ran the valley started here.",
      "When you cross into Debt Farmer (L10), the Off-Book Black Market tier opens up. The title and the unlock land at the same Prestige level, which is part of the design.",
      "If you load a save and the title does not match what you expected, check `farmPunkMastery` for your real Prestige level — the title is just a read-off, so the level is the truth."
    ],
    consoleCommands: [
      { cmd: 'farmPunkStats', note: 'Read-only. Prints your current title plus year-over-year revenue, expenditure, profit, and 3-year average.' },
      { cmd: 'farmPunkMastery', note: 'Read-only. Shows the Prestige level your title is derived from, plus per-crop mastery.' }
    ],
    fieldNote:
      "Field Serf was the line on the Cartel's intake form. Rebel Baron is the line they refuse to write."
  },
  {
    slug: 'vehicle-storage',
    category: 'RPG',
    title: 'Vehicle Storage Enforcement',
    oneLiner:
      'The weather is cruel, the nights are worse, and exposed gear does not stay untouched for long. Store vehicles in sheds or garages to protect them from damage, vandals, and thieves looking to turn your machinery into someone else’s payday.',
    status: 'live',
    href: '/field-manual/vehicle-storage',
    version: VERSION,
    related: [
      { slug: 'cartel-attacks', note: "Goon Visit wrecks one tractor regardless of shelter — the only attack that ignores storage." },
      { slug: 'skills', note: "Maintenance skill slows vehicle wear, but doesn't prevent exposure damage." },
      { slug: 'perks', note: 'Insurance Policy refunds part of theft loss. Guard Dogs lowers vandal/theft chance.' },
      { slug: 'weather', note: 'Bad-weather years amplify exposure damage.' }
    ],
    summary:
      "FarmPunk's outdoors is hostile in a way the base game's is not. Equipment left in the open takes weather damage every month, draws vandals, draws thieves, and occasionally just disappears. Sheds and garages are not cosmetic — they are a system you opt into the moment you buy your first piece of equipment. Park inside, and most of the pressure goes away. Park outside, and the field will start sending you reminders.",
    whatItDoes: [
      "Every in-game month, walks through your owned equipment and checks which pieces are sitting outside a shed. The shed itself is the only protection — sheds, barns, and garages with the right placeable category count; an animal pen with a roof does not.",
      "Wear: every exposed vehicle and implement takes +5% damage per month, capped at fully wrecked. The Maintenance skill does not slow this down — knowing how to fix a tractor does not stop hail and rust from finding it.",
      "Vehicle event: a single monthly roll. 85% chance nothing happens, 10% chance vandals strip the most valuable exposed piece down to wrecked condition, 5% chance thieves take the most valuable exposed piece outright and it is gone for good.",
      "Vandal cascade: when vandals show up, they start with the top-value target and roll for additional victims — a 1-in-2 chance for the second piece, 1-in-3 for the third, 1-in-4 for the fourth, and so on. The expected number of pieces hit per visit is around 1.7. A bad night can lose you several machines.",
      "Theft permanently deletes the equipment. No cash recovered by default. Anything attached to the stolen vehicle (header, plow, trailer, weight) detaches and survives — they can only carry off one chassis.",
      "Pallet event: a separate monthly roll, independent of the vehicle event. 33% chance pallet thieves come through. If they do, they always take one pallet, then roll a 1-in-2 for a second, 1-in-2 for a third, and so on. Average around two items per visit. Bales, fuel in tanks, and trailer fill levels are never targeted — these are dumb thieves.",
      "Damage cutoff: equipment already at 80% damage or worse is invisible to vandals and thieves. The Cartel does not bother with broken-down crap. Wear still applies regardless.",
      "Empty-handed flavor: when an event rolls but every eligible piece is sheltered, the HUD still tells you. 'Vandals came prowling but found nothing worth wrecking' is its own small reward."
    ],
    whyItMatters:
      "Once the farm starts holding seven-figure equipment, an unlucky theft roll on an exposed combine can erase a year of work. Vandalism is recoverable; theft is not. Sheds turn the whole system off for whatever is parked inside, which is why shed coverage is one of the first major investments a serious FarmPunk save makes. The Goon Visit Cartel attack is the only damage event in the game that ignores shelter — everything else, sheltering solves. Building enough indoor space to fit your full operation is the difference between a year of growth and a year spent reordering machines.",
    howYouProgress: [
      "Buy or place a shed (or barn, or garage) early. Any placeable categorized as a shed counts. Cow barns and animal pens do not, even if the model has a roof.",
      "Park your highest-value equipment indoors first. The vehicle event always targets the most valuable exposed piece — a sheltered combine is a thieves' deal that never happens.",
      "Run `farmPunkShelterCheck` after rearranging the lot. It lists every owned vehicle as either sheltered (with the shed name) or exposed.",
      "Pick up the Guard Dogs perk as it appears on the Prestige rotation. Each occurrence shaves vandal and theft chance off the monthly roll. Fully perked at 8 occurrences, the spread shifts from 85/10/5 to 97/2/1.",
      "Pick up the Insurance Policy perk for theft cover. Each occurrence refunds 25% of the stolen vehicle's sell price. At the cap of 3, that is a 75% refund. Equipment only — pallets, big bags, and IBCs are not covered.",
      "Plan around bad-weather years. Some weather patterns add to the per-month exposure damage. The Forecasting Leveraging perk softens favorable weather but cannot reverse adverse mods."
    ],
    importantNumbers: [
      { label: 'Wear per exposed piece per month', value: '+5% damage (capped at fully wrecked)' },
      { label: 'Maintenance skill effect on exposure wear', value: 'None. Maintenance does not slow it.' },
      { label: 'Vehicle event roll', value: '85% nothing · 10% vandals · 5% theft (mutually exclusive)' },
      { label: 'Vandal cascade', value: '1st piece always, then 1/2, 1/3, 1/4, … for additional pieces' },
      { label: 'Expected vandal victims per visit', value: '≈ 1.7' },
      { label: 'Theft', value: 'Most valuable exposed piece, deleted forever' },
      { label: 'Damage immunity threshold', value: '≥80% damage = invisible to vandals and thieves' },
      { label: 'Pallet event roll', value: '33% chance per month' },
      { label: 'Pallet event count', value: '1 always, then 1/2, 1/2, … for additional pallets (avg ≈ 2)' },
      { label: 'Pallet scope', value: 'Pallets, big bags, big-bag pallets, IBCs. Bales / fuel / trailer fills excluded.' },
      { label: 'Guard Dogs cap (8 occurrences)', value: 'Spread shifts from 85/10/5 to 97/2/1' },
      { label: 'Insurance Policy cap (3 occurrences)', value: "75% refund of stolen vehicle's sell price" },
      { label: 'Goon Visit (Cartel attack)', value: "Wrecks one tractor regardless of shelter — the only attack shelter can't block" }
    ],
    beginnerAdvice: [
      "Do not store anything you care about outside. The 5% theft chance every month sounds small until you do the math over a 12-month year on a $400,000 combine.",
      "Old, beat-up starter equipment is safer parked outside than a new combine — anything past 80% damage is not on the menu. Use that, but do not rely on it.",
      "Shed coverage is the cheapest insurance in the game. Pallets included — pallet thieves hit unsheltered pallets too, so a small pallet shed earns its cost back fast.",
      "Empty-handed messages mean the system rolled an attack and your sheds blocked it. Each one is a reminder that the cost of the shed already paid for itself."
    ],
    consoleCommands: [
      { cmd: 'farmPunkShelterCheck', note: 'Read-only. Lists every owned vehicle as sheltered (with shed name) or exposed, plus a sheltered/exposed tally.' },
      { cmd: 'farmPunkStorageStatus', note: 'Read-only preview. Shows exposed equipment ranked by sell price with the vandal cascade rank, exposed pallets, total Wearables, current event odds, and the damage threshold. No rolls fired.' },
      { cmd: 'farmPunkForceStorage', note: 'Manually trigger a storage tick now (wear pass + vehicle event + consumable event). Testing tool.' }
    ],
    fieldNote:
      "The shed is not for the tractor's sake. It's for the part of the valley that learned, a generation ago, that an exposed combine after midnight is everyone's combine."
  }
];

// ── Live systems with custom-rendered pages ─────────────────────
export const CUSTOM_PAGES: CatalogEntry[] = [
  {
    slug: 'skills',
    category: 'RPG',
    title: 'Manager Skill Tree',
    oneLiner: "The Manager Skill Tree turns scrip into personal development, training, favors, and hard-earned expertise that make you better at running the farm. Seventeen skills with ten levels each improve everything from yields and prices to loans, wear, weather, and storage — because the Cartel can tax your land, but it cannot repossess what you know.",
    status: 'live',
    href: '/field-manual/skills',
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
    oneLiner: "Farmer Prestige Perks represent what happens when the valley learns your name and the Cartel starts saying it through clenched teeth. As your reputation grows, twelve repeating bonuses unlock automatically, turning fame, trust, notoriety, and local momentum into real advantages.",
    status: 'live',
    href: '/field-manual/perks',
    version: VERSION,
    related: [
      { slug: 'farmer-prestige', note: 'Perks unlock automatically as Prestige levels up.' },
      { slug: 'rebel-supply-chain', note: "Reward levels are skipped by perk cadence — they're free 'rest' levels." },
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
    oneLiner: "Cartel Attacks are the yearly price of becoming dangerous: license revocations, smear campaigns, rate hikes, audits, goon visits, silo poisoning, and every other trick they use to keep farmers small. Buying shares makes them angrier, but funding the Reclamation Warchest dulls their teeth before the damage lands.",
    status: 'live',
    href: '/field-manual/cartel-attacks',
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
    oneLiner: "Black Markets are off-the-books crop orders from private buyers who know the Cartel is not the only game in the valley. They reroll every March across five tiers, paying cash, scrip, and Prestige at once — and the more famous you become, the better the buyers willing to risk dealing with you.",
    status: 'live',
    href: '/black-markets',
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
  // Resistance
  {
    slug: 'shares', category: 'Resistance', title: 'Shares',
    oneLiner: "The Cartel starts every run holding 100 shares of your farm, and buying them back with scrip is how you claw your family’s future out of their ledger. Every share weakens their control and makes them angrier, so keep the Reclamation Warchest funded before they turn your ownership push into a war.",
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
    oneLiner: "The Cartel built the dividend system so absentee owners, banks, and corporate partners could skim annual value from farms they never worked. When you buy shares, you force your name into that same ledger, redirecting part of the extraction pipeline back to the farmer. Dividends are not charity — they are the Cartel’s own machine turned against them.",
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
    oneLiner: "Crop Licensing is the Cartel’s way of deciding how much of each crop you are allowed to sell before they crush the price. Upgrade licenses with scrip to raise your annual caps, because anything sold past the line gets punished hard — unapproved abundance is still disobedience.",
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
    oneLiner: "The Crop Novelty Bonus rewards farmers who keep the market guessing instead of feeding the Cartel the same predictable harvest every year. Crops you skipped last year sell for more, and crops absent for five years hit even harder — rotation is not just soil sense, it is market misdirection.",
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
    oneLiner: "Crop Spoilage makes hoarding dangerous: every month, stored grain rots, leaks, or disappears into whatever lives in the silo walls. Skills can slow the loss, but bad weather and Cartel poisoning can turn patience into rot — sell with a plan before the rats collect their dividend.",
    status: 'pending', version: VERSION,
    related: [
      { slug: 'skills', note: 'Spoilage Immunity skill reduces the monthly rot rate.' },
      { slug: 'weather', note: 'Bad-weather years can add to the spoilage rate.' },
      { slug: 'cartel-attacks', note: 'Crop Poisoning is a separate one-shot raid on a single silo.' }
    ]
  },
  {
    slug: 'weather', category: 'Production', title: 'Weather System',
    oneLiner: "The Weather System turns each year into a sentence the sky hands down: forty-five patterns across five rarity tiers, from common drizzle to once-a-decade dust storms. One pattern locks in for the full year, forcing you to plan crops, storage, hauling, and survival around whatever the season decides to become.",
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
    oneLiner: "Annual Taxes hit every February as the county takes its cut on your equipment and land, with acreage getting brutally more expensive as your footprint grows. Prestige Perks can soften the bill, because once the valley knows your name, even local tax collectors start finding reasons to treat you like someone worth keeping alive.",
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
    oneLiner: "The Cartel killed leasing because temporary access gives farmers too much flexibility and too little leverage for the banks. Every major purchase is forced through financing so expansion means debt, paperwork, interest, and another hook in your operation. You can still grow — but every machine you buy comes with someone else’s hand on the ledger.",
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
    oneLiner: "A ceiling on how much total debt the Cartel will let you carry, calculated from your land value, equipment value, and current cash balance.",
    status: 'pending', version: VERSION,
    related: [
      { slug: 'mandatory-financing', note: 'All financed purchases check the cap.' },
      { slug: 'perks', note: 'Generous Banker perk boosts both multipliers.' },
      { slug: 'cash-reserve', note: 'Both gate purchases — cap is about total debt; reserve is about post-payment liquidity.' }
    ]
  },
  {
    slug: 'credit-rating', category: 'Money', title: 'Credit Rating F→A',
    oneLiner: "Your credit rating is the bank’s leash: a letter grade from F to A that rises when you survive a clean year and falls when missed bills, fees, or loan payments push you below zero. Better ratings unlock better rates on new loans, but every bad year gives the lenders another excuse to tighten the trap.",
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
    oneLiner: "The Emergency Credit Line is the old bank’s last-resort money: capped at $50,000 and charged at triple the rate of proper equipment financing. Use it only when the bills are due, the machines are broken, and you have no cleaner way to survive the gap.",
    status: 'pending', version: VERSION,
    related: [
      { slug: 'credit-rating', note: 'Vanilla interest deductions can push you negative and downgrade your rating.' },
      { slug: 'mandatory-financing', note: 'Vanilla is a separate emergency channel — runs in parallel to FarmPunk financing.' },
      { slug: 'perks', note: 'Super Payday Advance perk raises the vanilla cap.' }
    ]
  },
  {
    slug: 'cash-reserve', category: 'Money', title: 'Minimum Cash Reserve',
    oneLiner: "The Cartel will not approve a financed purchase unless you still have three months of loan and tax pressure sitting in reserve after the down payment. Fall below that line and the deal is blocked — not because they want you safe, but because they want you desperate without letting the ledger break.",
    status: 'pending', version: VERSION,
    related: [
      { slug: 'mandatory-financing', note: 'Reserve gates every financed purchase.' },
      { slug: 'debt-cap', note: 'Both are pre-purchase gates — debt cap on total debt, reserve on liquidity.' }
    ]
  },
  {
    slug: 'farmland-surcharge', category: 'Money', title: 'Farmland Surcharge',
    oneLiner: "The Farmland Surcharge is the Cartel’s anti-expansion tax, climbing from 2% on your first plot to 40% as your acreage grows. Your first field is tolerated; your tenth is punished. The Cartel does not want farmers consolidating land, and every acre you reclaim makes the next one more expensive.",
    status: 'pending', version: VERSION,
    related: [
      { slug: 'mandatory-financing', note: 'Land buys run through the same financing flow plus this surcharge.' },
      { slug: 'perks', note: 'Negotiator perk reduces the surcharge by up to 30%.' },
      { slug: 'skills', note: 'Land BOGO skill discounts land prices, applied before the surcharge calc.' }
    ]
  },
  {
    slug: 'profit-tracking', category: 'Money', title: 'Annual Profit & Expenditure Tracking',
    oneLiner: "The Profit Ledger tracks what the farm earns, what it spends, and how much value the Cartel thinks it can squeeze from the year. It drives your year-end scrip bonus, fee pressure, and dividend growth — but Warchest deposits stay off the books, because the rebellion is funded by the farmer, not the farm.",
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
    oneLiner: "Scrip is the farmer’s private leverage, kept separate from farm cash and impossible to launder back into the operation. It flows through the systems the Cartel cannot fully price in — skills, share buybacks, license upgrades, and Black Market work — then pays out each year as a small salary plus a profit-based bonus for surviving the ledger.",
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
    oneLiner: "The Cartel locks every vehicle, building, and acre into your operation the moment you buy it, turning bad purchases into permanent weight. Backroom Dealers is the only escape hatch, and even then you only get a few quiet sales a year — so buy like you mean it, because you might be building a museum with working hydraulics.",
    status: 'pending', version: VERSION,
    related: [
      { slug: 'perks', note: 'Backroom Dealers perk is the only way around it — N sells per year.' },
      { slug: 'rebel-supply-chain', note: "Reward vehicles can't be sold either — museum doctrine applies." }
    ]
  },
  {
    slug: 'no-generators', category: 'Money', title: 'No Generators',
    oneLiner: "The Cartel refuses permits for solar panels and wind turbines, keeping passive income and off-grid independence locked out of reach. They keep the meter, they keep the bill, and they make sure every dollar you earn still comes from work they can pressure.",
    status: 'pending', version: VERSION,
    related: []
  }
];

// ── Combined catalog for the Field Manual index ─────────────────
export const ALL_CATALOG: CatalogEntry[] = [...MECHANICS, ...CUSTOM_PAGES, ...STUBS];

const CUSTOM_PAGE_SLUGS = new Set(CUSTOM_PAGES.map(c => c.slug));
export function isCustomPage(slug: string): boolean {
  return CUSTOM_PAGE_SLUGS.has(slug);
}

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
  17 + 12 + 10 + ALL_CATALOG.filter(e => !CUSTOM_PAGE_SLUGS.has(e.slug)).length;
