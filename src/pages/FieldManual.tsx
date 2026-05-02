import { Link } from 'react-router-dom';
import { GraffitiTag } from '../components/ui/GraffitiTag';
import { DossierCard, Callout } from '../components/ui/Card';
import { MECHANICS_BY_CATEGORY } from '../data/mechanics';
import './field-manual.css';

const CATEGORY_ORDER: (keyof typeof MECHANICS_BY_CATEGORY)[] = [
  'Money',
  'RPG',
  'Production',
  'Resistance',
  'Operations'
];

const CATEGORY_BLURB: Record<string, string> = {
  Money: 'Taxes, financing, dividends. The Cartel\'s ledger.',
  RPG: 'Skills, mastery, prestige, perks. Your slow leverage.',
  Production: 'Crops, licenses, novelty, mastery, weather, spoilage.',
  Resistance: 'Shares, Warchest, Opposition, Black Markets.',
  Operations: 'Storage, theft, sell blocks, generators, vehicles.'
};

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
            can play with intent — not by accident. Pages follow a strict
            schema: <em>summary, what it does, why it matters, how you progress,
            important numbers, related systems, beginner advice, console
            commands, field note</em>.
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
          const list = MECHANICS_BY_CATEGORY[cat];
          if (!list || list.length === 0) return (
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
          return (
            <section key={cat} className="fp-fm__cat">
              <header>
                <span className="fp-eyebrow">{cat}</span>
                <h2>{cat}</h2>
                <p className="fp-fm__cat-blurb">{CATEGORY_BLURB[cat]}</p>
              </header>
              <div className="fp-fm__grid">
                {list.map(m => (
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
