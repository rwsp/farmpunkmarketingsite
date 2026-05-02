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
    slug: 'valley-liberation',
    category: 'RPG',
    title: 'Valley Liberation',
    oneLiner:
      "FarmPunk has two endgame requirements. Buy back all 100 of the Cartel's shares to break their grip on your farm. Fill the Reclamation Warchest with $1 billion to bankroll the rest of the valley's fight. They're designed to pressure each other into balance, and you'll need both to win.",
    status: 'live',
    href: '/field-manual/valley-liberation',
    version: VERSION,
    related: [
      { slug: 'shares', note: 'One half of Valley Liberation. 100 shares = 100% off the franchise fee.' },
      { slug: 'reclamation-warchest', note: 'The other half. $1B in the Warchest = the valley is funded.' },
      { slug: 'cartel-franchise-fee', note: 'Shares exist to escape this. 100 shares zeros it out.' },
      { slug: 'cartel-attacks', note: 'More shares = angrier Cartel. The Warchest is the counterweight.' },
      { slug: 'farmer-prestige', note: "Doesn't directly affect the win, but unlocks vehicles and perks that help you reach it." }
    ],
    summary:
      "FarmPunk isn't about getting rich. It's about taking back what was stolen. The Cartel didn't beat your family with one weapon — they used debt, contracts, taxes, franchise fees, market control, and fear. Reclaiming the valley means beating them on both fronts: ownership and resistance. Valley Liberation has two halves. You need both.",
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
      "Don't panic about Valley Liberation early. The first 5–10 in-game years are about surviving and growing. Shares come on the table once your 3-year average revenue hits $50,000.",
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
      { slug: 'credit-rating', note: 'A franchise fee that pushes your balance negative triggers a credit downgrade.' }
    ],
    summary:
      "Once a year the Cartel mails you a bill for the privilege of farming land they say you lease from them. The fee scales up with every dollar that crossed your scales that year, and the only thing that ever brings it down is owning a piece of the same company that's collecting it. Pay it long enough and you're paying them rent on your own dirt. Buy enough shares and the bill still arrives — stamped zero. The Cartel never stops sending it. You just stop owing it.",
    whatItDoes: [
      "Hits once a year, every February. A big red HUD card shows the breakdown: how much you took in, what the bill would have been, how much your shares saved you, and the final amount the Cartel takes out of your farm cash. There's no payment plan and no negotiating — it comes out in one lump sum.",
      "The fee is based on every dollar that came into your farm that year — crop sales, contracts, dividends, all of it. It is NOT based on profit. The Cartel doesn't care what you spent on seed, diesel, or a new tractor. They only care what your scales weighed.",
      "Bigger years cost more per dollar, not just more dollars. The fee uses brackets, the same way income tax does: your first $50,000 of revenue is untaxed, then each chunk above that is charged at a higher rate. Only the dollars sitting inside a higher bracket pay the higher rate — the dollars below stay at the lower rate. The exact brackets are in the Important Numbers section.",
      "Every share you own knocks 1% off the final bill, forever. Five shares = 5% off. Fifty shares = half off. A hundred shares = the bill arrives at zero, every year, no matter how much you earned. Shares are the only thing in the entire game that reduces this fee.",
      "The fee comes out of farm cash and counts as a business expense for the year. If it pushes your balance below zero, your credit rating takes a downgrade hit — the same way any other transaction would if it left you in the red."
    ],
    whyItMatters:
      "This is the biggest single expense in the game. It's also the only meaningful reason to buy shares — every share you own is a permanent cut to the bill, forever. The fee scales faster than revenue, so the more you grow, the harder the Cartel squeezes.",
    howYouProgress: [
      "Earn enough to survive the bill before it arrives. The fee isn't going away — your job in the early years is to make sure you have cash on hand in February. You can preview the exact bill at any point in the year from the console (see below) so it never catches you off guard.",
      "Buy shares to make the bill smaller forever. Each share bought with scrip permanently knocks 1% off every future fee. There is no perk, skill, or clever trick that does the same thing — shares are the only escape valve.",
      "You can only buy a few shares per year, and how many depends on your three-year average revenue. Big years unlock the right to buy more shares the following year, even though those big years also mean a bigger fee. You're trading short-term pain for permanent relief. Grow the farm → unlock the next tier → buy shares → next year's bite is a little smaller. That's the loop.",
      "The closer you get to 100 shares, the angrier the Cartel gets and the harder they hit you with attacks. Fill the Reclamation Warchest as you climb — it's your only defense against the harassment that comes with reclaiming the farm."
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
      "This is the single biggest expense in the game. Plan your year so you have cash on hand in February — don't drain your account on a shiny new combine in January and find out you can't pay the Cartel.",
      "The fee is based on revenue, not profit. Buying expensive gear to make your books look smaller does nothing here. The Cartel sees what your scales weighed, not what you spent. Don't try to outsmart the bill — save for it.",
      "Dividends pay in farm cash and land in the same February tick, right after the fee. A solid dividend tier softens the blow — the Cartel ends up paying you back through the same paperwork they used to bill you. See the Dividends page for the details.",
      "Don't be surprised. You can preview exactly what the bill will be at any time from the console (see below). Check it before any big purchase, and check it again before the year flips."
    ],
    consoleCommands: [
      { cmd: 'farmPunkFranchiseFee', note: "Preview the current year's fee with bracket-by-bracket breakdown. Read-only." },
      { cmd: 'farmPunkForceShares <delta>', note: 'Testing — add or remove shares without spending scrip.' },
      { cmd: 'farmPunkForceFranchiseFund <delta>', note: 'Testing — bump lifetime fees to unlock a dividend tier.' }
    ],
    fieldNote:
      "Funny thing about the Cartel's franchise fee: at first they charge you for breathing, then later the same paperwork proves they owe you for the air."
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
      "The Reclamation Warchest is a one-way fund for the valley’s fight, bankrolling the people and networks pushing back against the Cartel’s grip. Filling it is half of Valley Liberation, and every dollar sabotages their hostilities.",
    status: 'live',
    href: '/field-manual/reclamation-warchest',
    version: VERSION,
    related: [
      { slug: 'cartel-attacks', note: "Every $10M in the Warchest cancels one share's worth of Cartel anger." },
      { slug: 'shares', note: 'The other half of Valley Liberation. Shares + Warchest = reclamation.' },
      { slug: 'valley-liberation', note: 'Filling the Warchest to $1B is half of Valley Liberation.' }
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
      "The Warchest does two big jobs. First, it's your only real defense against the Cartel as you start buying back shares — without it, owning 100 shares means peak harassment, four attacks a year on average. Second, filling it to $1 billion is one of the two halves of Valley Liberation (the other is owning all 100 shares). You can't win FarmPunk without it.",
    howYouProgress: [
      "Deposit whenever the farm has spare cash. There's no minimum, no maximum, no schedule.",
      "Try to deposit before each March (the year flip), since that's when the Cartel rolls its annual attacks. A bigger Warchest at that moment means fewer attacks for the year.",
      "Hitting $1 billion fires a big CRITICAL Valley Liberation card. If you also own all 100 shares, you've reclaimed the valley."
    ],
    importantNumbers: [
      { label: 'Cap (Valley Liberation)', value: '$1,000,000,000' },
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
      { slug: 'black-markets', note: 'Higher tier markets gate on prestige.' },
      { slug: 'valley-liberation', note: "Doesn't directly affect the win, but unlocks the perks + rewards that help you reach it." }
    ],
    summary:
      "Prestige is a single global reputation level that climbs every time you sell crops. It is the line under your name in the valley's quiet ledger — every liter through the scales counts, no matter what crop, what station, or what year. Mastery is per-crop. Prestige is everywhere. The number does not go down, does not reset between years or saves, and has no ceiling. It is the slow background measure of how serious a farmer you have become.",
    whatItDoes: [
      "Tracks one global level driven by total liters sold across every harvestable crop. One liter sold = one point of Prestige fame, regardless of which crop, which station, or which year.",
      "Levels up automatically as you cross fame thresholds. The first level takes 24,000 liters; each level after that costs 10% more fame than the last.",
      "Has no level cap and never resets. Prestige keeps climbing across years and across saves — once you have earned a level, it is yours.",
      "Drives two downstream systems: the Rebel Supply Chain (machines, parts, and trailers quietly redirected onto your dealer's pad as the valley starts betting on you) and Farmer Prestige Perks (a rotating set of recurring bonuses unlocked on every level-up).",
      "Also assigns you a title that updates as your level climbs — Field Serf at L0–9, Debt Farmer at L10–19, Dirt Owner at L20–29, Farm Operator at L30–39, Land Boss at L40–49, Rebel Baron from L50 on. The title is pure flavor: it shows up in your stats line and on the perks summary, but does not change yields, prices, fees, or Cartel pressure.",
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
      { label: 'Titles by level', value: 'L0–9 Field Serf · L10–19 Debt Farmer · L20–29 Dirt Owner · L30–39 Farm Operator · L40–49 Land Boss · L50+ Rebel Baron' },
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
    slug: 'rust-and-raiders',
    category: 'RPG',
    title: 'Rust and Raiders',
    oneLiner:
      'The weather is cruel, the nights are worse, and exposed gear does not stay untouched for long. Store vehicles in sheds or garages to protect them from damage, vandals, and thieves looking to turn your machinery into someone else’s payday.',
    status: 'live',
    href: '/field-manual/rust-and-raiders',
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
      "Damage cutoff: equipment already at 80% damage or worse is invisible to vandals and thieves. These dummies only care about shiny stuff. Wear still applies regardless.",
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
      "Old, beat-up starter equipment is safer parked outside than a new combine — anything past 80% damage is not on the menu.",
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
  },
  {
    slug: 'shares',
    category: 'Resistance',
    title: 'Shares',
    oneLiner:
      "The Cartel starts every run holding 100 shares of your farm, and buying them back with scrip is how you claw your family's future out of their ledger. Every share weakens their control and makes them angrier, so keep the Reclamation Warchest funded before they turn your ownership push into a war.",
    status: 'live',
    href: '/field-manual/shares',
    version: VERSION,
    related: [
      { slug: 'cartel-franchise-fee', note: 'Each share knocks 1% off the fee. The only way to reduce it.' },
      { slug: 'dividends', note: 'Each share earns annual dividends in farm cash.' },
      { slug: 'cartel-attacks', note: 'Buying shares makes the Cartel angrier — pressure scales linearly.' },
      { slug: 'reclamation-warchest', note: 'Owning shares without funding the Warchest = peak harassment.' },
      { slug: 'valley-liberation', note: 'Owning all 100 = half the win.' },
      { slug: 'wallet-scrip', note: 'Shares are bought with scrip from your farmer wallet, not farm cash.' }
    ],
    summary:
      "The Cartel doesn't pretend the farm is theirs by accident — they hold the paperwork that says it is, dressed up as a hundred shares of legal ownership. Every share you buy back is a piece of that paperwork going through the shredder. Shares are bought with scrip from your wallet, not farm cash, and they don't get cheaper as you go. The closer you get to owning your own farm, the more your remaining ownership is worth — and the more the Cartel charges you to take the next slice.",
    whatItDoes: [
      "Tracks how many of the Cartel's 100 shares of your farm you have reclaimed. The first 99 are paperwork; the hundredth ends the franchise agreement entirely.",
      "Bought with scrip from your farmer wallet — not farm cash. Scrip comes from your year-end salary and bonus, skill economy, and Black Market completions.",
      "Each share permanently knocks 1% off the Cartel Franchise Extortion Fee. At 100 shares the fee is zero, every year, forever.",
      "Each share you own pays an annual dividend in farm cash at year-end (see Dividends), regardless of how the year went.",
      "Each share you own also makes the Cartel angrier. Pressure scales linearly with share count, and the Reclamation Warchest is the only counterweight (see Cartel Attacks)."
    ],
    whyItMatters:
      "Shares are the only door out of the Cartel's franchise agreement. Every other system in FarmPunk lets you survive the squeeze a little better — better licenses, better skills, better rates — but only shares actually shrink the bill that defines the squeeze. They are slow to come (gated by your three-year average revenue) and brutally back-loaded in cost (each one bought makes the next one more expensive), so reaching 100 is a multi-year arc, not a buying spree. And every share you reclaim costs the Cartel a piece of their leverage, which is exactly why they hit harder the closer you get.",
    howYouProgress: [
      "Hit the eligibility floor. Once your three-year average revenue clears $50,000 — the same line the Cartel uses to start charging the franchise fee — you can buy your first share that year. Higher revenue brackets unlock more shares per year, up to five at the top tier.",
      "Save scrip. Shares cost scrip, not farm cash, so the path to ownership runs through your wallet — year-end bonuses, skill-tree planning, and Black Market completions are all funnels into the same pile.",
      "Pace your buys. Each share you already own makes the next one 10% more expensive in the price formula, and stacking multiple buys in the same year multiplies the cost again (1× the first, 1.5× the second, 2× the third, and so on). Going hard in a single year burns scrip much faster than spreading purchases across years.",
      "Fund the Warchest in lockstep. Every share you reclaim makes the Cartel measurably angrier. Without Warchest deposits, owning all 100 shares means peak harassment — roughly four attacks a year on average. Every $10 million in the Warchest cancels one share's worth of pressure (see Cartel Attacks)."
    ],
    importantNumbers: [
      { label: 'Total shares', value: '100' },
      { label: 'Reduction per share', value: '1% off the Cartel Franchise Extortion Fee, forever' },
      { label: 'Bought with', value: 'Scrip (from the farmer wallet, not farm cash)' },
      { label: 'Eligibility floor', value: '3-year average revenue ≥ $50,000' },
      { label: 'Per-year purchase counter resets', value: 'March (period 1)' },
      { label: '$50k – $250k revenue → max shares/year', value: '1' },
      { label: '$250k – $500k revenue → max shares/year', value: '2' },
      { label: '$500k – $1M revenue → max shares/year', value: '3' },
      { label: '$1M – $5M revenue → max shares/year', value: '4' },
      { label: '$5M+ revenue → max shares/year', value: '5' },
      { label: 'Farm value (for pricing)', value: 'land + cash + (equipment × 0.5) − total debt' },
      { label: 'Base share price', value: 'farm value ÷ 100' },
      { label: 'Ownership premium', value: '+10% on the base price for every share already owned' },
      { label: 'Within-year multiplier', value: '1× first share this year, 1.5× second, 2× third, 2.5× fourth, …' },
      { label: 'Pressure cost', value: '+1 to Cartel pressure per share owned (cancelled by $10M in the Warchest)' }
    ],
    beginnerAdvice: [
      "Don't try to buy shares early. Your three-year revenue average will not clear the floor until the farm is producing real volume, and the price formula assumes you have value to leverage. The first share usually does not show up until the operation is established.",
      "Spread purchases across years instead of stacking them in March. The within-year multiplier punishes greedy years brutally — the third share in the same year costs twice the first, and the fifth costs three times the first.",
      "Treat every share as a Cartel-anger trigger. If you buy aggressively without funding the Warchest, expect the next March to bring more attacks than the last. Pair the two systems."
    ],
    consoleCommands: [
      { cmd: 'farmPunkBuyShare', note: 'Purchase one share if eligible. Checks scrip balance, eligibility tier, and the per-year cap.' },
      { cmd: 'farmPunkShares', note: 'Read-only. Shares owned, eligibility tier, next share cost, wallet balance, and the dividend block.' },
      { cmd: 'farmPunkForceShares <delta>', note: 'Testing tool — add or remove shares without spending scrip. Pass a negative number to reset back down.' }
    ],
    fieldNote:
      "The Cartel sells the farm as a franchise opportunity. Every share you buy back is the franchise contract going through a paper shredder, page by page."
  },
  {
    slug: 'dividends',
    category: 'Resistance',
    title: 'Dividends',
    oneLiner:
      "The Cartel built the dividend system so absentee owners, banks, and corporate partners could skim annual value from farms they never worked. When you buy shares, you force your name into that same ledger, redirecting part of the extraction pipeline back to the farmer. Dividends are not charity — they are the Cartel's own machine turned against them.",
    status: 'live',
    href: '/field-manual/dividends',
    version: VERSION,
    related: [
      { slug: 'shares', note: 'Pays per share owned. No shares, no dividends.' },
      { slug: 'cartel-franchise-fee', note: 'Lifetime franchise fees assessed (gross) drives the dividend tier.' },
      { slug: 'annual-taxes', note: 'Fires at the same year-end (period 12) tick as the tax block.' },
      { slug: 'reclamation-warchest', note: 'At max tier, dividends pay $1M/year — pure cash that can feed Warchest deposits.' }
    ],
    summary:
      "Dividends are the Cartel's own extraction machinery, turned around. They built it so banks, absentee owners, and silent partners could draw an annual cut from farms they never touched. The moment you own a single share, you force your name onto the same payout sheet — and the more aggressively the Cartel has been billing you over the years, the more they have to pay out per share. Dividends are flat per share, paid in farm cash every February, and the only way to earn them is to take their shares away from them.",
    whatItDoes: [
      "Pays a flat dollar amount per share you own, every February (period 12), straight to your farm cash.",
      "Skipped entirely if you own zero shares. No card, no transaction — the dividend ledger ignores farms with no ownership stake.",
      "The per-share rate is set by a tier table driven by the Cartel's own ledger of how much franchise fee they have assessed against you over your lifetime — gross, what they billed, not what you paid after share reduction. Bigger lifetime bill means a bigger payout per share.",
      "Pays regardless of profit. A bad farming year does not shrink the dividend — every share owned cashes for the same amount the year-end card promises.",
      "Counts as revenue for the year. At max tier with all 100 shares, that is $1,000,000 of pure dividend revenue — large enough to push you into a higher franchise fee bracket on its own. (At 100 shares the fee is zero anyway, so the bracket push has no cash effect.)"
    ],
    whyItMatters:
      "Dividends are unique among FarmPunk's revenue streams: they pay flat per share regardless of how the farm performed that year. They scale with two things — the shares you have reclaimed, and how hard the Cartel has been squeezing you across your lifetime — and the punchline is that buying out the franchise fee does not shut the dividend ladder down. The Cartel keeps assessing what they think you owe them; you just stop owing any of it. Their own paperwork keeps growing the dividend rate, and the bigger that rate gets, the more cash you can siphon back into the Reclamation Warchest.",
    howYouProgress: [
      "Own shares. Zero shares = zero dividend. The more shares you own, the more the per-share rate compounds into a real payout.",
      "Survive long enough for the Cartel to bill you. The dividend tier is gated by lifetime franchise fees assessed — every year you stay in the franchise agreement adds the gross fee to that lifetime total, even when you have reduced the net you actually pay through share ownership.",
      "Push revenue up. Bigger gross franchise fees in any given year add more to the lifetime total, which crosses dividend tiers faster.",
      "Watch the year-end sequence. The franchise fee fires first at period 12, and the dividend pays at the previous year's tier — this year's gross gets added to the lifetime total after the dividend, so it counts toward NEXT year's tier. A tier upgrade fires its own CRITICAL HUD card so you will know before the next dividend lands."
    ],
    importantNumbers: [
      { label: 'Pays at', value: 'February (period 12)' },
      { label: 'Pays in', value: 'Farm cash (not scrip)' },
      { label: 'Pays per', value: 'Share owned (skipped at 0 shares — no card, no transaction)' },
      { label: 'Profit-dependent', value: 'No. Flat per share.' },
      { label: 'Tier 1 — $0 to $250k lifetime fees assessed', value: '$2,000 / share' },
      { label: 'Tier 2 — $250k to $750k', value: '$2,700 / share' },
      { label: 'Tier 3 — $750k to $1.5M', value: '$3,500 / share' },
      { label: 'Tier 4 — $1.5M to $3M', value: '$4,800 / share' },
      { label: 'Tier 5 — $3M to $5M', value: '$6,000 / share' },
      { label: 'Tier 6 — $5M to $8M', value: '$7,500 / share' },
      { label: 'Tier 7 — $8M to $12M', value: '$8,800 / share' },
      { label: 'Tier 8 — $12M+', value: '$10,000 / share (cap)' },
      { label: 'Max annual payout', value: '$1,000,000 (Tier 8 × 100 shares)' },
      { label: 'Lifetime ledger source', value: 'Gross franchise fee assessed (NOT what you paid net of shares)' },
      { label: 'Sequencing at year-end', value: 'Franchise fee → dividend (at last year tier) → lifetime ledger increment → upgrade card if a tier was crossed' }
    ],
    beginnerAdvice: [
      "Do not skip the first share just because $2,000 sounds small. The dividend rate climbs by tier and by share count both — it is the compounding that matters, not the early dollar figures.",
      "Lifetime fees are based on what the Cartel BILLS you, not what you actually pay. Buying out to 100 shares does NOT freeze the dividend tier — the Cartel keeps assessing the gross fee, you just do not owe a cent of it, and the lifetime ledger keeps climbing.",
      "At max tier with 100 shares, dividends pay $1 million a year, every year, without you growing a single bushel more. That is the number meant to feed the Reclamation Warchest in the back half of the run."
    ],
    consoleCommands: [
      { cmd: 'farmPunkShares', note: 'Read-only. Includes the dividend block: lifetime fund, current tier + per-share rate, next-tier threshold + delta needed, projected payout.' },
      { cmd: 'farmPunkFranchiseFee', note: 'Read-only. Previews the franchise fee plus the dividend block, including the tier projected after this year’s gross fee is added.' },
      { cmd: 'farmPunkForceFranchiseFund <delta>', note: 'Testing tool — bump lifetime franchise fees directly to verify dividend tier transitions without grinding 12+ in-game years.' }
    ],
    fieldNote:
      "The Cartel's dividend ledger was built to pay out to people who were never on the farm. Now your name is on it, and they have to keep cutting the check."
  },
  {
    slug: 'black-markets',
    category: 'Resistance',
    title: 'Black Markets',
    oneLiner:
      "Black Markets are off-the-books crop orders from private buyers who know the Cartel is not the only game in the valley. They reroll every March across five tiers, paying cash, scrip, and Prestige at once — and the more famous you become, the better the buyers willing to risk dealing with you.",
    status: 'live',
    href: '/field-manual/black-markets',
    version: VERSION,
    related: [
      { slug: 'crop-mastery', note: 'Higher tier markets gate on per-crop mastery levels.' },
      { slug: 'farmer-prestige', note: 'Higher tier markets gate on Prestige. Completions also pay Prestige fame.' },
      { slug: 'crop-licensing', note: 'License penalty applies to ALL sales — including Black Market deliveries.' },
      { slug: 'wallet-scrip', note: 'Completions pay scrip in addition to cash and fame.' },
      { slug: 'reclamation-warchest', note: 'Insurgent and Liberating tier payouts are designed to bankroll Warchest deposits.' }
    ],
    summary:
      "Black Markets are the underground delivery network — small mills, regional co-ops, syndicate fronts, insurgent supply lines, and the resistance itself, all of them willing to pay a premium for a specific crop delivered at scale and willing to do it without the Cartel's signature. Every March a fresh roster of buyers appears across five tiers. They auto-track against everything you sell at every station, and when you cross the goal volume on a market, the payout fires automatically — cash to the farm, scrip to the wallet, fame to your Prestige line, all at once.",
    whatItDoes: [
      "Spawns a fresh roster of off-the-books buyers every March. Each market names a specific crop, a goal volume in liters, and a vendor.",
      "Tracks against ANY sale you make at ANY selling station, not just deliveries to the buyer's lot. Every liter of the named crop you sell anywhere on the map counts toward the goal.",
      "Pays out automatically the moment you cross the goal — no menu, no submission step, no contract paperwork. Cash, scrip, and Prestige fame all land on the same sale tick that pushed you over the line.",
      "Comes in five tiers. Backroad and Off-Book are common roster fillers; Underground, Insurgent, and Liberating are rarer and pay much more, gated behind both Farmer Prestige and per-crop Mastery.",
      "Stacks across markets. If two markets want the same crop at once, every liter of that crop counts for both — you are not splitting the delivery between them.",
      "Lapses silently at year-end. Markets you did not finish disappear when March rolls around — no penalty, no carry-over, no notification, no cost. The new roster has no memory of the old one."
    ],
    whyItMatters:
      "Black Markets are the fastest cash-and-fame engine in FarmPunk once you have the Prestige to unlock the higher tiers. Selling a million liters of a crop through the silos is one number; selling that same million liters to a Liberating-tier buyer pays 1.75× the vanilla rate, plus 40 to 50 scrip, plus enough Prestige fame to clear an entire level in a single delivery. They are also the main bridge between everyday farming and the Reclamation Warchest — Insurgent and Liberating payouts are large enough to fund seven-figure Warchest deposits in a single year. And because eligibility is monotonic — once a market unlocks for you, it stays unlocked even if a level-up was the last straw — the system rewards farmers who keep climbing rather than punishing late starts.",
    howYouProgress: [
      "Climb Farmer Prestige. Backroad markets are open from level zero; Off-Book opens at L10, Underground at L20, Insurgent at L30, and Liberating at L40. Each tier you have unlocked adds a roll for new slots on the board every March.",
      "Climb Crop Mastery. Each market also carries a per-crop Mastery requirement inside the tier's range — a wheat market might want Wheat Mastery 12 specifically. A high Prestige does not help you take a market when your crop is not good enough yet.",
      "Sell the right crop at any station. Once a market is eligible for you, every liter of its crop you sell anywhere on the map adds to its progress — no special delivery route required.",
      "Time your big sales to the active roster. Holding a silo of wheat until you see a wheat market on the board lets you cash in at the multiplier instead of selling for the vanilla price.",
      "Take what is there. The roster is randomized — you cannot reroll, you cannot pick the crop, and an unfilled market vanishes in March. If a market on the board fits what you grow, work it before the year flips."
    ],
    importantNumbers: [
      { label: 'Roster reroll', value: 'Every March (period 1)' },
      { label: 'Year-end behaviour', value: 'Unfilled markets lapse silently — no penalty, no carry-over' },
      { label: 'Backroad', value: 'P0+ · 2 slots · 100% spawn · 5,000–10,000 L · 1.00× cash · 1–2 scrip · 0.25× goal in fame' },
      { label: 'Off-Book', value: 'P10+ · 2 slots · 100% spawn · 10,000–30,000 L · 1.00× cash · 3–5 scrip · 0.50× goal in fame' },
      { label: 'Underground', value: 'P20+ · 1 slot · 30% spawn · 30,000–100,000 L · 1.25× cash · 8–12 scrip · 0.75× goal in fame' },
      { label: 'Insurgent', value: 'P30+ · 1 slot · 20% spawn · 100,000–300,000 L · 1.50× cash · 20–30 scrip · 1.00× goal in fame' },
      { label: 'Liberating', value: 'P40+ · 1 slot · 10% spawn · 500,000–1,000,000 L · 1.75× cash · 40–50 scrip · 1.50× goal in fame' },
      { label: 'Per-tier Mastery range', value: 'Backroad none · Off-Book 1–15 · Underground 5–20 · Insurgent 10–30 · Liberating 15–40' },
      { label: 'Cash payout formula', value: 'floor(goal liters × vanilla price/L × tier cash multiplier)' },
      { label: 'Vanilla price source', value: 'Locked in at spawn time — payouts do not drift if you level Sale Price / Boutique / Mastery mid-year' },
      { label: 'Fame credit', value: 'Counts as Farmer Prestige fame (NOT crop Mastery fame)' },
      { label: 'Multiple same-crop markets', value: 'Each receives the full liter delta independently — no splitting' },
      { label: 'Eligibility', value: 'Monotonic — once a market unlocks for you, it stays unlocked for the rest of its year' }
    ],
    beginnerAdvice: [
      "Do not ignore Backroad markets in the early years. Two small wheat or barley deliveries a year is hundreds of scrip and a free Prestige fame bump while the farm is still small.",
      "Eligibility unlocks once and stays unlocked. If a Wheat Mastery level-up is the only thing standing between you and a fat Insurgent wheat market already on the board, work the level-up — every liter of wheat you sell after the gate flips counts toward that market, even if you cross the gate on the very last day of the year.",
      "Higher-tier markets only roll a chance to spawn each year — Underground 30%, Insurgent 20%, Liberating 10%. A year with no Insurgent or Liberating on the board is normal. Run what is actually there.",
      "Black Market completions pay Prestige fame, not Crop Mastery. If you want a specific crop's Mastery line to climb, you still have to sell that crop's liters yourself — finishing a million-liter wheat market does not level Wheat Mastery, only Prestige.",
      "License penalty still applies. If you have blown past your license cap on a crop for the year, every Black Market liter of that crop pays the same penalty as a regular sale — clear the license before pushing big deliveries."
    ],
    consoleCommands: [
      { cmd: 'farmPunkBlackMarkets', note: 'Read-only. The full board: per-tier spawn rolls for the year, every active market’s vendor, crop, goal/progress, eligibility, and payout preview.' },
      { cmd: 'farmPunkRerollBlackMarkets', note: 'Testing tool — clear the active roster and re-run the March roll right now without waiting for period 1.' },
      { cmd: 'farmPunkForceBlackMarket <tier> [crop]', note: 'Testing tool — force-spawn one market of the given tier (and optionally a specific crop). Bypasses within-year uniqueness so multiple same-tier same-crop can stack.' },
      { cmd: 'farmPunkClaimBlackMarket <id>', note: 'Testing tool — force-complete a market by its current roster index. Fires the full payout flow (cash + scrip + fame + HUD card + roster removal).' }
    ],
    fieldNote:
      "The Cartel's price sheets are the only price sheets that exist on paper. Black Markets are what happens when the rest of the valley refuses to read from them."
  },
  {
    slug: 'wallet-scrip',
    category: 'RPG',
    title: 'Scrip',
    oneLiner:
      "Scrip is the farmer's private leverage, kept separate from farm cash and impossible to launder back into the operation. It flows through the systems the Cartel cannot fully price in — skills, share buybacks, license upgrades, and Black Market work — then pays out each year as a small salary plus a profit-based bonus for surviving the ledger.",
    status: 'live',
    href: '/field-manual/wallet-scrip',
    version: VERSION,
    related: [
      { slug: 'skills', note: 'All 17 skills are bought with scrip from the wallet.' },
      { slug: 'shares', note: 'Shares are bought with scrip, not farm cash.' },
      { slug: 'crop-licensing', note: 'Every license tier upgrade is paid in scrip.' },
      { slug: 'black-markets', note: 'Black Market completions pay scrip alongside cash and fame.' },
      { slug: 'perks', note: 'Industrial Subsidy perk adds +10 scrip to the year-end base salary, every occurrence.' }
    ],
    summary:
      "Farm cash is what the Cartel can see. Scrip is what they can't. It is the farmer's own pocket money — earned every year as a small salary plus a cut of profits that survived the year's bills, spent on the few escape valves the franchise agreement does not control. Scrip never converts back to farm cash. You cannot use it to pay debts, taxes, fees, or the dealer. Its only purpose is to buy your way out: skill levels, license upgrades, and the Cartel's own shares back, one paper sliver at a time.",
    whatItDoes: [
      "Pays once per year at period 12 (February), at the same year-end tick that fires the tax block. The base salary is a flat 10 scrip, paid every year regardless of how the farm did.",
      "Adds an annual bonus on top of the salary equal to one-thousandth of that year's net profit (floor of profit × 0.001). A $500,000 profit year pays 10 base + 500 bonus = 510 scrip. A losing year pays the 10 base salary and no bonus — the bonus floors at zero, never goes negative.",
      "Spends only on a small set of farmer-side purchases: the 17 levels of every Manager Skill, share buybacks against the Cartel's 100 shares of your farm, and crop license tier upgrades. None of these transactions touch farm cash; none of them appear on the farm's books.",
      "Pays out separately on Black Market completions — every off-the-books delivery dumps a tier-scaled scrip payout into the wallet on top of the farm-cash payment.",
      "Cannot be converted, sold, traded, or laundered back into farm cash. The wallet is one-way. Money that lands in scrip stays in scrip until it is spent on a farmer-side purchase.",
      "Pays separately from share dividends. Share dividends are paid in farm cash at the same period 12 tick — they do NOT flow into the scrip wallet."
    ],
    whyItMatters:
      "Every other currency in FarmPunk is a leash. Farm cash flows through the Cartel's books — they tax it, fee it, surcharge it, and audit it. Scrip is the channel they have not figured out how to bill. The skills that make you better at growing, the shares that take their farm back, the licenses that lift the over-cap penalty — all four of these escape valves are gated by scrip, not cash. That is why the wallet matters: it is the only number on the farm that the Cartel cannot directly skim. The catch is that scrip is small and slow. The base salary alone barely covers a single L1 skill. The real wealth comes from the bonus, which means scrip ramps with profit — and profit is exactly what every system in FarmPunk is engineered to compress.",
    howYouProgress: [
      "Survive a profitable year. The bonus is one-thousandth of that year's net profit, paid in February. Every $1,000 of profit you keep through the franchise fee, taxes, surcharges, and spoilage adds another scrip to the bonus.",
      "Pick up the Industrial Subsidy perk as Farmer Prestige climbs. Every occurrence adds another +10 scrip to the year-end base salary, on top of the 10 already paid. It is one of only two perks with no occurrence cap, so it keeps stacking forever.",
      "Run Black Market deliveries. Every tier pays a scrip bonus on completion: Backroad pays 1–2, Off-Book 3–5, Underground 8–12, Insurgent 20–30, Liberating 40–50. A single Liberating completion can outpay an entire year's salary plus bonus.",
      "Spend on purpose. Skill levels, share buybacks, and license upgrades all draw from the same pile, and you will run out faster than feels fair. Sequence the buys instead of stacking them — the within-year share multiplier punishes greedy spending hard."
    ],
    importantNumbers: [
      { label: 'Base salary (yearly)', value: '10 scrip, paid every February' },
      { label: 'Annual bonus formula', value: 'floor(net profit × 0.001) scrip' },
      { label: 'Bonus example at $500,000 profit', value: '10 + 500 = 510 scrip' },
      { label: 'Negative-profit year', value: '10 scrip salary, 0 bonus (clamped at 0)' },
      { label: 'Industrial Subsidy perk', value: '+10 scrip on the year-end base salary, per occurrence (uncapped)' },
      { label: 'Black Market scrip payouts', value: 'Backroad 1–2 · Off-Book 3–5 · Underground 8–12 · Insurgent 20–30 · Liberating 40–50' },
      { label: 'Share dividends', value: 'Paid in farm cash, NOT scrip' },
      { label: 'Convertible to farm cash', value: 'No. The wallet is one-way.' },
      { label: 'Spends on', value: 'Manager Skills, FarmPunk shares, crop license tier upgrades' }
    ],
    beginnerAdvice: [
      "Do not drain the wallet on day one. The first 10 scrip salary tempts you into a single L1 skill, but a long-term plan that holds onto scrip until it can buy a tier you actually need will outperform spreading it thin across a dozen L1s.",
      "Profitable years are the engine. Every bill the Cartel does not collect this year is another scrip in the bonus. Spoilage, surcharges, the franchise fee, and tax bills all compress the bonus directly — staying lean in February is what feeds the wallet.",
      "Black Market scrip stacks fast in the late game. The Insurgent and Liberating tiers pay more scrip per delivery than a strong farm year's full salary plus bonus combined.",
      "Plan share buybacks against the wallet, not the calendar. A single share in the high-revenue years can cost more than a full year's wallet payout — save scrip across multiple years instead of trying to buy on the year it unlocks."
    ],
    consoleCommands: [
      { cmd: 'farmPunkWallet', note: 'Read-only. Current wallet balance, base salary, and projected year-end bonus based on this year\'s profit-so-far.' },
      { cmd: 'farmPunkAddScrip <amount>', note: 'Testing tool — add (or subtract via a negative number) scrip directly. Bypasses the period-12 salary/bonus path so testers can engineer a known balance for skill / share / license purchase rows. Result floors at 0.' }
    ],
    fieldNote:
      "Farm cash is what they tax. Scrip is what you keep."
  },
  {
    slug: 'crop-licensing',
    category: 'Production',
    title: 'Crop Licensing',
    oneLiner:
      "Crop Licensing is the Cartel's way of deciding how much of each crop you are allowed to sell before they crush the price. Upgrade licenses with scrip to raise your annual caps, because anything sold past the line gets punished hard — unapproved abundance is still disobedience.",
    status: 'live',
    href: '/field-manual/crop-licensing',
    version: VERSION,
    related: [
      { slug: 'crop-novelty', note: 'Both bend the per-station sale price through the same combined multiplier chain.' },
      { slug: 'cartel-attacks', note: 'License Revocation drops one of your tiers back down for the active year.' },
      { slug: 'black-markets', note: 'License penalty applies to ALL sales, including off-the-books deliveries.' },
      { slug: 'crop-mastery', note: 'Both gate per-crop progression — mastery on volume sold, licensing on volume permitted.' },
      { slug: 'wallet-scrip', note: 'Every tier upgrade is paid in scrip, not farm cash.' }
    ],
    summary:
      "The Cartel does not stop you from growing food. It stops you from selling it. Every harvestable crop carries its own license — a yearly cap on how many liters of that crop the system will pay you full price for. Sell underneath the cap and the price sheet behaves normally. Cross the cap and that crop's price collapses to twenty cents on the dollar at every selling station for the rest of the year. Licenses go up to six tiers each, paid for in scrip, and they reset every March.",
    whatItDoes: [
      "Tracks one independent license per harvestable crop. Wheat has its own cap, corn has its own cap, sugarbeet has its own cap, and so on — selling wheat does not touch any other crop's counter.",
      "Starts every farm at Tier 0 on every crop, with a 12,000-liter annual cap. The first tier upgrade is the cheapest the wallet will ever see (10 scrip), and the cap ladder climbs to 250,000 liters at Tier 5.",
      "Triggers an over-cap penalty the moment your year-to-date sold volume of a crop equals or exceeds its current cap. From that tick onward, every selling station prices that crop at twenty percent of its normal multiplied price for the rest of the year.",
      "Fires a CRITICAL HUD warning on the cap-crossing tick (\"WHEAT license cap exceeded — sale price reduced 80% for rest of year\"). The single ~40-liter tick that crosses the cap still pays full price for its over-cap portion — the engine bills that tick before the penalty kicks in. Negligible, and it favors the player.",
      "Resets every March. At period 1 of the new year, every crop's sold-this-year counter zeros out and the penalty multiplier lifts back to normal — even on crops that were under penalty the day before.",
      "Lifts the penalty mid-year if you upgrade a tier above your current sold volume. Cross 80,000 L of wheat under a 75,000 L Tier 3 cap, eat the penalty for a few weeks, then upgrade to Tier 4 (100,000 L cap), and the penalty multiplier lifts immediately at every station."
    ],
    whyItMatters:
      "Licensing is the gate that decides whether your year ends with a fat silo or a bargain bin. The penalty is brutal — eighty percent off the sale price is more than the franchise fee, the tax bill, and most surcharges combined — and it does not just hit your storefront sales. Every Black Market delivery, every contract drop-off, every grain-truck unload at any station prices the crop through the same multiplier chain. There is no escape route once a crop tips over its cap. The system also punishes farms that try to specialize without preparing — an enormous wheat-only operation running on Tier 1 wheat licensing will cap before March is over and spend the rest of the year selling wheat at pennies. Plan licenses against your acreage, not your wallet.",
    howYouProgress: [
      "Run `farmPunkLicense` to see every crop's current tier, cap, year-to-date sold volume, and remaining headroom. The headroom number is the only one that matters once spring planting decisions get made.",
      "Upgrade the licenses for the crops you actually grow at scale. Tier 1 (10 scrip) and Tier 2 (15 scrip) are cheap insurance for any crop you plan to push more than 12,000 L of; Tier 5 (70 scrip) is for the one or two crops you mean to specialize in.",
      "Watch for the cap-crossing CRITICAL card. If it fires, do the math — sometimes a mid-year upgrade is cheaper than eating the 80% penalty for the rest of the season. The tier upgrade lifts the penalty the same tick if the new cap is above your current sold volume.",
      "Stagger sales across the year. The penalty fires on your sold-this-year counter, not on harvest volume. Holding grain in silos until you have license headroom keeps the price multiplier intact — but watch spoilage, since stored grain rots at 3% per period.",
      "Diversify the catalog when you can. Each crop has its own cap, so a farm split across three crops at Tier 2 has triple the headroom of a farm hammering one crop at Tier 2."
    ],
    importantNumbers: [
      { label: 'Tier 0 (default)', value: '12,000 L cap · no purchase' },
      { label: 'Tier 1', value: '25,000 L cap · 10 scrip' },
      { label: 'Tier 2', value: '50,000 L cap · 15 scrip' },
      { label: 'Tier 3', value: '75,000 L cap · 25 scrip' },
      { label: 'Tier 4', value: '100,000 L cap · 45 scrip' },
      { label: 'Tier 5', value: '250,000 L cap · 70 scrip' },
      { label: 'Over-cap penalty', value: 'Sale price drops to 20% of normal at every station for the rest of the year (player keeps 20%)' },
      { label: 'Penalty scope', value: 'All sales — storefront, contracts, AND Black Market deliveries' },
      { label: 'Per-crop independence', value: 'Yes — each crop has its own counter, cap, and penalty status' },
      { label: 'Reset', value: 'March (period 1) — counters wipe, penalty lifts on every crop' },
      { label: 'Mid-year upgrade', value: 'Lifts the penalty immediately if the new tier cap is above your current sold volume' }
    ],
    beginnerAdvice: [
      "Tier 0's 12,000 L cap is small. A single mid-sized wheat field will burn through it in one harvest. Pick up Tier 1 on your first cash crop before the first big sale — 10 scrip is a single year's salary, and a year of penalized prices is not.",
      "If the cap-crossing CRITICAL fires mid-year, compute the math before panicking. Some years it is cheaper to take the penalty on the trickle of remaining sales; other years it pays for itself ten times over to upgrade the tier and keep the next 50,000 L at full price.",
      "License Revocation (Cartel attack) drops one tier on one crop for the year. There is no scrip refund, no early restoration — the tier you lost comes back at the next March reset. Plan around it by running tighter caps on the crops you can afford to lose for a year.",
      "Black Market completions pay through the same price chain. A million-liter Liberating-tier wheat market under a busted wheat license still pays at the penalty rate. Clear the license before pushing big deliveries."
    ],
    consoleCommands: [
      { cmd: 'farmPunkLicense', note: 'Read-only. Every crop\'s current tier, annual cap, year-to-date sold volume, and remaining headroom.' },
      { cmd: 'farmPunkBuyLicense <CROPNAME>', note: 'Upgrade a crop license by one tier. Crop name must be uppercase (e.g. WHEAT). Costs scrip according to the tier table.' }
    ],
    fieldNote:
      "The Cartel does not have to ban the harvest. They just have to refuse to buy it for what it is worth."
  },
  {
    slug: 'crop-novelty',
    category: 'Production',
    title: 'Crop Novelty Bonus',
    oneLiner:
      "The Crop Novelty Bonus rewards farmers who keep the market guessing instead of feeding the Cartel the same predictable harvest every year. Crops you skipped last year sell for more, and crops absent for five years hit even harder — rotation is not just soil sense, it is market misdirection.",
    status: 'live',
    href: '/field-manual/crop-novelty',
    version: VERSION,
    related: [
      { slug: 'crop-licensing', note: 'Both bend the per-station sale price through the same combined multiplier chain.' },
      { slug: 'crop-mastery', note: 'Mastery price tier stacks into the same chain as a separate factor.' },
      { slug: 'skills', note: 'Boutique skill amplifies the novelty bonus tiers — does nothing on its own.' },
      { slug: 'cartel-attacks', note: 'Smear Campaign zeroes every novelty bonus for the year regardless of history.' }
    ],
    summary:
      "Buyers in the valley have been feeding the Cartel's predictable pipeline so long they pay extra for anything they did not see last year. Crop Novelty turns crop rotation into an active income strategy: every crop on your farm carries an invisible \"last year sold\" date, and the bigger the gap since you last sold a crop, the bigger the price boost it earns. The boost is decided in March based on what you sold the previous year, then locks in for the full season — selling a crop later in the year does not retroactively shrink its bonus, it only feeds the next March's calculation.",
    whatItDoes: [
      "Awards a +15% sale-price boost on any crop you did not sell last year (a gap of two or more calendar years since the last sale).",
      "Awards a +25% sale-price boost on any crop you have not sold in the last five years, OR have never sold at all on this save.",
      "Locks every crop's boost at period 1 (March), based on the prior year's sales history. The number is set for the full year on day one and does not change mid-season.",
      "Composes with Sale Price skill, Crop Licensing, and the Crop Mastery price tier through a single combined multiplier written to every selling station — every factor goes through one pass, so the bonuses do not race each other.",
      "Updates last-year-sold history on every sale tick — selling a crop does not change THIS year's locked boost, but it overwrites the timer the NEXT March's boost calculation will read."
    ],
    whyItMatters:
      "Novelty is the only price boost in FarmPunk that rewards what you did not do. Every other system asks for more — more skill, more mastery, more shares, more deliveries. Novelty asks you to skip a year. That makes it free leverage for any farm willing to plan harvests across multiple years instead of locking into the same crop forever. The +25% rare-crop tier, in particular, is large enough that a five-year-rest crop can outpace the per-station price multiplier of a fully-mastered, fully-licensed standby crop. The trap is that the boost is decided BEFORE the year starts. By the time you notice a crop has a +25% locked in for the year, the only thing to do is sell as much of it as you can before the next March overwrites the timer.",
    howYouProgress: [
      "Run `farmPunkNovelty` in March to see every crop's current boost tier, last-year-sold record, and the year gap. Crops in the +25% tier are the ones to plant heavy this year.",
      "Plan harvests across multiple years instead of one. A two-crop or three-crop rotation keeps each crop in the +15% (or +25%) tier whenever it is your turn to grow it.",
      "Pick up the Boutique skill once you have a stable rotation. Every level adds +1 percentage point to the +15% tier and +2 percentage points to the +25% tier; at L10 the tiers become +25% and +45%. Boutique does NOTHING on a crop with no novelty boost — it amplifies, it does not generate.",
      "Sell a boost-bearing crop before the year ends, even if you would rather hold it. The boost is locked for THIS year regardless of when you sell. Holding the silo into next year forfeits the boost and resets the gap counter on the side that matters."
    ],
    importantNumbers: [
      { label: 'Tier 1 boost (+15%)', value: 'Crop NOT sold last year (gap ≥ 2 years)' },
      { label: 'Tier 2 boost (+25%)', value: 'Crop NOT sold in last 5 years OR never sold on this save' },
      { label: 'Lock point', value: 'Period 1 (March) — based on prior year\'s sales history' },
      { label: 'Lock duration', value: 'Full year. Selling mid-year does NOT change this year\'s boost.' },
      { label: 'History update', value: 'Every sale rewrites last-year-sold for next March\'s calc' },
      { label: 'Boutique skill on Tier 1', value: 'L10 → +25% (1.15 base + 0.10 amplification)' },
      { label: 'Boutique skill on Tier 2', value: 'L10 → +45% (1.25 base + 0.20 amplification)' },
      { label: 'Boutique on no-boost crops', value: '0% — Boutique requires an active novelty tier to ride on' },
      { label: 'Smear Campaign (Cartel attack)', value: 'Zeroes every novelty bonus for the active year' },
      { label: 'Stacks with', value: 'Sale Price skill · Crop Licensing penalty · Crop Mastery price tier (one combined multiplier)' }
    ],
    beginnerAdvice: [
      "Check `farmPunkNovelty` in your first March. Brand-new saves have NEVER sold any crop, so the first year on a fresh save can carry +25% on every crop you choose to plant. Use it.",
      "Rotate two or three crops on a multi-year cycle. A wheat-corn-soy rotation keeps each crop on a two-year gap, which means each one earns +15% the year you plant it.",
      "Boutique is a multiplier, not a generator. Buying Boutique levels on a save where every crop sold last year does literally nothing this year — the skill needs an active novelty tier to amplify. Pair Boutique with deliberate rotation, not as a substitute for it.",
      "Smear Campaign as a Cartel attack flat-zeroes every novelty bonus for the year — and Boutique amplification rides on top of zero, so it goes silent too. Years with Smear active are years to lean on Sale Price and Mastery, not on rotation.",
      "Holding a stockpile of a +25% crop \"for next year\" forfeits the boost and resets the gap. The locked tier is for THIS year. Sell what carries the boost while it carries it."
    ],
    consoleCommands: [
      { cmd: 'farmPunkNovelty', note: 'Read-only. Per-crop novelty status: last-year sold, year gap, current boost tier, and confirmation that the tier is locked-in for this year.' }
    ],
    fieldNote:
      "The Cartel knows what you grew last year. The valley pays for what you didn't."
  },
  {
    slug: 'crop-spoilage',
    category: 'Production',
    title: 'Crop Spoilage',
    oneLiner:
      "Crop Spoilage makes hoarding dangerous: every month, stored grain rots, leaks, or disappears into whatever lives in the silo walls. Skills can slow the loss, but bad weather and Cartel poisoning can turn patience into rot — sell with a plan before the rats collect their dividend.",
    status: 'live',
    href: '/field-manual/crop-spoilage',
    version: VERSION,
    related: [
      { slug: 'skills', note: 'Spoilage Immunity skill subtracts up to 5 percentage points off the per-period rate.' },
      { slug: 'weather', note: 'Some weather years add positive or negative percentage points to the spoilage rate.' },
      { slug: 'cartel-attacks', note: 'Crop Poisoning is a separate one-shot raid on a single silo — different system, same lesson.' },
      { slug: 'crop-licensing', note: 'Holding grain to spread sales across the license cap is the most common reason to leave grain in storage.' }
    ],
    summary:
      "Storage in FarmPunk is not a safe deposit box. Every month, the contents of every grain silo and grain-capable trailer on the farm shrink by a flat percentage — pests, rot, leaks, theft, or just the cost of doing business in a valley where nothing is allowed to sit still and earn nothing. The base rate is 3% per period, applied at the period change. Skills can soften it, weather can twist it both directions, and the Cartel's Crop Poisoning attack can wipe a silo clean in one night. The system rewards farmers who plan the move from harvest to scale.",
    whatItDoes: [
      "Trims a flat 3% off the current grain volume in every storage container at every period change (one calendar month). 100,000 L of wheat at month-end becomes 97,000 L at month-start. There is no time-in-storage tracking — the cut is the same on grain that just came in as on grain that has been sitting all year.",
      "Covers placeable silos (the standard farm silos and silo extensions you place on your land) AND grain-capable vehicles — trailers, semi-trailers, and auger wagons. Combines, water trailers, livestock trailers, and mixer wagons are not affected.",
      "Filters by content. Only grain-type fill is targeted. Manure tanks, liquid fertilizer, water trailers, and similar non-grain containers are skipped, even if they share a chassis with a grain trailer.",
      "Reports the loss with a single OK-priority HUD notification per period, listing total liters lost across the farm with a per-crop breakdown. Quiet ticks (no grain on hand) skip the notification entirely — silence means there was nothing to lose.",
      "Excludes the centralized farm silo (the in-game-menu logistics silo) from current scope. Planned for a future update; placeable silos and grain trailers are the current targets."
    ],
    whyItMatters:
      "Spoilage is the system that punishes hoarding. Every other piece of FarmPunk pulls in the opposite direction — license caps reward staggered sales, novelty boosts reward year-long timing, mastery and prestige reward steady volume — and spoilage is the gravity underneath all of it. Three percent a month sounds harmless until you do the year-long math: a silo of grain held for twelve months loses just over thirty percent of its volume to nothing. A bad-weather year pushes that number up. A Crop Poisoning attack on a fat silo turns the loss into something far worse, in a single tick. The point of the system is to make standing inventory cost something, so the good plays in FarmPunk are the ones that move grain — to the scales, to the silo cap, to a Black Market goal — instead of sitting on it.",
    howYouProgress: [
      "Run `farmPunkSpoilage` to see how much grain is on hand right now and how much would be lost at the next period change. Use it to decide whether to push a sale before the month flips.",
      "Buy levels of the Spoilage Immunity skill. Each level subtracts another 0.5 percentage points off the per-period rate, capping at 5 percentage points off the rate axis at L10 — enough to flatten a clear-weather base year to nearly zero loss.",
      "Watch the weather forecast at year roll. Some weather rolls add positive percentage points to the spoilage axis (more rot) and some add negative (less rot). The rate is clamped at 0, so a deep negative weather mod plus L10 immunity does NOT grant bonus grain — it just floors the loss at zero.",
      "Move grain on a schedule. The cleanest play is to harvest, sell what license headroom permits, then push the rest through Black Market deliveries while the storage clock is still ticking. Grain that leaves storage before the next period change loses nothing.",
      "Keep tactical reserves small. The 3% loss is calculated against what is in the silo at the period flip — a 5,000-L holdback to bridge a license tier upgrade costs 150 L; a 500,000-L hoard costs 15,000 L."
    ],
    importantNumbers: [
      { label: 'Base rate', value: '3% of current volume, every period change (monthly)' },
      { label: 'Tracking', value: 'Flat — no time-in-storage, no aging curve, no \"fresh\" vs \"old\" distinction' },
      { label: 'Scope', value: 'Placeable silos · silo extensions · grain trailers · semi-trailers · auger wagons' },
      { label: 'Out of scope', value: 'Combines · water/manure/livestock/mixer trailers · centralized farm silo (planned follow-up)' },
      { label: 'Spoilage Immunity skill', value: '−0.5 percentage points per level (L10 = −5% off the rate axis)' },
      { label: 'Weather modifier', value: 'Adds (positive or negative) percentage points to the rate. Rate is clamped at 0.' },
      { label: 'Worked example', value: '3% base − 1% favorable weather − L10 immunity → 0% (clamped, not negative)' },
      { label: 'Worked example', value: '3% base + 2% adverse weather → 5% per period until weather lifts' },
      { label: 'Notification', value: 'OK-priority HUD card per period · total liters lost + per-crop breakdown · silent on zero-grain ticks' },
      { label: 'Crop Poisoning (Cartel attack)', value: 'Separate one-shot silo raid — independent of monthly spoilage' }
    ],
    beginnerAdvice: [
      "Sell as soon as the license cap permits. Every month a silo sits at half-full is a month paying 3% rent on grain you already grew.",
      "Buy Spoilage Immunity levels on any save where storage is forced — large-acreage operations holding silo loads to spread across license caps lose multiple thousand liters per month at the base rate.",
      "Adverse-weather years are the wrong years to hoard. Some weather rolls push spoilage into the 4–5% range monthly. Move grain faster when the year-roll forecast warns of bad weather.",
      "The HUD card going silent does not mean spoilage broke. It means there was nothing in storage to spoil that period. Empty silos cost nothing.",
      "Crop Poisoning as a Cartel attack is its own event — a one-shot raid that wipes liters from one targeted silo regardless of how the monthly spoilage tick has been treating you. Plan against the franchise pressure system, not just the rate."
    ],
    consoleCommands: [
      { cmd: 'farmPunkSpoilage', note: 'Read-only. Per-crop grain on hand across all silos and trailers, with the projected liters that would spoil at the next period change.' },
      { cmd: 'farmPunkForceSpoilage', note: 'Testing tool — manually trigger the spoilage tick now without waiting for a period change.' }
    ],
    fieldNote:
      "Storage is not safety. It is rent paid by the liter, every month, to whatever lives in the silo walls."
  },
  {
    slug: 'weather',
    category: 'Production',
    title: 'Weather System',
    oneLiner:
      "The Weather System turns each year into a sentence the sky hands down: forty-five patterns across five rarity tiers, from common drizzle to once-a-decade dust storms. One pattern locks in for the full year, forcing you to plan crops, storage, hauling, and survival around whatever the season decides to become.",
    status: 'live',
    href: '/field-manual/weather',
    version: VERSION,
    related: [
      { slug: 'crop-spoilage', note: 'Some weather mods add to the monthly spoilage rate; favorable years subtract from it.' },
      { slug: 'rust-and-raiders', note: 'Weather exposure modifier scales the per-period damage exposed equipment takes.' },
      { slug: 'skills', note: 'Weather Shield skill absorbs negative yield modifiers up to 5 percentage points.' },
      { slug: 'perks', note: 'Forecasting Leveraging perk amplifies the favorable side of every weather mod, +1pp per occurrence.' },
      { slug: 'crop-mastery', note: 'Weather adds or subtracts from the same yield axis mastery + skill levels write to.' }
    ],
    summary:
      "Every March the sky picks a card. The card has a name (\"Drought Belt,\" \"Hail Season,\" \"Boom Year,\" and forty-two others), a rarity, a one-line description, and three signed numbers — yield, spoilage, and exposure modifiers — that follow the farm for the full calendar year. Most cards are mild. A few are devastating. The weather is rolled at year-flip, locked for the rest of the year, and announced through a single HUD forecast card so you know what kind of year you are about to plan. The system rewards farmers who read the forecast and adjust the operation around it instead of running the same plan twelve months in a row.",
    whatItDoes: [
      "Rolls one weather pattern at period 1 (March) every year. The chosen pattern locks in for the full year — there is no second roll, no mid-year shift, no in-game seasonal cycle. Whatever the year became at March is what it stays.",
      "Picks from a catalog of forty-five patterns, distributed across five rarity tiers. Tier 1 has 20 entries, Tier 2 has 10, Tiers 3–5 have 5 entries each. The roll is two-stage: first a weighted d100 picks the rarity tier, then a uniform random pick selects one specific entry from that tier's pool.",
      "Carries three independent modifiers per pattern, each one a signed percentage-point delta (positive or negative). Yield modifies how much crop comes out of the ground per square meter. Spoilage modifies the per-period rot rate on stored grain. Exposure modifies the per-period damage taken by equipment left outside a shed.",
      "Applies modifiers ADDITIVELY on the percentage-point axis, not multiplicatively. A year with +13% yield from skill and mastery and a −3% weather yield mod nets +10% yield total — straight subtraction, not nested multiplication.",
      "Fires an OK-priority HUD forecast card at year-roll showing the pattern's name, rarity, description, and the three signed mods on one line. The card is the only mid-year reminder the system gives you — read it.",
      "Persists the active pattern across saves, plus a year-by-year history of every pattern that has ever rolled on the save (visible in `farmPunkWeather`)."
    ],
    whyItMatters:
      "Weather is the only system in FarmPunk that touches all three production axes at once — yield, spoilage, and exposure — and it does it without consulting you. A rare bad-weather card can compress the year's profit margin by double-digit percentage points before you have made a single decision; a rare good-weather card can do the opposite. Most years the modifiers are small and the year plays out normally. The dangerous years are the rare ones, and they appear with no warning except the March forecast card. Reading the card and adjusting — selling stored grain early on a high-spoilage year, sheltering more equipment on a high-exposure year, leaning on Mastery on a low-yield year — is the difference between a roll that costs you a season and a roll that costs you a save.",
    howYouProgress: [
      "Read the March forecast card. The name and the three signed numbers tell you what the year is going to do. Plan the spring around them — what to plant, what to sell first, what to push indoors.",
      "Buy levels of the Weather Shield skill if your saves keep rolling adverse yield years. Each level absorbs another 0.5 percentage points of NEGATIVE yield modifier, capping at 5 percentage points at L10. The shield only cancels damage; it cannot strip a favorable mod or invent gains on a clear year.",
      "Pick up the Forecasting Leveraging perk as Farmer Prestige climbs. Each occurrence adds +1 percentage point to the FAVORABLE side of every axis only — positive yield mods get bigger, negative spoilage and exposure mods get more negative. Adverse rolls pass through untouched.",
      "Use `farmPunkWeather` to read the live mod values and the full year-by-year history. Spotting a rare card on a known save is useful intel for what to plant before the next March overwrites the roll."
    ],
    importantNumbers: [
      { label: 'Roll cadence', value: 'Once per year, at March (period 1)' },
      { label: 'Lock duration', value: 'Full calendar year — no mid-year shift' },
      { label: 'Catalog size', value: '45 patterns' },
      { label: 'Tier 1 (common)', value: '20 entries · 50% rarity-roll chance' },
      { label: 'Tier 2 (uncommon)', value: '10 entries · 25% rarity-roll chance' },
      { label: 'Tier 3 (rare)', value: '5 entries · 15% rarity-roll chance' },
      { label: 'Tier 4 (very rare)', value: '5 entries · 8% rarity-roll chance' },
      { label: 'Tier 5 (legendary)', value: '5 entries · 2% rarity-roll chance' },
      { label: 'Modifiers per pattern', value: '3 signed percentage-point deltas — yield, spoilage, exposure' },
      { label: 'Composition', value: 'Additive on the percentage-point axis (NOT multiplicative)' },
      { label: 'Yield example', value: '+13% from skill + mastery − 3% weather = +10% net' },
      { label: 'Spoilage example', value: '3% base + 2% weather = 5% per period until weather lifts' },
      { label: 'Exposure example', value: '5% base wear + 5% weather = 10% per period on exposed equipment' },
      { label: 'Weather Shield skill cap', value: '−5% absorbed off NEGATIVE yield mods only' },
      { label: 'Forecasting Leveraging perk', value: '+1pp per occurrence on the favorable side of each axis (cap 10)' }
    ],
    beginnerAdvice: [
      "Read the forecast card the moment it fires. The name is flavor; the three numbers are the year. Skipping the card means walking blind into a season the system already told you about.",
      "Adverse-weather years are not lost — they are different. A −3% yield year still grows crop, just less of it. A +2% spoilage year still lets you store grain, just for less time. The play is to lean harder on the systems weather did not touch (Mastery, Boutique, license headroom) instead of trying to outwork the modifier.",
      "Weather Shield only acts on NEGATIVE yield mods. Buying it on a save that keeps rolling positive-yield years buys nothing. It is insurance against bad rolls, not a permanent yield boost.",
      "Forecasting Leveraging amplifies favorable rolls but does NOT shield bad ones. Pair it with Weather Shield if you want both directions covered.",
      "Tier 5 cards are once-in-a-blue-moon rolls (2% chance per year). Most saves never see two of them. When one fires, treat the year as the headline year — every other plan adjusts around the modifier."
    ],
    consoleCommands: [
      { cmd: 'farmPunkWeather', note: 'Read-only. Current year\'s pattern (name, rarity, description, the three signed mods, locked year), full year-by-year history, and catalog counts per rarity tier.' },
      { cmd: 'farmPunkSetWeather <id>', note: 'Testing tool — force a specific weather id and trigger the downstream re-apply. Mutates the current year\'s slot.' },
      { cmd: 'farmPunkRerollWeather', note: 'Testing tool — roll a fresh weather pattern right now without waiting for period 1.' }
    ],
    fieldNote:
      "The Cartel writes the contracts. The sky writes the year."
  },
  {
    slug: 'annual-taxes',
    category: 'Money',
    title: 'Annual Taxes',
    oneLiner: "Annual Taxes hit every February as the county takes its cut on your equipment and land, with acreage getting brutally more expensive as your footprint grows. Prestige Perks can soften the bill, because once the valley knows your name, even local tax collectors start finding reasons to treat you like someone worth keeping alive.",
    status: 'live',
    href: '/field-manual/annual-taxes',
    version: VERSION,
    related: [
      { slug: 'cartel-franchise-fee', note: 'Both fire in the same February tick. The franchise fee is a separate bill on revenue, not what you own.' },
      { slug: 'dividends', note: 'Dividends pay in farm cash inside the same year-end tick, after the franchise fee.' },
      { slug: 'cartel-attacks', note: "When active, Cartel Audit fires from inside the year-end tax block as a 5% revenue skim." },
      { slug: 'perks', note: 'Tax Shelter knocks down the equipment tax. Land Lawyer knocks down the land tax. Both stack up to 50% off at the cap.' },
      { slug: 'credit-rating', note: 'A tax bill that pushes your balance below zero triggers a credit downgrade, like any other negative-pushing transaction.' }
    ],
    summary:
      "Once a year, in February, the system shows up to count your land, count your machines, and bill you for both. There is no mailbox, no receipt to sign, no exemption to file. The numbers come out of your account on the last tick before the year rolls over, before you've sold a single bushel of the new season's crop. Land Tax is what you owe for owning dirt. Equipment Tax is what you owe for owning the tools that work it. The two halves are separate calculations with separate rules, and they both hit on the same day.",
    whatItDoes: [
      "Fires once a year, on the last period of the year (February). The land amount and the equipment amount are computed separately, then summed and deducted from your farm cash in a single transaction. A HUD card lays out the full breakdown — your acreage, the land rate, the land amount, your fleet's resale value, the equipment rate, the equipment amount, and the total.",
      "Land Tax scales up with how much dirt you own. A small farm at ten acres or under owes nothing at all. Past that, the rate climbs gradually toward a 10% ceiling — gradually enough that even a five-hundred-acre operation is still well under 5%. Big farms pay more in dollars, but the curve eases up to its limit and stops.",
      "Equipment Tax is a step function on the resale value of every vehicle you own. Cross a threshold and the rate jumps to the next tier, applied against the whole fleet's value. A $501,000 fleet pays a different rate than a $499,000 one — the line is real, not blended.",
      "The bill is a real expense on your books. It comes out of farm cash and registers as expenditure for the year. If a tax bill pushes your balance below zero, your credit rating takes a downgrade hit the same way any other negative-pushing transaction would.",
      "Annual Taxes share their February tick with the rest of the year-end paperwork. The order is fixed: land + equipment tax first, then the Cartel Franchise Fee, then the dividend payout from any shares you own, then the Cartel Audit if it activated this year. Each one is its own line on the books, but they all land in the same week."
    ],
    whyItMatters:
      "Annual Taxes are the steady scale-pressure of FarmPunk's money game. The franchise fee scales on revenue, so a quiet year softens it. Annual Taxes don't care whether you sold a single liter — they bite on what you own, not what you earned. That makes February the single most expensive month in a FarmPunk year, and the only month where every Cartel-adjacent ledger bills you at once.",
    howYouProgress: [
      "Plan your year so February has cash on hand. The bill comes out before the new season's sales begin. A thin January and a hungry combine waiting on warm weather is a credit downgrade waiting to happen.",
      "Watch what you buy at year-end. Equipment Tax is on resale value, and a new combine in January means a bigger bill the very next month. The tax is computed on the fleet at the moment of assessment, not the average across the year.",
      "Climb Farmer Prestige to unlock the right perks. Tax Shelter knocks 5% off the equipment tax per occurrence, up to half off at the cap of ten. Land Lawyer does the same for the land tax. Both compete with the rest of the perk rotation, so they show up over time, not on demand.",
      "If the Cartel rolled a Cartel Audit attack against you this year, expect a third bill in the same February tick — a 5% skim of your gross revenue, fired from inside the tax block. Check the Cartel Attacks page if you want to know whether this year is one of the bad ones."
    ],
    importantNumbers: [
      { label: 'When it fires', value: 'Once a year, period 12 (February)' },
      { label: 'Land Tax — small-farm exemption', value: '≤ 10 acres owe nothing' },
      { label: 'Land Tax — ceiling', value: '10% (asymptotic — climbs slowly toward this cap)' },
      { label: 'Land Tax — example at 500 acres', value: 'Well under 5% effective' },
      { label: 'Equipment Tax — fleet < $500,000', value: '1%' },
      { label: 'Equipment Tax — $500,000 to $1M', value: '2%' },
      { label: 'Equipment Tax — $1M to $5M', value: '5%' },
      { label: 'Equipment Tax — $5M to $10M', value: '7%' },
      { label: 'Equipment Tax — > $10M', value: '10%' },
      { label: 'Tax Shelter perk (cap)', value: '50% off the equipment tax bill' },
      { label: 'Land Lawyer perk (cap)', value: '50% off the land tax bill' },
      { label: 'Cartel Audit (when active)', value: '5% of gross revenue, in the same February tick' },
      { label: 'February sequence', value: 'Land + Equipment Tax → Franchise Fee → Dividend Payout → Cartel Audit (if active)' }
    ],
    beginnerAdvice: [
      "The first tax year is the one that catches new players. February shows up faster than expected, and a fresh fleet of financed equipment can drop you into a bigger tax tier than you planned for. Keep a buffer.",
      "If you're under ten acres, there is no land tax — full stop. Equipment Tax still applies, but at the bottom rate it's small. Use those years to grow your fleet deliberately, not just instinctively.",
      "Don't try to dodge the equipment bill by keeping ancient gear. Equipment Tax is on resale value, not condition, and the fleet you own is the bill — there's no clever way to look smaller on paper than you actually are.",
      "If you're approaching a tier line, know which side of it you're going to land on before February. The jump from a 2% bill to a 5% bill at the $1M fleet mark is real money."
    ],
    consoleCommands: [
      { cmd: 'farmPunkStats', note: 'Read-only. Year-over-year revenue, expenditure, and net profit — useful context for previewing how a tax-and-fee February is going to feel.' },
      { cmd: 'farmPunkFranchiseFee', note: 'Read-only. Previews the Cartel Franchise Fee that fires in the same February tick — the other half of the year-end bill.' }
    ],
    fieldNote:
      "Land tax bills the dirt. Equipment tax bills the tools. The franchise fee bills the work. The audit bills the books. February is the month they all show up wearing different uniforms and quote each other's paperwork."
  },
  {
    slug: 'mandatory-financing',
    category: 'Money',
    title: 'Mandatory Financing',
    oneLiner: "The Cartel killed leasing because temporary access gives farmers too much flexibility and too little leverage for the banks. Every major purchase is forced through financing so expansion means debt, paperwork, interest, and another hook in your operation. You can still grow — but every machine you buy comes with someone else's hand on the ledger.",
    status: 'live',
    href: '/field-manual/mandatory-financing',
    version: VERSION,
    related: [
      { slug: 'debt-cap', note: 'Every financed purchase checks the debt cap before going through. Hit it and the deal is refused.' },
      { slug: 'cash-reserve', note: "Every purchase also checks post-down-payment balance against the reserve. Both gates have to clear." },
      { slug: 'credit-rating', note: 'Each tier above F shaves -1% off the rate of NEW loans only. Existing loans keep the rate they were created at.' },
      { slug: 'vanilla-loan', note: 'A separate emergency channel — runs in parallel and does NOT count toward the FarmPunk debt cap.' },
      { slug: 'skills', note: 'Loan Interest cuts the rate. Down Payment Reduction cuts the upfront cost.' },
      { slug: 'cartel-attacks', note: 'Loan Rate Hike, when active, adds +3% to every new loan created during that year.' },
      { slug: 'farmland-surcharge', note: 'Land buys run through the same financing flow with this surcharge added on top.' },
      { slug: 'perks', note: 'Negotiator cuts the farmland surcharge. Generous Banker widens the debt cap.' }
    ],
    summary:
      "FarmPunk's economy is built on the assumption that every working farm in the valley is on the hook to a lender. The lease button is gone — disabled and replaced with a refusal. There is no temporary access to anything that matters. Every new vehicle above a thousand dollars, every placeable building, every parcel of land has to come through a loan: a fifth of the price up front, the rest spread over three years of monthly payments at twelve percent interest, with a contract you can't walk away from. The Cartel doesn't sell you tools. They sell you debt that comes with tools attached.",
    whatItDoes: [
      "Forces every new vehicle and placeable above $1,000, plus every land parcel, through the FarmPunk financing flow. The lease button is dead — clicking it returns a refusal message, not a loan.",
      "Used vehicles bypass financing entirely. They come out of farm cash at full price, no down payment math, no monthly payments, no interest. The same goes for any modifications you do at the workshop — those use the vanilla payment path.",
      "Pallets, big bags, big-bag pallets, and IBCs are paid in cash up front regardless of price. They're categorically excluded from financing — you owe the full price the moment you buy.",
      "Every financed purchase has a 20% down payment by default and an 80% loan. The down payment comes out of your cash on the spot. The loan is on a 36-month schedule (three years), with the monthly payment fixed at the moment the loan is created.",
      "Base interest is 12%. Skills, credit rating, and one Cartel attack all push that rate around. The Loan Interest skill knocks half a percent off per level, up to -5% at L10. Each credit rating tier above F shaves another 1% off, up to -5% at A. The rate floors at 0% — the Cartel won't let you borrow at a profit, but they'll stop charging interest if you've earned it. If the Cartel rolled the Loan Rate Hike attack on you this year, every new loan gets +3% added on top.",
      "The interest rate is locked at the moment the loan is created. Existing loans never reprice. Finance a combine at 9% in March and your credit rating climbs to A in April, the new rate only applies to your next loan — the combine keeps its 9% for its full term. The same goes the other way: a downgrade doesn't make existing payments more expensive.",
      "Every purchase has two pre-purchase gates that have to clear before the deal goes through. The Debt Cap blocks the buy if your total active debt plus the new loan would exceed your ceiling. The Minimum Cash Reserve blocks the buy if the down payment would leave you below three months of obligations. Either gate failing kills the purchase — see those pages for the math."
    ],
    whyItMatters:
      "Financing is the engine that powers the Cartel's grip. In the base game, leasing means a clever player can rent a combine for a season and walk away clean. FarmPunk closes that door so growth has to happen on credit, on a schedule, with interest, and with an asset that can't be sold once it's yours. Every new machine becomes a permanent line item on the books. Every expansion adds another monthly payment to the next year's reserve calculation. The Cartel isn't trying to keep you broke — they're trying to keep you obligated.",
    howYouProgress: [
      "Buy used when you can. Used vehicles skip financing entirely — they're a cash purchase, no down payment, no interest, no monthly payment cluttering the reserve calc. Every used machine you can find is a cleaner deal than the same machine new.",
      "Pour scrip into Loan Interest and Down Payment Reduction skills as soon as you have it. Loan Interest stacks with the credit rating discount, so a maxed skill plus an A rating bottoms the rate out at 2%. Down Payment Reduction is a flat discount on the upfront cost — at the cap you pay 8% upfront with the loan still at 80% of price, so the missing 12% is real money saved, not deferred into the loan.",
      "Climb the Credit Rating ladder. The rating moves once a year — up if you survived the year without your balance ever going negative, down the instant a transaction tips you under zero. Read the Credit Rating page before you take a big swing.",
      "Time your purchases. The interest rate is locked at the moment the loan is created. If a level-up or rating climb is one sale away, finishing the sale before financing the tractor is real money over the life of the loan. The same logic runs in reverse for the Loan Rate Hike Cartel attack — if it's active this year, holding off on a new combine until next March can save thousands."
    ],
    importantNumbers: [
      { label: 'Lease button', value: 'Disabled. Replaced with a refusal.' },
      { label: 'Financed-purchase threshold', value: 'New vehicles and placeables above $1,000, every land parcel' },
      { label: 'Cash-only categories', value: 'Used vehicles, workshop modifications, pallets, big bags, big-bag pallets, IBCs' },
      { label: 'Default down payment', value: '20%' },
      { label: 'Default loan portion', value: '80%' },
      { label: 'Base interest', value: '12%' },
      { label: 'Loan term', value: '3 years (36 monthly payments)' },
      { label: 'Total owed on a new loan', value: 'principal × (1 + rate)' },
      { label: 'Monthly payment', value: 'floor(principal × (1 + rate) / 36)' },
      { label: 'Loan Interest skill (cap)', value: '-0.5% per level · -5% at L10' },
      { label: 'Down Payment Reduction skill (cap)', value: 'Down payment falls 20% → 8% at L10 (real cash saved, not deferred into the loan)' },
      { label: 'Credit Rating discount range', value: '0% at F → -5% at A (-1% per tier above F)' },
      { label: 'Best-case rate floor', value: '2% (A rating + L10 Loan Interest skill)' },
      { label: 'Loan Rate Hike (Cartel attack, when active)', value: '+3% on new loans for the active year' },
      { label: 'Pre-purchase gates', value: 'Debt Cap and Minimum Cash Reserve must both clear' }
    ],
    beginnerAdvice: [
      "Read the loan summary before every big purchase. Open the dealer's pad knowing exactly what your monthly payments already look like — `farmPunkLoanSummary` prints them all in one place, with debt cap status alongside.",
      "Don't drain your account on the down payment. The Minimum Cash Reserve gate will block the deal anyway — but more importantly, the same purchase that clears the gate by a dollar is the purchase that takes one bad month to push you negative and downgrade your credit rating.",
      "Used equipment is the cheap escape hatch in FarmPunk. Used vehicles aren't financed and don't add to your monthly obligations. A scruffy used combine in a year you can't afford a financed one is the difference between a bad season and a defaulted year.",
      "Workshop modifications aren't financed. If you bought a tractor stripped down because you couldn't afford the loaded version, you can come back later and add the configuration through the workshop on cash terms — no new loan, no new monthly payment.",
      "The interest you'll pay on a loan is the rate at the moment you click Buy. There is no rate-shopping after the fact. If you're one level-up away from a cheaper loan, finish the level."
    ],
    consoleCommands: [
      { cmd: 'farmPunkLoanSummary', note: 'Read-only. Every active loan with principal, remaining balance, monthly payment, progress, and current debt cap status.' },
      { cmd: 'farmPunkBuyVehicle', note: 'Finance the vehicle currently configured in the shop, as an alternative to clicking Buy.' },
      { cmd: 'farmPunkBuyLand <farmlandId>', note: 'Finance a specific land parcel by ID. Same gates and surcharge as the in-map purchase flow.' },
      { cmd: 'farmPunkReserveSummary', note: 'Read-only. Current cash reserve requirement and whether the farm balance currently meets it.' }
    ],
    fieldNote:
      "The Cartel doesn't actually own most of what's on your farm. They own the paper that says you owe them for it — and the paper outlives the tractor."
  },
  {
    slug: 'debt-cap',
    category: 'Money',
    title: 'Debt Cap',
    oneLiner: "A ceiling on how much total debt the Cartel will let you carry, calculated from your land value, equipment value, and current cash balance.",
    status: 'live',
    href: '/field-manual/debt-cap',
    version: VERSION,
    related: [
      { slug: 'mandatory-financing', note: 'Every financed purchase checks the cap before going through.' },
      { slug: 'cash-reserve', note: 'Both are pre-purchase gates — the cap measures total debt, the reserve measures liquidity after the deal.' },
      { slug: 'perks', note: 'Generous Banker widens both multipliers — up to 30% extra room at the cap.' },
      { slug: 'vanilla-loan', note: 'The vanilla emergency loan is a separate channel and does NOT count toward this cap.' },
      { slug: 'farmland-surcharge', note: 'Land buys clear the cap and the surcharge in the same gate sequence.' }
    ],
    summary:
      "Every farm in FarmPunk has a hard ceiling on how much active debt it can carry, and the Cartel checks that ceiling at the cash register every single time. The cap isn't a trust score or a credit grade — it's a formula on what your farm is actually worth. Land you own counts. Equipment you own counts. Cash sitting in your account counts. Anything above that line, the Cartel won't lend on. The bigger your operation, the bigger the cap. The smaller your operation, the smaller the rope. There is one minimum floor for new farms with nothing to their name, and one perk that bends the formula — past those, the cap moves only when the underlying farm does.",
    whatItDoes: [
      "Caps the total active FarmPunk debt your farm can carry. Every financed purchase checks whether your current debt plus the new loan would exceed the cap. Past it, the Buy button refuses the deal — no override, no exception.",
      "The cap is computed from three pieces of the farm at the moment of purchase: 25% of land value, plus 20% of equipment value, plus your current cash balance. Whatever the formula returns is your active ceiling.",
      "There is a minimum floor of $100,000. A brand-new farm with no land and no fleet is still allowed to take on at least that much, so the financing system isn't dead on day one.",
      "Cash on hand directly raises the cap. Selling a year's wheat means the cap is bigger right after the sale than right before it — the same money that increased your balance also increased your borrowing room.",
      "The vanilla emergency loan does NOT count toward this cap. It runs on its own separate ceiling and its own separate ruleset. Stacking the two is allowed; just know they're two different lenders watching different ledgers.",
      "Generous Banker is the one perk that bends the formula. Each occurrence boosts both multipliers by 3%. At the cap of ten occurrences, the land multiplier climbs from 0.25 to 0.325 and the equipment multiplier climbs from 0.20 to 0.26 — about 30% more debt room across the board, on the same farm."
    ],
    whyItMatters:
      "The cap is the reason expansion in FarmPunk feels structured rather than freewheeling. You can't lever yourself into a fleet of combines on a tiny plot — the math won't allow it. To borrow more, you have to be worth more first, which means buying small, growing the asset base, and letting the cap climb behind you. It's also one of two pre-purchase gates working in tandem with the Minimum Cash Reserve. The cap asks 'do you have collateral?' The reserve asks 'can you cover the next three months?' A purchase has to clear both. Either gate failing means no deal.",
    howYouProgress: [
      "Grow the asset base. Every acre you buy raises the land-value side of the formula by its full price × 0.25. Every machine on your fleet raises the equipment-value side by its sell price × 0.20. The cap climbs as the farm grows — there's no menu, no upgrade, no pacing. It just tracks.",
      "Stack cash before a big purchase. Cash on hand is part of the cap formula at face value, so $50,000 in the bank means $50,000 of additional borrowing room, dollar for dollar. A profitable harvest right before a big financed deal is more valuable than the same harvest right after.",
      "Pick up Generous Banker on the Farmer Prestige perk rotation. Each occurrence widens both multipliers; at the cap, the formula effectively gives you 30% more rope on the same farm. It's one of the most quietly impactful perks for serious expansion runs.",
      "Let active loans pay themselves down. The cap measures active debt, so as a loan's remaining balance shrinks month by month, the debt side of the gate eases up — without you doing anything beyond letting the schedule run."
    ],
    importantNumbers: [
      { label: 'Formula', value: '(land value × 0.25) + (equipment value × 0.20) + current balance' },
      { label: 'Minimum guaranteed cap', value: '$100,000' },
      { label: 'Land multiplier (default)', value: '0.25' },
      { label: 'Equipment multiplier (default)', value: '0.20' },
      { label: 'Generous Banker (per occurrence)', value: '+3% to both multipliers' },
      { label: 'Generous Banker (occurrence cap)', value: '10' },
      { label: 'Land multiplier with Generous Banker capped', value: '0.325' },
      { label: 'Equipment multiplier with Generous Banker capped', value: '0.26' },
      { label: 'Vanilla emergency loan', value: 'Separate channel — does NOT count toward this cap' },
      { label: 'Equipment value source', value: 'Sum of sell prices for every owned vehicle' }
    ],
    beginnerAdvice: [
      "Run `farmPunkLoanSummary` before any big shop trip. The print-out includes your current debt cap status, so you know how much room you actually have before getting to the Buy button.",
      "Cash inflates the cap. If a purchase is just barely getting refused, sell a couple of trailer-loads of grain first — the same dollars that hit your account also hit your borrowing room.",
      "If the cap is choking you, look at the asset side, not the cash side. A small operation with $40,000 in the bank still has the $100,000 floor, but a small operation that buys two more parcels of land has lifted the ceiling permanently.",
      "Generous Banker won't show up the moment you start playing, but it's worth recognizing when it does. A 30% wider cap on the same farm changes what 'serious expansion' even means."
    ],
    consoleCommands: [
      { cmd: 'farmPunkLoanSummary', note: 'Read-only. Every active loan plus current debt cap status — the easiest way to see exactly how much room is left before the gate refuses a purchase.' },
      { cmd: 'farmPunkReserveSummary', note: 'Read-only. The other pre-purchase gate. Worth checking together with the cap before any major financed deal.' }
    ],
    fieldNote:
      "The Cartel won't lend on a dream. They'll lend on what you've already got — and only enough to make sure they can still take it back."
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
      { slug: 'crop-mastery', note: 'Mastery Catalyst perk speeds up per-crop fame gain.' },
      { slug: 'rust-and-raiders', note: 'Insurance Policy + Guard Dogs perks reduce theft and vandal pain.' },
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
      { slug: 'rust-and-raiders', note: "Goon Visit wrecks one tractor regardless of shelter — it's the only attack storage can't block." },
      { slug: 'mandatory-financing', note: 'Loan Rate Hike adds +3% to new loans for the active year.' },
      { slug: 'valley-liberation', note: 'Owning all 100 shares with no Warchest = peak harassment.' }
    ]
  }
];

// ── Stubs — shipped, but no deep wiki page yet ──────────────────
export const STUBS: CatalogEntry[] = [
  // RPG & Progression
  // Resistance
  // (Shares, Dividends, and Black Markets are full dossiers — see MECHANICS above.)

  // Production & Markets
  // (Crop Licensing, Crop Novelty, Crop Spoilage, and Weather are full
  // dossiers — see MECHANICS above.)

  // Money & Credit
  // (Annual Taxes, Mandatory Financing, and Debt Cap are full dossiers — see MECHANICS above.)
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
    slug: 'asset-sell-block', category: 'Money', title: 'Deadweight Inventory',
    oneLiner: "The Cartel locks every vehicle, building, and acre into your operation the moment you buy it, turning bad purchases into permanent weight. Backroom Dealers is the only escape hatch, and even then you only get a few quiet sales a year — so buy like you mean it, because you might be building a museum with working hydraulics.",
    status: 'pending', version: VERSION,
    related: [
      { slug: 'perks', note: 'Backroom Dealers perk is the only way around it — N sells per year.' },
      { slug: 'rebel-supply-chain', note: "Reward vehicles can't be sold either — museum doctrine applies." }
    ]
  },
  {
    slug: 'no-generators', category: 'Money', title: 'Energy Dependence',
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
