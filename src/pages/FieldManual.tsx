import { Link } from 'react-router-dom';
import { GraffitiTag } from '../components/ui/GraffitiTag';
import { DossierCard, Callout } from '../components/ui/Card';
import { MECHANICS_BY_CATEGORY, type Mechanic } from '../data/mechanics';
import './field-manual.css';

type Category = 'Money' | 'RPG' | 'Production' | 'Resistance';

const CATEGORY_ORDER: Category[] = [
  'RPG',
  'Resistance',
  'Production',
  'Money'
];

const CATEGORY_BLURB: Record<Category, string> = {
  RPG: 'Skills, mastery, prestige, perks, vehicle storage. Your slow leverage.',
  Resistance: 'Shares, Warchest, Cartel attacks, Black Markets.',
  Production: 'Crops, licenses, novelty, weather, spoilage.',
  Money: 'Taxes, financing, dividends, sell blocks. The Cartel\'s ledger.'
};

/**
 * Family pages — Skills (×17), Perks (×12), Cartel Attacks (×10).
 * Rendered as special cards inside their category alongside the regular
 * single-mechanic dossiers.
 */
type Family = {
  slug: string;
  category: Category;
  title: string;
  count: string;       // "17 skills" / "12 perks" / "10 attacks"
  oneLiner: string;
};

const FAMILIES: Family[] = [
  {
    slug: 'skills',
    category: 'RPG',
    title: 'Manager Skill Tree',
    count: '17 skills',
    oneLiner: '17 scrip-purchased skills × 10 levels each. Yield, sale price, vehicle stats, finance, resilience.'
  },
  {
    slug: 'perks',
    category: 'RPG',
    title: 'Farmer Prestige Perks',
    count: '12 perks',
    oneLiner: 'A 12-perk rotation that fires as Farmer Prestige climbs. Cycle K skips K−1 levels between grants.'
  },
  {
    slug: 'cartel-attacks',
    category: 'Resistance',
    title: 'Cartel Attacks',
    count: '10 attacks',
    oneLiner: 'Ten distinct retaliations. Pressure score (shares minus Warchest defense) drives how many activate per year.'
  }
];

export function FieldManual() {
  return (
    <article className="fp-fm">
      <header className="fp-fm__head">
        <div className="fp-content">
          <span className="fp-eyebrow">Field Manual · Living Document</span>
          <h1>
            <GraffitiTag color="acid" rotate={-2} size="md">FIELD</GraffitiTag>
            {' '}
            <GraffitiTag color="magenta" rotate={2} size="md">MANUAL</GraffitiTag>
          </h1>
          <p className="fp-fm__lede">
            Every system, every formula, every console command. Written so you
            can play with intent — not by accident. Single-mechanic pages
            follow the standard schema; family pages (Skills, Perks, Cartel
            Attacks) collapse a whole catalog into one reference.
          </p>

          <Callout kind="note" title="Living document">
            This wiki tracks the live mod. Numbers change between versions;
            check the <Link to="/early-access">Early Access</Link> page for
            the changelog. Mechanics flagged "Planned" or "Postponed" in the
            mod README are not yet in the manual.
          </Callout>
        </div>
      </header>

      <div className="fp-content fp-fm__body">
        {CATEGORY_ORDER.map(cat => {
          const mechanics = (MECHANICS_BY_CATEGORY[cat] ?? []) as Mechanic[];
          const families = FAMILIES.filter(f => f.category === cat);
          const empty = mechanics.length === 0 && families.length === 0;

          if (empty) {
            return (
              <section key={cat} className="fp-fm__cat fp-fm__cat--empty">
                <header>
                  <span className="fp-eyebrow">{cat}</span>
                  <h2>{cat}</h2>
                  <p className="fp-fm__cat-blurb">{CATEGORY_BLURB[cat]}</p>
                </header>
                <p className="fp-fm__placeholder">
                  Pages for this category are still being transcribed from the
                  mod README. Check back next version.
                </p>
              </section>
            );
          }

          return (
            <section key={cat} className="fp-fm__cat">
              <header>
                <span className="fp-eyebrow">{cat}</span>
                <h2>{cat}</h2>
                <p className="fp-fm__cat-blurb">{CATEGORY_BLURB[cat]}</p>
              </header>
              <div className="fp-fm__grid">
                {/* Family cards first — they collapse many entries */}
                {families.map(f => (
                  <Link key={f.slug} to={`/field-manual/${f.slug}`} className="fp-fm__link">
                    <DossierCard
                      tone="manila"
                      badge={`FAMILY · ${f.count}`}
                      stamp="OVERVIEW"
                      tilt={0}
                    >
                      <h3>{f.title}</h3>
                      <p style={{ margin: 0 }}>{f.oneLiner}</p>
                      <hr className="fp-rule" />
                      <span className="fp-mono" style={{ fontSize: '0.8rem' }}>
                        Browse the full catalog →
                      </span>
                    </DossierCard>
                  </Link>
                ))}
                {/* Then per-mechanic dossiers */}
                {mechanics.map(m => (
                  <Link key={m.slug} to={`/field-manual/${m.slug}`} className="fp-fm__link">
                    <DossierCard
                      tone="paper"
                      badge={cat.toUpperCase()}
                      tilt={0}
                    >
                      <h3>{m.title}</h3>
                      <p style={{ margin: 0 }}>{m.oneLiner}</p>
                      <hr className="fp-rule" />
                      <span className="fp-mono" style={{ fontSize: '0.8rem' }}>
                        Read full dossier →
                      </span>
                    </DossierCard>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </article>
  );
}
