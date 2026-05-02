import { Link } from 'react-router-dom';
import { GraffitiTag } from '../components/ui/GraffitiTag';
import { PaperPanel, Callout } from '../components/ui/Card';
import { RelatedSystemsCard } from '../components/ui/RelatedSystems';
import {
  SKILLS_BY_GROUP,
  GROUP_BLURB,
  GROUP_ORDER,
  SCRIP_COST,
  TOTAL_TO_L10
} from '../data/skills';
import { findEntry } from '../data/mechanics';
import './family-page.css';
import './field-manual.css';

export function SkillsPage() {
  const entry = findEntry('skills');
  return (
    <article className="fp-fam fp-mech">
      <div className="fp-content fp-mech__layout">
        <div>
        <p className="fp-fam__crumbs">
          <Link to="/field-manual">Field Manual</Link>
          {' / '}
          <span>RPG · Skills</span>
        </p>

        <header className="fp-fam__head">
          <h1>
            <GraffitiTag color="acid" rotate={-2} size="md">SKILLS</GraffitiTag>
          </h1>
          <p className="fp-fam__oneliner">
            Seventeen skills you can buy with scrip — the secondary currency
            you earn through your wallet, share dividends, and black market
            payouts. Each skill has ten levels. They cover everything from
            making your fields more productive to slowing how fast your
            tractors break down.
          </p>
        </header>

        {/* Cost ladder */}
        <PaperPanel>
          <h2 className="fp-fam__section-title">What does it cost?</h2>
          <p>
            Every skill uses the same cost ladder. Buying any one skill from
            level 1 all the way to level 10 costs{' '}
            <strong className="fp-mono">{TOTAL_TO_L10} scrip</strong> total.
            Early levels are cheap; late levels are brutal.
          </p>
          <table className="fp-fam__cost-table">
            <thead>
              <tr>
                {SCRIP_COST.map((_, i) => (
                  <th key={i}>L{i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {SCRIP_COST.map((c, i) => (
                  <td key={i}>{c}</td>
                ))}
              </tr>
            </tbody>
          </table>

          <Callout kind="note" title="How to buy a skill">
            Open the in-game console (the <code>~</code> key) and run{' '}
            <code>farmPunkBuySkill &lt;skillName&gt;</code>, where{' '}
            <code>skillName</code> is the id shown on each skill card below
            (e.g. <code>cropYield</code>). The cost comes out of your
            scrip wallet.
          </Callout>
        </PaperPanel>

        {/* Skill groups */}
        {GROUP_ORDER.map(group => (
          <section key={group} className="fp-fam__group">
            <header className="fp-fam__group-head">
              <h2>{group}</h2>
              <p>{GROUP_BLURB[group]}</p>
            </header>
            <div className="fp-fam__grid">
              {SKILLS_BY_GROUP[group].map(s => (
                <article key={s.id} className="fp-fam__card">
                  <header className="fp-fam__card-head">
                    <h3>{s.name}</h3>
                    <code>{s.id}</code>
                  </header>
                  <p className="fp-fam__card-blurb">{s.blurb}</p>
                  <dl className="fp-fam__kv">
                    <div>
                      <dt>Per level</dt>
                      <dd className="fp-mono">{s.formula}</dd>
                    </div>
                    <div>
                      <dt>At max</dt>
                      <dd>{s.maxEffect}</dd>
                    </div>
                  </dl>
                  {s.notes && (
                    <p className="fp-fam__card-notes">
                      <span className="fp-stamp">HEADS UP · </span>
                      {s.notes}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}

        <Callout kind="rebellion" title="Where to spend first">
          Crop Yield and Sale Price are the broadest, cheapest wins early on
          — they apply to every crop and every sale, no setup needed. After
          that, decide what your bottleneck actually is: not enough cash for
          equipment (Finance), too much downtime in the field (Vehicle),
          losing crops to spoilage and weather (Resilience), or running out
          of silo space (Storage).
        </Callout>
        </div>

        <aside className="fp-mech__sidebar">
          <RelatedSystemsCard relations={entry?.related ?? []} />
        </aside>
      </div>
    </article>
  );
}
