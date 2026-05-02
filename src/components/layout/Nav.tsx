import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import farmpunkStamp from '../../assets/farmpunk-icon@small.webp';
import './nav.css';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/features', label: 'Features' },
  { to: '/quick-reference', label: 'Quick Reference' },
  { to: '/field-manual', label: 'Field Manual' },
  { to: '/endgame', label: 'Endgame' },
  { to: '/console', label: 'Console' },
  { to: '/early-access', label: 'Early Access' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fp-nav ${scrolled ? 'fp-nav--scrolled' : ''}`}>
      <div className="fp-nav__inner fp-content">
        <NavLink to="/" className="fp-nav__brand" onClick={() => setOpen(false)} aria-label="FarmPunk — home">
          <span className="fp-nav__stamp" aria-hidden="true">
            <img src={farmpunkStamp} alt="" width={44} height={44} loading="eager" decoding="async" />
          </span>
          <span className="fp-nav__brand-farm">FARM</span>
          <span className="fp-nav__brand-slash">/</span>
          <span className="fp-nav__brand-punk">PUNK</span>
          <span className="fp-nav__brand-tag">EA · FS25 OVERHAUL</span>
        </NavLink>

        <button
          className="fp-nav__menu-btn"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span /><span /><span />
        </button>

        <nav className={`fp-nav__links ${open ? 'fp-nav__links--open' : ''}`}>
          {LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `fp-nav__link${isActive ? ' fp-nav__link--active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <a
            className="fp-nav__cta"
            href="https://www.farming-simulator.com/mods.php"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            Download
          </a>
        </nav>
      </div>
    </header>
  );
}
