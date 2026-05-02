import { Link, useParams, Navigate } from 'react-router-dom';
import {
  MECHANICS,
  STUBS,
  type CatalogEntry,
  type Mechanic
} from '../data/mechanics';
import { PaperPanel, Callout } from '../components/ui/Card';
import { RelatedSystemsCard } from '../components/ui/RelatedSystems';
import { GraffitiTitle } from '../components/ui/GraffitiTitle';
import './field-manual.css';

/**
 * Single dispatcher for /field-manual/:slug.
 * - If the slug matches a full Mechanic, render the deep dossier.
 * - If it matches a stub entry, render the stub view.
 * - Otherwise, redirect to the Field Manual index.
 */
export function MechanicPage() {
  const { slug } = useParams();
  if (!slug) return <Navigate to="/field-manual" replace />;

  const mechanic = MECHANICS.find(m => m.slug === slug);
  if (mechanic) return <MechanicView mechanic={mechanic} />;

  const stub = STUBS.find(s => s.slug === slug);
  if (stub) return <StubView stub={stub} />;

  return <Navigate to="/field-manual" replace />;
}

// ── Full dossier view ─────────────────────────────────────────────
function MechanicView({ mechanic: m }: { mechanic: Mechanic }) {
  return (
    <article className="fp-mech">
      <div className="fp-content fp-mech__layout">
        <div>
          <p className="fp-mech__crumbs">
            <Link to="/field-manual">Field Manual</Link>
            {' / '}
            <span>{m.category}</span>
          </p>

          <header className="fp-mech__head">
            <h1><GraffitiTitle title={m.title} /></h1>
            <p className="fp-mech__oneliner">{m.oneLiner}</p>
          </header>

          <PaperPanel className="fp-mech__paper">
            <section className="fp-mech__section">
              <h2>System Summary</h2>
              <p>{m.summary}</p>
            </section>

            <section className="fp-mech__section">
              <h2>What It Does</h2>
              <ul>
                {m.whatItDoes.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>

            <section className="fp-mech__section">
              <h2>Why It Matters</h2>
              <p>{m.whyItMatters}</p>
            </section>

            <section className="fp-mech__section">
              <h2>How You Progress</h2>
              <ol>
                {m.howYouProgress.map((step, i) => <li key={i}>{step}</li>)}
              </ol>
            </section>

            <section className="fp-mech__section">
              <h2>Important Numbers</h2>
              <dl className="fp-mech__numbers">
                {m.importantNumbers.map((n, i) => (
                  <div key={i} style={{ display: 'contents' }}>
                    <dt>{n.label}</dt>
                    <dd>{n.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="fp-mech__section">
              <h2>Beginner Advice</h2>
              <ul>
                {m.beginnerAdvice.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            </section>

            <section className="fp-mech__section">
              <h2>Console Commands</h2>
              <div className="fp-mech__cmds">
                {m.consoleCommands.map((c, i) => (
                  <div key={i} className="fp-mech__cmd">
                    <code>{c.cmd}</code>
                    <span className="fp-mech__cmd-note">{c.note}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="fp-mech__section">
              <h2>Field Note</h2>
              <p className="fp-mech__field-note">"{m.fieldNote}"</p>
            </section>
          </PaperPanel>
        </div>

        <aside className="fp-mech__sidebar">
          <RelatedSystemsCard relations={m.related ?? []} />
        </aside>
      </div>
    </article>
  );
}

// ── Stub view ─────────────────────────────────────────────────────
function StubView({ stub }: { stub: CatalogEntry }) {
  return (
    <article className="fp-mech">
      <div className="fp-content fp-mech__layout">
        <div>
          <p className="fp-mech__crumbs">
            <Link to="/field-manual">Field Manual</Link>
            {' / '}
            <span>{stub.category}</span>
          </p>

          <header className="fp-mech__head">
            <h1><GraffitiTitle title={stub.title} /></h1>
            <p className="fp-mech__oneliner">{stub.oneLiner}</p>
          </header>

          <PaperPanel className="fp-mech__paper">
            <Callout kind="warning" title="Documentation pending">
              <p>
                This system ships in <code>v{stub.version}</code> of the mod
                and works in-game. The full dossier (formulas, exact numbers,
                console commands, beginner advice) is still being written.
              </p>
              <p style={{ marginTop: 'var(--space-3)', marginBottom: 0 }}>
                In the meantime, see <strong>Related Systems</strong> in the
                sidebar for neighboring documentation, or{' '}
                <Link to="/feedback">help us write this page</Link>.
              </p>
            </Callout>
          </PaperPanel>
        </div>

        <aside className="fp-mech__sidebar">
          <RelatedSystemsCard relations={stub.related ?? []} />
        </aside>
      </div>
    </article>
  );
}

