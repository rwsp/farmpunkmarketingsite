import { Link } from 'react-router-dom';
import { DossierCard } from './Card';
import type { CatalogEntry } from '../../data/mechanics';
import './catalog-card.css';

/**
 * CatalogCard — the standard Field Manual catalog tile. Shows the entry's
 * category badge (color-toned), title, one-liner, status chip, and an
 * "Open dossier →" CTA. Wraps the entry's link target.
 *
 * Used by the Field Manual index and reused on the Home page so featured
 * mechanics on the marketing site read identically to their wiki entries.
 */
export function CatalogCard({ entry, tilt = 0 }: { entry: CatalogEntry; tilt?: number }) {
  const href = entry.href ?? `/field-manual/${entry.slug}`;
  const tone = entry.category.toLowerCase() as 'rpg' | 'resistance' | 'production' | 'money';
  return (
    <Link to={href} className="fp-cat-card__link">
      <DossierCard badge={entry.category.toUpperCase()} badgeTone={tone} tilt={tilt}>
        <h3>{entry.title}</h3>
        <p style={{ margin: 0 }}>{entry.oneLiner}</p>
        <hr className="fp-rule" />
        <div className="fp-cat-card__foot">
          <span
            className={`fp-cat-card__chip fp-cat-card__chip--${entry.status === 'live' ? 'live' : 'pending'}`}
          >
            {entry.status === 'live' ? `v${entry.version}` : 'DOCS PENDING'}
          </span>
          <span className="fp-mono fp-cat-card__cta">Open dossier →</span>
        </div>
      </DossierCard>
    </Link>
  );
}
