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
              The plain-language survival card. New to FarmPunk? Read this once
              before you start, then come back any time you need a refresher.
              Print it out and tape it next to the screen.
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
                Built for new players. Read once. Survive the year.
              </p>
            </div>
            <div className="fp-qr__stamp">EARLY ACCESS</div>
          </div>

          <div className="fp-qr__grid">
            <Block title="The Numbers That Run Your Farm" tone="warn">
              <ul>
                <li><b>Cash on hand</b> — your spending money. Most deals check this before they go through, so always know roughly where it sits.</li>
                <li><b>Debt ceiling</b> — there's a hard cap on how much you can owe at one time. Bigger farm, bigger ceiling. Hit it and the bank stops lending.</li>
                <li><b>Credit rating</b> — a letter from F (worst) to A (best). One bad transaction that pushes you below zero drops it a tier on the spot.</li>
                <li><b>Scrip wallet</b> — a separate currency you earn yearly. Buys skills, shares, and licenses. Can't be traded for cash.</li>
                <li><b>Shares</b> — out of 100 the Cartel "owns" of your farm. Every one you buy back is a permanent 1% off your franchise fee. Owning all 100 is half the win.</li>
                <li><b>Warchest</b> — a one-way fund for the resistance. It only goes up. Filling it to a billion dollars is the other half of the win.</li>
              </ul>
            </Block>

            <Block title="What Happens Through the Year" tone="alert">
              <ol>
                <li><b>Spring (the year flip).</b> A fresh round of pressure begins — new weather rolls, fresh black-market jobs, and any Cartel retaliations get rolled for the year.</li>
                <li><b>Spring through fall.</b> Regular farm work. Plant, harvest, sell. Watch your crop license caps as you go — go over and your prices drop hard for the rest of the year.</li>
                <li><b>Late winter (year-end).</b> The bills land all at once: property tax, equipment tax, the franchise fee, and (if you own shares) your dividend payout. Your scrip salary lands then too.</li>
                <li><b>Year flip again.</b> If your balance never went negative through the whole year, your credit rating ticks up by one tier. If it did, the year was spoiled — you start over clean next March.</li>
              </ol>
            </Block>

            <Block title="Early Game (Years 1–3)" tone="grow">
              <ul>
                <li>Stay above zero. Even a brief negative balance costs you a credit tier — and the only way back is a full clean year.</li>
                <li>Build a shed before parking anything expensive outside. Exposed equipment gets weathered, vandalized, and stolen.</li>
                <li>Buy your first share as soon as you're eligible. Eligibility unlocks once your three-year average revenue crosses $50,000.</li>
                <li>Spend early scrip on the broadest skills first — better yields and better sale prices apply to every crop, every sale.</li>
                <li>License up your top one or two crops before you outgrow the default cap.</li>
                <li>Avoid the emergency vanilla loan unless you're truly out of options. The interest is brutal.</li>
              </ul>
            </Block>

            <Block title="Mid Game (Years 4–10)" tone="grow">
              <ul>
                <li>Push past the $1M revenue bracket. That's where you start being allowed to buy more shares per year.</li>
                <li>Stack the financing skills — cheaper loans and smaller down payments compound on every purchase from then on.</li>
                <li>Rotate your crops. Coming back to a crop after a few years off pays a novelty bonus on its sale price.</li>
                <li>Watch your Farmer Prestige climb. Free vehicles drop onto the dealer's pad at preset levels.</li>
                <li>Start putting cash in the Warchest before you cross 25 shares — the pressure ramp gets steeper from there.</li>
                <li>Keep an eye on your lifetime franchise-fee total. It quietly drives your dividend tier up over time.</li>
              </ul>
            </Block>

            <Block title="Late Game (Year 10+)" tone="rebel">
              <ul>
                <li>Front-load Warchest deposits before each big share milestone. A fat Warchest at the year flip dampens that year's attacks.</li>
                <li>Rule of thumb: every $10 million in the Warchest cancels out one share's worth of Cartel pressure.</li>
                <li>Chase the higher-tier Black Market jobs. Those are the deals that pay enough to fund Warchest deposits.</li>
                <li>The win is exact: 100 shares <b>and</b> $1 billion in the Warchest. Either alone doesn't end the game.</li>
              </ul>
            </Block>

            <Block title="What To Spend Scrip On (in order)" tone="grow">
              <ul>
                <li><b>First:</b> the universal yield and sale-price skills. They apply to every crop, every sale.</li>
                <li><b>Then:</b> shares. Every one is forever off your franchise fee.</li>
                <li><b>Then:</b> bigger silos, wider headers, larger combine tanks. Storage and harvest skills.</li>
                <li><b>Then:</b> vehicle skills — slower wear, lower fuel use, better traction.</li>
                <li><b>Save for:</b> license upgrades on your top three crops.</li>
                <li><b>Avoid:</b> spreading scrip thin across all the skills early. Specialize first.</li>
              </ul>
            </Block>

            <Block title="Systems You Cannot Ignore" tone="alert">
              <ul>
                <li><b>Spoilage</b> — grain in storage rots a few percent every month. Sell, don't hoard.</li>
                <li><b>Rust and Raiders</b> — exposed equipment takes weather damage, vandalism, and theft. Sheds make most of it go away.</li>
                <li><b>License caps</b> — sell more than your license allows and the rest of the year's prices drop hard.</li>
                <li><b>Deadweight inventory</b> — once you buy something, you own it forever. The Sell button is gone.</li>
                <li><b>No off-grid power</b> — solar panels and wind turbines are refused at placement. The Cartel keeps the meter.</li>
                <li><b>Vanilla loan = trap</b> — capped at $50,000, charged at triple the normal rate. Emergency only.</li>
              </ul>
            </Block>

            <Block title="Common Mistakes" tone="warn">
              <ul>
                <li>Hoarding grain "for a better price." It rots, every month, every silo.</li>
                <li>Buying a tractor you can't afford the upkeep on. Every machine bumps your monthly burn.</li>
                <li>Skipping Warchest deposits because "I'll do it later." The pressure stacks while you wait.</li>
                <li>Forgetting that the year-end is everything at once: taxes, franchise fee, audit (if rolled), and dividends.</li>
                <li>Trying to sell something. You can't. Plan every purchase like it's permanent.</li>
                <li>Parking equipment outside. The Cartel is watching, and so are the thieves.</li>
              </ul>
            </Block>

            <Block title="Console Cheats for Checking Up on Things" tone="grow" wide>
              <p className="fp-qr__cmd-intro">
                Open the in-game console (default key <code>~</code>) and type any of these.
                They're all read-only — they print info, they don't change anything.
              </p>
              <div className="fp-qr__cmd-grid">
                <div><code>farmPunkStats</code> — your title, year-by-year revenue, expenses, and profit</div>
                <div><code>farmPunkWallet</code> — scrip balance and projected year-end bonus</div>
                <div><code>farmPunkSkills</code> — every skill, current level, cost to next</div>
                <div><code>farmPunkShares</code> — shares owned and current dividend tier</div>
                <div><code>farmPunkWarchest</code> — balance and percent toward the win</div>
                <div><code>farmPunkOpposition</code> — current pressure score and active attacks</div>
                <div><code>farmPunkLoanSummary</code> — every active loan with monthly payment</div>
                <div><code>farmPunkCredit</code> — your rating and the rate you'd get on a new loan today</div>
                <div><code>farmPunkSpoilage</code> — grain on hand and how much will rot next month</div>
                <div><code>farmPunkStorageStatus</code> — what's exposed and what would get hit if vandals showed up</div>
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
