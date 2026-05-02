import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { GraffitiTag } from '../components/ui/GraffitiTag';
import { Callout } from '../components/ui/Card';
import { CatalogCard } from '../components/ui/CatalogCard';
import {
  ALL_CATALOG,
  TOTAL_SHIPPED_BEHAVIOURS,
  type CatalogEntry
} from '../data/mechanics';
import farmpunkIconSmall from '../assets/farmpunk-icon@small.webp';
import farmpunkIcon from '../assets/farmpunk-icon.png';
import './home.css';

const FEATURED_SLUGS = [
  'valley-liberation',
  'skills',
  'farmer-prestige',
  'reclamation-warchest',
  'shares',
  'crop-licensing'
];

const FEATURED: CatalogEntry[] = FEATURED_SLUGS
  .map(slug => ALL_CATALOG.find(e => e.slug === slug))
  .filter((e): e is CatalogEntry => e !== undefined);

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
                <Button href="https://www.farming-simulator.com/mods.php" variant="rust">
                  ModHub ↗
                </Button>
              </div>

              <ul className="fp-hero__stats">
                <li><span>{TOTAL_SHIPPED_BEHAVIOURS}+</span> Systems &amp; skills</li>
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
            <h2>{TOTAL_SHIPPED_BEHAVIOURS}+ systems. Six you&rsquo;ll feel first.</h2>
            <p className="fp-section__lede">
              Every FarmPunk system is documented, modeled, and tunable.
              These are the six that will hit you the hardest, the soonest.
              The full catalog lives in the{' '}
              <Link to="/field-manual">Field Manual</Link>.
            </p>
          </header>

          <div className="fp-features-grid">
            {FEATURED.map(entry => (
              <CatalogCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </div>
      </section>

      {/* ── VALLEY LIBERATION ──────────────────────────────────── */}
      <section className="fp-section fp-win">
        <div className="fp-content fp-win__inner">
          <div>
            <span className="fp-eyebrow">Valley Liberation</span>
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
            <h2>{TOTAL_SHIPPED_BEHAVIOURS}+ systems shipped. More incoming.</h2>
            <p>
              Annual taxes, financing, credit ratings, scrip, shares, dividends,
              skills, mastery, perks, licensing, novelty, spoilage, weather,
              opposition, black markets, warchest, sell blocks, vehicle storage —
              all live. Menu UI and final balance pass are next.
            </p>
            <div className="fp-ea__ctas">
              <Button to="/early-access" variant="primary">What's in EA →</Button>
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
