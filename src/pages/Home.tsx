import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { GraffitiTag } from '../components/ui/GraffitiTag';
import { DossierCard, Callout } from '../components/ui/Card';
import farmpunkIconSmall from '../assets/farmpunk-icon@small.webp';
import farmpunkIcon from '../assets/farmpunk-icon.png';
import './home.css';

const KEY_FEATURES = [
  {
    badge: 'FIN-01',
    stamp: 'ACTIVE',
    title: 'Cartel Franchise Extortion Fee',
    body:
      'A progressive cut on annual revenue. Up to 20% on top earners. Each share you own shaves 1% off the bill. Buy them out or pay forever.',
    rule: 'Pays once a year, every February.'
  },
  {
    badge: 'DBT-02',
    stamp: 'ENFORCED',
    title: 'Mandatory Financing',
    body:
      'Every vehicle, building, and acre over $1,000 is debt. 20% down, 12% interest, 36 months. Lease is gone. The bank is the new boss.',
    rule: 'Default once and your credit rating drops on the spot.'
  },
  {
    badge: 'RPG-03',
    stamp: 'CLIMBING',
    title: 'Crop Mastery & Farmer Prestige',
    body:
      '17 skills × 10 levels each, plus per-crop mastery and a global Prestige track that unlocks vehicles, perks, and titles up to "Rebel Baron."',
    rule: 'Geometric curve. Uncapped. Every liter sold counts.'
  },
  {
    badge: 'OPS-04',
    stamp: 'WATCHED',
    title: 'Storage Enforcement',
    body:
      'Park outside and the Cartel sends vandals (10%) or thieves (5%) every month. Build a shed or watch your fleet vanish into someone else\'s ledger.',
    rule: 'Insurance Policy perk claws back part of the loss.'
  },
  {
    badge: 'OPP-05',
    stamp: 'HOSTILE',
    title: 'Opposition Events',
    body:
      'The more shares you buy, the harder the Cartel pushes back. Ten distinct retaliations: tariffs, embargoes, audits, smear campaigns, goon visits.',
    rule: 'The Warchest is your defense. Every $10M cancels one share of pressure.'
  },
  {
    badge: 'WIN-06',
    stamp: 'GOAL',
    title: 'Reclamation Warchest',
    body:
      'A one-way fund that frees the valley. Cap is $1B. Combined with all 100 shares, this is the win condition. The money never comes back.',
    rule: 'You do not inherit freedom. You buy it back.'
  }
];

export function Home() {
  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="fp-hero">
        <div className="fp-hero__plank">
          <div className="fp-hero__plank-grain" aria-hidden="true" />
          <div className="fp-hero__flash" aria-hidden="true" />

          <div className="fp-hero__layout">
            {/* Polaroid-style snapshot of the actual barn-door icon */}
            <figure className="fp-hero__polaroid" aria-label="FARMPUNK — graffiti tag on a barn door, ModHub icon">
              <span className="fp-hero__tape fp-hero__tape--tl" aria-hidden="true" />
              <span className="fp-hero__tape fp-hero__tape--br" aria-hidden="true" />
              <div className="fp-hero__polaroid-inner">
                <picture>
                  <source srcSet={farmpunkIconSmall} type="image/webp" />
                  <img
                    src={farmpunkIcon}
                    alt="FARMPUNK — acid green and magenta graffiti on a weathered barn door"
                    className="fp-hero__photo"
                    width={480}
                    height={480}
                    loading="eager"
                    decoding="async"
                  />
                </picture>
                <div className="fp-hero__flash-burn" aria-hidden="true" />
              </div>
              <figcaption className="fp-hero__polaroid-caption">
                <span className="fp-stamp">EXHIBIT A · BARN DOOR · 03.26 · FLIP-PHONE</span>
              </figcaption>
            </figure>

            <div className="fp-hero__copy">
              <span className="fp-eyebrow">Early Access · FS25 Overhaul</span>

              <h1 className="fp-hero__wordmark">
                <span className="fp-hero__wordmark-line">
                  <GraffitiTag color="acid" rotate={-3} size="md" as="span">FARM</GraffitiTag>
                  <span className="fp-hero__slash">/</span>
                  <GraffitiTag color="magenta" rotate={2} size="md" as="span">PUNK</GraffitiTag>
                </span>
              </h1>

              <p className="fp-hero__tagline">
                The base game gives you a farm.<br />
                <strong>FarmPunk gives you a fight.</strong>
              </p>

              <p className="fp-hero__lede">
                A financial, RPG, and rebellion overhaul. Start as a manager under
                someone else's rules. End up reclaiming the land — one share, one
                quota, one warchest deposit at a time.
              </p>

              <div className="fp-hero__ctas">
                <Button to="/field-manual" variant="primary">Field Manual</Button>
                <Button to="/quick-reference" variant="ghost">Quick Reference</Button>
                <Button to="/endgame" variant="rebel">Reclamation Sequence</Button>
                <Button href="https://www.farming-simulator.com/mods.php" variant="rust">
                  ModHub ↗
                </Button>
              </div>

              <ul className="fp-hero__stats">
                <li><span>17</span> Skills</li>
                <li><span>100</span> Shares</li>
                <li><span>$1B</span> Warchest cap</li>
                <li><span>10</span> Cartel retaliations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ─────────────────────────────────────────── */}
      <section className="fp-section">
        <div className="fp-content fp-philosophy">
          <div>
            <span className="fp-eyebrow">Philosophy</span>
            <h2>This is not cozy farming.</h2>
            <p>
              Your family worked this valley for generations. Then the war came,
              the old rules broke, and the only institutions left standing were
              the corporations ruthless enough to survive. Through debt,
              racketeering, franchise contracts, and legalized theft, the Cartel
              squeezed your family out of ownership.
            </p>
            <p>
              You were left one way to stay on the land: run your own farm as
              their employee. FarmPunk begins there.
            </p>
            <p className="fp-philosophy__pull">
              <GraffitiTag color="acid" rotate={-2} size="sm">
                The farm is not yours yet.
              </GraffitiTag>
            </p>
          </div>

          <Callout kind="warning" title="Compliance Bulletin · 26-A">
            Every system is pressure. Every upgrade is leverage. Failure to
            remit annual franchise obligations may result in escalated
            collection activity, including but not limited to: tariff
            assessment, license revocation, fleet inspection, and crop seizure.
          </Callout>
        </div>
      </section>

      {/* ── KEY FEATURES ───────────────────────────────────────── */}
      <section className="fp-section fp-section--alt">
        <div className="fp-content">
          <header className="fp-section__head">
            <span className="fp-eyebrow">Field Dossiers</span>
            <h2>Six systems pushing back at once.</h2>
            <p className="fp-section__lede">
              Every FarmPunk system is documented, modeled, and tunable.
              Here are the six you'll feel first. The full list lives in the{' '}
              <Link to="/field-manual">Field Manual</Link>.
            </p>
          </header>

          <div className="fp-features-grid">
            {KEY_FEATURES.map((f, i) => (
              <DossierCard
                key={f.badge}
                badge={f.badge}
                stamp={f.stamp}
                tilt={i % 2 === 0 ? -0.6 : 0.6}
              >
                <h3>{f.title}</h3>
                <p>{f.body}</p>
                <hr className="fp-rule" />
                <p className="fp-stamp" style={{ fontSize: '0.78rem', margin: 0 }}>
                  {f.rule}
                </p>
              </DossierCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── WIN CONDITION ──────────────────────────────────────── */}
      <section className="fp-section fp-win">
        <div className="fp-content fp-win__inner">
          <div>
            <span className="fp-eyebrow">Win Condition</span>
            <h2>Two endgames. One reclamation.</h2>
            <p>
              FarmPunk is not about getting rich. It is about taking back what
              was stolen. To win you must complete both:
            </p>
            <ol className="fp-win__list">
              <li>
                <strong>Buy all 100 shares.</strong> Each share you own
                weakens the Cartel's grip. At 100, the franchise fee zeroes
                out and the farm is yours again.
              </li>
              <li>
                <strong>Fill the Reclamation Warchest.</strong> One billion
                dollars of resistance funding. The money never comes back.
                The valley does.
              </li>
            </ol>
            <Button to="/endgame" variant="rebel">Walk the Reclamation Sequence</Button>
          </div>

          <Callout kind="rebellion" title="From the back of a tax notice">
            Fund the Warchest. Buy the shares. Break the grip. Reclaim the
            land. Help take back the valley.
          </Callout>
        </div>
      </section>

      {/* ── EARLY ACCESS BANNER ────────────────────────────────── */}
      <section className="fp-section fp-ea">
        <div className="fp-content fp-ea__inner">
          <div className="fp-ea__copy">
            <span className="fp-eyebrow">Status — v0.0.34 · Early Access</span>
            <h2>Forty-plus systems shipped. More incoming.</h2>
            <p>
              Annual taxes, financing, credit ratings, scrip, shares, dividends,
              skills, mastery, perks, licensing, novelty, spoilage, weather,
              opposition, black markets, warchest, sell blocks, vehicle storage —
              all live. Menu UI and final balance pass are next.
            </p>
            <div className="fp-ea__ctas">
              <Button to="/early-access" variant="primary">What's in EA →</Button>
              <Button to="/console" variant="ghost">Console reference</Button>
            </div>
          </div>
          <div className="fp-ea__changelog">
            <h4>Latest commits</h4>
            <ul>
              <li><code>0.0.34</code> Pre EA release cleanup</li>
              <li><code>0.0.33</code> <strong>Black Markets</strong> — 5-tier underground buyer roster</li>
              <li><code>0.0.32</code> <strong>Opposition Events</strong> — 10 cartel retaliations</li>
              <li><code>0.0.31</code> <strong>Farmer Prestige Perks</strong> — 12-perk rotation</li>
              <li><code>0.0.30</code> <strong>Reclamation Warchest</strong> — endgame fund</li>
              <li><code>0.0.29</code> Dividend overhaul — cash, lifetime tier ladder</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
