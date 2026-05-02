# FarmPunk — Farming Simulator 25

FarmPunk is an economic realism and RPG overhaul for Farming Simulator 25. It layers corporate-style financial pressure, RPG progression, and long-term strategic goals on top of the base game.

---

## Philosophy

The base game gives you a farm. FarmPunk gives you a fight.

Your family worked this valley for generations. Then the war came, the old rules broke, and the only institutions left standing were the corporations ruthless enough to survive. Through debt, racketeering, franchise contracts, and legalized theft, the Cartel squeezed your family out of ownership and left you with one way to stay on the land: run your own farm as their employee.

This is not a cozy sandbox where money flows freely and expansion is painless. Every acre has a cost. Every machine comes with debt. Every profitable year attracts taxes, fees, licenses, quotas, and pressure from systems designed to keep farmers small, obedient, and dependent.

FarmPunk is about pushing back. You start as a manager trapped inside someone else’s rules: financing equipment, protecting your cash reserve, paying the yearly bill, and proving your farm deserves to survive. But survival is not the endgame. Ownership is.

Buy the shares. Beat the quotas. Master the systems. Build the Warchest. Reclaim your family’s farm, help take back the valley, and turn the Cartel’s own machinery against it.

The land is not just something you purchase.
It is something you take back.

---

## Lore

Your family farm was never supposed to be part of an empire.

For generations, it was just a modest spread in a peaceful valley: good soil, hard seasons, stubborn machinery, and enough honest work to keep the lights on. The farm was not rich. It was not famous. It was not powerful. But it was yours.

Then the war came.

No one rebuilt the old world when it ended. Courts stopped answering. Banks stopped pretending to be neutral. Regulators vanished, retired, or got bought. Town councils became advisory boards. Sheriffs became contractors. The institutions that once kept the powerful in check either collapsed outright or were absorbed by the only things ruthless enough to survive: corporations, cartels, and the paperwork that made their violence look official.

They did not take the valley all at once.

They started with loans.

Then came emergency fees, revised contracts, crop restrictions, equipment liens, market access licenses, franchise obligations, and debt structures no working farmer could ever fully escape. Families who had held land for generations were told they had fallen behind, violated terms, exceeded quotas, or failed to meet new compliance standards written by the same people enforcing them.

By the time your family understood the trap, the trap had already become the law.

The Cartel took ownership of the farm, but they still needed someone to run it. So they offered your family the only deal left: stay on the land as managers, operate under their rules, pay their fees, use their financing, obey their quotas, and be grateful for the privilege of working what used to be yours.

FarmPunk begins there.

You are not a fresh-faced entrepreneur buying a cute plot of land. You are the heir to a stolen farm, trying to survive inside the machine that stole it. Every system around you is designed to keep you productive but dependent: loans that never stop biting, taxes that punish scale, licenses that cap ambition, franchise fees that skim success, and corporate pressure that turns every profitable year into another reason to squeeze harder.

But the Cartel made one mistake.

They left a path back in.

The company that controls your farm can be bought, one share at a time. Every share you claim weakens their legal grip. Every year you survive proves the farm does not need them. Every quota beaten, skill mastered, machine financed, and field harvested turns their own system against them.

But taking back your farm is only half the fight.

The valley is still under their thumb. Your friends, neighbors, family, and every remaining independent farmer are still trapped in the same web of debt, intimidation, market control, and bought institutions. The Cartel leans on banks to bury loans. It corners buyers to crush prices. It sends vandals when paperwork fails. It uses fear where contracts are not enough.

That is why the Reclamation Warchest exists.

The Warchest is money you will never get back. It is not savings. It is not profit. It is not a rainy-day fund. It is resistance capital: legal pressure, sabotage defense, community relief, underground logistics, guards, organizers, mechanics, scouts, whistleblowers, and the quiet network of people who make the Cartel’s control harder to enforce.

As your ownership grows, the Cartel gets angrier. They know what you are doing. You are not merely paying bills. You are buying them out from underneath themselves. Their attacks escalate because every share is a threat.

As the Warchest grows, their attacks lose power. Their vandals get blocked. Their thieves get exposed. Their influence over banks weakens. Their grip on local markets slips. Their threats against your family and friends stop landing in isolation. The valley starts to remember that fear only works when everyone believes they are alone.

FarmPunk is the story of turning survival into ownership, and ownership into rebellion.

Buy the shares.  
Build the Warchest.  
Reclaim your family’s farm.  
Help take back the valley.

The land was never theirs.

It was only occupied.

---

## Win Condition

FarmPunk is not about getting rich.

It is about taking back what was stolen.

The Cartel did not beat your family with one weapon. They used debt, contracts, taxes, franchise fees, market control, and fear. Reclaiming the valley means beating them on both fronts: ownership and resistance.

To win, you must complete both endgame goals:

**1. Buy All 100 Shares**

Shares represent legal ownership of the company that now controls your family’s farm.

Each share you buy weakens the Cartel’s grip. Each share cuts deeper into the Franchise Extortion Fee. At 100 shares, the farm is yours again — not as a tenant, not as a manager, not as a franchise operator, but as the rightful owner.

Buying every share means you have reclaimed your family’s farm.

**2. Fill the Reclamation Warchest**

The Warchest is bigger than your farm.

Every dollar deposited is gone forever, funneled into the long fight to free the rest of the valley: legal pressure, sabotage defense, community relief, underground logistics, anti-Cartel organizing, and whatever else it takes to break the system that kept everyone dependent.

Filling the Warchest means you are no longer just surviving the Cartel.

You are funding the valley’s way out.

**True Victory**

You win FarmPunk when:

- All 100 shares are owned
- The Reclamation Warchest reaches $1,000,000,000

Ownership takes back your farm.
The Warchest helps take back the valley.

Do both, and the Cartel does not just lose control of you.

It loses control of the land.

---

## Features

### ✅ Complete

---

**Annual Taxes**

Fires at period 12 (February, the last period before the game advances the year). Tax is assessed once per year only.

*Land Tax*
- Land value is computed as `totalAcres × (pricePerHa / 2.47105)`, where `pricePerHa` is pulled from `g_farmlandManager:getPricePerHa()` at the time of assessment.
- Land tax rate uses an exponential curve: `rate = 0.10 × (1 − e^(−(acres − 10) / 1200))`
- Farms with ≤ 10 acres owe no land tax. The rate climbs asymptotically toward the 10% ceiling; the scale factor of 1200 means it rises gradually — a 500-acre farm is well under 5%.
- Land tax amount = `floor(landValue × rate)`

*Equipment Tax*
- Equipment value = sum of `getSellPrice()` for all vehicles owned by the farm.
- Tax rate is a step function:

| Fleet Resale Value | Rate |
|--------------------|------|
| < $500,000         | 1%   |
| $500k – $1M        | 2%   |
| $1M – $5M          | 5%   |
| $5M – $10M         | 7%   |
| > $10M             | 10%  |

- Equipment tax amount = `floor(equipmentValue × rate)`

*Total*
- `tax = floor(landTax + equipmentTax)` deducted from farm balance via `addMoney(-tax)`.
- A HUD side notification shows the full breakdown: land amount, acreage, land rate, equipment amount, fleet value, equipment rate, and total.

*Cartel Franchise Extortion Fee*

The lore: the player lost the farm to the The Cartel and now leases it back via a franchise agreement. The fee is The Cartel's cut for letting the player keep working their own land. Each share owned represents 1% ownership and shaves 1% off the fee — buying back the farm is the only escape.

- Progressive on annual revenue (US tax bracket style — each bracket's rate applies only to the portion of revenue inside it). Pulled from `AgriCorpStats.history[currentYear].revenue`, the same source `AgriCorpWallet` reads for the bonus. Revenue means *gross inflows* (crop sales, contracts, dividends, etc.) — not net profit, not after expenses.
- Brackets:

| Revenue Bracket          | Rate |
|--------------------------|------|
| < $50,000                | 0%   |
| $50,000 – $250,000       | 5%   |
| $250,000 – $500,000      | 8%   |
| $500,000 – $1,000,000    | 12%  |
| $1,000,000 – $5,000,000  | 15%  |
| > $5,000,000             | 20%  |

- Worked example at $6,000,000 revenue: `0 + (200k × 5%) + (250k × 8%) + (500k × 12%) + (4M × 15%) + (1M × 20%) = $890,000` gross (≈14.83% effective).
- Share reduction: `reductionPct = min(1, sharesOwned × 0.01)`. `netFee = floor(grossFee × (1 − reductionPct))`. At 20 shares the $890k bill becomes $712,000; at 100 shares it zeros out entirely.
- Net fee deducted via `addMoney(-netFee, farmId, MoneyType.OTHER, false, true)` immediately after the land+equipment block in the same period-12 tick. Skipped when `netFee == 0` (no point in a no-op transaction).
- A separate `CRITICAL` HUD side notification fires with revenue, gross fee, shares owned + reduction %, and net fee. Two cards rather than one — the franchise fee earns its own visual beat.
- Composition (emergent, no explicit coordination):
  - Goes through `addMoney`, so `AgriCorpStats` records it as expenditure for the year.
  - Goes through `addMoney`, so `AgriCorpCredit`'s negative-balance hook watches it — a franchise fee that pushes balance below zero triggers the credit downgrade flag the same way any other transaction does.
- Console: `farmPunkFranchiseFee` previews the current year's fee with bracket-by-bracket breakdown, share reduction, gross/net, and effective rate. Read-only — does not assess or deduct.
- Land Tax and Equipment Tax remain distinct from the franchise fee. Lore-wise they're scale pressure that bites in low-revenue years (when the franchise fee is small or zero) and at high share counts (when the franchise fee is reduced or zero) — keeping the player from coasting on either escape valve.

---

**Debt & Financing System**

All new vehicle and placeable purchases above $1,000, and all land purchases, require financing. The lease button is disabled and replaced with an error message.

*Loan Terms*
- Down payment: 20% of purchase price (floored to whole dollars).
- Loan amount: remaining 80%.
- Interest: 12% base, reduced by the `loanInterest` skill (-0.5%/level) and the `Credit Rating` (-1%/tier above F). Floor 0%. Rate is captured at loan creation; existing loans aren't repriced when the skill levels up or the rating changes. Total owed = `principal × (1 + rate)`.
- Term: 3 years (36 monthly payments).
- Monthly payment = `floor((principal × (1 + rate)) / 36)`.
- Loan terminates when `remaining ≤ 0` (balance-based, not payment-count based — rounding residue is absorbed on the last payment).

*Purchase Flow — New Vehicles*
- Intercepts `ShopConfigScreen.updateButtons`. The Buy button callback is replaced with FarmPunk's financing flow on every screen refresh.
- Used vehicles (`self.saleItem ~= nil`) bypass financing and fall through to the vanilla callback.
- Vehicle modifications via the workshop Modify flow (`self.vehicle ~= nil`) also fall through to the vanilla callback.
- Non-financeable categories (BIGBAGPALLETS, BIGBAGS, PALLETS, IBC) are purchased with cash up front — no loan created.
- On confirm: down payment deducted from balance, vehicle spawned free of charge at the store spawn point, loan record created.

*Purchase Flow — Placeables (Buildings)*
- Intercepts `ConstructionScreen.onButtonPrimary`. Only fires for placement brushes with `requiredPermission == "buyPlaceable"`.
- Total price = store item price + terrain displacement cost.
- On confirm: the full loan amount is temporarily credited to the farm so the engine can deduct the full price without blocking. The original placement function runs, then a loan is created for the loan amount. Net cash effect = −downPayment.

*Purchase Flow — Land*
- Intercepts `InGameMenuMapFrame.update` to replace the "button_buy" context action callback.
- Shows a confirmation dialog with price, down payment, surcharge, total upfront, and loan amount before committing.
- Ownership transfer via `g_farmlandManager:setLandOwnership()`.

*Purchase Blockers (apply to all purchase types)*
1. **Debt cap**: `totalDebt + loanAmount > maxDebt` blocks the purchase.
2. **Minimum cash reserve**: `balance − downPayment < reserve` blocks the purchase. For land, the check uses `balance − (downPayment + surcharge)`.

---

**Debt Cap**

The maximum allowable outstanding debt scales with farm size:

`maxDebt = (landValue × 0.25) + (equipmentValue × 0.20) + currentBalance`

Minimum guaranteed cap: $100,000. This means a new farm can always take on some debt even with no assets.

---

**Minimum Cash Reserve**

A rolling floor on farm balance, enforced at every purchase.

`reserve = monthlyObligations × 3`

Monthly obligations = sum of all active loan monthly payments + vehicle upkeep for every owned vehicle. Vehicle upkeep per vehicle = `storeItem.price × 0.001`.

A purchase is blocked if `balance − downPayment < reserve`. For land, the surcharge is included in the downward pressure: `balance − (downPayment + surcharge) < reserve`.

---

**Farmland Purchase Surcharge**

A FarmPunk acquisition fee charged upfront at the time of land purchase. The fee is based on acres already owned at the moment of purchase (before the new parcel is added).

| Acres Owned Before Purchase | Surcharge Rate |
|-----------------------------|----------------|
| < 25                        | 2%             |
| 25 – 49                     | 4%             |
| 50 – 99                     | 7%             |
| 100 – 249                   | 11%            |
| 250 – 499                   | 16%            |
| 500 – 999                   | 22%            |
| 1,000 – 1,999               | 30%            |
| 2,000+                      | 40%            |

Surcharge = `floor(landPrice × rate)`. Deducted from balance directly (not added to the loan). Reserve check includes the surcharge.

---

**Credit Rating**

Six-tier rating (F → A) attached to your farm. Drops one tier the moment the farm balance dips negative; gains one tier at year-end if you made it through clean. Each tier above F shaves 1% off the interest rate on **new** loans (existing loans keep the rate they were created at).

*Tier ladder (worst → best)*
| Rating | Discount | Effective base rate (no skill) |
|--------|----------|--------------------------------|
| F      | 0%       | 12%                            |
| E      | -1%      | 11%                            |
| D      | -2%      | 10%                            |
| C      | -3%      | 9%                             |
| B      | -4%      | 8%                             |
| A      | -5%      | 7%                             |

Stacks with the `loanInterest` skill (-0.5%/level, max -5% at L10). At the floor — Rating A + L10 loanInterest — new loans bottom out at **2% interest**. The bank still gets its cut.

*Asymmetric resolution timing*
- **Downgrade fires immediately.** The moment farm balance goes below 0 (detected in the post-call `FSBaseMission.addMoney` hook), the rating drops one tier on the spot. The new (worse) rate takes effect on the very next loan — default in month 3, finance a tractor in month 4, that loan locks in the downgraded rate.
- **Upgrade fires at period 1** of the new year, only if the player made it through the previous year without defaulting. Period 1 chosen deliberately over period 12 — every period-12 financial event (taxes, wallet payout, dividends, spoilage) has settled by then; PERIOD_CHANGED subscriber order is undefined per CLAUDE.md so resolving mid-period-12 would race them.

*Sticky flag (`wentNegativeThisYear`) does two jobs*
- **Mid-year**: gates the immediate downgrade so it only fires once per year. A second default in the same year is a no-op.
- **Period 1**: gates the upgrade so a defaulted year can't be rehabilitated by surviving the rest of it cleanly. If the flag is set when period 1 fires, the upgrade is skipped and the flag is reset for the new year.
- Recovering a positive balance later in the year does NOT clear the flag — the downgrade you just took stands.
- Flag persists across save/load (in `agricorp_credit.xml` alongside the rating). A mid-year save with the flag set reloads with the flag set; the period-1 handler still skips the upgrade correctly.

*HUD notifications*
- **Mid-year default**: `CRITICAL` side notification fires immediately on the tick balance crosses zero — `CREDIT DOWNGRADED — X → Y. Farm balance went negative. New loans now charge Z% interest.` At-floor (already F) version replaces the rating-arrow with "no further downgrade."
- **Period 1, clean year**: `OK` side notification — `Credit Rating: X → Y (UPGRADE — clean year). New loans: Z% interest.` Or "X maintained (already at top)" if at A.
- **Period 1, defaulted year**: `OK` side notification — `Credit Rating: X (no upgrade — defaulted this year). New year — clock reset.` Acknowledges the year ended without rehabilitation.

*Defaults*
- Fresh save starts at F. F → A is at minimum a 5-year clean-balance climb.
- Console: `farmPunkCredit` (read-only summary — current rating, year-to-date flag, current effective new-loan rate, tier ladder), `farmPunkSetCredit <A-F>` (testing tool — sets rating and clears the year flag).

---

**Vanilla Loan Override (Emergency Payday Advance)**

The base game's loan system stays in place as a deliberate emergency channel — but with the cap clamped flat to **$50,000** and the periodic interest deduction triple the vanilla rate. Use only when you have to. Stacking FarmPunk financing on top of vanilla-loan principal is a double-whammy.

*Cap*
- Engine's dynamic per-farm loan max (normally scales 80% of land value, $500k-$3M range) is replaced by a flat `$50,000`. Doesn't scale with farm size, doesn't grow.
- Wraps `Farm:updateMaxLoan` (documented method): after the vanilla recalc runs, the resulting max-loan field on the farm is clamped to `$50,000`. The bank UI reads that field for its slider, so the slider's upper bound is now $50k regardless of farm value.
- Field name (`loanMax` / `maxLoan` / `maxLoanAmount`) isn't documented on GDN. The wrap shotguns the candidates and clamps whichever exists. `farmPunkProbeFarm` dumps every numeric field on the farm if a future engine version moves the field to a name we don't cover.
- Initial pass: a one-shot deferred poll in `AgriCorp:update` calls `farm:updateMaxLoan()` on the **player's farm only** once `g_farmManager.farms` is populated, so the cap takes effect immediately on load (without waiting for the engine to trigger its own recalc). pcall'd defensively. Iterating every farm in `g_farmManager.farms` was the original approach but it crashed in vanilla `Farm.lua:568` ("attempt to index nil with 'price'") — the table includes the spectator farm (id 0) and partially-initialized AI farms whose asset state isn't safe to recalc. The engine itself only calls `updateMaxLoan` on real farms during loan/asset events; our class-level wrap handles those naturally.

*Interest scaling*
- Vanilla periodic interest deduction fires through `addMoney` with `MoneyType.LOAN_INTEREST`. Our existing addMoney hook chain (alongside Stats and Credit) intercepts these specific transactions and fires an additional 2x deduction with the same MoneyType — net effect: **3x vanilla**. Recursion-guarded so the extra deduction doesn't itself get scaled.
- Re-entrant call goes through the wrapped `addMoney` chain (not the captured original), so Stats correctly records the full 3x as expenditure and Credit's negative-balance detection observes the post-call balance. If a vanilla interest payment tips the farm below zero, the credit downgrade flag gets set the same way as any other transaction — the systems compose without explicit coordination.

*Composition with the rest of FarmPunk*
- **Does NOT count toward FarmPunk's debt cap** (`AgriCorpFarmData.getMaxDebt`). Vanilla loan is a separate emergency channel, not part of the strategic debt picture.
- **Does NOT interact with the `loanInterest` skill or Credit Rating discount** on the rate side. Those reduce FarmPunk financing only. Vanilla rate stays at 3x vanilla regardless of skill or rating.
- **DOES** trigger Credit Rating downgrade if the interest deduction pushes balance negative — emergent, not coordinated. Credit Rating watches every `addMoney`; a vanilla interest payment that pushes you under zero behaves identically to any other negative-pushing transaction.

*Console*
- `farmPunkVanillaLoan` — read-only summary: cap, interest multiplier, current vanilla loan amount (via `Farm:getLoan`), engine-reported max (which should now read $50k after our clamp), vanilla daily interest (via `Farm:calculateDailyLoanInterest`), and the effective 3x daily.
- `farmPunkProbeFarm` — diagnostic, dumps every numeric field on the player's farm. Use to verify the max-loan field name if `farmPunkVanillaLoan` reports "engine-reported max" as missing.

---

**Annual Profit & Expenditure Tracking**

Wraps `FSBaseMission.addMoney`. Every call that affects the player's farm is intercepted:
- Positive amounts → revenue for the current year.
- Negative amounts → expenditure for the current year (absolute value).

This captures all inflows and outflows: crop sales, contract payments, loan payments, down payments, taxes, surcharges, and any other vanilla money events. Data is stored per-year in the stats history (`AgriCorpStats.history`).

`getAverageProfit(n)` returns the floor average of the last n *completed* years only (excludes the current in-progress year).

`getAnnualProfit(year)` = `revenue − expenditure` for that year.

---

**Farmer Wallet — Scrip**

A secondary currency (scrip) separate from farm cash. Used to purchase skills and shares. Cannot be exchanged for farm cash.

Annual payout fires at period 12 alongside the tax bill:
- **Base salary**: 10 scrip, always paid.
- **Annual bonus**: `floor(currentYearProfit × 0.001)` scrip. Uses `getAnnualProfit(currentYear)` — the in-progress year's profit at the moment of payout. Negative profit yields 0 bonus (clamped).

Example: a year with $500,000 net profit yields 10 + 500 = 510 scrip. Share dividends are paid in **farm cash** at period 12, not scrip — see the Shares System for details.

---

**Shares System**

100 total FarmPunk shares available for purchase. Shares are bought with scrip, not farm cash. Owning all 100 shares is the primary end-game goal — and the only way to fully escape the Cartel Franchise Extortion Fee.

*Purchase Eligibility*
Gated by 3-year average **revenue** of completed years (`getAverageRevenue(3)`). Tiers are aligned to `AgriCorpAnnualTaxes.FRANCHISE_BRACKETS` — the bracket the cartel is taxing the farm in determines how many shares the player can buy to fight back. Revenue (not profit) is used so the franchise fee doesn't suppress the escape valve via the `addMoney` → expenditure → profit feedback loop.

| 3yr Avg Revenue | Franchise bracket | Max Shares Per Year |
|-----------------|-------------------|---------------------|
| < $50,000       | 0% (untaxed)      | 0 (ineligible — no fee, no escape needed) |
| ≥ $50,000       | 5%                | 1                   |
| ≥ $250,000      | 8%                | 2                   |
| ≥ $500,000      | 12%               | 3                   |
| ≥ $1,000,000    | 15%               | 4                   |
| ≥ $5,000,000    | 20%               | 5                   |

Per-year purchase counter (`sharesThisYear`) resets at period 1 (March, start of new year).

*Share Pricing*
- Farm value = `landValue + cash + (equipmentValue × 0.5) − totalDebt`
- Base price = `floor(farmValue / 100)`
- Ownership premium: each share already owned inflates the next share's price by 10%: `sharePrice = floor(basePrice × (1 + owned × 0.10))`
- Within-year multiplier: buying multiple shares in the same year gets progressively more expensive: `yearMultiplier = 1 + (sharesThisYear × 0.5)`. First purchase this year = 1×, second = 1.5×, third = 2×, etc.
- Final cost = `floor(sharePrice × yearMultiplier)` scrip

*Dividends*

Paid at period 12 in **farm cash** (not scrip). Per-share rate is gated on **lifetime franchise fees assessed** (gross — what the cartel BILLED you, not what you actually paid after share reduction). Lore reframe: the cartel's franchise ledger records every dollar they tried to take. The longer that ledger gets, the more they're forced to recognize your stake — and the bigger the per-share dividend they cough up. Using gross (assessed) instead of net (paid) means buying out to 100 shares doesn't soft-lock the dividend tier — the cartel keeps assessing the fee, the player just doesn't owe any of it, and the ledger keeps growing.

Tier table (`AgriCorpAnnualTaxes.DIVIDEND_GRADES`):

| Lifetime Fees Assessed | Tier | Dividend Per Share |
|------------------------|------|--------------------|
| $0 – $250k             | 1    | $2,000             |
| $250k – $750k          | 2    | $2,700             |
| $750k – $1.5M          | 3    | $3,500             |
| $1.5M – $3M            | 4    | $4,800             |
| $3M – $5M              | 5    | $6,000             |
| $5M – $8M              | 6    | $7,500             |
| $8M – $12M             | 7    | $8,800             |
| $12M+                  | 8    | $10,000            |

Annual payout = `dividendPerShare × sharesOwned`, deposited via `addMoney(+payout, farmId, MoneyType.OTHER, false, true)`. Skipped entirely when `sharesOwned == 0` (no card, no transaction). Pays regardless of profit — flat per-share, not profit-multiplied.

*Sequencing within period 12*

The franchise fee fires first; the dividend is paid at the **previous** tier (this year's gross fee counts toward NEXT year's tier — there's no same-tick boost from a big fee). Then `lifetimeFranchiseFees += grossFee`. If that increment crosses a threshold, a separate `CRITICAL` HUD card announces the upgrade — "Dividend Tier Upgraded — N → N+1 — takes effect with next year's dividend."

Order is enforced by co-locating the dividend payout in `AgriCorpAnnualTaxes.onPeriodChanged` (rather than `AgriCorpShares.onPeriodChanged`) — both modules subscribe to `MessageType.PERIOD_CHANGED` and the engine's subscriber callback order is undefined, so we move the dividend block next to the franchise block to make the read-old / write-new ordering deterministic. `AgriCorpShares.onPeriodChanged` keeps only the period-1 reset of `sharesThisYear`.

*Composition with the rest of FarmPunk*

- The dividend `addMoney(+payout)` flows through `AgriCorpStats`'s revenue capture, so dividends count as revenue for the year. At max tier (100 shares × $10k = $1,000,000/year), the dividend by itself can push the player into a higher franchise fee bracket. Intentional: dividends are real revenue, taxed like everything else. Composition is self-balancing — at 100 shares the franchise fee is $0 anyway, so the bracket push has no cash effect, just a ledger contribution toward future tier crossings (which aren't possible past tier 8 — the table caps).
- Lifetime fund persists in new save file `agricorp_annualtaxes.xml` (single root attribute). `AgriCorpAnnualTaxes` previously had a stub `onSave` and no `onLoad`; both are now real and `onLoad` is wired into the `AgriCorp.onMissionLoaded` lifecycle.
- Console: `farmPunkShares` summary now includes lifetime fund, current tier, next-tier threshold + delta needed, and projected payout. `farmPunkFranchiseFee` preview also includes lifetime fund + tier info + projected tier after this year's gross. New testing console `farmPunkForceFranchiseFund <delta>` adds `<delta>` to `lifetimeFranchiseFees` directly (no fee assessed, no money moved); paired with `farmPunkForceShares <delta>` for verifying tier transitions at known share counts without grinding 12+ in-game years.

---

**Manager Skill System**

A growing skill tree of farm, finance, storage, weather, and vehicle upgrades. Each skill has 10 levels and is purchased with scrip via `farmPunkBuySkill <skillName>`. Skills are applied on every period change and to newly added vehicles.

*Cost Table (scrip per level)*
| Level | 1  | 2  | 3  | 4  | 5  | 6  | 7   | 8   | 9   | 10  |
|-------|----|----|----|----|----|----|-----|-----|-----|-----|
| Cost  | 10 | 15 | 25 | 35 | 50 | 75 | 110 | 160 | 240 | 350 |

*Skills*

**Crop Yield** (`cropYield`)
- Multiplier = `1 + (level × 0.10)`. Level 10 = +100% yield.
- Applied to `fruitType.literPerSqm` for every entry in `g_fruitTypeManager.fruitTypes`. Original values captured on first application and used as the baseline for all subsequent level calculations — levels are never stacked on top of each other.

**Sale Price** (`salePrice`)
- Multiplier = `1 + (level × 0.10)`. Level 10 = +100% sale price.
- Applied to `fillTypePrices`, `originalFillTypePrices`, and `originalFillTypePricesUnscaled` at every selling station in `g_currentMission.economyManager.sellingStations`. Original unscaled prices captured on first application.

**Boutique** (`boutique`)
- Additively amplifies the Crop Novelty tier multipliers — does nothing on its own; only crops with an active novelty boost feel it.
  - Tier 1 (`+15%`, didn't sell last year): `noveltyMult = BOOST_GAP_2 + (level × 0.01)`. Level 10 → `1.15 + 0.10 = 1.25` (effective `+25%`).
  - Tier 2 (`+25%`, never sold or 5+ year gap): `noveltyMult = BOOST_GAP_5 + (level × 0.02)`. Level 10 → `1.25 + 0.20 = 1.45` (effective `+45%`).
- No effect on tier 0 crops (sold this year or last year).
- Applied at every `AgriCorpCropNovelty.apply()` call by reading the current Boutique level from `AgriCorpSkills.getLevel("boutique")`. Level changes are reflected immediately on station prices — *not* locked at year start. Only the base tier (which row of the multiplier table the crop is in) is locked at period 1.
- `AgriCorpBoutique.apply` is a thin shim that delegates to `AgriCorpCropNovelty.apply` so a level-up routes through the same write path as SalePrice.

**Header Width** (`headerWidth`)
- Multiplier = `1 + (level × 0.10)`. Level 10 = +100% width.
- Applied to CUTTER-type work area nodes (`start`, `width`, `height`) on all vehicles with `spec_cutter` and `spec_workArea`. Expansion is symmetric around center. `workArea.workWidth` scaled by the same multiplier.
- Hook on `VehicleSystem.addVehicle` re-applies the current level to any vehicle spawned after the skill is purchased.
- HUD shows the current header's working width in meters when in a vehicle.

**Combine Capacity** (`combineCapacity`)
- Multiplier = `1 + (level × 0.10)`. Level 10 = +100% grain tank capacity.
- Applied via `vehicle:setFillUnitCapacity()` to grain tank fill units only. Grain tank detection: checks each fill unit's `supportedFillTypes` against all fruit type fill type indices.
- Hook on `VehicleSystem.addVehicle` re-applies to newly added combines.

**Bulk Storage** (`bulkStorage`)
- Multiplier = `1 + (level × 0.10)`. Level 10 = +100% capacity for both placeable grain silos and grain-hauling vehicles.
- **Placeable side:** PlaceableSilo (`spec_silo.storages[]`) and PlaceableSiloExtension (`spec_siloExtension.storage`). Mutation = direct write to `storage.capacity`. The `Storage` class is undocumented in GIANTS' LUADOC; in-game probe (`acDumpStorage`) confirmed the field is the single shared cap (`capacities` table is unused on stock silos), `getCapacity()` reads the field directly so writes take effect, and there is no public `setCapacity` method to prefer. Originals cached by `storage.id`.
- **Vehicle side:** any vehicle with `spec_trailer` — covers trailers, semi-trailers, and auger wagons (auger wagons are `spec_trailer` with dischargeable configs in FS25, not a separate spec). Mutation goes through the standard `vehicle:setFillUnitCapacity(i, newCapacity)` API on every grain-capable fillUnit. Combines aren't `spec_trailer` so they keep using `combineCapacity`; cotton pickers / forage harvesters / sugarcane harvesters aren't `spec_trailer` either, so they're correctly excluded. Originals cached by `vehicle.rootNode` × fillUnit index.
- **Grain filter (shared):** a Storage or fillUnit is "grain" if any key in its `fillTypes` / `supportedFillTypes` set is a fruit fillTypeIndex. Lookup goes through the shared `AgriCorpSkills.isGrainFillType(idx)` (lazy-cached set built from `g_fruitTypeManager.fruitTypes`). Non-grain containers (manure, liquid fertilizer, water trailers, livestock trailers, mixer wagons) are skipped.
- All applies recompute from the captured baseline × current multiplier — never compounded across `applyAll` calls.
- Hooks: `PlaceableSystem.addPlaceable` for new silos placed mid-game, `VehicleSystem.addVehicle` for new trailers / auger wagons spawned mid-game. Each hook gates on the matching spec (`spec_silo`/`spec_siloExtension` for placeables, `spec_trailer` for vehicles) so non-matching spawns don't pay even the level lookup.
- Centralized farm silo (lives on `g_currentMission.storageSystem`, not on `placeableSystem.placeables`) is a planned follow-up.

**Tractor Working Speed** (`tractorWorkingSpeed`)
- Overrides `getSpeedLimit()` on all motorized+washable vehicles that are not combines.
- Cap = `8 + (level × 3)` km/h. Level 0 = 8 km/h cap, level 10 = 38 km/h cap.
- Limit only applies when the vehicle is actively working (`onlyIfWorking == true` and `doCheckSpeedLimit == true`).

**Combine Working Speed** (`combineWorkingSpeed`)
- Same as Tractor Working Speed but targets vehicles with `spec_combine`.
- Same formula: cap = `8 + (level × 3)` km/h.

**Engine Power** (`enginePower`)
- Multiplier = `1 + (level × 0.25)`. Level 10 = 3.5× `motor.torqueScale` — meaningful for hill-climbing and pulling heavy implements.
- Applied at vehicle load via XML injection inside `Motorized.loadMotor` (wrapped by the `acEnginePower` spec). New spawns get the boost immediately; existing fleet picks it up after the next save+reload.

**Fuel Usage** (`fuelUsage`)
- Multiplier = `max(0.1, 1 − level × 0.05)`. Level 10 = 0.5 (50% less fuel burn).
- Applied at vehicle `onLoad`: scales `consumer.usage` on every engine-fuel consumer (DIESEL, METHANE, ELECTRICCHARGE, etc.). `AIR` consumers (air brakes) deliberately skipped.
- Existing fleet requires save+reload; new spawns immediate.

**Maintenance** (`maintenance`)
- Multiplier = `max(0.1, 1 − level × 0.075)`. Level 10 = 0.25 (75% slower wear and damage accumulation).
- Wraps `Wearable.updateDamageAmount` and `Wearable.updateWearAmount` at the **class level** (file-eval time, no per-vehicle spec). Multiplies the engine's per-tick `dt` by the factor — slowing `dt` slows the rate at which both functions advance their accumulators.
- Applies to every Wearable instance — vehicles AND implements (cultivators, plows, etc., which is where most field-work damage actually accrues). Effective immediately on level-up; no save+reload needed.

**Traction** (`traction`)
- Multiplier = `1 + (level × 0.03)`. Level 10 = 1.30× tire-ground friction coefficient — better grip on hills, wet fields, and when towing heavy loads.
- Wraps `WheelPhysics.updateFriction` at the **class level** (file-eval time, no per-vehicle spec). After the engine recomputes `tireGroundFrictionCoeff` per tick from `WheelsUtil.getTireFriction(tireType, groundType, groundWetness, snowScale)`, our wrap multiplies the result by the factor — the engine resets the field every tick, so nothing compounds.
- Applies to every wheeled vehicle (player and AI helpers). Effective immediately on level-up; no save+reload needed.

**Loan Interest** (`loanInterest`)
- Reduces base loan interest by `level × 0.005` (-0.5%/level). At base 12%, level 1 = 11.5%, level 5 = 9.5%, level 10 = 7%. Stacks with the Credit Rating discount.
- Final rate = `max(0, BASE − level × 0.005 − creditRatingDiscount)`. Read at loan-creation time via `AgriCorpFinancing.getCurrentInterestRate()` and stored on the loan record. Existing loans keep their original rate; only future loans get the discount.

**Down Payment Reduction** (`downPayment`)
- Down payment percentage = `0.20 − (level × 0.012)`. Level 1 = 18.8%, level 5 = 14%, level 10 = 8%.
- Applies to all financed purchases — vehicles, buildings (placement), and land. Read at purchase time via `toDownPaymentAmount()`, so existing loans are unaffected and only future purchases benefit.
- Flat cost reduction, not a financing shift: the financed amount stays at 80% of price regardless of skill level. So at L10 the player pays 8% upfront + 80% financed = 88% of the price total. The 12% reduction is real money saved, not deferred into the loan.

**Land Purchase BOGO** (`landBogo`)
- Discount = `level × 0.05` off the land price, applied to every other land purchase. Level 1 = 5% off, level 5 = 25% off, level 10 = 50% off.
- Toggle alternates: first land purchase pays full price, second is discounted, third full, fourth discounted, and so on. The toggle flips only on a successful purchase (rejections from debt-cap or reserve checks don't consume the BOGO).
- Discount is applied to the land price *before* downpayment, surcharge, and loan are computed, so all three scale down proportionally on a discounted purchase.
- Toggle state persists across save/load via `loans#isNextLandPurchaseBogo` in `agricorp_loans.xml`. The map-frame financing dialog appends "(BOGO applied)" next to the Price line when the discount is active so the player can see why the number is lower than the vanilla map view.

**Spoilage Immunity** (`spoilageImmunity`)
- Reduction = `level × 0.005` (0.5% per level) subtracted from the per-period spoilage rate. Level 10 = -5% on the rate axis.
- Folds into `AgriCorpSpoilage.getEffectiveRate()` alongside the base `RATE` and the current weather's `spoilageMod`, additively on the same percentage axis: `effectiveRate = max(0, RATE + weatherSpoilageMod − immunity)`. Read at use site, no caching — current skill level and current weather both reflect immediately.
- Clamped at 0. Negative spoilage would grant bonus crops, which isn't FarmPunk. So at base 3% with a -1% weather year and L10 immunity (-5%), the rate floors at 0%, not -3%.
- Applies every period regardless of weather. A clear-weather year still benefits from the reduction off the base 3%.

**Weather Shield** (`weatherShield`)
- Shield = `level × 0.005` (0.5% per level) of negative weather yield mod absorbed. Level 10 = up to 5% of negative yield mod negated.
- Only acts on **negative** weather yieldMods. A positive (favorable) weather year passes through untouched — the skill doesn't strip away good weather to make room for itself.
- Clamped toward zero, never flips positive: `weatherMod = min(rawWeatherMod + shield, 0)` when `rawWeatherMod < 0`. So a -6% weather year with L3 (+1.5% shield) lands at -4.5%; a -1% weather year with L10 (+5% shield) lands at 0% (not +4%) — the shield can erase damage, not invent gains.
- Folded into `AgriCorpCropYield.apply()`'s existing weatherMod read before composition, so it stacks correctly with cropYield + Mastery: `final = vanilla × ((skillMult × masteryMult) + shieldedWeatherMod)`. Read at use site — current shield level, current weather, immediate effect on next apply.

---

**Crop Licensing System**

Each harvestable crop type has an independent annual sell volume license. Tier 0 is the default (no purchase required). Selling above the cap triggers a financial penalty.

*License Tiers and Volume Caps*
| Tier | Cap (L)   | Upgrade Cost (scrip) |
|------|-----------|-------------------|
| 0    | 12,000    | —                 |
| 1    | 25,000    | 10                |
| 2    | 50,000    | 15                |
| 3    | 75,000    | 25                |
| 4    | 100,000   | 45                |
| 5    | 250,000   | 70                |

*Over-Cap Penalty*
- Once `soldThisYear[crop] ≥ cap`, the station sale price for that crop drops to `vanilla × saleMult × noveltyMult × PENALTY_MULTIPLIER` for the rest of the year. Default `PENALTY_MULTIPLIER = 0.20` (player keeps 20% — equivalent to the prior 80% clawback spec, but expressed as a price reduction at the source).
- Delivered through `AgriCorpCropNovelty.apply` alongside the other multipliers — single authoritative writer, no `addMoney` clawback, no per-tick fractional accumulator.
- Hook on `SellingStation.sellFillType`: pure tracking. Increments `soldThisYear[fillTypeIndex]` per tick and triggers a one-shot price re-apply on the tick that crosses the cap (also fires a `CRITICAL` HUD notification: "WHEAT license cap exceeded — sale price reduced 80% for rest of year"). No money math.
- Applies only to harvestable crop fill types (not pallets, processed goods, etc.).
- Per-crop independence: WHEAT going over cap drops only WHEAT's station price; other crops keep their normal multiplier chain.

*Recovery*
- Sold-this-year volumes reset at period 1 (March, new year start). Licensing's period-1 handler re-fires `AgriCorpCropNovelty.apply` after wiping `soldThisYear` so the penalty multiplier lifts even if Novelty's own period subscriber ran first this tick (subscriber order is undefined).
- Mid-year tier upgrade via `farmPunkBuyLicense` triggers an immediate `AgriCorpCropNovelty.apply`: if the new cap is above current sold volume, the penalty lifts mid-year.

*Crossing-tick precision*
- The single ~40 L tick that crosses the cap gets full price for its over-cap portion (~40 L × full price worth, ~$30) because the engine computes that tick's revenue before our hook fires. All subsequent ticks at any station unload at the penalty rate. Negligible and favors the player.

---

**Crop Novelty Bonus**

A sale-price boost for crops the farm hasn't sold recently. Encourages crop rotation without tracking what's planted on which field — purely driven by sales history.

*Tiers*
- **+15%** if the crop was not sold last year (gap of 2+ years since the last sale).
- **+25%** if the crop has not been sold in the last 5 years, or has never been sold.

*Locking*
Each crop's multiplier for the current year is computed and locked at period 1 (March), based on `lastYearSold[crop]` *before* this year's sales begin. Stored in `boostThisYear[crop]` and persisted with the save. Selling a crop later that year does not change the boost for that year — it only updates `lastYearSold` so next year's recompute sees the new history.

*How the boost is delivered*
- `AgriCorpCropNovelty` is the authoritative writer for per-station fill type prices. On apply it captures each station's true vanilla baseline once (from `originalFillTypePricesUnscaled`), then writes `final = vanilla × salePriceMult × noveltyMult[crop] × licenseMult[crop]` to all three station price fields (`fillTypePrices`, `originalFillTypePrices`, `originalFillTypePricesUnscaled`). `licenseMult` is `1.0` under cap and `AgriCorpLicensing.PENALTY_MULTIPLIER` (default `0.20`) once over cap.
- `salePriceMult` is read at apply time via `AgriCorpSkills.getLevel("salePrice")`. `AgriCorpSalePrice.apply` is a one-line shim that delegates to `AgriCorpCropNovelty.apply` so SalePrice level-ups trigger a combined re-apply through the same pipeline. Two separate writers racing on the same fields would lose effects depending on subscriber order; routing through Novelty fixes that.
- `noveltyMult[crop]` comes from `boostThisYear[crop]` — `1.0` for crops not in the map (non-harvestable) or with no boost.
- Applies only to harvestable crop fill types for the novelty multiplier; non-harvestable fill types still get `vanilla × salePriceMult × 1.0` so the SalePrice skill keeps working for them.
- Re-applied at period 1 (after recomputing boosts), at every period change, on map load, and on every SalePrice level-up. Idempotent — multiple calls in the same tick write the same final values.

*SellingStation hook*
- Still wraps `SellingStation.sellFillType` (chained on top of licensing's wrap), but the hook only updates `lastYearSold[fillTypeIndex] = currentYear`. No money math, no per-tick log lines.

*Stacking*
- With the Sale Price skill: a single combined multiplier (`salePriceMult × noveltyMult`) is written to the station, so revenue scales by both factors simultaneously.
- With crop licensing: licensing's penalty is folded into the same multiplier chain as a fourth factor (`licenseMult`). When over cap, station price = `vanilla × saleMult × noveltyMult × 0.20` — all multipliers compose in one pass, no race, no separate `addMoney` clawback.

---

**Long Term Skill Gains — Crop Mastery & Farmer Prestige**

Two parallel progression tracks driven by cumulative liters sold. Passive — fame is tracked automatically on every sale.

- **Crop Mastery**: one independent level per harvestable crop. Gains 1 fame per liter sold of that specific crop. Bonuses attached (see *Mastery bonuses* below).
- **Farmer Prestige**: a single global level. Gains 1 fame per liter sold of any harvestable crop. Prestige unlocks titles, vehicle rewards, and recurring perks.

*Curve*
- Geometric. Threshold to advance from level L to L+1 is `BASE × GROWTH^L`. Cumulative fame to reach level L is `BASE × (GROWTH^L − 1) / (GROWTH − 1)` (or the linear `BASE × L` when `GROWTH = 1`).
- Default constants: `CROP_BASE = 10,000`, `CROP_GROWTH = 1.10`, `PRESTIGE_BASE = 24,000`, `PRESTIGE_GROWTH = 1.10`.
- Uncapped — no max level. Levels are derived from fame on every tick and on save load, so retuning `BASE` / `GROWTH` retroactively re-levels existing saves with no migration.

*Tracking*
- Hook on `SellingStation.sellFillType` (third in the chain, after Licensing and Novelty). Filters to player farm, harvestable fillTypes only, `fillDelta > 0`.
- Each tick adds `fillDelta` to `cropFame[fillTypeIndex]` and `prestigeFame`. Both counters are monotonic — never reset across years or saves.

*Level-up notification*
- One HUD side notification per crossing event per tick, separately for crop and prestige. Multi-level crossings within a single tick collapse into a single batched message: `WHEAT Mastery — Level 5 reached (from L3)`.

*Mastery bonuses (per crop)*
- **Yield tier** at levels 5, 15, 25, 35, … — every `YIELD_TIER_INTERVAL` levels starting at `YIELD_TIER_OFFSET`. Each tier adds `YIELD_PER_TIER` (default +5%) to `literPerSqm` for that crop, on top of the global Crop Yield skill.
- **Price tier** at levels 10, 20, 30, 40, … — every `PRICE_TIER_INTERVAL` levels. Each tier adds `PRICE_PER_TIER` (default +5%) to that crop's per-station sale price.
- Examples (defaults): WHEAT at Mastery L5 = +5% yield, +0% price. WHEAT at L25 = +15% yield, +10% price. WHEAT at L100 = +50% yield, +50% price.
- Yield bonus is forward-only — `literPerSqm` is sampled by the engine at planting/harvest time, so a tier crossing during a harvest doesn't retroactively rescale the standing crop. Subsequent grow cycles use the new rate.
- Price bonus is folded into `AgriCorpCropNovelty.apply` as a fifth multiplier (`vanilla × saleMult × noveltyMult × licenseMult × masteryMult`) and applies on the next sell tick.
- Re-applies are triggered automatically on any crop level-up (mid-session and from `applyAll` after save load) — no menu or console action needed.
- `farmPunkMastery` shows current `+X% yield / +Y% price` per crop.

*Prestige rewards (per-level vehicle gifts)*
- Reaching specific Farmer Prestige levels delivers one or more preconfigured items to the dealer's spawn pad, free of charge. Hand-picked tier list — not every level has a reward.
- Catalog lives at `data/rewards/prestige_l<N>.xml`. Canonical schema is a `<rewards>` root with one or more `<reward>` children, each declaring a vanilla `storeItem` xmlFilename and an optional `configurations` table (paint, design, attached options). Multiple rewards per level — e.g. a harvester plus its matching header — are just additional `<reward>` siblings.
- Legacy single-`<reward>`-root files (single item per level) are still accepted by the loader, so existing captures from before multi-reward support keep working without migration.
- Spawn reuses FS25's own `BuyVehicleData` flow with `setIsFreeOfCharge(true)` and `g_currentMission.storeSpawnPlaces` — each item appears exactly where a normal purchase would, registered to the player's farm.
- Each catalog **level** claims **once per save** (not per-reward) — claimed levels persist in `agricorp_rewards.xml`. `farmPunkResetReward <level>` clears the flag for testing. If a level has 3 rewards and 2 spawn but 1 fails, the level is still marked claimed (we can't safely respawn the 2 successes on retry); the failed item logs CRITICAL and is dropped.
- **Catch-up on load**: any catalog level at-or-below current Farmer Prestige that isn't claimed will deliver on map load. Lets you grow the catalog post-launch and backfill rewards on existing saves without losing prior gifts.
- Multi-level prestige crossings in one sell tick auto-claim each catalog level in order.
- Total-failure mode (zero items spawned for a level) leaves the level **unclaimed** and surfaces a `CRITICAL` HUD warning — a future load or `farmPunkClaimReward` will retry.

*Shipped reward catalog*

| Prestige Lvl | Reward(s) | Vanilla path |
|--------------|-----------|--------------|
| 3 | Zetor PROXIMA HS (compact tractor w/ front loader) | `data/vehicles/zetor/proximaHS120/` |
| 5 | Claas ARION 570-530 (mid tractor w/ front loader) | `data/vehicles/claas/arion550/` |
| 10 | Mack Anthem 6x4 (semi truck, black) | `data/vehicles/mack/anthem/` |
| 15 | Deutz-Fahr Series 8 TTV (large tractor) | `data/vehicles/deutzFahr/series8/` |
| 20 | Case IH Axial-Flow 7160 **+** 3050 TerraFlex 28FT header | `data/vehicles/caseIH/axialFlow150/` + `terraFlex3050_28/` |
| 25 | Lode King Prestige Super-B (grain trailer) | `data/vehicles/lodeKing/prestigeSuperBTrailer/` |
| 30 | New Holland T8 GENESIS Series (large tractor) | `data/vehicles/newHolland/t8/` |
| 35 | Elmer's HaulMaster (grain cart) | `data/vehicles/elmersMfg/haulMaster/` |
| 40 | Väderstad NZ Extreme 1425 (seedbed cultivator) | `data/vehicles/vaderstad/nzExtreme1425/` |
| 45 | John Deere CP690 (cotton picker) | `data/vehicles/johnDeere/cp690/` |
| 50 | John Deere 9RX Series 710-830 (articulated tracked tractor) | `data/vehicles/johnDeere/series9RX830/` |
| 75 | Pöttinger ROTOCARE V 12400 (rotary hoe) | `data/vehicles/poettinger/rotocareV12400/` |
| 100 | Case IH AF11 combine **+** FD250 FlexDraper® header | `data/vehicles/caseIH/af11/` + `fd250/` |

All entries are vanilla FS25 storeItems — no external mod dependencies. Multi-item bundles (L20 and L100) use the multi-`<reward>` schema; single-item levels use a single `<reward>` element. Edit, add, or remove files in `data/rewards/` to retune the ladder — the loader picks up whatever's there at mod load.

*Authoring a reward template*
1. Open the in-game shop, pick the first item (tractor, plow, trailer, seeder, etc.) and configure it as you'd want it delivered. No need to actually buy it — the configuration screen alone is what `farmPunkDumpVehicle` reads.
2. With the shop's configure view still open, run `farmPunkDumpVehicle <level>` in the console. The mod reads `g_gui.screenControllers[ShopConfigScreen]` (same accessor `farmPunkBuyVehicle` uses) and **appends** a `<reward>` entry to `<savedir>/agricorp_capture_l<level>.xml`.
3. To bundle a second item at the same level (e.g. a header for a harvester), browse to the second item, configure it, and run `farmPunkDumpVehicle <level>` again — same level number. The capture file now has two `<reward>` children.
4. Mistakes — `farmPunkClearCapture <level>` deletes the capture file so the next dump starts over. Doesn't affect already-installed templates under `data/rewards/`.
5. Once the capture has all the items you want, copy it into the mod at `data/rewards/prestige_l<level>.xml`. Optionally edit each `reward#name` to set in-HUD display names.
6. Reload the game (mod source files are read at mod load). `farmPunkRewards` will list the new entry with item count.

---

**Farmer Prestige Perks**

Repeating bonuses earned as Farmer Prestige climbs. Each occurrence is a small delta on an existing system axis (subsidy to wallet salary, discount to taxes, refund on stolen vehicles, etc.). Most perks have a hard occurrence cap; only **Industrial Subsidy** and **Mastery Catalyst** are truly uncapped.

*The 12-perk rotation*

| Pos | Perk | Effect per occurrence | Cap |
|-----|------|------------------------|-----|
| 1 | **Industrial Subsidy** | +10 scrip added to the period-12 base salary (currently flat 10 scrip). | uncapped |
| 2 | **Guard Dogs** | -1pp off vandal chance; -1pp off theft chance every two levels. Storage event spread starts at 85/10/5; fully perked at 8 occurrences = 97/2/1. | 8 |
| 3 | **Credit Indemnity** | Shifts the Credit Rating downgrade threshold from `balance < 0` to `balance < -$5,000`. Each occurrence widens the survivable floor by another -$5k. The downgrade still fires immediately when the (lower) threshold is crossed. At cap: -$50,000 floor. | 10 |
| 4 | **Generous Banker** | `debtCapModifiers × (1 + level × 0.03)`. At cap: 30% boost — land multiplier 0.25 → 0.325, equipment multiplier 0.20 → 0.26. | 10 |
| 5 | **Negotiator** | `surcharge = normalSurcharge × (1 - level × 0.03)`. At cap: 30% off the farmland surcharge. | 10 |
| 6 | **Insurance Policy** | +25% refund on stolen-vehicle sell value. Paid via `addMoney(+sellPrice × pct)` before `vehicle:delete()` in `AgriCorpVehicleStorage`'s theft branch. Equipment only — pallets/bigbags/IBCs are not covered (lore: insurance claims require big items). At cap: 75% refund. | 3 |
| 7 | **Tax Shelter** | `equipmentTax = normalEquipmentTax × (1 - level × 0.05)`. At cap: 50% off the equipment tax bill. | 10 |
| 8 | **Super Payday Advance** | +$10,000 to the Vanilla Loan cap (currently clamped flat at $50,000). At cap: cap = $100,000. | 5 |
| 9 | **Mastery Catalyst** | +5% on `cropFame` gain per liter sold — crop mastery accelerates. Farmer Prestige fame unaffected. Multiplier is additive: at occurrence N, the crop-fame gain rate is `1 + (N × 0.05)`. | uncapped |
| 10 | **Land Lawyer** | `landTax = normalLandTax × (1 - level × 0.05)`. At cap: 50% off the land tax bill. | 10 |
| 11 | **Forecasting Leveraging** | Asymmetric amplifier on weather: boosts the player-favorable side of each axis only (positive `weatherYieldMod`, negative `weatherSpoilageMod`, negative `weatherExposureMod`). Adverse weather passes through untouched. +1pp per level on each axis. | 10 |
| 12 | **Backroom Dealers** | +1 to a per-year combined sell counter (vehicles, implements, and land share one bucket — counter N at perk count N permits any mix of N sells per year). First N sell attempts of the year auto-fall-through to the vanilla path and increment the counter; attempt N+1 onward hits the standard Asset Sell Block refusal. Counter resets at period 1. | 3 |

Shape: pos 1–4 survival/cash-flow, pos 5–8 scaling/protection, pos 9–12 optimization/rule-bending. Paired perks (Guard Dogs/Insurance Policy, Generous Banker/Super Payday Advance) are intentionally spaced across the arc rather than clustered.

*Cadence — repeating rotation with cycle slowdown*

The rotation cycles indefinitely. Each new cycle adds one more "skip" non-reward level between grants:

- **Cycle 1**: every non-reward level grants the next perk in rotation (no skips).
- **Cycle 2**: skip 1 non-reward level between each perk grant.
- **Cycle 3**: skip 2 non-reward levels between each grant.
- **Cycle K**: skip `K - 1` non-reward levels between grants.

Reward levels (the prestige reward catalog: L3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 100 by default — anything in `AgriCorpRewards.catalog`) are invisible to the cadence math: they don't advance the rotation pointer, don't consume a skip slot, and don't grant a perk. The skip counter picks up on the next non-reward level. User-authored rewards added via `farmPunkDumpVehicle` automatically slot into the cadence as additional skip points without code changes — the implementation queries `AgriCorpRewards.catalog` directly rather than hardcoding the level list.

*Drop-on-cap behavior*

When a perk fires its final occurrence (Insurance Policy hits 3/3, Guard Dogs hits 8/8, etc.), the perk is **immediately removed from the rotation**. The current cycle continues uninterrupted through the remaining unfired perks in their original order; only the next cycle starts with the shortened rotation. Once all capped perks have maxed out, only Industrial Subsidy and Mastery Catalyst remain as the long-tail trickle.

Sample early schedule (run `farmPunkPerksDryRun 30` to see your save's actual schedule):

| Lvl | Grant |
|-----|-------|
| 1 | Industrial Subsidy (C1 p1) |
| 2 | Guard Dogs (C1 p2, 1/8) |
| 3 | REWARD |
| 4 | Credit Indemnity (C1 p3) |
| 5 | REWARD |
| 6 | Generous Banker (C1 p4) |
| 7 | Negotiator (C1 p5) |
| 8 | Insurance Policy (C1 p6, 1/3) |
| 9 | Tax Shelter (C1 p7) |
| 10 | REWARD |
| 11 | Super Payday Advance (C1 p8, 1/5) |
| 12 | Mastery Catalyst (C1 p9) |
| 13 | Land Lawyer (C1 p10) |
| 14 | Forecasting Leveraging (C1 p11, 1/10) |
| 15 | REWARD |
| 16 | Backroom Dealers (C1 p12, 1/3) — **C1 done** |
| 17 | (skip 1, C2 begins) |
| 18 | Industrial Subsidy (C2 p1) |
| 19 | (skip 1) |
| 20 | REWARD |
| 21 | Guard Dogs (C2 p2, 2/8) |
| 22 | (skip 1) |
| 23 | Credit Indemnity (C2 p3) |

*State and notifications*

Perk levels are **derived**, not persisted. `AgriCorpPerks.deriveForCurrentPrestige()` replays the rotation from L1 up to the current `AgriCorpMastery.prestigeLevel` and returns a `{[perkName] = level}` table. Memoized per-session, invalidated on every prestige level-up. Retuning the rotation table or per-perk caps re-derives existing saves with no migration. Consumers pull from `AgriCorpPerks.getLevel("perkName")` lazily at use site — no apply chain, no init-order dependency.

The only persisted state is **Backroom Dealers' per-year counter**, written to `agricorp_perks.xml` as `backroomUsedThisYear` + `backroomYear`. A mid-year save/load cannot refresh the slots; the period-1 hook resets the counter at the year flip.

`AgriCorpPerks.tryGrant(prevLevel, newLevel)` is called from `AgriCorpMastery.onSellFillType`'s prestige-crossing branch alongside `AgriCorpRewards.tryClaim`. It diffs the derived perk levels before/after and fires one HUD `PERK UNLOCKED — <name> (N/cap)` card per occurrence. Title crossings into L1–8 fire a separate `New Title — <name>` card.

*Backroom Dealers — the gnarly perk*

`AgriCorpAssetSellBlock` covers four sell paths: `Vehicle.getCanBeSold`, `Vehicle.getCanBeAddedToSales`, `SellVehicleEvent.run`, and the in-game-menu map's `button_sell` callback. All four route through two helpers in `AgriCorpPerks`:

- `canSellViaBackroom()` — non-mutating poll, used by the two `Vehicle` getters that fire many times per UI frame. Returns whether a slot is currently available; doesn't consume one.
- `consumeBackroomSlot(reason)` — mutating, used by the two actual sell sites. Increments the counter and returns whether the caller may proceed; logs the claim.

The `AssetSellBlock` wraps capture the vanilla originals so BD-permitted sells delegate to the engine's normal flow (cash credit, ownership flip, deletion). Without BD active the wraps behave as before — workshop Sell action hidden, in-game menu refusals fire, farmland sell button blocked.

*Console*

- `farmPunkPerks` — current prestige level + title, every perk's level/cap, BD counter status, and the level of the next grant.
- `farmPunkPerksDryRun <upToLevel>` — print the cadence schedule from L1 to the given level. Read-only, no state mutation. Use to verify perk grants on a save before grinding to them.
- `farmPunkGrantPerks <N>` — testing tool: bump `prestigeFame` by enough to cross N more prestige levels, triggering the natural level-up dispatch. Reward catch-up + perk grants both fire as if from a real sale.
- `farmPunkResetBackroom` — testing tool: zero the BD counter for the current year.

---

**Crop Spoilage**

Grain rots if you hoard it. Every period change (one calendar month) takes 3% of the current volume off any silo or trailer holding grain.

*Mechanics*
- Rate: `AgriCorpSpoilage.RATE = 0.03`. Flat — no time-in-storage tracking. If a silo holds 100,000 L of WHEAT at 23:59 of the current period, 3,000 L is gone at 00:00 the next.
- Triggered from `MessageType.PERIOD_CHANGED`, server-side only.
- Stateless — the reduced fill levels live in the engine's normal vanilla persistence; no `agricorp_spoilage.xml`.

*Scope*
- **Placeable silos:** every storage on `PlaceableSilo (spec_silo.storages[])` and `PlaceableSiloExtension (spec_siloExtension.storage)`. Grain filter via `AgriCorpSkills.isGrainFillType`. Read and mutation both go through the underlying field — `storage.fillLevels[fillTypeIndex]` — and the write is followed by `storage:raiseDirtyFlags(storage.storageDirtyFlag)` so the engine's next sync/UI tick picks up the change. Same direct-field precedent `AgriCorpBulkStorage` proved for the undocumented `Storage` class on `storage.capacity`. The metatable `Storage:setFillLevel` method is *not* used: it carries an FS22-style reversed `(fillLevel, fillTypeIndex)` signature and silently no-ops on guessed args.
- **Vehicles:** every `spec_trailer` (trailers, semi-trailers, auger wagons). Per-fillUnit grain filter on the unit's current fill type. Mutation goes through documented `vehicle:addFillUnitFillLevel(farmId, fillUnitIndex, -loss, fillTypeIndex, ToolType.UNDEFINED, nil)` — same API every vanilla unloading trigger uses. Combines, water trailers, livestock trailers, mixer wagons are excluded — combines aren't `spec_trailer`, the rest fail the grain check.
- **Out of scope:** centralized farm silo on `g_currentMission.storageSystem` (same scope cap as BulkStorage's phase 1a — planned follow-up).

*Notification*
- Single HUD side notification per period (`OK` priority, not `CRITICAL`) listing total liters lost and per-crop breakdown: `Crop Spoilage — 3,247 L lost (3%)\nWHEAT 2,400 L, BARLEY 847 L`.
- Quiet ticks (zero grain on hand) skip the notification entirely.

---

**Shelter Detection** (`AgriCorpShelter`)

A reusable primitive: given any world (X, Z), is that point inside a player-recognizable shed? Foundation for the Vehicle Storage Enforcement feature; usable by anything else that needs the same answer (parking bonuses, garage analytics, etc.).

*Classifier*
- A placeable counts as shelter iff `placeable.storeItem.categoryName == "SHEDS"`. Validated empirically via in-game probe: the Cow Barn (named "barn", but `ANIMALPENS`-category) is correctly excluded; the Farm Barn and Old Barn (both `SHEDS`-category) are included. Sibling categories like `SILOS`, `ANIMALPENS`, `PRODUCTIONPOINTS`, `PLACEABLEMISC`, `SELLINGPOINTS`, `MISC` are not shelter.

*Geometry*
- Each `SHEDS` placeable's `spec_indoorAreas.areas[i]` exposes three transform handles named `start`, `width`, `height`. These are three corners of a 2D rectangle in **world space** — the fourth corner is implicit. The handle names are conceptual, not directional: `start` is one corner, `width` is the corner reached by walking one edge, `height` is the corner reached by walking the other edge. Edges are guaranteed orthogonal, and crucially, **the placement's rotation is already baked into the corner world positions**, so the containment test needs no sin/cos work.

*Containment test*
- For a query point P with corners (s, w, h), compute edge vectors `e1 = w - s`, `e2 = h - s` and offset `v = P - s`, all in the X/Z plane (Y is ignored — vehicles sitting on terrain inherit the shed's floor Y). P is inside iff `0 ≤ v · e1 ≤ |e1|²` AND `0 ≤ v · e2 ≤ |e2|²`. Six multiplications, four comparisons per shed per query — cheap enough to run per-frame for live HUD if needed.

*Public API*
- `AgriCorpShelter.findShelterAt(px, pz)` → `(true, placeable)` on first hit, `(false, nil)` otherwise. Iterates every placeable in `placeableSystem.placeables`, filters to `SHEDS`, scans each indoor area.
- `AgriCorpShelter.isVehicleSheltered(vehicle)` → same answer for `vehicle.rootNode`'s world XZ.

*Stateless*
- No save file. Recomputed from live placeable + vehicle state on every query. Adding/removing sheds, parking new vehicles, and selling sheltered vehicles all flow through naturally.

*Console*
- `farmPunkShelterCheck` lists every owned vehicle as `[SHELTERED] inside <shed name>` or `[exposed]`, plus a sheltered/exposed tally. Verification tool — also useful as a sanity check for the storage-enforcement penalty.

---

**Vehicle Storage Enforcement** (`AgriCorpVehicleStorage`)

You do not want to leave your gear outside in FarmPunk. Three independent monthly pressures fire on every `MessageType.PERIOD_CHANGED` (i.e. every in-game month) against owned equipment that the shelter primitive reports as exposed.

*Wear (always fires)*
- Every exposed `Wearable` (vehicle or implement) takes `+0.05` damage, capped at `1.0`. Conceptually weather/exposure damage, not vehicle wear, so the **Maintenance skill does NOT mitigate it** — knowledge doesn't stop rust and hail.

*Vehicle event (mutually exclusive monthly roll: 85 / 10 / 5)*
- **85% nothing.**
- **10% vandals** — most-valuable exposed gets stripped to `1.0` damage. Cascade: `1/2` chance to also strip the 2nd-most-valuable, then `1/3` for 3rd, `1/4` for 4th, etc. Probability of stripping exactly K items is `1/(K-1)! − 1/K!`; expected victims per event ≈ `e − 1 ≈ 1.718`.
- **5% theft** — most-valuable exposed is **deleted forever**. No cash recovered by default. The Insurance Policy prestige perk can claw back part of the loss. No min-value floor; even a wheelbarrow can vanish if it's all you've got. Anything attached to the stolen vehicle (header, plow, trailer, weight) detaches and survives.
- Eligibility cutoff: any vehicle/implement with damage `≥ 0.80` is invisible to vandals and thieves alike (the cartel doesn't bother with broken-down crap). Wear still applies to them regardless.
- Ranking is by `vehicle:getSellPrice()`, sortable per-piece — an attached `$400K` combine and its `$50K` header rank independently. Tiebreaker is `vehicle.id` ascending.

*Consumable event (independent 33% monthly roll)*
- 33% pallet thieves come prowling.
- If they show: 1 random pallet always taken, then `1/2` chance for a 2nd, `1/2` for a 3rd, etc. Average ≈2 items.
- Scope: `storeItem.categoryName ∈ {PALLETS, BIGBAGS, BIGBAGPALLETS, IBC}`. Same set `AgriCorpFinancing.isFinanceableVehicle` excludes. Bales, fuel-in-tank, and trailer fill levels are never targeted — these thieves are dummies; they don't know what to do with raw crops or bales.

*Empty-handed flavor*
- When an event rolls but the eligible pool is empty, the HUD reports the near-miss anyway: "Vandals came prowling but found nothing worth wrecking." / "Thieves cased your sheds, found nothing to grab." Dopamine hit for the well-sheltered.

*Notification*
- Each event emits its **own** dedicated HUD side notification — wear summary, vehicle event (vandals / theft / empty-handed flavor), consumable event (pallet theft / empty-handed flavor) — so an empty-handed near-miss gets its own visible card instead of being buried in a multi-line block. `CRITICAL` severity for actual damage or theft; `OK` severity for the wear summary and empty-handed lines. Maximum 4 notifications per period (wear + at most one vehicle-event + at most one consumable-event); most periods produce 1–2.

*Stateless*
- No save file. Every period the system re-walks live placeables and vehicles, recomputes the exposure pools, and rolls fresh. Sell a shed mid-year, the rule reflects it next period.

*Console*
- `farmPunkStorageStatus` — read-only preview: lists exposed equipment ranked by sellPrice with the cascade rank label (`[THEFT TARGET / VANDAL #1]`, `[VANDAL #2 at 1/2]`, `[VANDAL #3 at 1/3]`, …), exposed pallets, total Wearables exposed, current event odds, and the damage threshold. No rolls fired.
- `farmPunkForceStorage` — manually trigger the period tick now. Testing tool.

---

**Weather System** (`AgriCorpWeather`)

One flavored weather event rolls per calendar year. The roll happens at period 1 (March) — the same year-flip tick that resets Novelty boosts and licensing volumes — and locks for the rest of the year. Most years are unremarkable; rare years are dramatic.

*Catalog*
- 45 entries shipped, distributed across five rarity tiers: r1×20 (common), r2×10 (uncommon), r3×5 (rare), r4×5 (very rare), r5×5 (legendary). Each entry has a name, a description, a rarity, and three signed mods (`yieldMod`, `spoilageMod`, `exposureMod`).
- Catalog lives inline in `scripts/AgriCorpWeather.lua` as a Lua table — pure data, no per-entry asset paths, easy to retune without touching code.

*Rarity rolls*
- Two-stage roll. First, a weighted d100 picks the rarity tier: r1 50% / r2 25% / r3 15% / r4 8% / r5 2%. Then a uniform random pick selects one entry from that rarity's pool.
- Empty-pool fallback: if the chosen rarity has no entries (catalog edited down), the picker walks to lower rarities until it finds a non-empty pool. Returns nil only if the catalog is entirely empty.

*Composition — additive on the percentage axis, NOT multiplicative*
- The three mods plug into existing systems as **percentage-point deltas**, not as multiplicative factors. Example: a year with `+13%` yield from skill+mastery and a `-3%` weather mod nets `+10%` yield — `13 - 3 = 10`, not `(1.13 × 0.97 - 1)`.
- **Yield**: `AgriCorpCropYield.apply` writes `literPerSqm = vanilla × ((skillMult × masteryMult) + weatherYieldMod)`. Weather adds directly to the multiplier so order-of-operations is invariant — leveling cropYield mid-year produces the same final yield as leveling cropYield before the weather year started. Verified by in-game probe: the engine re-reads `fruitType.literPerSqm` at harvest time, so a mid-cycle change applies to whatever you harvest *that year*, regardless of when the crop was planted.
- **Spoilage**: `AgriCorpSpoilage.getEffectiveRate()` returns `RATE + weatherSpoilageMod` (clamped at 0). A `+2%` weather mod takes the per-period rate from 3% to 5%. Read at use site, not cached.
- **Exposure**: `AgriCorpVehicleStorage.getEffectiveWearDelta()` returns `WEAR_PER_PERIOD + weatherExposureMod` (clamped at 0). A `+5%` weather mod takes the per-period wear delta from `0.05` to `0.10`. Read at use site, not cached.
- Future Spoilage-Reduction and Weather-Impact-Reduction skills will plug onto the same axis — `RATE + skillDelta + weatherMod` and `WEAR_PER_PERIOD + skillDelta + weatherMod`. No reshape needed.

*Year locking + persistence*
- Active weather is keyed by year. `currentWeatherId` and `currentYear` persist in `agricorp_weather.xml`, plus a `history[year] = id` map for `farmPunkWeather`'s history readout.
- On load (`AgriCorpWeather.applyOnLoad`, called from `AgriCorp:loadMap` *before* `AgriCorpSkills.applyAll`): if the saved weather is missing or stale (`currentYear ~= environment.currentYear`), a fresh roll fires. CropYield's apply pass picks up the new mod automatically on its first run, so no double-apply.
- Period 1 of any new year (`AgriCorpWeather.onPeriodChanged`) rolls a fresh weather, emits a HUD forecast notification, and re-fires `AgriCorpCropYield.apply` so standing crops feel the new modifier at their next harvest.

*HUD forecast*
- Single `OK`-priority side notification at year roll: name, rarity, description, and the three signed mods on one line. `farmPunkWeather` prints the same plus history.

*Console*
- `farmPunkWeather` — print current weather (name, rarity, description, the three mods, locked year), full history, and catalog counts per rarity tier.
- `farmPunkSetWeather <id>` — force a specific weather id and trigger the downstream re-apply. Testing tool. Mutates the current year's slot.
- `farmPunkRerollWeather` — roll a fresh weather right now (does not wait for period 1). Testing tool.

---

**Asset Sell Block** (`AgriCorpAssetSellBlock`)

The museum doctrine: assets bought stay bought. Three wrap points cover the workshop dealer flow, the in-game-menu Vehicles tab (vanilla AND mod menus), and the map's farmland Sell action. Stateless — no save file, no per-period subscriber.

*Vehicle side — workshop dealer*
- Class-method wraps installed at file-eval time on `Vehicle.getCanBeSold` and `Vehicle.getCanBeAddedToSales` (both GDN-documented). Both forced to return `false`. The engine consults these to decide whether the workshop's Sell button is offered — vanilla starter equipment uses `canBeSold="false"` in storeItem XML the same way to make itself permanent. Returning false universally has the same effect: the Sell action simply doesn't appear. No popup needed because the player never sees a button to click.
- Reference pattern: same `Utils.overwrittenFunction` shape `AgriCorpMaintenance` uses to wrap `Wearable.updateDamageAmount`/`updateWearAmount`.
- These wraps do **not** cover the in-game-menu Vehicles tab — that path bypasses `getCanBeSold` and dispatches a `SellVehicleEvent` directly. Covered separately below.

*Vehicle side — in-game-menu Vehicles tab and mod menus*
- Class-method wrap on `SellVehicleEvent.run` that (a) emits a `CRITICAL` HUD refusal, (b) publishes `g_messageCenter:publish(SellVehicleEvent, self.vehicle)` so subscribed UIs dismiss their spinners and refresh, and (c) deliberately does NOT call `superFunc` so the engine's actual sell logic (vehicle deletion + farm balance credit) never runs. Subscribers refresh their list view from the current owned-vehicle set; the blocked vehicle reappears because it was never deleted.
- The publish is non-optional. The vanilla Vehicles tab shows a "The vehicle/tool is being sold..." spinner between sendEvent dispatch and the messageCenter publish — without our manual publish, the spinner hangs forever. Same family of stall as the original buy-flow hijack work. The menu's subscription pattern is `g_messageCenter:subscribe(SellVehicleEvent, self.updateContent, self)` (confirmed in `FS25_GarageMenu/gui/MenuGarageMenu.lua:125` for the mod path; vanilla follows the same engine convention).
- `SellVehicleEvent` is the universal sell-dispatch event used by every menu path that sells vehicles. Confirmed in the wild: `FS25_GarageMenu` does `g_client:getServerConnection():sendEvent(SellVehicleEvent.new(vehicle, 1, true))` and `g_messageCenter:subscribe(SellVehicleEvent, ...)` with no nil-checks, meaning the class is treated as a stable engine global. Vanilla in-game menus follow the same pattern.
- The class does **not** appear on GDN's Events index. We trust the runtime presence based on the reference mod's usage, with a defensive nil-check at file-eval that logs `SellVehicleEvent.run missing — menu sell-block inert` if a future engine version renames or removes it.
- Single-player only (`<multiplayer supported="false"/>`), so `self.vehicle` is always a live reference at run-time — no NetworkUtil resolver needed.

*Farmland side*
- Same `InGameMenuMapFrame.update` contextActions pattern that `AgriCorpFinancing` uses for the `button_buy` interception, but targets `button_sell` instead. Walks the actions list once per frame instance (sentinel `__agricorpSellPatched` guards re-walking), finds the entry whose `text == "button_sell"`, and replaces its `callback` with a `CRITICAL` HUD side notification: `"Your farm is a museum now. Land does not leave the collection."`
- The `button_sell` text label is empirical (mirroring the equally-empirical `button_buy`); not GDN-documented. On first encounter the wrap dumps the full action text list to the log (`[AgriCorp] AssetSellBlock: map contextActions = ...`) so a future engine version that renames the action leaves a forensic trail.
- Sentinel naming (`__agricorpSellPatched`) is distinct from Financing's `__agricorpBuyPatched` so both wraps coexist on the same frame without stepping on each other.

*Composition with the rest of FarmPunk*
- FarmPunk purchase flows are unaffected — `getCanBeSold` and `SellVehicleEvent.run` are sell-side only.
- `Vehicle:getSellPrice()` is still called by FarmPunk's own systems (e.g. `AgriCorpAnnualTaxes`'s equipment-tax computation, `AgriCorpVehicleStorage`'s value-rank ordering). Sell *price* is separate from the *can-be-sold* gate and the *sell event*; all three are independent.
- Vehicles registered as prestige rewards (`AgriCorpRewards`) follow the same rule — once delivered, they're part of the museum.
- Vehicle Storage's theft event uses `Vehicle:delete(immediate)` directly, not `SellVehicleEvent`, so theft still works (different code path — the storage system bypasses the sell flow entirely; thieves aren't civil enough to pay you).

---

**No Generators**

Off-grid power placeables are categorically refused. The placement check lives inline in the existing `ConstructionScreen.onButtonPrimary` wrap in `AgriCorpFinancing.lua` — one `if storeItem.categoryName == "GENERATORS"` branch fires a `CRITICAL` HUD refusal and returns before the financing path runs. Vanilla FS25 ships solar collectors, wind turbines, etc. all under the single `GENERATORS` category (5 items in the base game, probe-confirmed); future map mods that respect the convention are covered automatically.

No save file, no console command, no per-period subscriber — the wrap is stateless and idempotent.

---

**Reclamation Warchest**

A one-way lifetime fund. The player deposits farm cash; the cash is "spent" on reclaiming and liberating the valley and never comes back. There are no withdraws. Reaching the cap satisfies one of the endgame win conditions.

*Cap*
- `WIN_CAP = $1,000,000,000`. One billion dollars buried into the resistance is the target.

*Deposits*
- Player-driven only via `farmPunkWarchestDeposit <amount>` — no period subscriber, no automatic contributions.
- Validation (all four checks live in `AgriCorpWarchest.deposit`):
  1. **Type/integer check** — non-numbers and non-integers (e.g. `12500.75`) are rejected. Cash is whole-dollar; fractional residue isn't allowed in.
  2. **Positive check** — `amount <= 0` rejected. Negative deposits would be a withdraw, and there are no withdraws.
  3. **Insufficient funds** — if `farmBalance < amount`, deposit rejected. No partial deposits — the player must type the actual amount they have.
  4. **Cap overage** — if `current + amount > WIN_CAP`, deposit rejected with the exact maximum allowed shown. The player must type the right number.
- On success, cash leaves the farm via `AgriCorpStats.handleExternalTransaction(mission, -amount, farmId, MoneyType.OTHER, false, true)` — the silent channel that bypasses the entire `addMoney` observer chain. **The deposit does NOT count as expenditure for the year, does NOT reduce annual profit, does NOT feed the scrip bonus calc, and does NOT trigger Credit Rating's negative-balance hook.** Lore: the money is spent, but it's not a *farm operating expense* — it's the farmer personally funding the resistance.
- An `OK` HUD side notification fires on every successful deposit showing the new total and percent toward win. Cap-reach (balance lands at exactly `WIN_CAP`) fires a second `CRITICAL` HUD card: "RECLAMATION WARCHEST FULL — THE VALLEY IS RECLAIMED."
- Every deposit is recorded in a persistent ledger (`{year, period, amount}`) for `farmPunkWarchest`'s readout and future UI use. The ledger grows monotonically — no entries are removed, ever.

*Why the silent channel*
- `handleExternalTransaction` calls the captured pre-wrap reference of `FSBaseMission.addMoney` directly, bypassing `AgriCorpStats`'s revenue/expenditure capture, `AgriCorpCredit`'s negative-balance downgrade hook, and `AgriCorpVanillaLoan`'s `LOAN_INTEREST` 3x scaling. That helper does **zero** validation — it'll silently take you to a negative balance, exceed the cap, or accept a fractional amount if the caller doesn't check. AgriCorpWarchest is the caller, and AgriCorpWarchest checks.
- A naive `addMoney(-amount, ..., MoneyType.OTHER, false, true)` would have recorded the deposit as expenditure, depressing annual profit and shrinking the scrip bonus, and a deposit that pushed balance negative would have downgraded the player's credit rating. Both behaviors are wrong for a lore-driven endgame fund — the deposit isn't a tax or a fee, it's voluntary investment in the cause.

*Console commands*
- `farmPunkWarchestDeposit <amount>` — deposit `<amount>` farm cash into the Warchest.
- `farmPunkWarchest` — print Warchest summary: balance, cap, exact remaining-to-win, percent to win (4 decimals), deposit count, and the full deposit ledger (one row per deposit with year, period, amount). Read-only.

*Save state*
- Single file `agricorp_warchest.xml` in the savegame directory. Root attribute `balance` plus an indexed `<deposit>` child list (one entry per deposit with `year`, `period`, `amount` attributes). Schema mirrors `AgriCorpStats`'s indexed-year shape.

*UI / future*
- No menu tab page yet — the in-game UI for the Warchest is deferred. The console commands are the test harness and the player-facing surface for now.
- Endgame plumbing (game-end trigger, victory cinematic, etc.) is similarly deferred — the cap-reach HUD card is the only signal the win condition has been met.

---

**Opposition Events**

The Cartel retaliates as the player accumulates shares. Each year a randomized set of opposition effects activates for the duration of the calendar year (period 1 through period 12), then clears at the next year roll. The Reclamation Warchest serves as defense — money in the warchest reduces the cartel's pressure for that year.

*Pressure score*

```
defense       = floor(warchestBalance / 10,000,000)
pressureScore = sharesOwned − defense
```

Every $10M in the Warchest cancels one share's worth of cartel pressure ($1B → 100 defense → fully zeros out 100 shares). Score may be negative when defense exceeds shares; opposition is dampened below baseline in that range. Range is approximately [-100, 100].

*Annual roll (period 1)*

A cascading roll determines how many distinct effects activate this year. Per-position base chance is `1 / (N + 1)` (1st = 50%, 2nd = 33%, 3rd = 25%, 4th = 20%, …) modified by `+ pressureScore × 0.005`, clamped to [0, 1]. Cascade breaks on first failure. Once N effects are confirmed, N distinct effects are sampled at random from the 10-event pool, **excluding any effect that was active last year** (1-year cooldown).

| Score | Player situation                              | Avg effects/year |
|-------|-----------------------------------------------|------------------|
| 0     | 50 shares + $500M warchest, OR 100 + $1B      | ~0.7             |
| 50    | 50 shares + no defense, OR 100 + $500M        | ~1.5             |
| 100   | 100 shares + no defense (peak harassment)     | ~4               |

*Effect lifecycle*

At the period-1 tick (year roll):
1. Capture the previous year's active set into `lastYearActive` (cooldown filter).
2. Clear the active set; restore any year-bounded reversible state (License Revocation's tier).
3. Roll pressure score, run cascade, sample N distinct effects from `pool − lastYearActive`.
4. Activate the new effects (set per-effect parameters: which crop is embargoed, which tractor is wrecked, etc.).
5. **Fire one-shot consequences immediately** for any one-shot effect in the new active set. Narrative framing is "midnight before March hits" — the player wakes up in March to find the goon has already been by, the silo already poisoned, the license already revoked. Cartel Audit is the exception: it defers its fee assessment to P12 alongside the rest of the tax block.
6. Fire HUD forecast notification listing this year's active effects (`OK` if empty, `CRITICAL` otherwise).
7. Trigger `AgriCorpCropNovelty.apply()` so embargo and smear factors propagate to station prices on the very next read.

*Effect catalog*

Magnitudes are fixed when active — share count drives frequency via the pressure score, not per-event magnitude.

| # | Event | Type | Effect when active |
|---|-------|------|--------------------|
| 1 | **Cartel Tariff** | continuous | 4th-position chained wrap on `SellingStation.sellFillType` (after Licensing/Novelty/Mastery). `tariff = floor(saleAmount × 0.10)` deducted via `addMoney(-tariff, MoneyType.OTHER, false, true)` post-sale. Yearly running total tracked in `AgriCorpOpposition.tariffYTD` for `farmPunkOpposition`'s readout; per-tick HUD deliberately suppressed (would be too noisy). |
| 2 | **Inflation Decree** | continuous | Vehicle and placeable store prices ×1.20 for the year. Land unaffected (separate market). Read at `AgriCorpFinancing` purchase entry points; the markup applies to base price before downpayment/loan are computed. Vehicle financed path: cleanly composes (engine doesn't deduct, our `addMoney(-downPayment_inflated)` and `loanAmount_inflated` debt are the only flows). Construction path: engine still deducts vanilla totalPrice, so we charge the markup delta `floor(vanillaTotalPrice × 0.20)` separately after placement so total outflow matches. Used vehicles delegate to vanilla and bypass the markup. |
| 3 | **Crop Poisoning** | one-shot at P1 | Picks a random `PlaceableSilo` / `PlaceableSiloExtension` storage with grain on hand, picks one random crop type stored there, drops its fill level by `AgriCorpOpposition.POISONING_LOSS` (default `0.50` — half the stash) via direct write to `storage.fillLevels[fillTypeIndex]` followed by `storage:raiseDirtyFlags(storage.storageDirtyFlag)` (same direct-field pattern AgriCorpSpoilage and AgriCorpBulkStorage already use). Single silo, single crop type. Loss is permanent. `CRITICAL` HUD card. Empty-handed flavor message if no eligible silo exists ("Cartel agents prowled the silos but found nothing in storage"). |
| 4 | **Crop Embargo** | continuous | Picks a random harvestable crop at activation; that crop's sell price ×0.5 for the year. Folded into `AgriCorpCropNovelty.apply` chain as the 5th multiplier (`vanilla × salePrice × novelty × license × mastery × embargo`). Embargoed crop persisted as fillType name + index in `agricorp_opposition.xml`. |
| 5 | **Smear Campaign** | continuous | All Crop Novelty bonuses zeroed for the year (`noveltyMult = 1.0` regardless of last-sold history; Boutique amplification likewise has no base to ride on, so contributes nothing). Forced inside `AgriCorpCropNovelty.apply` via `AgriCorpOpposition.shouldZeroNovelty()`. |
| 6 | **Cartel Audit** | deferred to P12 | At P12 of active year, fee assessed alongside the tax block: `auditFee = floor(annualRevenue × 0.05)` (5% of gross revenue). Fired from `AgriCorpAnnualTaxes.onPeriodChanged` via the public helper `AgriCorpOpposition.assessCartelAudit(farmId, year)` — sequenced inside the existing tax block (after dividend payout) so subscriber order vs. Wallet's profit-based bonus and Stats's expenditure capture is deterministic. Goes through `addMoney(-auditFee, MoneyType.OTHER, false, true)` so Stats records as expenditure and the silent flag suppresses the vanilla popup. Separate `CRITICAL` HUD card matching the franchise-fee style. |
| 7 | **Asset Registration Fee** | continuous monthly | Every PERIOD_CHANGED during active year: `monthlyFee = floor(vehicleCount × 50)`, deducted via `addMoney(-monthlyFee, MoneyType.OTHER, false, true)`. Vehicle count is owned vehicles on the player farm via `g_currentMission.vehicleSystem.vehicles`. Fires once per month for 12 months while active. `OK`-priority HUD card per fire. |
| 8 | **License Revocation** | continuous (year-bounded) | At activation: picks a random crop license with `tier > 0`, drops its tier by 1 (writes `AgriCorpLicensing.tiers[name] = max(0, originalTier - 1)`). **Tier is restored at the next P1** when the effect clears (one of the few effects that fully unwinds). Persisted as `fillTypeName` + `originalTier` in `agricorp_opposition.xml` so the restoration survives mid-year save/load. `CRITICAL` HUD card on activation. Empty-handed flavor if no licensed crops exist. |
| 9 | **Loan Rate Hike** | continuous | New loans created during the year are charged +3% on the rate captured at loan creation. Folded into `AgriCorpFinancing.getCurrentInterestRate` via the pull-pattern getter `AgriCorpOpposition.getLoanRateHike()`. Existing loans unaffected (matches the existing convention — rate is locked at loan creation and never repriced). |
| 10 | **Goon Visit** | one-shot at P1 | At activation: picks a random tractor (filter via `storeItem.categoryName` prefix-matching `"TRACTOR"` — covers `TRACTORSS`/`TRACTORSM`/`TRACTORSL`/`TRACTORS` without false positives like `TRAILERS`/`HARVESTERS`) owned by the player farm with `damage < 0.80`. Sets its damage to `1.0` via `Wearable:setDamageAmount(1.0, true)`. Single tractor, no cascade. Damage is permanent (player must repair). Empty-handed flavor message if no eligible tractor exists ("Goons rolled through but found no tractor worth wrecking — your fleet is too rough already"). `CRITICAL` HUD card. |

*Composition with the rest of FarmPunk*

- **Pull pattern at use sites.** Every consuming module reads `AgriCorpOpposition.isActive(name)` / `getInflationMultiplier()` / `getEmbargoMultiplier(idx)` / `shouldZeroNovelty()` / `getLoanRateHike()` lazily wherever the value is needed. No apply chain, no init-order dependency. The two unavoidable push points are (1) `AgriCorpCropNovelty.apply` (writes per-station prices and reads embargo/smear at use site) and (2) License Revocation's tier write at activation + restore at P1.
- **The 4th `SellingStation.sellFillType` wrap.** Order is documented in `CLAUDE.md`. Licensing → Novelty → Mastery → Opposition (outermost). Tariff math reads the `effectivePrice` returned from the chain (which already reflects all upstream multipliers) and deducts the 10% skim post-sale. Every other tracker upstream is pure tracking — only Opposition's tariff and the engine itself touch money on this path.
- **Cartel Tariff stacking with the franchise fee.** Both fire on revenue, but at different cadences and sites. Tariff is per-sale; franchise is per-year. They compose cleanly because tariff's `addMoney` flows through `AgriCorpStats` capture — the deduction registers as expenditure, but doesn't depress `revenue` (which is the franchise-fee bracket basis). Tariff and franchise can both bite hard in the same year at high share counts.
- **Cartel Audit is co-located with the tax block.** Fired from inside `AgriCorpAnnualTaxes.onPeriodChanged` (rather than from Opposition's own subscriber) to dodge the undefined PERIOD_CHANGED order. Sequence: land/equipment tax → franchise fee → dividend payout → audit → lifetime franchise increment. Audit's expenditure capture means it depresses Wallet's profit-based scrip bonus the same way any other deduction does — that's intended.
- **License Revocation persistence is split.** Licensing's save records the dropped tier (mid-year state); Opposition's save records `originalTier` so the next-P1 restore knows where to write back. On mid-year load: Licensing reads the dropped tier, Opposition reads the originalTier, `Opposition.applyAll` runs in `AgriCorp:loadMap` *before* `CropNovelty.applyAll` and re-asserts the dropped tier (idempotent — same value Licensing already loaded).
- **Inflation markup splits across paths.** Vehicle financed path is the clean case (no engine deduction; our addMoney calls drive everything). Vehicle non-financeable case (pallets/IBCs): single `addMoney(-inflatedPrice)` covers it. Construction path: engine deducts vanilla price, so we add a `-floor(vanillaTotalPrice × (mult − 1))` deduction after placement to charge the markup delta. Used vehicles delegate to vanilla and skip the markup entirely (private-sale, not store).
- **Range floor isn't enforced explicitly.** Pressure score can technically exceed ±100 (e.g. 100 shares + $0 warchest = 100; 50 shares + $750M warchest = -25). The chance clamps `[0, 1]` are the actual bounds; the README's "approximately ±100" is a rough range, not a hard limit.

*Persistence — `agricorp_opposition.xml`*

- Root attributes: `currentYear` (the year the active set was rolled for), `tariffYTD` (running yearly total of tariff deductions).
- `<active>` block: indexed `<entry>` children, one per active effect. Each carries `name` plus per-effect parameters as needed: `fillTypeName` / `fillTypeIndex` (Embargo), `fillTypeName` + `originalTier` (License Revocation), `outcome` + flavor fields (one-shots — `litersLost`/`fillTypeName` for Poisoning, `targetLabel` for Goon Visit).
- `<lastYear>` block: indexed `<entry>` children with `name` only — used as the cooldown filter at next year's roll.

*Load-time safety*

Two failure modes inherited from the Weather load bug:

1. **Save predates FarmPunk install** → no `agricorp_opposition.xml` exists. Module initializes empty state (`activeYear = nil`, `active = {}`, `lastYearActive = {}`, `tariffYTD = 0`); no effects fire on a fresh-from-vanilla save. Persists on next save. `applyAll()` is a no-op (no License Revocation to push).
2. **Save with FarmPunk → reload mid-year** → file exists. Module loads active set + per-effect parameters. `AgriCorp:loadMap` calls `AgriCorpOpposition.applyAll()` *before* `AgriCorpCropNovelty.applyAll()` so the License Revocation tier write re-asserts before per-station prices are computed. Continuous effects on station prices (Embargo, Smear) propagate via `CropNovelty.apply` reading our state at use site — no separate push needed.

*Console commands*

- `farmPunkOpposition` — read-only summary: pressure score breakdown (shares vs warchest defense), this year's active effects with per-effect details, last year's active set (cooldown visibility), running Cartel Tariff total (when active), and a forecast of next year's first-effect chance so the player can plan warchest deposits with intent.
- `farmPunkForceOpposition <effectName>` — testing, force-activates an effect mid-year (bypasses the roll). Mutates the active set. Effect names: `cartelTariff`, `inflationDecree`, `cropPoisoning`, `cropEmbargo`, `smearCampaign`, `cartelAudit`, `assetRegistrationFee`, `licenseRevocation`, `loanRateHike`, `goonVisit`.
- `farmPunkClearOpposition` — testing, clears all active effects (does not re-roll). Restores License Revocation tier and zeros the tariff YTD counter. One-shot consequences (Poisoning's silo loss, Goon Visit's tractor damage) are NOT undone — the world has moved on.
- `farmPunkRerollOpposition` — testing, re-rolls the annual sample now (does not wait for P1). Internally calls `rollNewYear` which captures `lastYearActive`, clears with restore, then samples fresh.

---

**Black Markets**

The FarmPunk's underground delivery network. Each year at period 1, a randomized roster of off-the-books buyers crops up — small mills, regional co-ops, syndicate fronts, insurgent supply lines, and the resistance itself at the top of the ladder — each willing to pay a premium for a specific crop delivered at scale. Black Markets auto-track against player sales (any selling station counts), and pay out cash + scrip + Prestige fame on goal-cross. Unfilled markets lapse silently at year-end as if they never existed; a fresh roster rolls at the next P1 with fresh counters.

*Tier ladder*

| Rarity | Unlock | Slots | Spawn chance | Liter goal | Cash mult | Scrip reward | Fame mult |
|---|---|---|---|---|---|---|---|
| **Backroad** | Prestige 0 | 2 | 100% | 5,000–10,000 | 1.00× | 1–2 | 0.25× goal |
| **Off-Book** | Prestige 10 | 2 | 100% | 10,000–30,000 | 1.00× | 3–5 | 0.50× goal |
| **Underground** | Prestige 20 | 1 | 30% | 30,000–100,000 | 1.25× | 8–12 | 0.75× goal |
| **Insurgent** | Prestige 30 | 1 | 20% | 100,000–300,000 | 1.50× | 20–30 | 1.00× goal |
| **Liberating** | Prestige 40 | 1 | 10% | 500,000–1,000,000 | 1.75× | 40–50 | 1.50× goal |

Cash payout = `floor(goalLiters × vanillaPricePerLiter × cashMult)`. Vanilla price is read once from `g_fillTypeManager:getFillTypeByIndex(idx).pricePerLiter` at spawn time and locked into the market record — payouts don't drift if the player levels SalePrice / Boutique / Mastery / etc. mid-year. Scrip payout is a uniform random integer within the tier range. Fame payout = `floor(goalLiters × fameMult)`, credited as raw `prestigeFame` (the global Mastery counter) — quest fame accelerates Farmer Prestige but not crop Mastery.

*Per-market generation*

Each spawned market rolls a uniform crop pick from the harvestable pool, a uniform liter goal within the tier range, uniform Prestige + Crop-Mastery gate values within the per-tier ranges below, and a vendor name from `AgriCorpBlackMarkets.VENDORS[tier]` (sub-filtered to entries whose `cropAffinity` matches the rolled crop, falling back to the full pool). Within-tier crop uniqueness is enforced by shuffle-and-pick-first-untaken.

| Tier | Prestige req | Crop Mastery req |
|---|---|---|
| Backroad | none | none |
| Off-Book | 10–19 | 1–15 |
| Underground | 20–29 | 5–20 |
| Insurgent | 30–39 | 10–30 |
| Liberating | 40–49 | 15–40 |

Per-market gates may exceed the tier-unlock floor: a player at Prestige 25 sees Underground markets on the board, but a specific Underground might require Prestige 28 + Wheat Mastery 12. They're visible-but-locked until the gates cross.

*Eligibility — auto-track, late-met activation*

Each active market carries an `isEligible` flag. At spawn, `true` iff the player meets both gates *now*; else `false`. Eligibility is re-checked on every Mastery and Prestige level-up (via `AgriCorpBlackMarkets.recheckEligibility()` called from the Mastery sellFillType hook's level-up branch). When both gates cross, `isEligible` flips to `true` permanently. **Monotonic** — once `true`, never flips back to `false`. Once eligible, every liter of the market's crop the player sells (any station, any path) adds to that market's progress. Multiple eligible same-crop markets each receive the full liter delta independently — selling 25k wheat with both a Backroad-wheat-8k and an Off-Book-wheat-25k active credits both fully. Player has no opt-out.

*Tracking hook — 5th wrap on `SellingStation.sellFillType`*

Installs after Licensing → Novelty → Mastery → Opposition (per CLAUDE.md ordering). Pure tracking — no return-value transform; `effectivePrice` is forwarded through unchanged. On every sale, walk the active roster: for each market with `isEligible == true` and `fillTypeIndex == soldFillType`, do `progress += fillDelta`. If `progress >= goal`, fire payout and remove the market from the active roster (highest-index-first removal so earlier indices stay valid when multiple markets complete on the same tick).

**Vanilla mission deliveries currently count toward Black Market progress** — the wrapped `sellFillType` fires for both player free-sales and contract deliveries, and we don't sniff the call for a contract flag. Documented caveat. Revisitable if playtesting shows it's exploitable.

*Auto-payout on goal-cross*

Mid-tick, inside the wrapped `sellFillType`:
1. `g_currentMission:addMoney(+cashPayout, farmId, MoneyType.OTHER, false, true)` — silent flag suppresses the vanilla popup.
2. `AgriCorpWallet.addScrip(scripPayout, "Black Market — <vendor>")`.
3. `AgriCorpMastery.prestigeFame += famePayout` (direct field write — same monotonic counter Mastery uses for crop-sale credit).
4. `CRITICAL` HUD card: "**\<Vendor\>** paid out — \$X cash, Y scrip, Z fame".
5. Remove market from the active roster.

Fame credit deliberately does *not* call `AgriCorpCropYield.apply` / `AgriCorpCropNovelty.apply` directly — the Mastery `sellFillType` hook upstream of us in the chain (or the next sale) handles the apply chain on its next level-cross. Avoids a re-entrant apply during the sale tick.

*Lifecycle*

| Period | Action |
|---|---|
| **P1** | Clear active roster (any uncompleted markets lapse silently — no notification, no penalty). Roll new roster per spawn rules. Generate parameters. Fire forecast HUD card. |
| **Mid-year sales** | Tracking hook fires per sale; payout fires on goal-cross; market removed. |
| **Mastery / Prestige level-up** | Re-check eligibility for all active non-eligible markets via the Mastery hook. |
| **P12** | No special action — markets that didn't complete remain on roster until P1 wipes them. |

*Persistence — `agricorp_blackmarkets.xml`*

- Root attribute `currentYear` — the year the active roster was rolled for.
- `<active>` block: indexed `<market>` children, one per market currently on the roster. Each carries `rarity`, `crop`, `vendor`, `goal`, `progress`, `prestigeReq`, `masteryReq`, `cashPayout`, `scripPayout`, `famePayout`, `isEligible`.

No `<lastYear>` or cooldown bookkeeping — Black Markets have no inter-year memory. A Backroad-wheat in year N can absolutely respawn in year N+1.

*Load-time safety*

Mirrors Opposition's pattern. Two cases:
1. **Save predates Black Markets install** → no `agricorp_blackmarkets.xml` exists. Initialize empty roster. Do not roll a roster on load — wait for the next P1 tick to spawn the first roster, so the player isn't blindsided mid-year.
2. **Mid-year save/load** → file exists. Load roster verbatim. Re-check eligibility on load (recompute eligibility from current Prestige/Mastery state and flip any market whose gates have crossed since the save into `isEligible = true`). Never flip `true` back to `false` (eligibility is monotonic).

No `applyAll()` push needed — Black Markets don't write to engine state outside the sellFillType wrap, and the wrap is installed at file-eval time. State is pull-only at the wrap site.

*Vendor pool*

`AgriCorpBlackMarkets.VENDORS` is a Lua table baked into the module (vendor names are flavor content, not user-edited data). Per-tier list of `{name, optionalCropAffinity}` records. Selection at spawn: filter to the rolled tier; sub-filter to entries whose `cropAffinity == rolledCrop` (if non-empty, pick uniformly from sub-filter; else pick uniformly from full tier list). The vendor name is persisted with the market at spawn (not regenerated on load), so renaming or removing pool entries doesn't disturb in-flight markets.

*Console commands*

- `farmPunkBlackMarkets` — read-only board. Per market: rarity, vendor, crop, goal/progress, eligibility, gate requirements, payout preview. Header line shows current Prestige, current year, the active year, and per-tier slot-firing rolls for the current year (e.g. "Underground slot 1: rolled 0.42 vs 0.30 → no spawn").
- `farmPunkRerollBlackMarkets` — testing tool. Force-clear the active roster and re-run the P1 roll right now. Mutates state.
- `farmPunkForceBlackMarket <tier> [crop]` — testing tool. Force-spawn one market of the given tier. If crop is omitted, picks at random from the harvestable pool. Bypasses within-year uniqueness so multiple same-tier-same-crop can stack for stress tests.
- `farmPunkClaimBlackMarket <id>` — testing tool. Force-complete a market by its current roster index (1-based). Fires the full auto-payout flow (cash + scrip + fame + HUD card + roster removal).

---

**Farmer Titles**

A read-only honorific derived from `AgriCorpMastery.prestigeLevel`. No persistence — the title is recomputed every time it is queried, so retuning the band table or shifting prestige fame requires no migration. Prep ticket for a future surface; right now the only consumer is the `farmPunkStats` summary line.

Bands (descending lookup — first match wins):

| Prestige Level | Title          |
|----------------|----------------|
| 50+            | Rebel Baron    |
| 40 – 49        | Land Boss      |
| 30 – 39        | Farm Operator  |
| 20 – 29        | Dirt Owner     |
| 10 – 19        | Debt Farmer    |
| 0 – 9          | Field Serf     |

Stored on `AgriCorpStats` (`AgriCorpStats.TITLES`, `AgriCorpStats.getFarmerTitle()`). The lookup tolerates `AgriCorpMastery` not being loaded yet by treating a nil module as L0 → "Field Serf"; in practice both modules are loaded before `farmPunkStats` can be invoked, so this is just defensive.

---

**Debug HUD**

A 5-line overlay drawn in the bottom-left of the screen any time a save is loaded. Renders a yellow header (`FarmPunk v<modDesc version> — Early Access Debug`) over four green rows showing the current level of every skill in `SKILL_ORDER` (17 total), keyed by skill id and split 5/4/4/4. Levels are read live from `AgriCorpSkills.getAll()` each frame; mod version is pulled lazily once via `g_modManager:getModByName(AgriCorp.modName).version`.

This is a **temporary early-access debug surface** so testers can see all skill levels at a glance without opening the menu or running `farmPunkSkills`. It will be removed (or gated behind a dev flag) before 1.0.

---

### 📋 Planned

**Menu System**
A dedicated FarmPunk in-game menu tab registered inside `InGameMenu`. The frame class (`AgriCorpFrame`) is a `TabbedMenuFrameElement` subclass. The tab icon (`images/menuIcon.dds`) and XML layout (`gui/AgriCorpFrame.xml`) are loaded at map start. Currently renders a placeholder with a back button only. Future updates will display financial status, loan details, wallet balance, skill tree, and share holdings.

---

### Postponed

**Additional Skills**
- Vehicle: Speed Specialization
- Operation: Reduced AI costs, IMPLEMENT WEIGHT REDUCTION
- Infinite skill levels (currently capped at 10)

**Premium Vehicle Surcharge**
High-end or overpowered vehicles priced at a significant markup (up to 100×) over store price.

**HTML UI Dashboard**
Informational dashboard served as a local HTML file viewable in a browser.

**Meta Map Progression**
Cross-save goals requiring play across up to 5 different maps/save files.

---

## Console Commands

| Command | Arguments | Description |
|---------|-----------|-------------|
| `farmPunkLoanSummary` | — | Print all active loans with principal, remaining, monthly payment, progress, and debt cap status. |
| `farmPunkBuyLand` | `<farmlandId>` | Finance a land purchase by farmland ID. |
| `farmPunkBuyVehicle` | — | Finance the vehicle currently open in the shop (alternative to the Buy button). |
| `farmPunkReserveSummary` | — | Print current cash reserve requirement and whether it is met. |
| `farmPunkStats` | — | Print farmer title (derived from prestige level), then year-over-year revenue, expenditure, net profit, and 3-year average. |
| `farmPunkWallet` | — | Print wallet balance, base salary, and projected year-end bonus. |
| `farmPunkBuySkill` | `<skillName>` | Purchase next level of a skill. Valid names: `cropYield`, `salePrice`, `boutique`, `headerWidth`, `combineCapacity`, `bulkStorage`, `tractorWorkingSpeed`, `combineWorkingSpeed`, `enginePower`, `fuelUsage`, `maintenance`, `traction`, `loanInterest`, `downPayment`, `landBogo`, `spoilageImmunity`, `weatherShield`. |
| `farmPunkSkills` | — | Print all skill levels, costs to next level, and wallet balance. |
| `farmPunkBuyShare` | — | Purchase one FarmPunk share if eligible. |
| `farmPunkShares` | — | Print shares owned, eligibility tier, next share cost, wallet balance, and the dividend block (lifetime fund, current tier + per-share rate, next-tier threshold + delta needed, projected payout). |
| `farmPunkWarchest` | — | Print Reclamation Warchest status: balance, cap ($1B), remaining-to-win, percent to win (4 decimals), deposit count, and the full deposit ledger (year + period + amount per row). Read-only. |
| `farmPunkWarchestDeposit` | `<amount>` | Deposit `<amount>` farm cash into the Reclamation Warchest. One-way — no withdraws. Rejects non-integers, zero/negative amounts, insufficient funds, and amounts that would exceed the cap. |
| `farmPunkLicense` | — | Print all crop licenses: tier, annual cap, sold YTD, headroom. |
| `farmPunkBuyLicense` | `<CROPNAME>` | Upgrade a crop license by one tier. Crop name must be uppercase (e.g. `WHEAT`). |
| `farmPunkNovelty` | — | Print per-crop novelty status: last year sold, year gap, current boost (and whether locked-in for this year). |
| `farmPunkMastery` | — | Print Farmer Prestige level + fame and per-crop Mastery levels + fame, with progress to the next level. |
| `farmPunkRewards` | — | Print the prestige reward catalog: each level's reward name, status (CLAIMED / PENDING / LOCKED), and source XML path. |
| `farmPunkPerks` | — | Print Farmer Prestige perks summary: current prestige level, title, every perk's level/cap, BD counter status (used/cap, current year), and the level of the next grant. |
| `farmPunkPerksDryRun` | `<upToLevel>` | Dry-run the cadence engine from L1 to `<upToLevel>` and print the per-level grant/skip/reward sequence. Read-only — does not mutate state. Use to verify perk grants on a save before grinding to them. Capped at L200. |
| `farmPunkGrantPerks` | `<N>` | Testing tool — bump `prestigeFame` by enough to cross `<N>` more prestige levels and trigger the natural level-up dispatch. Reward catch-up + perk grants both fire as if from a real sale. |
| `farmPunkResetBackroom` | — | Testing tool — zero the Backroom Dealers counter for the current year. |
| `farmPunkOpposition` | — | Print opposition summary: pressure score (shares − defense), warchest defense points, this year's active effects with per-effect details, last year's set (cooldown filter), running Cartel Tariff total, and next-year first-effect chance forecast. Read-only. |
| `farmPunkForceOpposition` | `<effectName>` | Testing tool — force-activate one effect mid-year (bypasses the roll). Names: `cartelTariff`, `inflationDecree`, `cropPoisoning`, `cropEmbargo`, `smearCampaign`, `cartelAudit`, `assetRegistrationFee`, `licenseRevocation`, `loanRateHike`, `goonVisit`. Mutates the active set; one-shots fire their consequence immediately. |
| `farmPunkClearOpposition` | — | Testing tool — clear all active opposition effects without re-rolling. Restores License Revocation tier and zeros Cartel Tariff YTD counter. One-shot consequences (Crop Poisoning silo loss, Goon Visit tractor damage) are NOT undone. |
| `farmPunkRerollOpposition` | — | Testing tool — re-roll the annual opposition sample now without waiting for P1. Captures current active set as `lastYearActive` (cooldown), restores reversible state, then samples fresh. |
| `farmPunkBlackMarkets` | — | Print the Black Markets board: active year, current year, current Prestige, this year's per-tier slot-firing rolls (rarity / slot / rolled vs. chance / fired-or-not), and per-market detail (rarity, vendor, crop, goal/progress, eligibility, gate requirements, payout preview). Read-only. |
| `farmPunkRerollBlackMarkets` | — | Testing tool — clear the active roster and re-run the P1 roll right now (no wait for period 1). |
| `farmPunkForceBlackMarket` | `<tier> [crop]` | Testing tool — force-spawn one market of the given tier (`BACKROAD`, `OFF_BOOK`, `UNDERGROUND`, `INSURGENT`, or `LIBERATING`; display-name spellings like `Backroad` / `off-book` are also accepted). If crop is omitted, picks at random from the harvestable pool. Bypasses within-year uniqueness so multiple same-tier-same-crop can stack for stress tests. |
| `farmPunkClaimBlackMarket` | `<id>` | Testing tool — force-complete a market by its current roster index (1-based). Fires the full auto-payout flow (cash + scrip + fame + HUD card + roster removal). |
| `farmPunkClaimReward` | `<level>` | Force-claim a prestige reward for testing — bypasses the prestige-level gate but still respects the once-per-save claimed flag. |
| `farmPunkResetReward` | `<level>` | Clear a level's claimed flag so it becomes claimable again. Does not despawn or remove any vehicle that was already delivered. |
| `farmPunkDumpVehicle` | `<level>` | Read the shop's currently-configured item (any storeItem — tractor, plow, trailer, seeder, etc.) and **append** its `xmlFilename` + chosen `configurations` as another `<reward>` in `<savedir>/agricorp_capture_l<level>.xml`. Run multiple times in a row to bundle a harvester+header, tractor+plow, etc. into one level. Authoring tool — copy the result to `data/rewards/prestige_l<level>.xml` in the mod and reload to register the reward. |
| `farmPunkClearCapture` | `<level>` | Delete the in-progress capture file `<savedir>/agricorp_capture_l<level>.xml`. Use to start over before copying into the mod. Doesn't touch installed templates under `data/rewards/`. |
| `farmPunkSpoilage` | — | Print per-crop grain on hand in silos and trailers, with the projected liters that would spoil at the next period change. Read-only. |
| `farmPunkForceSpoilage` | — | Manually trigger a spoilage tick now without waiting for a period change. Testing tool. |
| `farmPunkShelterCheck` | — | List every owned vehicle as `[SHELTERED] inside <shed name>` or `[exposed]`, with a sheltered/exposed tally. Read-only — verification + diagnostic for shelter detection. |
| `farmPunkStorageStatus` | — | Preview vehicle storage exposure. Shows exposed equipment ranked by sellPrice with vandal cascade rank, exposed pallets, total Wearables, current event odds, and the damage threshold. Read-only — no rolls fired. |
| `farmPunkForceStorage` | — | Manually trigger a vehicle-storage enforcement tick now (wear pass + vehicle event + consumable event). Testing tool. |
| `farmPunkWeather` | — | Print the current year's weather (name, rarity, description, the three signed mods, locked year), full year-by-year history, and catalog counts per rarity tier. |
| `farmPunkSetWeather` | `<id>` | Force a specific weather id (e.g. `weather_full_corpo_climate_event`) and trigger downstream re-apply. Mutates the current year's slot. Testing tool. |
| `farmPunkRerollWeather` | — | Roll a fresh weather right now without waiting for period 1. Testing tool. |
| `farmPunkCredit` | — | Print credit rating summary: current rating, year-to-date "went negative" flag, current effective new-loan interest rate (after skill + rating), and tier ladder. |
| `farmPunkSetCredit` | `<A-F>` | Force a specific credit rating and clear the year flag. Testing tool. |
| `farmPunkVanillaLoan` | — | Print vanilla loan override summary: $50k cap, 3x interest multiplier, current vanilla loan, engine-reported max (verifies the clamp landed), vanilla daily interest, and the effective 3x daily. |
| `farmPunkProbeFarm` | — | Dump every numeric field on the player's farm. Diagnostic — use to verify the max-loan field name if our shotgun list misses it on a future engine version. |
| `farmPunkFranchiseFee` | — | Preview the Cartel Franchise Extortion Fee for the current year. Shows revenue, bracket-by-bracket breakdown, gross fee, share reduction, net fee, and effective rate. Also shows the dividend block: lifetime fund, current tier + per-share rate, next-tier threshold + delta, and the tier projected after this year's gross. Read-only — does not assess or deduct. |
| `farmPunkForceShares` | `<delta>` | Testing tool — add `<delta>` shares to `totalOwned` directly (no scrip cost, no eligibility check, no `sharesThisYear` bump). Result clamped to `[0, 100]`. Pass a negative number to reset back down (e.g. `farmPunkForceShares -100`). |
| `farmPunkForceFranchiseFund` | `<delta>` | Testing tool — add `<delta>` to `lifetimeFranchiseFees` directly. No fee assessed, no money moved, no notifications. Result floored at 0. Useful for verifying dividend tier transitions without grinding 12+ in-game years. |
| `farmPunkAddScrip` | `<amount>` | Testing tool — add `<amount>` scrip to the wallet directly. Negative allowed for clamp testing; result floored at 0. Bypasses the period-12 salary/bonus path so testers can engineer a known wallet balance for skill / share / license purchase rows. |
| `farmPunkSetCash` | `<amount>` | Testing tool — set farm cash to `<amount>` exactly via `AgriCorpStats.handleExternalTransaction` (silent channel — no Stats expenditure capture, no Credit Rating downgrade hook, no VanillaLoan 3x interest scaling). Computes the delta against the current balance internally. For exact-balance test rows (CRD-02, VEH-04, RES-04, BLD-04, LND-05). |
| `farmPunkSetRevenue` | `<amount>` *or* `<year> <amount>` | Testing tool — overwrite a year's revenue bucket in `AgriCorpStats.history` directly. Single-arg form targets the current year. Bypasses the `addMoney` pipeline. For franchise-fee bracket rows (TAX-10 at $200k, TAX-11 at $6M) and dividend-tier rows that need engineered revenue. |
| `farmPunkSetExpenditure` | `<amount>` *or* `<year> <amount>` | Mirror of `farmPunkSetRevenue` for the expenditure column. |
| `farmPunkSetPrestige` | `<level>` | Testing tool — set Farmer Prestige to exactly `<level>`. Computes the cumulative fame threshold for the requested level, sets `prestigeFame` to it, recomputes derived state, and dispatches the same reward catch-up + perk grants + HUD notification a real level-up would. Setting BELOW current does NOT roll back already-claimed rewards (claimed flags persist). |
| `farmPunkSetMastery` | `<CROPNAME> <level>` | Testing tool — set a single crop's Mastery to exactly `<level>`. Crop name uppercase per convention (e.g. `WHEAT`). Re-applies CropYield + CropNovelty so the new yield/price tier takes effect. Does NOT touch `prestigeFame` — use `farmPunkSetPrestige` separately if both are needed. |
| `farmPunkForceStorageEvent` | `<wear\|vandal\|theft\|consumable> [vehicleId]` | Testing tool — fire a single Vehicle Storage branch deterministically (skip the 85/10/5/33 dice). Optional vehicle id (use `farmPunkShelterCheck` for ids) targets a specific entity, bypassing shelter + damage-eligibility checks; owner check is preserved. Mutation paths are unchanged — vandals call `setDamageAmount`, theft calls `detachAndDelete` and pays the Insurance Policy refund, etc. For VST-03 (theft + plow detach), VST-04 (header detach), VST-05 (vandal cascade), VST-08 (consumable scope). |
| `farmPunkAdvancePeriod` | `[N]` *(default 1, max 24)* | Testing tool — fire `N` `MessageType.PERIOD_CHANGED` ticks immediately. Each tick rolls `environment.currentPeriod` (12 → 1, year++), then publishes the message so every subscriber (taxes, wallet, spoilage, vehicle storage, opposition, black markets, etc.) sees the new period and acts on it. Hard-capped at 24 ticks (two years). The engine continues its own internal time tracking; on the next visible frame it may re-overwrite `currentPeriod` from its real clock — for one tick the subscribers fire as if the period had just rolled. |

---

## Save Files

All files are written to the savegame directory alongside the vanilla save.

| File | Contents |
|------|----------|
| `agricorp_loans.xml` | All active loan records and `nextLoanId` counter. |
| `agricorp_stats.xml` | Annual revenue and expenditure history per year. |
| `agricorp_wallet.xml` | Current scrip wallet balance. |
| `agricorp_shares.xml` | `totalOwned` and `sharesThisYear`. |
| `agricorp_skills.xml` | Per-skill level data. |
| `agricorp_licensing.xml` | License tiers per crop and sold-this-year volumes. |
| `agricorp_novelty.xml` | Per-crop last-year-sold and the year-locked boost multiplier currently applied to station prices. |
| `agricorp_mastery.xml` | Per-crop cumulative fame (liters sold) and the global Farmer Prestige fame total. Levels are derived on load. |
| `agricorp_rewards.xml` | Set of prestige levels whose reward has been claimed. Each level appears at most once. |
| `agricorp_perks.xml` | Backroom Dealers per-year sell counter (`backroomUsedThisYear`) and the year it's bound to (`backroomYear`). Perk levels are not persisted — derived from `AgriCorpMastery.prestigeLevel` on demand. |
| `agricorp_bulkstorage.xml` | Snapshot of grain silo and grain trailer fill levels at save time (keyed by `placeable.uniqueId` + container/index for silos, `vehicle.uniqueId` + fillUnit index for trailers). Used to restore boosted-capacity fills on load before the engine's vanilla-cap clamp can truncate them. |
| `agricorp_combinecapacity.xml` | Same shape as `agricorp_bulkstorage.xml` but for combine grain tanks (keyed by `vehicle.uniqueId` + fillUnit index). |
| `agricorp_weather.xml` | Current year's locked weather (`currentId`, `currentYear`) and a `history[year] = id` map for `farmPunkWeather`'s readout. |
| `agricorp_credit.xml` | Current credit rating (A-F) and the sticky `wentNegativeThisYear` flag. Both attributes on the root `<credit>` element. |
| `agricorp_annualtaxes.xml` | Lifetime franchise fees assessed (gross — drives the dividend tier). Single attribute `lifetimeFranchiseFees` on the root `<annualtaxes>` element. |
| `agricorp_warchest.xml` | Reclamation Warchest balance and the full deposit ledger. Root attribute `balance` plus indexed `<deposit>` children (one per deposit, with `year` / `period` / `amount` attributes). |
| `agricorp_opposition.xml` | Active set of Opposition Events for the current year + last year's set (cooldown filter). Root attributes `currentYear` (rolled-for year) and `tariffYTD` (running yearly Cartel Tariff total). `<active>` block: indexed `<entry>` children carrying `name` plus per-effect parameters (`fillTypeName`/`fillTypeIndex` for Embargo, `fillTypeName`+`originalTier` for License Revocation, `outcome`/`litersLost`/`targetLabel` flavor for one-shots). `<lastYear>` block: indexed `<entry>` children with `name` only. |
| `agricorp_blackmarkets.xml` | Active roster of Black Markets for the current year. Root attribute `currentYear` (rolled-for year). `<active>` block: indexed `<market>` children carrying `rarity`, `crop`, `vendor`, `goal`, `progress`, `prestigeReq`, `masteryReq`, `cashPayout`, `scripPayout`, `famePayout`, and `isEligible` (the per-market activation flag — preserved across save/load). No cooldown bookkeeping (Black Markets have no inter-year memory). |

---

## Version History

| Version  | Date     | Notes                                          |
|----------|----------|------------------------------------------------|
| 0.0.34.0 | 05.01.26 | Pre early access release cleanup. |
| 0.0.33.0 | 05.01.26 | **Black Markets** shipped — the FarmPunk's underground delivery network. Each year at P1 a randomized roster of off-the-books buyers crops up across five rarity tiers (Backroad / Off-Book / Underground / Insurgent / Liberating), each willing to pay a premium for a specific crop delivered at scale. **Tier ladder**: Backroad (Prestige 0, 2 slots × 100% chance, 5–10k L goal, 1.00× cash mult, 1–2 scrip, 0.25× fame); Off-Book (P10, 2 × 100%, 10–30k L, 1.00×, 3–5 scrip, 0.50× fame); Underground (P20, 1 × 30%, 30–100k L, 1.25×, 8–12 scrip, 0.75× fame); Insurgent (P30, 1 × 20%, 100–300k L, 1.50×, 20–30 scrip, 1.00× fame); Liberating (P40, 1 × 10%, 500k–1M L, 1.75×, 40–50 scrip, 1.50× fame). Cash payout = `floor(goalLiters × vanillaPricePerLiter × cashMult)` with vanilla price read from `g_fillTypeManager:getFillTypeByIndex(idx).pricePerLiter` and locked at spawn; scrip payout = uniform integer within the tier range; fame payout = `floor(goalLiters × fameMult)` credited as raw `prestigeFame` (the global Mastery counter, so quest fame accelerates Farmer Prestige but not crop Mastery). **Per-market gates** (Off-Book through Liberating) — uniform integer Prestige req + Crop Mastery req within tier-specific ranges (e.g. Underground: P20–29 + crop mastery 5–20). Gates may exceed the tier-unlock floor — a P25 player sees Underground markets but a specific Underground might require P28 + Wheat Mastery 12 (visible-but-locked until the gates cross). **Within-tier crop uniqueness** via shuffle-and-pick-first-untaken; different tiers can share crops freely. **Eligibility — auto-track, late-met activation**: each market carries an `isEligible` flag set at spawn from current state; re-checked on every Mastery/Prestige level-up via `AgriCorpBlackMarkets.recheckEligibility()` called from `AgriCorpMastery.onSellFillType`'s level-up branch. **Monotonic** — once `true`, never flips back. Multiple eligible same-crop markets each receive the full liter delta independently. Player has no opt-out. **Tracking hook**: 5th wrap on `SellingStation.sellFillType` (after Licensing → Novelty → Mastery → Opposition per CLAUDE.md ordering). Pure tracking — no return-value transform; `effectivePrice` forwarded unchanged. On every sale, walks the active roster: for each market with `isEligible == true` and `fillTypeIndex == soldFillType`, increments `progress += fillDelta`; if `progress >= goal`, fires payout and removes the market (highest-index-first removal so earlier indices stay valid when multiple markets complete on the same tick). **Auto-payout on goal-cross**: `addMoney(+cashPayout, MoneyType.OTHER, false, true)` (silent flag suppresses vanilla popup), `AgriCorpWallet.addScrip(scripPayout, "Black Market — <vendor>")`, `AgriCorpMastery.prestigeFame += famePayout` (direct field write — same monotonic counter Mastery uses for crop-sale credit; deliberately does NOT call CropYield.apply / CropNovelty.apply directly to avoid re-entrant apply during the sale tick — Mastery's own hook upstream of us in the chain handles the apply chain on its next level-cross), CRITICAL HUD card with vendor + payout breakdown. **Vendor pool**: `AgriCorpBlackMarkets.VENDORS` is a Lua table baked into the module (per-tier list of `{name, optionalCropAffinity}` records). Selection at spawn filters to tier, sub-filters to entries whose `cropAffinity == rolledCrop` (if non-empty, picks uniformly from sub-filter; else picks uniformly from full tier list). Vendor name is persisted with the market at spawn (not regenerated on load). Vendor pool is content the mod author maintains over time. **Vanilla mission deliveries currently count toward Black Market progress** — the wrapped `sellFillType` fires for both player free-sales and contract deliveries, and we don't sniff the call for a contract flag. Documented caveat. **Lifecycle**: P1 clears active roster (uncompleted markets lapse silently — no notification, no penalty), rolls new roster, fires forecast HUD card listing the year's lineup ("Year N lineup: 2 Backroad, 2 Off-Book, 1 Underground"); mid-year sales via the tracking hook; Mastery/Prestige level-up triggers eligibility recheck; P12 has no special action. **Persistence** in new `agricorp_blackmarkets.xml` (root attribute `currentYear`, indexed `<market>` children carrying `rarity` / `crop` / `vendor` / `goal` / `progress` / `prestigeReq` / `masteryReq` / `cashPayout` / `scripPayout` / `famePayout` / `isEligible`). No `lastYear` / cooldown bookkeeping (Black Markets have no inter-year memory — a Backroad-wheat in year N can absolutely respawn in year N+1). **Load-time safety** mirrors Opposition: missing-file → empty roster, no roll on load (next P1 fires the first roster, so the player isn't blindsided mid-year); existing-file → load roster verbatim + re-check eligibility on load (recompute from current Prestige/Mastery state and flip any market whose gates have crossed since the save into `isEligible = true`; never flips `true` back to `false`). No `applyAll()` push needed — Black Markets don't write to engine state outside the sellFillType wrap, and the wrap is installed at file-eval time. State is pull-only at the wrap site. **Console**: `farmPunkBlackMarkets` (read-only board with active year, current year, current Prestige, per-tier slot-firing rolls, and per-market detail), `farmPunkRerollBlackMarkets` (testing — clear active roster and re-run the P1 roll now), `farmPunkForceBlackMarket <tier> [crop]` (testing — force-spawn one market of given tier; bypasses within-year uniqueness for stress tests), `farmPunkClaimBlackMarket <id>` (testing — force-complete a market by roster index, fires full payout flow). |
| 0.0.32.0 | 05.01.26 | **Opposition Events** shipped — The Cartel retaliates as the player accumulates shares. Each year a randomized set of opposition effects activates for the duration of the calendar year (P1 through P12), then clears at the next year roll. **Pressure score**: `floor(warchestBalance / $10M)` defense points cancel one share's worth of pressure each ($1B → 100 defense → fully zeros out 100 shares). Score may be negative when defense exceeds shares; opposition is dampened below baseline in that range. **Cascade roll**: per-position base chance is `1 / (N + 1)` (1st = 50%, 2nd = 33%, 3rd = 25%, …) modified by `+ pressureScore × 0.005`, clamped `[0, 1]`. Breaks on first failure; once N effects are confirmed, N distinct effects are sampled at random from the 10-event pool **excluding any effect that was active last year** (1-year cooldown). At score 0: ~0.7 effects/year. At score +50: ~1.5. At score +100 (peak harassment): ~4. **10-effect catalog**: (1) Cartel Tariff — 10% per-sale skim via the 4th wrap on `SellingStation.sellFillType` (after Licensing/Novelty/Mastery), running yearly total tracked, per-tick HUD suppressed; (2) Inflation Decree — vehicle and placeable store prices ×1.20, land excluded; (3) Crop Poisoning — one-shot at activation, picks a random `PlaceableSilo`/`PlaceableSiloExtension` storage with grain on hand, picks one crop type, writes `storage.fillLevels[fillTypeIndex] = 0` + `raiseDirtyFlags` (same pattern AgriCorpSpoilage uses); (4) Crop Embargo — picks a random harvestable crop, ×0.5 sell price for the year, folded into `AgriCorpCropNovelty.apply` chain as the 5th multiplier (`vanilla × salePrice × novelty × license × mastery × embargo`); (5) Smear Campaign — forces `noveltyMult = 1.0` for the year (Boutique amplification has no base to ride on); (6) Cartel Audit — deferred to P12, fee = `floor(annualRevenue × 0.05)`, fired from inside `AgriCorpAnnualTaxes.onPeriodChanged` via the public helper `AgriCorpOpposition.assessCartelAudit(farmId, year)` so subscriber order vs. Wallet's profit-based bonus and Stats's expenditure capture is deterministic; (7) Asset Registration Fee — `floor(vehicleCount × 50)` deducted every PERIOD_CHANGED while active (12 fires/year); (8) License Revocation — picks a random crop license with tier > 0, drops tier by 1 at activation, restored at next P1 (one of the few effects that fully unwinds), `originalTier` persisted alongside the active entry so restoration survives mid-year save/load; (9) Loan Rate Hike — +3% on new loans created during the active year, folded into `AgriCorpFinancing.getCurrentInterestRate` via `AgriCorpOpposition.getLoanRateHike()`, existing loans unaffected (rate locked at creation); (10) Goon Visit — one-shot at activation, picks a random tractor (`storeItem.categoryName` prefix-matching `"TRACTOR"` to cover `TRACTORSS`/`TRACTORSM`/`TRACTORSL`/`TRACTORS` without false positives) with damage < 0.80, sets damage to 1.0. **Pull pattern at use sites** — every consuming module reads `AgriCorpOpposition.isActive(name)` / `getInflationMultiplier()` / `getEmbargoMultiplier(idx)` / `shouldZeroNovelty()` / `getLoanRateHike()` lazily wherever the value is needed. The two unavoidable push points: `AgriCorpCropNovelty.apply` (writes per-station prices and reads embargo/smear at use site) and License Revocation's tier write at activation + restore at P1. **Inflation markup splits across paths** because the engine deducts vanilla price differently per path: vehicle financed (clean — engine doesn't deduct, our addMoney calls drive everything); non-financeable consumables (single `addMoney(-inflatedPrice)`); construction (engine deducts vanilla, so we add a separate `-floor(vanillaTotalPrice × 0.20)` deduction after placement to charge the markup delta — total outflow then matches the inflated price); used vehicles delegate to vanilla and skip the markup (private-sale, not store). **Persistence** in new `agricorp_opposition.xml` (root attributes `currentYear` + `tariffYTD`, indexed `<active>` entries with per-effect params including `outcome`/`litersLost`/`targetLabel` flavor for one-shots, indexed `<lastYear>` entries for cooldown). **Load-time safety**: `AgriCorpOpposition.onLoad` initializes empty state on missing-file (fresh-from-vanilla saves don't get blindsided mid-year) or loads existing state, then `AgriCorpOpposition.applyAll()` runs in `AgriCorp:loadMap` *before* `AgriCorpCropNovelty.applyAll` so License Revocation's tier write re-asserts before per-station prices compute. Continuous effects on station prices (Embargo, Smear) propagate via CropNovelty.apply reading our state at use site — no separate push needed. Same Weather load-bug failure modes addressed by construction. **Console**: `farmPunkOpposition` (read-only summary — pressure score breakdown, active effects with per-effect details, last year's set, running tariff total, next-year first-effect chance forecast), `farmPunkForceOpposition <effectName>` (testing — force-activate one effect mid-year, bypasses the roll, one-shots fire immediately), `farmPunkClearOpposition` (testing — clear all active effects without re-rolling, restores License Revocation tier and zeros tariff YTD; one-shot consequences NOT undone), `farmPunkRerollOpposition` (testing — re-roll the annual sample now, captures current set as cooldown filter, restores reversible state, samples fresh). 45 new OPP-NN test cases cover pressure score math at all four corners (shares only, defense reduces, full defense at $1B + 100 shares, negative score), cascade-clamped-at-floor, cooldown exclusion, every effect's continuous and empty-handed branches, persistence (fresh save / pre-FarmPunk save / mid-year reload preserves continuous effects + tariff YTD + one-shot outcome flavor + cooldown), and the inflation markup's 4-path split (financed vehicle / non-financeable consumable / placeable / used vehicle bypass / land excluded). |
| 0.0.31.0 | 05.01.26 | **Farmer Prestige Perks** shipped — repeating bonuses earned as the player accrues Farmer Prestige levels. Twelve-perk rotation: Industrial Subsidy → Guard Dogs → Credit Indemnity → Generous Banker → Negotiator → Insurance Policy → Tax Shelter → Super Payday Advance → Mastery Catalyst → Land Lawyer → Forecasting Leveraging → Backroom Dealers. Each occurrence is a small delta on an existing system axis (subsidy to wallet salary, multiplicative discount to taxes/surcharge, debt-cap boost, weather-favorable amplifier, theft refund, etc.). Per-perk caps mostly land at 10 levels each (TS/LL/N/GB/CI/FL); a few smaller (BD/IP at 3, SPA at 5, GD at 8); only Industrial Subsidy and Mastery Catalyst are uncapped. **Cadence**: cycle K skips K-1 non-reward levels between each grant, so perks slow down as the player ramps. Reward levels (the prestige reward catalog: L3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 100 by default) are invisible to the cadence — implementation queries `AgriCorpRewards.catalog` directly so user-authored custom rewards via `farmPunkDumpVehicle` automatically slot in as additional skip points. **Drop-on-cap**: a perk hitting its final occurrence is removed from the rotation immediately, but the current cycle continues uninterrupted; only the next cycle starts with the shortened rotation. **State model**: perk levels are pure derivations from `AgriCorpMastery.prestigeLevel` via deterministic replay of the rotation — no persisted perk levels, retuning rebuilds existing saves with no migration. The only persisted state is Backroom Dealers' per-year sell counter (the only mid-year-mutating piece). Consumer modules pull from `AgriCorpPerks.getLevel("perkName")` lazily at use site — no apply chain, no init-order dependency. **Per-perk wiring** (10 modules touched, all pull-style — no module aside from `AgriCorpAssetSellBlock` got more than a handful of lines): `AgriCorpWallet.effectiveBaseSalary` (Industrial Subsidy), `AgriCorpAnnualTaxes.estimateAnnualTax` (Tax Shelter + Land Lawyer fold in as `landDiscount` / `equipDiscount` post-rate), `AgriCorpFinancing.toSurcharge` (Negotiator), `AgriCorpFarmData.getMaxDebt` (Generous Banker — both 0.25 and 0.20 multipliers boosted), `AgriCorpMastery.onSellFillType` (Mastery Catalyst — separate `cropFameDelta` so Prestige fame stays unaffected), `AgriCorpVanillaLoan.getEffectiveCap` (Super Payday Advance — clamp wrap reads effective cap on every recalc), `AgriCorpVehicleStorage.runTheft` (Insurance Policy — refund via `addMoney` before `delete`), `AgriCorpVehicleStorage.getEffectiveVandalProb / getEffectiveTheftProb` (Guard Dogs — read at every period tick), `AgriCorpCredit`'s addMoney hook (Credit Indemnity — `if balance < floor` instead of `< 0`), `AgriCorpWeather.getYieldMod / getSpoilageMod / getExposureMod` (Forecasting Leveraging — asymmetric: positive yield boosted, negative spoilage/exposure boosted; adverse-direction weather passes through). **Backroom Dealers** is the gnarly one — `AgriCorpAssetSellBlock` had to refactor all four sell paths (Vehicle.getCanBeSold, Vehicle.getCanBeAddedToSales, SellVehicleEvent.run, in-game-menu map's button_sell) from "force false / refuse" to "BD-gated, capture-vanilla-and-conditionally-delegate." Two helpers in `AgriCorpPerks` carry the asymmetry between polling and mutating: `canSellViaBackroom()` is non-mutating (the two getter wraps fire many times per UI render and would burn slots on hover otherwise); `consumeBackroomSlot(reason)` increments the counter and returns whether the caller may proceed (used by SellVehicleEvent.run + button_sell). The "abstract once, don't repeat the logic four times" mandate produced a single `tryBackroomSellOrRefuse(reason, refusalMsg)` helper inside `AgriCorpAssetSellBlock` that wraps `consumeBackroomSlot` + the success/failure HUD cards; the polling-only sites just call `passesBackroomPoll()`. **Notifications**: `AgriCorpPerks.tryGrant(prevLevel, newLevel)` is called from `AgriCorpMastery.onSellFillType`'s prestige-crossing branch alongside `AgriCorpRewards.tryClaim` — diffs the derived perk levels and fires one HUD `PERK UNLOCKED — <name> (N/cap)` card per occurrence. **Persistence**: new `agricorp_perks.xml` (only `backroomUsedThisYear` + `backroomYear`). **Console**: `farmPunkPerks` (summary + next-grant forecast), `farmPunkPerksDryRun <upToLevel>` (replay the cadence schedule from L1, no state mutation, capped at L200), `farmPunkGrantPerks <N>` (testing — bump prestigeFame to cross N levels, fires natural dispatch), `farmPunkResetBackroom` (testing — zero the counter). |
| 0.0.30.0 | 04.30.26 | **Reclamation Warchest** shipped — a one-way lifetime fund representing money invested in reclaiming and liberating the valley. Player deposits farm cash via `farmPunkWarchestDeposit <amount>`; cash is gone forever (lore: spent on the resistance). Cap `WIN_CAP = $1,000,000,000` is one of the endgame win conditions. New module `AgriCorpWarchest` with state `balance` (float) + `deposits` (ordered ledger of `{year, period, amount}`). Validation lives module-side because deposits route through `AgriCorpStats.handleExternalTransaction` — the silent channel that bypasses every `addMoney` observer (Stats expenditure capture, Credit's negative-balance downgrade, VanillaLoan's `LOAN_INTEREST` 3x scaling) and does **zero** validation itself. AgriCorpWarchest checks four things before calling: (1) numeric type + integer (rejects `12500.75` — cash is whole-dollar), (2) `amount > 0` (no withdraws), (3) `farmBalance >= amount` (no partial deposits — player must type the actual amount they have), (4) `current + amount <= WIN_CAP` (no auto-truncate — player must type the exact maximum allowed when near cap). Successful deposit fires an `OK` HUD card showing new total + percent to win; landing exactly at cap fires a second `CRITICAL` HUD card "RECLAMATION WARCHEST FULL — THE VALLEY IS RECLAIMED." Persistent state in new `agricorp_warchest.xml` (root attribute `balance` + indexed `<deposit>` children with `year` / `period` / `amount`), schema mirrors `AgriCorpStats`'s indexed-year shape. Console: `farmPunkWarchestDeposit <amount>` (deposit), `farmPunkWarchest` (read-only summary — balance, cap, remaining-to-win, percent at 4 decimals, deposit count, full ledger). UI menu tab and endgame plumbing (game-end trigger, victory cinematic) deferred — the cap-reach HUD card is the only signal the win condition has been met for now. **Composition**: deposits do NOT count as expenditure for the year, do NOT depress annual profit, do NOT shrink the scrip bonus calc (`floor(profit × 0.001)` reads the unaffected profit), do NOT feed Credit Rating's negative-balance hook. The franchise fee bracket is unaffected (it's revenue-based, not profit-based). Lore: the money is spent, but it's not a *farm operating expense* — it's the farmer personally funding the resistance, so the cartel's books don't see it. New WAR-NN test cases cover all four validations, the ledger, the silent-channel composition, and persistence. |
| 0.0.29.0 | 04.30.26 | **Dividend system overhaul** — dividends move from scrip to **farm cash**, switch from profit-multiplied to **flat per-share**, and gain a new lifetime-fund-driven tier ladder. Per-share rate: `$2k / $2.7k / $3.5k / $4.8k / $6k / $7.5k / $8.8k / $10k` across 8 tiers gated on lifetime franchise fees ASSESSED (gross — what the cartel BILLED, not what the player actually paid after share reduction). Lore reframe: the cartel keeps a ledger of every dollar they tried to take; the longer that ledger gets, the bigger the per-share dividend they cough up. Using gross (assessed) instead of net (paid) means buying out to 100 shares doesn't soft-lock the dividend tier — the cartel keeps assessing the fee, the player just doesn't owe any of it, and the ledger keeps growing. Implementation: new `AgriCorpAnnualTaxes.lifetimeFranchiseFees` state + `DIVIDEND_GRADES` data table + pure helpers (`getDividendTierIndex`, `getDividendPerShare`, `getNextDividendTier`). Period-12 sequencing in `AgriCorpAnnualTaxes.onPeriodChanged`: (1) compute franchise fee, (2) deduct net, (3) pay dividend at OLD tier (`payout = sharesOwned × perShare(lifetimeBefore)`) via `addMoney(+payout, MoneyType.OTHER)`, (4) increment `lifetimeFranchiseFees += grossFee`, (5) if increment crosses a tier threshold, fire CRITICAL HUD card "Dividend Tier Upgraded — N → N+1 — Takes effect with next year's dividend." Dividend payout co-located with franchise fee (rather than left in `AgriCorpShares.onPeriodChanged`) because subscriber callback order between modules is undefined and the dividend depends on a deterministic read of `lifetimeBefore`. `AgriCorpShares.onPeriodChanged` keeps only the period-1 reset of `sharesThisYear`. New persistent state in `agricorp_annualtaxes.xml` (single root attribute `lifetimeFranchiseFees`) — `AgriCorpAnnualTaxes.onSave` was a stub, now real; `onLoad` is new and wired into `AgriCorp.onMissionLoaded`. Console: `farmPunkShares` now surfaces dividend block (lifetime fund, current tier + rate, next-tier threshold + delta, projected payout). `farmPunkFranchiseFee` extended with the same dividend block plus projected tier after this year's gross. New testing console `farmPunkForceFranchiseFund <delta>` adds to lifetime directly (no fee assessed, no money moved), parallel to `farmPunkForceShares`. README's Wallet section dropped the `Dividends` scrip bullet (dividends no longer pay scrip). Composition: dividend `addMoney(+payout)` flows through `AgriCorpStats`'s revenue capture, so dividends count as revenue for the year — at max tier × 100 shares ($1M/year) the dividend by itself can push the player into a higher franchise fee bracket; at 100 shares the bracket push has no cash effect since net = $0 anyway. **Save-game breaking** — pre-0.0.29 saves have no `agricorp_annualtaxes.xml`; existing `AgriCorpShares.onPeriodChanged` scrip dividend block was removed, so old saves that loaded today will simply stop receiving scrip dividends and start at lifetime $0 / tier 1 cash dividends. Acceptable per design conversation; not in the wild yet. SHA-07 / SHA-08 rewritten; new SHA-08b through SHA-08g cover tier ladder, this-year-feeds-next-year ordering, tier-cross HUD, 100-share progression, persistence, and dividends-as-revenue composition. |
| 0.0.28.0 | 04.30.26 | **Cartel Franchise Extortion Fee** shipped — progressive fee on annual revenue, fired at period 12 alongside the existing land + equipment taxes. Lore: the player lost the farm to the corpo hegemony cartel and now leases it back via a franchise agreement; each share owned reduces the fee by 1%, so buying back the company is the only escape. Brackets are US-tax-style (each bracket's rate applies only to the portion of revenue inside it): `< $50k = 0%`, `$50k–$250k = 5%`, `$250k–$500k = 8%`, `$500k–$1M = 12%`, `$1M–$5M = 15%`, `> $5M = 20%`. Validation case: $6M revenue → $890,000 gross (≈14.83% effective). Share reduction: `netFee = floor(grossFee × max(0, 1 − sharesOwned × 0.01))` — at 20 shares the $890k bill becomes $712k; at 100 shares it zeros out. Implementation extends `AgriCorpAnnualTaxes.lua` with `FRANCHISE_BRACKETS` data table, pure `computeFranchiseFee(revenue, sharesOwned)` helper returning a structured result (gross, net, reduction, per-bracket breakdown, effective rate), `estimateFranchiseFee()` wrapper that pulls revenue from `AgriCorpStats.history[currentYear].revenue` and shares from `AgriCorpShares.totalOwned`, and a second deduction + CRITICAL HUD card in the existing `onPeriodChanged` block — two cards rather than one so the franchise number gets its own visual beat (UI consolidation deferred to the menu work). Skip-on-zero gate avoids no-op `addMoney` calls. Composition is emergent via the `addMoney` chain: `AgriCorpStats` records the fee as expenditure for the year, and `AgriCorpCredit`'s negative-balance hook watches it (a fee that pushes balance below zero triggers the credit downgrade flag the same way any other transaction does — same shape as vanilla loan interest). New diagnostic console command `farmPunkFranchiseFee` previews the current year's fee with bracket-by-bracket breakdown, share reduction, gross/net, and effective rate. Read-only — does not assess. Land Tax and Equipment Tax remain distinct (kept as scale pressure that bites in low-revenue years and at high share counts, when the franchise fee is reduced or zero). No new save file — state lives in `AgriCorpStats` (revenue) and `AgriCorpShares` (count), both already persistent. README test cases extended with TAX-09 through TAX-15. **Share eligibility shifted to revenue-based, aligned to the franchise brackets** in the same release: `AgriCorpShares.ELIGIBILITY_TIERS` now reads `AgriCorpStats.getAverageRevenue(3)` (new helper, mirror of `getAverageProfit`) against the franchise-bracket boundaries `$50k/$250k/$500k/$1M/$5M → 1/2/3/4/5 shares per year`. Lore symmetry: the bracket the cartel is taxing the farm in determines how many shares the player can buy to fight back. Mechanical reason: gating on profit would have let the franchise fee suppress the escape valve via the `addMoney` → expenditure → profit feedback loop (more revenue → bigger fee → smaller profit → less eligibility); revenue gating bypasses that. `AgriCorpShares.buyShare` ineligibility error and `printShareSummary` updated accordingly. SHA-01/SHA-02 test cases updated; new SHA-02b verifies the tier ladder matches the franchise brackets. Diagnostic console `acProbeStoreCategories` removed (was a one-shot used to confirm `GENERATORS` for No Generators in 0.0.27.0; permanent retention turned out to be unnecessary). New testing console `farmPunkForceShares <delta>` — adds shares directly to `totalOwned` (no scrip cost, no eligibility check, no `sharesThisYear` bump), clamped to `[0, 100]`, useful for verifying franchise fee share reduction at known share counts. |
| 0.0.27.0 | 04.30.26 | **No Generators** shipped. Solar collectors, wind turbines, and other off-grid power placeables are categorically refused at placement. Single `if` branch added to the existing `ConstructionScreen.onButtonPrimary` wrap in `AgriCorpFinancing.lua`: when `brush.storeItem.categoryName == "GENERATORS"`, fire a `CRITICAL` HUD refusal ("Off-grid power generation denied. The company keeps the meter.") and return before the financing path runs. Confirmed via probe (one-shot diagnostic since removed) that vanilla FS25 ships all five generator placeables (Small Solar Collector, etc.) under one `GENERATORS` category. Stateless — no save file, no period subscriber. |
| 0.0.26.2 | 04.30.26 | Hotfix to 0.0.26.1's `SellVehicleEvent.run` wrap — the no-op blocked the sell correctly but left the vanilla in-game Vehicles tab stuck on its "The vehicle/tool is being sold..." spinner overlay forever. Same shape as the original buy-flow hijack stall: the menu listens for a `g_messageCenter:publish(SellVehicleEvent, vehicle)` to dismiss the spinner (`g_messageCenter:subscribe(SellVehicleEvent, self.updateContent, self)` is the pattern, confirmed in `FS25_GarageMenu/gui/MenuGarageMenu.lua:125`), and our no-op skipped that publish entirely. Fix: in the wrapped `run`, after the refusal HUD line, call `g_messageCenter:publish(SellVehicleEvent, self.vehicle)` ourselves before returning. Subscribers (vanilla Vehicles tab + GarageMenu) refresh their list views from the current owned-vehicle set; the blocked vehicle simply reappears in the list because it was never deleted, and the spinner clears. We still skip `superFunc`, so the actual sell logic (deletion + money credit) never runs. Verified path is single-player only (multiplayer unsupported), so we don't need a NetworkUtil resolver fallback for `self.vehicle`. |
| 0.0.26.1 | 04.30.26 | Asset Sell Block extended to cover the in-game menu's Vehicles tab and any mod menu that follows engine convention. Initial 0.0.26.0 wrap of `Vehicle.getCanBeSold`/`getCanBeAddedToSales` only gated the workshop dealer UI — the in-game Vehicles tab and `FS25_GarageMenu` (and presumably other menu replacements) bypass that gate and dispatch sells via `g_client:getServerConnection():sendEvent(SellVehicleEvent.new(vehicle, count, deleteVehicle))`. New wrap on `SellVehicleEvent.run` (class-method, file-eval time, `Utils.overwrittenFunction`) is a no-op — deliberately does NOT call `superFunc`, so the engine's actual sell logic (vehicle deletion + farm balance credit) never runs. Emits a `CRITICAL` HUD side notification: "Your farm is a museum now. Equipment stays in the collection." `SellVehicleEvent` does **not** appear on GDN's Events index but is real at runtime (confirmed by `FS25_GarageMenu` calling `SellVehicleEvent.new` and `g_messageCenter:subscribe(SellVehicleEvent, ...)` without nil checks); defensive `SellVehicleEvent == nil` check at file-eval logs an inert-block line if a future engine rename moves the path. Acknowledged UX wart: the vanilla menu fires `InfoDialog.show("Sold!")` right after sendEvent returns, before our run handler — the misleading dialog appears briefly but our CRITICAL HUD notification fires first and the vehicle stays in the list, so the disconnect is clear. Patching every menu's UI was rejected as scope creep; one universal event wrap covers vanilla + GarageMenu + every future menu mod following engine convention. Vehicle Storage's theft path uses `Vehicle:delete(immediate)` directly, not `SellVehicleEvent`, so theft still works. Refusal copy split into `REFUSAL_MSG_LAND` and `REFUSAL_MSG_VEHICLE` (was a single `REFUSAL_MSG`). |
| 0.0.26.0 | 04.30.26 | **Asset Sell Block** shipped — the museum doctrine. Players can no longer sell owned farmland or equipment; both channels refuse with a CRITICAL HUD notification (farmland) or simply omit the sell action from the UI (vehicles). New module `AgriCorpAssetSellBlock`. **Vehicles**: class-method wraps at file-eval time on documented `Vehicle.getCanBeSold` and `Vehicle.getCanBeAddedToSales` (GDN, Vehicle class), both forced to return `false`. The engine consults these methods to gate the dealer's sell UI — same mechanism vanilla starter equipment uses via `canBeSold="false"` in storeItem XML — so wrapping them universally makes the sell prompt simply not appear. No per-vehicle spec injection; same `Utils.overwrittenFunction` pattern `AgriCorpMaintenance` uses for `Wearable.updateDamageAmount`. **Farmland**: same `InGameMenuMapFrame.update` contextActions wrap pattern `AgriCorpFinancing` already uses for `button_buy`, but targets `button_sell` and replaces the callback with a `CRITICAL` HUD side notification ("Your farm is a museum now. Land does not leave the collection."). Sentinel name `__agricorpSellPatched` is distinct from Financing's `__agricorpBuyPatched` so both wraps coexist on the same frame. The `button_sell` text mirrors the empirically-found `button_buy` (also not GDN-documented); on first encounter the wrap dumps the full contextActions text list to the log so a future engine rename leaves a forensic trail. Stateless — no save file, no per-period subscriber. Vehicle `getSellPrice()` remains live (still consumed by Annual Taxes equipment value and Vehicle Storage value ranking) — the sell *gate* and the sell *price* are independent. |
| 0.0.25.2 | 04.30.26 | Credit Rating downgrades now apply **immediately** on default instead of deferring to period 1. The original 0.0.24.0 design treated period 1 as a single bidirectional resolution point — both downgrades and upgrades fired then. That meant defaulting in month 3 didn't penalize a month-4 loan: the month-4 loan still locked in the OLD (pre-default) rating's rate. The fix splits resolution asymmetrically: the addMoney hook now applies the downgrade on the spot the moment balance dips below 0 (so the new worse rate hits the very next loan creation through `AgriCorpFinancing.getCurrentInterestRate`), while period 1 becomes upgrade-only — if the sticky `wentNegativeThisYear` flag is set on arrival, the upgrade is skipped and the flag is reset; if clear, the upgrade fires. The flag still does its other job: it gates the mid-year downgrade so a second default in the same year is a no-op (one downgrade per year max). Mid-year HUD notification reworded from "CREDIT DOWNGRADE PENDING — Rating drops X → Y at start of next year" to "CREDIT DOWNGRADED — X → Y. New loans now charge Z% interest." Period-1 message for a defaulted year added: "Credit Rating: X (no upgrade — defaulted this year). New year — clock reset." `farmPunkCredit` summary text updated to reflect that the downgrade-this-year flag means "downgrade was applied at the moment of default" rather than "downgrade locked in for next year." File header doc-comment in `AgriCorpCredit.lua` rewritten to describe the asymmetric design and the sticky flag's two distinct jobs. Local helpers `formatRate` / `getCurrentEffectiveRate` moved above the addMoney hook installer so the closure can see them as upvalues. |
| 0.0.25.1 | 04.30.26 | Hotfix to 0.0.25.0's vanilla loan cap initial pass. The original `applyCapToAllFarms` iterated every farm in `g_farmManager.farms` and called `farm:updateMaxLoan()` on each — but the table includes the spectator farm (id 0) and partially-initialized AI farms whose asset state isn't safe to recalc, and vanilla `Farm.lua:568` threw `attempt to index nil with 'price'` on them. Because the iteration aborted mid-loop, our one-shot `vanillaLoanCapApplied` flag never set, and the failure repeated every frame from `AgriCorp:update`. Fix: replaced with `applyCapToPlayerFarm` — only touches `g_currentMission:getFarmId()`, pcall'd defensively, and the flag is now set unconditionally so a future regression can't spam the log. The class-level wrap on `Farm.updateMaxLoan` is unchanged and still catches every engine-triggered recalc on real farms naturally; the initial pass just seeds the player's state at load. |
| 0.0.25.0 | 04.30.26 | **Vanilla Loan Override** shipped — the engine's loan system stays in place as an emergency channel, but with the cap clamped to a flat **$50,000** and the periodic interest deduction tripled to **3x vanilla**. New module `AgriCorpVanillaLoan`. **Cap**: wraps documented `Farm:updateMaxLoan` (GDN, Farm class). After the vanilla recalc fires, the resulting max-loan field is clamped to $50k. Field name isn't documented (GDN only lists the method), so the wrap shotguns the most-likely candidates (`loanMax` / `maxLoan` / `maxLoanAmount`) — whichever exists gets clamped, the rest are no-ops. New `farmPunkProbeFarm` console command dumps every numeric field on the player's farm if we ever need to verify on a future engine version. Initial cap pass at load via deferred poll in `AgriCorp:update` (one-shot, gated on `g_farmManager.farms` populated) calls `farm:updateMaxLoan()` per farm so the cap takes effect immediately rather than waiting for the next engine-triggered recalc. **Interest scaling**: detected via `MoneyType.LOAN_INTEREST` in the existing `addMoney` hook chain (alongside Stats and Credit) — when a vanilla loan-interest deduction lands, an additional 2x deduction fires through the wrapped `addMoney` (NOT the captured original) with the same MoneyType. Net 3x. Stats correctly records the full 3x as expenditure; Credit's negative-balance hook observes the post-call balance, so a vanilla interest payment that tips the farm under zero triggers the credit downgrade flag emergently — no explicit coordination needed. Recursion-guarded so the extra deduction doesn't itself get scaled. **Composition**: vanilla loan does NOT count toward `AgriCorpFarmData.getMaxDebt` (separate channel), does NOT interact with the `loanInterest` skill or Credit Rating discount on the rate side (those reduce FarmPunk financing only), but DOES participate in Credit Rating's negative-balance detection via the universal addMoney path. Reference: API surface confirmed via GDN Farm class doc (`getLoan`, `updateMaxLoan`, `calculateDailyLoanInterest`, `changeBalance`) and Kogtrey/FS25_KloggersEnhancedLoanSystem source (which confirmed `MoneyType.LOAN_INTEREST` is the constant used for periodic interest transactions). Console: `farmPunkVanillaLoan` (read-only summary), `farmPunkProbeFarm` (diagnostic). |
| 0.0.24.0 | 04.30.26 | **Credit Rating** shipped — six-tier (F→A) rating attached to the farm. Tier drops one notch any year farm balance dips negative, gains one notch any year it doesn't. Each tier above F shaves 1% off interest on **new** loans (existing loans untouched — rate captured at loan-creation time, same as `loanInterest` skill). Stacks freely with `loanInterest`: at the floor (Rating A + L10 skill) new loans bottom out at **2%**. Base loan interest **bumped from 10% to 12%** so even max-everything still pays the bank. New module `AgriCorpCredit`. Detection: post-call hook on `FSBaseMission.addMoney` (composes with the `AgriCorpStats` capture-replace on the same vanilla function — both fire, order doesn't matter). First time balance crosses zero in a year, a `CRITICAL` HUD side notification fires immediately ("CREDIT DOWNGRADE PENDING — Rating drops X → Y at start of next year. Recovering balance does NOT undo this."), and the sticky `wentNegativeThisYear` flag is set; subsequent dips in the same year don't re-fire. Resolution: `MessageType.PERIOD_CHANGED` subscriber gates on `currentPeriod == 1` (start of new year) — period 12 would race tax assessment / wallet payout / dividends since subscriber order is undefined. At resolution: flag set → downgrade (F floors at F), flag clear → upgrade (A caps at A); flag reset to false. HUD notification on every period 1, severity matches direction. State persists in new `agricorp_credit.xml` (rating + flag, both as root attributes); fresh saves default to F + clear flag. Console: `farmPunkCredit` (read-only summary, current effective new-loan rate, tier ladder), `farmPunkSetCredit <A-F>` (testing). README's Loan Terms and Loan Interest skill spec updated to reflect 12% base + composed discount. |
| 0.0.23.0 | 04.30.26 | Two new passive skills hooked into the existing weather-mod composition: **Spoilage Immunity** (`spoilageImmunity`) — `level × 0.005` subtracted from the per-period spoilage rate; folds into `AgriCorpSpoilage.getEffectiveRate()` as `max(0, RATE + weatherSpoilageMod − immunity)`. Clamped at 0 (no bonus crops). Always applies, weather or not. **Weather Shield** (`weatherShield`) — `level × 0.005` of *negative* weather yieldMod absorbed; folded into `AgriCorpCropYield.apply()`'s weatherMod read as `min(rawWeatherMod + shield, 0)` when negative. Positive weather years pass through untouched. Clamped toward zero, never flips positive — the shield can erase damage but can't invent gains (so a -1% weather year with L10 shield lands at 0%, not +4%). Both skills follow the existing `loanInterest` / `downPayment` / `landBogo` passive pattern: registered in `AgriCorpSkills` with no-op `onApply`, read at use site via `AgriCorpSkills.getLevel(...)`. No new modules, no new save file, no modDesc registration. Standard 10/15/25/35/50/75/110/160/240/350 scrip cost ladder. |
| 0.0.22.1 | 04.30.26 | Weather load-apply fix: yields no longer revert to vanilla on reload. Two bugs combined to break load-time apply: (1) `AgriCorpSkills.applyAll` skips `onApply` when `level == 0`, so on a save with cropYield L0 and a saved weather, `AgriCorpCropYield.apply` was never called — `literPerSqm` stayed at vanilla and the weather's yieldMod never landed; (2) `loadMap` and `Mission00.loadMission00Finished` fire in unspecified order across FS25 versions (per the 0.0.19.1 BulkStorage fix), so doing the apply in `loadMap` could race `AgriCorpWeather.onLoad` overwriting the freshly-rolled weather with the saved one — leaving yields applied with the rolled-and-discarded mod. Fix: removed `AgriCorpWeather.applyOnLoad` from `loadMap` and added a deferred one-shot in `AgriCorp:update` (same pattern as the existing Novelty / Rewards / BulkStorage defers). Gated on `AgriCorpSkills.skillsLoaded` + `g_fruitTypeManager.fruitTypes` populated + `environment` ready. The poll calls `AgriCorpWeather.ensureRolledForCurrentYear()` (rolls if state is missing/stale) then explicitly fires `AgriCorpCropYield.apply(level)` regardless of level — guaranteeing the apply runs once per load with the final weather state. Idempotent (double-apply on the rolled-fresh case is harmless since each apply recomputes from the captured baseline). |
| 0.0.22.0 | 04.30.26 | Weather System shipped: new `AgriCorpWeather` module rolls one flavored weather per calendar year at period 1 and locks for the year. Catalog: 45 entries inline in Lua across five rarity tiers (r1×20 / r2×10 / r3×5 / r4×5 / r5×5). Two-stage roll — d100 weighted across rarities (`r1=50 / r2=25 / r3=15 / r4=8 / r5=2`), then uniform pick within tier. Empty-pool fallback walks to the next-lower rarity if a tier is edited down. Three signed mods (`yieldMod`, `spoilageMod`, `exposureMod`) plug additively into existing systems on the percentage-point axis (`+13% existing + (-3%) weather = +10%`, NOT `1.13 × 0.97`). **Yield**: `AgriCorpCropYield.apply` now writes `vanilla × ((skillMult × masteryMult) + weatherYieldMod)` — weather adds directly to the multiplier, preserving the invariant that "skill leveled before weather rolls" and "skill leveled mid-weather-year" produce the same final yield. Verified by in-game probe (`acProbeYieldTiming`) that the engine re-reads `fruitType.literPerSqm` at harvest, so mid-cycle changes apply to the current year's harvest regardless of when crops were planted. **Spoilage**: `AgriCorpSpoilage.getEffectiveRate()` returns `RATE + weatherSpoilageMod` (clamped at 0). **Exposure**: `AgriCorpVehicleStorage.getEffectiveWearDelta()` returns `WEAR_PER_PERIOD + weatherExposureMod` (clamped at 0). Both read at use site, no caching. State persisted in `agricorp_weather.xml` (current id + locked year + per-year history). On load, the apply runs from a deferred one-shot in `AgriCorp:update` — same pattern Novelty/Rewards/BulkStorage already use — gated on `AgriCorpSkills.skillsLoaded` + `g_fruitTypeManager.fruitTypes` populated + `environment` ready. The defer is required for two reasons: (1) `loadMap` and `Mission00.loadMission00Finished` fire in unspecified order across FS25 versions, so doing the apply in `loadMap` can race `AgriCorpWeather.onLoad` and end up applying a freshly-rolled weather instead of the saved one; (2) `AgriCorpSkills.applyAll` skips `onApply` when `level == 0`, so on a save with cropYield L0 and a saved weather, the standard applyAll path never calls `CropYield.apply` and `literPerSqm` stays at vanilla — the deferred poll forces a single apply call independent of skill level. PERIOD_CHANGED subscriber order is also undefined, so `AgriCorpSpoilage.onPeriodChanged` and `AgriCorpVehicleStorage.onPeriodChanged` call `AgriCorpWeather.ensureRolledForCurrentYear()` at their top — same idempotent-fire pattern Licensing uses to harden against the race with Novelty. HUD forecast notification at every roll. Console: `farmPunkWeather` (current + full history + catalog counts), `farmPunkSetWeather <id>` (testing), `farmPunkRerollWeather` (testing). |
| 0.0.21.0 | 04.30.26 | Vehicle Storage Enforcement shipped: new `AgriCorpVehicleStorage` module subscribes to `MessageType.PERIOD_CHANGED` and runs three pressures every in-game month against owned equipment that `AgriCorpShelter.isVehicleSheltered` reports as exposed. (1) **Wear** — every exposed `Wearable` takes `+0.05` damage (capped at `1.0`) via documented `Wearable:setDamageAmount(amount, force)`. Maintenance skill deliberately does **not** mitigate (weather/exposure damage, not vehicle upkeep). (2) **Vehicle event** — mutually exclusive 85/10/5 roll: 10% vandals strip most-valuable exposed to 1.0 damage with `1/2 × 1/3 × 1/4 …` cascade (avg ≈1.7 victims/event); 5% thieves delete most-valuable exposed via documented `Vehicle:delete(immediate)`, with attached children released first via `AttacherJoints:detachImplementByObject(object, noEventSend)`. Vehicles at `≥0.80` damage are exempt from both events (broken gear isn't worth stealing); wear still applies. Ranking by `vehicle:getSellPrice()`. (3) **Consumable event** — independent 33% roll; if it fires, 1 random pallet is always taken plus `1/2` per additional cascade. Scope `storeItem.categoryName ∈ {PALLETS, BIGBAGS, BIGBAGPALLETS, IBC}` — battle-tested set `AgriCorpFinancing.isFinanceableVehicle` already classifies as non-financeable. Empty-handed flavor: when an event rolls but the eligible pool is empty, HUD reports the near-miss anyway ("Vandals came prowling but found nothing worth wrecking"). Single consolidated `CRITICAL`/`OK` HUD side notification per period. Stateless — no save file, re-evaluated from live state each tick (sells/builds/parking changes reflect immediately). Console: `farmPunkStorageStatus` (no-rolls preview ranked by sellPrice + cascade probability labels), `farmPunkForceStorage` (force a tick for testing). |
| 0.0.20.0 | 04.30.26 | Shelter Detection primitive shipped: new `AgriCorpShelter` module classifies any world (X, Z) as inside-or-outside a player shed. Classifier is `placeable.storeItem.categoryName == "SHEDS"` (verified empirically — Cow Barn `ANIMALPENS` is correctly excluded despite the name; Farm Barn and Old Barn both `SHEDS` are included). Geometry primitive is `placeable.spec_indoorAreas.areas[i]` exposing three transform handles `start`/`width`/`height` — three corners of a 2D rectangle in world space (placement rotation already baked into the corner positions, so containment math is rotation-free). The test is the standard projection-onto-edges rectangle check: P inside iff `0 ≤ v·e1 ≤ |e1|²` and `0 ≤ v·e2 ≤ |e2|²` in the X/Z plane. Stateless — no save file, recomputed live every query. Public API: `AgriCorpShelter.findShelterAt(px, pz)` and `AgriCorpShelter.isVehicleSheltered(vehicle)`. New console command `farmPunkShelterCheck` lists owned vehicles as sheltered or exposed. Foundation for the planned Vehicle Storage Enforcement feature (now promoted from Postponed to Planned with the open design questions documented). |
| 0.0.19.1 | 04.29.26 | Bug fix: `bulkStorage` and `combineCapacity` no longer leak fill on save/reload. Vanilla loads `fillLevel` from save before our skill-driven capacity boost applies, so anything filled past the vanilla cap was being clamped down — a silo with 150,000 L (L10 boosted) reloaded at 75,000 L (vanilla cap), losing half the contents. Fix snapshots in-memory fill levels in two new files (`agricorp_bulkstorage.xml`, `agricorp_combinecapacity.xml`) keyed by `placeable.uniqueId` (with container kind + storage index) and `vehicle.uniqueId` (with fillUnit index) — both confirmed stable across save/load via in-game probe; `placeable.id`, `storage.id`, `vehicle.id`, and `vehicle.rootNode` all regenerate per session and don't survive. Restore is a deferred one-shot in `AgriCorp:update` (same pattern as the existing novelty/rewards defers), gated on `AgriCorpSkills.skillsLoaded` + both modules' `snapshotLoaded` flags + `vehicleSystem.vehicles` populated; this works regardless of whether `loadMap` fires before or after `Mission00.loadMission00Finished`, which empirically varies by FS25 version and mod set. The deferred poll re-fires `AgriCorpSkills.applyAll()` (idempotent — every skill apply recomputes from a captured baseline × current multiplier, never compounds) so capacity is guaranteed boosted before fills are written back via the documented `addFillUnitFillLevel` (vehicles) and direct `storage.fillLevels[idx]` write + `raiseDirtyFlags` (silos, mirroring the existing Spoilage/BulkStorage precedent for the undocumented `Storage` class). |
| 0.0.19.0 | 04.29.26 | Crop Spoilage system: 3% of grain in placeable silos and `spec_trailer` vehicles is lost on every `MessageType.PERIOD_CHANGED` (one calendar month). Stateless — reduced fill levels persist via vanilla save. Vehicle path uses documented `FillUnit:addFillUnitFillLevel(farmId, idx, -loss, fillTypeIndex, ToolType.UNDEFINED, nil)`. Silo path uses direct field write to `storage.fillLevels[fillTypeIndex]` followed by `storage:raiseDirtyFlags(storage.storageDirtyFlag)` for engine sync — same direct-field precedent BulkStorage used for `storage.capacity`. Centralized farm silo on `storageSystem` deliberately scoped out (parallel with BulkStorage phase 1a). Console: `farmPunkSpoilage` (preview), `farmPunkForceSpoilage` (testing). |
| 0.0.18.1 | 04.29.26 | Bulk Storage extended to grain-hauling vehicles: any vehicle with `spec_trailer` (trailers, semi-trailers, auger wagons) gets the same +10%/level capacity boost on its grain-capable fillUnits. Mutation via standard `vehicle:setFillUnitCapacity()`. New hook on `VehicleSystem.addVehicle` re-applies on mid-game spawns. Combines remain owned by `combineCapacity` (their spec set is disjoint from `spec_trailer`); harvesters and non-grain trailers (water/livestock/mixer) are auto-excluded by the grain-fillType filter. Cleanup pass extracted `AgriCorpSkills.isGrainFillType(idx)` shared helper used by both `bulkStorage` and `combineCapacity` — kills the duplicated O(fillTypes × fruits) inner loop. |
| 0.0.18.0 | 04.29.26 | Bulk Storage skill: +10% per level (max +100% at L10) to placeable grain silo capacity. New `AgriCorpBulkStorage` module mutates `storage.capacity` on every Storage instance reachable via `g_currentMission.placeableSystem.placeables` whose `fillTypes` set overlaps a fruit fillType. Hook on `PlaceableSystem.addPlaceable` so silos placed mid-game pick up the current level on spawn. Centralized farm silo (`g_currentMission.storageSystem`) and grain trailers/tippers are scoped as follow-ups. Throwaway `acDumpStorage` console command shipped to inspect undocumented `Storage` shape on demand (the class isn't in GIANTS' LUADOC). |
| 0.0.17.0 | 04.28.26 | Multi-reward levels: prestige_l<N>.xml now supports a `<rewards>` root with multiple `<reward>` children for bundled gifts (harvester + header, tractor + plow). `farmPunkDumpVehicle` appends to the level's capture file rather than overwriting; new `farmPunkClearCapture` resets a work-in-progress capture. Legacy single-`<reward>`-root files still load. `farmPunkRewards` shows multi-item levels with each item listed. |
| 0.0.16.0 | 04.28.26 | Prestige rewards: hand-picked vehicle gifts on Farmer Prestige level-up. New `AgriCorpRewards` module (catalog under `data/rewards/`, save state in `agricorp_rewards.xml`). Spawn reuses FS25's `BuyVehicleData:setIsFreeOfCharge(true)` flow at `g_currentMission.storeSpawnPlaces`. Console: `farmPunkRewards`, `farmPunkClaimReward`, `farmPunkResetReward`, `farmPunkDumpVehicle`. Catch-up on load delivers any catalog entry at-or-below current prestige that isn't yet claimed. |
| 0.0.15.1 | 04.28.26 | Crop Mastery bonuses live: +5% per yield tier (L5/15/25/…) and +5% per price tier (L10/20/30/…), per crop. Yield bonus folds into `AgriCorpCropYield.apply`; price bonus added as fifth factor in the `AgriCorpCropNovelty.apply` chain. `farmPunkMastery` summary shows current `+X% yield / +Y% price` per crop. |
| 0.0.15.0 | 04.27.26 | Long Term Skill Gains — Crop Mastery & Farmer Prestige (tracking only). Licensing penalty reworked from per-tick `addMoney` clawback to a station-price multiplier folded into `AgriCorpCropNovelty.apply`. |
| 0.0.14.0 | 04.26.26 | icons                 |
| 0.0.14.0 | 04.26.26 | Working Menu with finance data and skills                    |
| 0.0.14.0 | 04.25.26 | Proof of concept menu tab                      |
| 0.0.13.0 | 04.19.26 | Vehicle/land/placeables buy buttons use default flow. Used vehicles use vanilla flow. |
| 0.0.12.2 | 04.14.26 | Additional skills                              |
| 0.0.12.1 | 04.13.26 | Header width skill                             |
| 0.0.12.0 | 04.13.26 | Crop licensing                                 |
| 0.0.11.0 | 04.13.26 | Skills system                                  |
| 0.0.10.0 | 04.13.26 | Shares system                                  |
| 0.0.9.0  | 04.13.26 | Wallet / scrip                                 |
| 0.0.8.0  | 04.12.26 | Revenue/expense tracking                       |
| 0.0.7.0  | 04.12.26 | Testing phase                                  |
| 0.0.6.0  | 04.12.26 | Save/load from XML                             |
| 0.0.5.0  | 04.12.26 | Land purchase surcharge                        |
| 0.0.4.0  | 04.12.26 | Minimum cash reserve                           |
| 0.0.3.0  | 04.12.26 | Loans, taxes                                   |

*FarmPunk is an independent fan creation. Not affiliated with or endorsed by GIANTS Software.*

---

