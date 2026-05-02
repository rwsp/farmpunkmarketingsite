import { Link } from 'react-router-dom';
import { GraffitiTag } from '../components/ui/GraffitiTag';
import { PaperPanel, Callout } from '../components/ui/Card';
import { RelatedSystemsCard } from '../components/ui/RelatedSystems';
import { PERKS, generateSchedule } from '../data/perks';
import { findEntry } from '../data/mechanics';
import './family-page.css';
import './field-manual.css';

const FULL_SCHEDULE = generateSchedule(100);

export function PerksPage() {
  const entry = findEntry('perks');
  return (
    <article className="fp-fam fp-mech">
      <div className="fp-content fp-mech__layout">
        <div>
        <p className="fp-fam__crumbs">
          <Link to="/field-manual">Field Manual</Link>
          {' / '}
          <span>RPG · Farmer Prestige Perks</span>
        </p>

        <header className="fp-fam__head">
          <h1>
            <GraffitiTag color="acid" rotate={-2} size="md">PRESTIGE</GraffitiTag>
            {' '}
            <GraffitiTag color="magenta" rotate={2} size="md">PERKS</GraffitiTag>
          </h1>
          <p className="fp-fam__oneliner">
            Twelve permanent bonuses you unlock as your Farmer Prestige level
            climbs. They fire one at a time in a fixed order. Most cap out
            after a few levels; two are uncapped and keep paying off forever.
          </p>
        </header>

        {/* How it works */}
        <PaperPanel>
          <h2 className="fp-fam__section-title">How you level up perks</h2>
          <p>
            Every time your Farmer Prestige hits a new level, you might
            unlock the next perk in line. The 12 perks fire in fixed order
            (Industrial Subsidy first, Backroom Dealers last), then the
            cycle restarts from the top. <strong>Each lap through the 12
            perks gets one level slower than the last.</strong>
          </p>
          <ul>
            <li><strong>1st lap (levels 1–16):</strong> One perk per level — back to back, no waiting.</li>
            <li><strong>2nd lap:</strong> One perk every 2 levels — one level of build-up between each.</li>
            <li><strong>3rd lap:</strong> One perk every 3 levels — two levels of build-up between each.</li>
            <li><strong>And so on.</strong> Lap 4 is one perk every 4 levels, lap 5 every 5, etc.</li>
          </ul>
          <p>
            <strong>Reward levels are free.</strong> Some Prestige levels
            (3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 100) hand you a
            free vehicle instead of a perk. Those levels don't count toward
            the perk cadence — they're a "rest" level that doesn't use up
            your build-up.
          </p>
          <p>
            <strong>Capped perks fall out.</strong> Some perks (like Insurance
            Policy, capped at 3 levels) drop out of the rotation once you've
            maxed them. The current lap finishes normally, but the next lap
            is shorter. Eventually only the two uncapped perks (Industrial
            Subsidy and Mastery Catalyst) remain, on a long, slow loop.
          </p>
        </PaperPanel>

        {/* Rotation shape callout */}
        <Callout kind="note" title="What the perks do, in three groups">
          <ul style={{ margin: 0, paddingLeft: 'var(--space-5)' }}>
            <li><strong>Perks 1–4 (early)</strong> — keep you alive and cash-positive.</li>
            <li><strong>Perks 5–8 (middle)</strong> — let you scale up faster and cushion the downside.</li>
            <li><strong>Perks 9–12 (late)</strong> — bend the rules in your favor.</li>
          </ul>
        </Callout>

        {/* The 12 perks */}
        <section className="fp-fam__group">
          <header className="fp-fam__group-head">
            <h2>The Twelve</h2>
            <p>Fixed order. The Cartel doesn't pick which one you get — the rotation does.</p>
          </header>

          <div className="fp-fam__perks">
            {PERKS.map(p => (
              <article
                key={p.position}
                className={`fp-fam__perk${p.cap === null ? ' fp-fam__perk--uncapped' : ''}`}
              >
                <header className="fp-fam__perk-head">
                  <h3 className="fp-fam__perk-name">{p.name}</h3>
                  <span className="fp-fam__perk-cap">
                    {p.cap === null ? 'UNCAPPED' : `MAX LEVEL ${p.cap}`}
                  </span>
                </header>
                <p className="fp-fam__perk-effect">{p.effect}</p>
                {p.notes && <p className="fp-fam__perk-notes">{p.notes}</p>}
              </article>
            ))}
          </div>
        </section>

        <Callout kind="rebellion" title="Drop-on-cap, in plain English">
          When a perk hits its level cap, it doesn't come back. Insurance
          Policy maxes out at level 3 — level 4 isn't a thing. The next
          time the rotation gets to that slot, it's skipped. So later in
          the game, the perk lap shrinks one perk at a time as the capped
          ones finish. Eventually only Industrial Subsidy and Mastery
          Catalyst are left in the loop.
        </Callout>

        {/* Full schedule, the long table */}
        <section className="fp-fam__group">
          <header className="fp-fam__group-head">
            <h2>The Full Schedule</h2>
            <p>
              Every Farmer Prestige level from 1 to 100 — perks gained,
              vehicle rewards, and the build-up "skip" levels in between.
              Use this to plan your scrip spending or just to see what's
              coming.
            </p>
          </header>

          <div className="fp-fam__schedule">
            {FULL_SCHEDULE.map(row => (
              <div
                key={row.lvl}
                className={`fp-fam__sched-row fp-fam__sched-row--${row.type}${row.highlight ? ' fp-fam__sched-row--highlight' : ''}`}
              >
                <div className="fp-fam__sched-lvl">L{row.lvl}</div>
                <div className="fp-fam__sched-label">{row.label}</div>
                {row.cycle && row.type === 'perk' && (
                  <div className="fp-fam__sched-cycle">Lap {row.cycle}</div>
                )}
              </div>
            ))}
          </div>
        </section>
        </div>

        <aside className="fp-mech__sidebar">
          <RelatedSystemsCard relations={entry?.related ?? []} />
        </aside>
      </div>
    </article>
  );
}
