import { useState } from 'react';
import { GraffitiTag } from '../components/ui/GraffitiTag';
import { Button } from '../components/ui/Button';
import './quick-reference.css';

export function QuickReference() {
  const [print, setPrint] = useState(false);

  return (
    <article className={`fp-qr ${print ? 'fp-qr--print' : ''}`}>
      <div className="fp-content">
        <header className="fp-qr__head fp-no-print">
          <div>
            <span className="fp-eyebrow">Beginner Quick Reference</span>
            <h1>
              <GraffitiTag color="acid" rotate={-3} size="md">FIELD</GraffitiTag>
              {' '}
              <GraffitiTag color="yellow" rotate={2} size="md">CARD</GraffitiTag>
            </h1>
            <p className="fp-qr__lede">
              The dirty laminated card you tape next to the monitor.
              Built to be read at a glance during play. One page, dense,
              practical. Print it out and forget the website exists.
            </p>
          </div>
          <div className="fp-qr__head-actions">
            <Button variant="ghost" onClick={() => setPrint(p => !p)}>
              {print ? 'Show full styling' : 'Print-friendly mode'}
            </Button>
            <Button variant="primary" onClick={() => window.print()}>
              Print this card →
            </Button>
          </div>
        </header>

        <section className="fp-qr__card">
          <div className="fp-qr__card-head">
            <div>
              <h2 className="fp-qr__card-title">FARMPUNK · FIELD CARD v0.0.34</h2>
              <p className="fp-qr__card-sub">
                Tape next to monitor. Refer constantly. Survive the year.
              </p>
            </div>
            <div className="fp-qr__stamp">EARLY ACCESS</div>
          </div>

          <div className="fp-qr__grid">
            <Block title="What You Are Managing" tone="warn">
              <ul>
                <li><b>Cash reserve</b> = monthly obligations × 3. Every purchase blocks if you cross it.</li>
                <li><b>Debt cap</b> = (land × 0.25) + (equip × 0.20) + balance. Min $100k.</li>
                <li><b>Credit rating</b> F → A. Drops the moment balance dips negative.</li>
                <li><b>Scrip</b> wallet. Buys skills, shares, licenses. Cannot be exchanged.</li>
                <li><b>Shares</b> 0–100. Each = 1% off franchise fee. Win at 100.</li>
                <li><b>Warchest</b> 0 → $1B. One-way. Defends against opposition.</li>
              </ul>
            </Block>

            <Block title="Every Year Checklist" tone="alert">
              <ol>
                <li>Period 1 — opposition rolls. Check <code>farmPunkOpposition</code>.</li>
                <li>Period 1 — weather rolls. Check <code>farmPunkWeather</code>.</li>
                <li>Period 1 — black markets refresh. Check <code>farmPunkBlackMarkets</code>.</li>
                <li>Period 1 — share counter resets.</li>
                <li>Mid-year — sell smart, watch crop license caps.</li>
                <li>Period 12 — taxes + franchise fee + dividends + audit.</li>
                <li>Period 12 — wallet payout (10 + profit/1000 scrip).</li>
                <li>Year roll — credit rating upgrades if you didn't default.</li>
              </ol>
            </Block>

            <Block title="Early Game Priorities (Y1–Y3)" tone="grow">
              <ul>
                <li>Stay above zero. One default = credit downgrade, immediate.</li>
                <li>Build a shed before parking anything expensive outside.</li>
                <li>Buy first share as soon as eligible (crosses $50k revenue).</li>
                <li>Skill up <code>cropYield</code> and <code>salePrice</code> first — cheap, broad effect.</li>
                <li>License up your top 2 crops before you cap them.</li>
                <li>Don't take vanilla loan unless emergency. 3× interest.</li>
              </ul>
            </Block>

            <Block title="Mid Game Priorities (Y4–Y10)" tone="grow">
              <ul>
                <li>Cross the $1M revenue bracket — unlocks 4 shares/year.</li>
                <li>Stack <code>downPayment</code> and <code>loanInterest</code> for cheaper financing.</li>
                <li>Diversify crops for novelty bonus — 5+ year gap = +25%.</li>
                <li>Climb Farmer Prestige for vehicle gifts at L3, 5, 10, 15…</li>
                <li>Begin Warchest deposits before crossing 25 shares.</li>
                <li>Keep an eye on lifetime franchise fees — drives dividend tier.</li>
              </ul>
            </Block>

            <Block title="Late Game Priorities (Y10+)" tone="rebel">
              <ul>
                <li>Front-load Warchest before each 25-share milestone.</li>
                <li>$10M Warchest = 1 share of pressure cancelled. Plan accordingly.</li>
                <li>Black Markets — chase Insurgent + Liberating tier payouts.</li>
                <li>At 100 shares + $1B Warchest you've won. Both, not either.</li>
              </ul>
            </Block>

            <Block title="What To Spend Scrip On" tone="grow">
              <ul>
                <li><b>First:</b> <code>cropYield</code>, <code>salePrice</code> — universal multipliers.</li>
                <li><b>Then:</b> shares (only escape from franchise fee).</li>
                <li><b>Then:</b> <code>bulkStorage</code>, <code>combineCapacity</code>, <code>headerWidth</code>.</li>
                <li><b>Then:</b> <code>maintenance</code>, <code>fuelUsage</code>, <code>traction</code>.</li>
                <li><b>Save for:</b> licenses on your top 3 crops.</li>
                <li><b>Avoid:</b> spreading thin across all 17 skills early.</li>
              </ul>
            </Block>

            <Block title="Systems You Cannot Ignore" tone="alert">
              <ul>
                <li><b>Spoilage</b> — 3% of grain per period. Sell, don't hoard.</li>
                <li><b>Rust and Raiders</b> — exposed gear gets vandalized or stolen.</li>
                <li><b>License Caps</b> — sell over and price drops to 20% for the year.</li>
                <li><b>Deadweight Inventory</b> — once bought, always bought. Nothing leaves.</li>
                <li><b>Energy Dependence</b> — solar/wind placeables refused at placement.</li>
                <li><b>Vanilla loan = trap</b> — $50k cap, 3× interest. Emergency only.</li>
              </ul>
            </Block>

            <Block title="Common Mistakes" tone="warn">
              <ul>
                <li>Hoarding grain "for a better price." It rots, every month.</li>
                <li>Buying a tractor you can't afford the upkeep on (vehicle upkeep = price × 0.001/month).</li>
                <li>Skipping the Warchest because "I'll do it later." Opposition stacks.</li>
                <li>Forgetting period 12 hits all at once: tax + franchise + audit + dividend.</li>
                <li>Selling something. You can't. Plan purchases like they're permanent.</li>
                <li>Parking anything outside. The Cartel is watching.</li>
              </ul>
            </Block>

            <Block title="Key Console Commands" tone="grow" wide>
              <div className="fp-qr__cmd-grid">
                <div><code>farmPunkStats</code> — title + revenue/expense/profit summary</div>
                <div><code>farmPunkWallet</code> — scrip + projected year-end bonus</div>
                <div><code>farmPunkSkills</code> — all skill levels + costs</div>
                <div><code>farmPunkShares</code> — shares + dividend tier</div>
                <div><code>farmPunkWarchest</code> — balance + percent to win</div>
                <div><code>farmPunkOpposition</code> — pressure score + active effects</div>
                <div><code>farmPunkLoanSummary</code> — every active loan</div>
                <div><code>farmPunkCredit</code> — rating + effective new-loan rate</div>
                <div><code>farmPunkSpoilage</code> — projected next-period loss</div>
                <div><code>farmPunkStorageStatus</code> — exposed gear preview</div>
              </div>
            </Block>
          </div>

          <div className="fp-qr__footer">
            <span>"You do not inherit freedom. You buy it back one share at a time."</span>
            <span className="fp-mono">FP-QR-v0.0.34 · printed from farmpunk.local</span>
          </div>
        </section>
      </div>
    </article>
  );
}

function Block({
  title,
  children,
  tone = 'grow',
  wide = false
}: {
  title: string;
  children: React.ReactNode;
  tone?: 'grow' | 'warn' | 'alert' | 'rebel';
  wide?: boolean;
}) {
  return (
    <section
      className={`fp-qr__block fp-qr__block--${tone}${wide ? ' fp-qr__block--wide' : ''}`}
    >
      <h3>{title}</h3>
      <div className="fp-qr__block-body">{children}</div>
    </section>
  );
}
