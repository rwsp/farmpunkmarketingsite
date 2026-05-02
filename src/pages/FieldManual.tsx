import { Link } from 'react-router-dom';
import { GraffitiTag } from '../components/ui/GraffitiTag';
import { DossierCard, Callout } from '../components/ui/Card';
import {
  CATALOG_BY_CATEGORY,
  TOTAL_SHIPPED_SYSTEMS,
  TOTAL_SHIPPED_BEHAVIOURS,
  type Category,
  type CatalogEntry
} from '../data/mechanics';
import './field-manual.css';

const CATEGORY_ORDER: Category[] = ['RPG', 'Resistance', 'Production', 'Money'];

const CATEGORY_BLURB: Record<Category, string> = {
  RPG: 'Skills, mastery, prestige, perks, vehicle storage. Your slow leverage.',
  Resistance: 'Shares, Warchest, Cartel attacks, Black Markets.',
  Production: 'Crops, licenses, novelty, weather, spoilage.',
  Money: "Taxes, financing, dividends, sell blocks. The Cartel's ledger."
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
            Every system FarmPunk ships, grouped by category.{' '}
            <strong>{TOTAL_SHIPPED_SYSTEMS} top-level systems</strong>{' '}
            ({TOTAL_SHIPPED_BEHAVIOURS}+ distinct behaviours when you count
            individual skills, perks, and cartel attacks). Cards tagged{' '}
            <span className="fp-fm__chip fp-fm__chip--live">v0.0.34</span>{' '}
            have a complete dossier; cards tagged{' '}
            <span className="fp-fm__chip fp-fm__chip--pending">DOCS PENDING</span>{' '}
            still have a stub page with related-system links while the full
            write-up is in progress.
          </p>

          <Callout kind="note" title="Living document">
            This wiki tracks the live mod. Numbers change between versions;
            check the <Link to="/early-access">Early Access</Link> page for
            the changelog. Mechanics flagged "Planned" or "Postponed" in the
            mod README appear there, not here.
          </Callout>
        </div>
      </header>

      <div className="fp-content fp-fm__body">
        {CATEGORY_ORDER.map(cat => {
          const entries = CATALOG_BY_CATEGORY[cat] ?? [];
          if (entries.length === 0) return null;

          // sort: live dossiers first, pending stubs last
          const sorted = [...entries].sort((a, b) => sortPriority(a) - sortPriority(b));

          return (
            <section key={cat} className={`fp-fm__cat fp-fm__cat--${cat.toLowerCase()}`}>
              <header>
                <span className="fp-eyebrow fp-fm__cat-eyebrow">{cat}</span>
                <h2>{cat}</h2>
                <p className="fp-fm__cat-blurb">{CATEGORY_BLURB[cat]}</p>
              </header>
              <div className="fp-fm__grid">
                {sorted.map(entry => (
                  <CatalogCard key={entry.slug} entry={entry} category={cat} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </article>
  );
}

function sortPriority(entry: CatalogEntry): number {
  return entry.status === 'live' ? 0 : 1;
}

function CatalogCard({ entry, category }: { entry: CatalogEntry; category: Category }) {
  const href = entry.href ?? `/field-manual/${entry.slug}`;

  return (
    <Link to={href} className="fp-fm__link">
      <DossierCard
        badge={category.toUpperCase()}
        badgeTone={category.toLowerCase() as 'rpg' | 'resistance' | 'production' | 'money'}
        tilt={0}
      >
        <h3>{entry.title}</h3>
        <p style={{ margin: 0 }}>{entry.oneLiner}</p>
        <hr className="fp-rule" />
        <div className="fp-fm__card-foot">
          <span
            className={`fp-fm__chip fp-fm__chip--${entry.status === 'live' ? 'live' : 'pending'}`}
          >
            {entry.status === 'live' ? `v${entry.version}` : 'DOCS PENDING'}
          </span>
          <span className="fp-mono fp-fm__card-cta">Open dossier →</span>
        </div>
      </DossierCard>
    </Link>
  );
}
