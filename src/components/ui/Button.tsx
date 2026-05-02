import { Link } from 'react-router-dom';
import type { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import './button.css';

type Variant = 'primary' | 'rebel' | 'ghost' | 'rust';

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  block?: boolean;
};

type AsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined };
type AsInternal = CommonProps & { to: string; href?: undefined };
type AsExternal = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: undefined };

export function Button(props: AsButton | AsInternal | AsExternal) {
  const { children, variant = 'primary', block = false, ...rest } = props;
  const className = `fp-btn fp-btn--${variant}${block ? ' fp-btn--block' : ''}`;

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={className}>
        <span className="fp-btn__label">{children}</span>
      </Link>
    );
  }
  if ('href' in props && props.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={className} href={href} {...anchorRest}>
        <span className="fp-btn__label">{children}</span>
      </a>
    );
  }
  return (
    <button className={className} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      <span className="fp-btn__label">{children}</span>
    </button>
  );
}
