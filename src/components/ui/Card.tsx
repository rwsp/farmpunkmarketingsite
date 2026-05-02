import type { ReactNode } from 'react';
import './card.css';

type DossierProps = {
  children: ReactNode;
  stamp?: string;
  badge?: string;
  tilt?: number;
  tone?: 'wood' | 'paper' | 'manila';
  className?: string;
};

/**
 * DossierCard — feature/wiki card styled like a dirty system dossier.
 * Use for Features grid, mechanic preview tiles, beginner reference cards.
 */
export function DossierCard({
  children,
  stamp,
  badge,
  tilt = 0,
  tone = 'wood',
  className = ''
}: DossierProps) {
  const style = { ['--tilt' as string]: `${tilt}deg` };
  return (
    <article className={`fp-dossier fp-dossier--${tone} ${className}`} style={style}>
      {badge && <span className="fp-dossier__badge">{badge}</span>}
      {stamp && <span className="fp-dossier__stamp">{stamp}</span>}
      <div className="fp-dossier__body">{children}</div>
    </article>
  );
}

type CalloutProps = {
  children: ReactNode;
  kind: 'warning' | 'rebellion' | 'note';
  title?: string;
};

/**
 * Callout — corporate threat notice (warning) or defaced rebel note (rebellion).
 * Use sparingly; they're loud on purpose.
 */
export function Callout({ children, kind, title }: CalloutProps) {
  return (
    <aside className={`fp-callout fp-callout--${kind}`} role="note">
      {title && <div className="fp-callout__title">{title}</div>}
      <div className="fp-callout__body">{children}</div>
    </aside>
  );
}

/**
 * PaperPanel — clean stained-paper surface for body content (used by wiki pages
 * and the Quick Reference). Readable foreground on a slightly grimy background.
 */
export function PaperPanel({
  children,
  className = ''
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`fp-paper ${className}`}>{children}</div>;
}
