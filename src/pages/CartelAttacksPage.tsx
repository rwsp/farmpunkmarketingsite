import { Link } from 'react-router-dom';
import { GraffitiTag } from '../components/ui/GraffitiTag';
import { PaperPanel, Callout } from '../components/ui/Card';
import { CARTEL_ATTACKS } from '../data/cartelAttacks';
import './family-page.css';

export function CartelAttacksPage() {
  return (
    <article className="fp-fam">
      <div className="fp-content">
        <p className="fp-fam__crumbs">
          <Link to="/field-manual">Field Manual</Link>
          {' / '}
          <span>Resistance · Cartel Attacks</span>
        </p>

        <header className="fp-fam__head">
          <h1>
            <GraffitiTag color="magenta" rotate={-2} size="md">CARTEL</GraffitiTag>
            {' '}
            <GraffitiTag color="acid" rotate={2} size="md">ATTACKS</GraffitiTag>
          </h1>
          <p className="fp-fam__oneliner">
            Ten things the Cartel can do to make your life harder. Every March,
            the game rolls dice to decide how many activate this time around —
            anywhere from zero to four. Whatever the Cartel does, you're stuck
            with it for the calendar year. Next March, the slate gets wiped
            and rolled again.
          </p>
        </header>

        {/* How attacks get triggered */}
        <PaperPanel>
          <h2 className="fp-fam__section-title">How angry is the Cartel?</h2>
          <p>
            How often the Cartel hits you depends on two things: how many of
            their shares you've bought (more shares = angrier) and how much
            money you've put in the Reclamation Warchest (more money = less
            angry). Subtract one from the other and you get your{' '}
            <strong>pressure score</strong>.
          </p>
          <div className="fp-fam__pressure">
            Defense       = Warchest balance ÷ $10,000,000{'\n'}
            Pressure score = Shares owned − Defense
          </div>
          <p>
            Every $10 million you put in the Warchest cancels one share's
            worth of Cartel anger. Real-world examples:
          </p>
          <ul>
            <li><strong>Score of 0</strong> (50 shares + $500M Warchest, OR 100 shares + a full $1B Warchest): expect roughly <strong>0.7 attacks per year</strong> on average. Most years are quiet.</li>
            <li><strong>Score of 50</strong> (50 shares + no Warchest): about <strong>1.5 attacks per year</strong>.</li>
            <li><strong>Score of 100</strong> (100 shares + empty Warchest — peak harassment): around <strong>4 attacks per year</strong>. Brutal.</li>
          </ul>

          <h3 style={{ marginTop: 'var(--space-5)' }}>How the dice roll works</h3>
          <p>
            Each March, the Cartel tries to activate up to 4 attacks in
            sequence. The first attack has a 50% chance, the second 33%,
            the third 25%, the fourth 20%. Higher pressure score makes each
            chance better (for the Cartel — every point of pressure adds
            half a percent). The roll stops as soon as one fails.
          </p>
          <p>
            Whatever attacks did activate get sampled from the 10-event pool,
            with one rule: <strong>nothing that hit you last year can hit you
            this year</strong>. So a brutal year is followed by a different
            kind of brutal year, not a repeat.
          </p>
        </PaperPanel>

        {/* Attack catalog */}
        <section className="fp-fam__group">
          <header className="fp-fam__group-head">
            <h2>The Catalog</h2>
            <p>How bad each attack hits is fixed. Pressure score only changes how often they happen.</p>
          </header>

          <div className="fp-fam__attacks">
            {CARTEL_ATTACKS.map(a => (
              <article key={a.num} className="fp-fam__attack">
                <header className="fp-fam__attack-head">
                  <h3>#{a.num} · {a.name}</h3>
                  <span className={`fp-fam__attack-type fp-fam__attack-type--${a.type}`}>
                    {a.typeLabel}
                  </span>
                </header>
                <p className="fp-fam__attack-effect">{a.effect}</p>
                <div className="fp-fam__attack-mit">
                  <span className="fp-fam__attack-mit-label">What you can do</span>
                  <span>{a.mitigation}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <Callout kind="rebellion" title="The Warchest IS the defense">
          You don't disable Cartel attacks. You make them rare. Every $10
          million you deposit cancels one share of pressure. At 100 shares
          plus a full $1B Warchest, your pressure score is zero — same as
          someone with 50 shares and $500M, or someone with no shares at
          all. Funding the Warchest isn't optional once you start buying
          shares — it's how you stay alive.
        </Callout>
      </div>
    </article>
  );
}
