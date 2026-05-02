import { Link, useParams, Navigate } from 'react-router-dom';
import { MECHANICS } from '../data/mechanics';
import { PaperPanel, Callout } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import './field-manual.css';

export function MechanicPage() {
  const { slug } = useParams();
  const mechanic = MECHANICS.find(m => m.slug === slug);

  if (!mechanic) {
    return <Navigate to="/field-manual" replace />;
  }

  const m = mechanic;

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
            <h1>{m.title}</h1>
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
                {m.whatItDoes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="fp-mech__section">
              <h2>Why It Matters</h2>
              <p>{m.whyItMatters}</p>
            </section>

            <section className="fp-mech__section">
              <h2>How You Progress</h2>
              <ol>
                {m.howYouProgress.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
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
                {m.beginnerAdvice.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
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
          <div className="fp-mech__sidebar-card">
            <h4>Related Systems</h4>
            <ul className="fp-mech__related">
              {m.relatedSystems.map((r, i) => (
                <li key={i}>· {r}</li>
              ))}
            </ul>
          </div>

          <div className="fp-mech__sidebar-card">
            <h4>Cross-References</h4>
            <Button to="/quick-reference" variant="ghost" block>Quick Reference</Button>
            <div style={{ height: 8 }} />
            <Button to="/console" variant="ghost" block>All Console Commands</Button>
            <div style={{ height: 8 }} />
            <Button to="/endgame" variant="ghost" block>Endgame Sequence</Button>
          </div>

          <Callout kind="warning" title="Reading the numbers">
            All formulas are pulled from the live mod source. Numbers are
            current as of <code>v0.0.34</code>. If your save shows different
            values, run the relevant <code>farmPunk*</code> console command
            to confirm.
          </Callout>
        </aside>
      </div>
    </article>
  );
}
