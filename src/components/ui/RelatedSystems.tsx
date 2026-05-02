import { Link } from 'react-router-dom';
import { resolveRelated, type Relation } from '../../data/mechanics';

export function RelatedSystemsCard({ relations }: { relations: Relation[] }) {
  const items = relations
    .map(r => {
      const resolved = resolveRelated(r.slug);
      return resolved ? { ...resolved, note: r.note } : null;
    })
    .filter((x): x is { title: string; href: string; note: string } => x !== null);

  if (items.length === 0) {
    return (
      <div className="fp-mech__sidebar-card">
        <h4>Related Systems</h4>
        <p className="fp-mech__related-empty">
          This system stands on its own — nothing else in the catalog directly
          interacts with it.
        </p>
      </div>
    );
  }

  return (
    <div className="fp-mech__sidebar-card">
      <h4>Related Systems</h4>
      <ul className="fp-mech__related">
        {items.map(item => (
          <li key={item.href}>
            <Link to={item.href} className="fp-mech__related-link">{item.title}</Link>
            <p className="fp-mech__related-note">{item.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
