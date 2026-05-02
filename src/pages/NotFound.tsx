import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/Button';
import { GraffitiTag } from '../components/ui/GraffitiTag';
import './not-found.css';

const FLAVOR_LINES = [
  'Records: selectively maintained.',
  'Directory: under cartel review.',
  'Index: revised without notice.',
  'Filing: misplaced. Indefinitely.',
  'Audit: pending. Eternally.'
];

export function NotFound() {
  const { pathname } = useLocation();
  const [flavor] = useState(
    () => FLAVOR_LINES[Math.floor(Math.random() * FLAVOR_LINES.length)]
  );

  // make this 404 actually return a 404 to crawlers / static hosts via meta
  useEffect(() => {
    const prev = document.title;
    document.title = '404 · Page Not In Registry — FarmPunk';
    return () => { document.title = prev; };
  }, []);

  const reference =
    pathname.length > 64 ? `${pathname.slice(0, 61)}…` : pathname;

  return (
    <article className="fp-404">
      <div className="fp-content">
        <span className="fp-eyebrow">Cartel Inventory · Reference 404</span>

        <div className="fp-404__stage">
          {/* the foreclosure / acquisition notice */}
          <div className="fp-404__notice" aria-label="Notice of acquisition">
            <div className="fp-404__notice-corner fp-404__notice-corner--tl" aria-hidden="true" />
            <div className="fp-404__notice-corner fp-404__notice-corner--tr" aria-hidden="true" />
            <div className="fp-404__notice-corner fp-404__notice-corner--bl" aria-hidden="true" />
            <div className="fp-404__notice-corner fp-404__notice-corner--br" aria-hidden="true" />

            <header className="fp-404__notice-head">
              <span className="fp-404__notice-seal">CARTEL · OFFICE OF VALLEY ACQUISITION</span>
              <h1 className="fp-404__notice-title">NOTICE OF ACQUISITION</h1>
              <p className="fp-404__notice-sub">
                Issued under Franchise Authority Act § 404. <br />
                Posted in lieu of personal service.
              </p>
            </header>

            <dl className="fp-404__notice-fields">
              <div>
                <dt>Parcel Reference</dt>
                <dd className="fp-mono">{reference || '/'}</dd>
              </div>
              <div>
                <dt>Filing Status</dt>
                <dd>NOT IN REGISTRY</dd>
              </div>
              <div>
                <dt>Last Verified Owner</dt>
                <dd>—</dd>
              </div>
              <div>
                <dt>Disposition</dt>
                <dd>REPOSSESSED · CONSOLIDATED · REASSIGNED</dd>
              </div>
              <div>
                <dt>Appeal Window</dt>
                <dd>EXPIRED</dd>
              </div>
              <div>
                <dt>Notes</dt>
                <dd className="fp-stamp">{flavor}</dd>
              </div>
            </dl>

            <footer className="fp-404__notice-foot">
              <span className="fp-404__signature">/s/ Cartel Office · Compliance Division</span>
              <span className="fp-404__seal-no">FILE NO. CO-{Math.floor(Math.random() * 9000) + 1000}-FC</span>
            </footer>

            {/* corporate REPOSSESSED stamp pressed over the notice */}
            <div className="fp-404__stamp" aria-hidden="true">REPOSSESSED</div>
          </div>

          {/* graffiti spray-painted over the corporate notice */}
          <div className="fp-404__graffiti" aria-hidden="true">
            <GraffitiTag color="acid" rotate={-6} size="lg">404</GraffitiTag>
          </div>
          <div className="fp-404__graffiti-tag" aria-hidden="true">
            <GraffitiTag color="magenta" rotate={4} size="sm">RECLAIM</GraffitiTag>
          </div>
        </div>

        {/* recovery options */}
        <div className="fp-404__recovery">
          <h2 className="fp-404__recovery-title">Page not in registry.</h2>
          <p className="fp-404__recovery-body">
            This URL isn't on file. Maybe it never was. Maybe the Cartel
            reorganized the directory. Either way — there's nothing here to
            seize. Try one of these instead:
          </p>
          <div className="fp-404__ctas">
            <Button to="/" variant="primary">Return to base</Button>
            <Button to="/field-manual" variant="rebel">Open Field Manual</Button>
            <Button to="/quick-reference" variant="ghost">Quick Reference</Button>
            <Button to="/endgame" variant="rust">Reclamation Sequence</Button>
          </div>
          <p className="fp-404__legal">
            <Link to="/console">Or browse every console command</Link>{' '}
            — the registry the Cartel can't lock down.
          </p>
        </div>
      </div>
    </article>
  );
}
