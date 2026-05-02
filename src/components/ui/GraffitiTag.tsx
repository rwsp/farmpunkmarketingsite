import type { ReactNode } from 'react';
import './graffiti-tag.css';

type Props = {
  children: ReactNode;
  color?: 'acid' | 'magenta' | 'purple' | 'yellow';
  rotate?: number;
  size?: 'sm' | 'md' | 'lg';
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

/**
 * GraffitiTag — quick spray-paint style accent.
 * Use for hero text, badge stamps, section headers, NEVER body copy.
 */
export function GraffitiTag({
  children,
  color = 'acid',
  rotate = -3,
  size = 'md',
  as: Tag = 'span',
  className = ''
}: Props) {
  const style = { ['--rot' as string]: `${rotate}deg` };
  return (
    <Tag
      className={`fp-tag fp-tag--${color} fp-tag--${size} ${className}`}
      style={style}
    >
      <span className="fp-tag__shadow" aria-hidden="true">{children}</span>
      <span className="fp-tag__paint">{children}</span>
    </Tag>
  );
}
