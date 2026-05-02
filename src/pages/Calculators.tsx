import { Link } from 'react-router-dom';
import { GraffitiTag } from '../components/ui/GraffitiTag';
import { DossierCard } from '../components/ui/Card';
import './info-page.css';

export function Calculators() {
  return (
    <article className="fp-info">
      <header className="fp-info__head">
        <div className="fp-content">
          <span className="fp-eyebrow">Field Tools · Interactive</span>
          <h1>
            <GraffitiTag color="acid" rotate={-2} size="md">CALCULATORS</GraffitiTag>
          </h1>
          <p className="fp-info__lede">
            Two interactive tools for working out how the math actually lands
            in your save. Slide the inputs around. Watch the numbers move.
            Plan your year before you commit to it.
          </p>
        </div>
      </header>

      <div className="fp-content fp-info__body">
        <div className="fp-features-grid">
          <Link to="/endgame" className="fp-fm__link">
            <DossierCard badge="WIN-CALC" stamp="INTERACTIVE" tilt={-0.6}>
              <h3>End Game Calculator</h3>
              <p>
                Walk the two-axis pressure map: shares owned versus Warchest
                funded. See how Cartel anger climbs as you buy out, and how
                deposits cancel the heat. Stops at full reclamation.
              </p>
              <hr className="fp-rule" />
              <p className="fp-stamp" style={{ fontSize: '0.78rem', margin: 0 }}>
                Drag, play, or step through five stages.
              </p>
            </DossierCard>
          </Link>

          <Link to="/black-markets" className="fp-fm__link">
            <DossierCard badge="MKT-CALC" stamp="INTERACTIVE" tilt={0.6}>
              <h3>Black Market Calculator</h3>
              <p>
                Roll a year's roster of off-the-books buyers at any Prestige
                level. Five tiers from Backroad grift to valley-wide
                Liberating supply. Preview cash, scrip, and fame payouts.
              </p>
              <hr className="fp-rule" />
              <p className="fp-stamp" style={{ fontSize: '0.78rem', margin: 0 }}>
                Reroll the year. Slide the Prestige dial.
              </p>
            </DossierCard>
          </Link>
        </div>
      </div>
    </article>
  );
}
