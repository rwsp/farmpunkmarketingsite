import { Fragment } from 'react';
import { GraffitiTag } from './GraffitiTag';

const COLORS = ['acid', 'magenta'] as const;
const ROTATIONS = [-2, 2, -1, 3, -3, 1];

/**
 * Render a page title as a row of alternating spray-paint tags — one per
 * word — matching the hero treatment used on the family pages.
 */
export function GraffitiTitle({
  title,
  size = 'md'
}: {
  title: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const words = title.split(/\s+/).filter(Boolean);
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          <GraffitiTag
            color={COLORS[i % COLORS.length]}
            rotate={ROTATIONS[i % ROTATIONS.length]}
            size={size}
          >
            {word}
          </GraffitiTag>
        </Fragment>
      ))}
    </>
  );
}
