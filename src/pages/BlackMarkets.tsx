import { useEffect, useMemo, useState } from 'react';
import { GraffitiTag } from '../components/ui/GraffitiTag';
import { Button } from '../components/ui/Button';
import {
  rollRoster,
  formatLiters,
  formatCash,
  TIERS,
  type Market,
  type Tier
} from '../data/blackMarkets';
import './black-markets.css';

const TIER_COPY: Record<Tier, { kicker: string; mood: string }> = {
  BACKROAD:    { kicker: 'Roadside grift',      mood: 'Cousin-of-a-cousin handshake.' },
  OFF_BOOK:    { kicker: 'Quiet ledger',        mood: 'Off the company books, on yours.' },
  UNDERGROUND: { kicker: 'Syndicate front',     mood: 'They already know your name.' },
  INSURGENT:   { kicker: 'Resistance supply',   mood: 'Move it before the road gets watched.' },
  LIBERATING:  { kicker: 'Valley-wide cause',   mood: "Pay's massive. Risk's bigger." }
};

export function BlackMarkets() {
  const [prestige, setPrestige] = useState(15);
  const [year, setYear] = useState(1);
  const [roster, setRoster] = useState<Market[]>(() => rollRoster(15));
  const [claimed, setClaimed] = useState({ cash: 0, scrip: 0, fame: 0, count: 0 });
  const [rolling, setRolling] = useState(false);

  const advanceYear = () => {
    setRolling(true);
    // brief blank state, then new roster — matches the P1 wipe + reroll
    setTimeout(() => {
      setRoster(rollRoster(prestige));
      setYear(y => y + 1);
      setRolling(false);
    }, 320);
  };

  // re-check eligibility (monotonic — never flips back to false) when prestige rises
  useEffect(() => {
    setRoster(prev =>
      prev.map(m =>
        !m.isEligible && prestige >= m.prestigeReq
          ? { ...m, isEligible: true }
          : m
      )
    );
  }, [prestige]);

  const claimMarket = (m: Market) => {
    if (!m.isEligible || m.isComplete) return;
    setRoster(prev => prev.map(x => x.id === m.id ? { ...x, progress: x.goal, isComplete: true } : x));
    setClaimed(c => ({
      cash: c.cash + m.cashPayout,
      scrip: c.scrip + m.scripPayout,
      fame: c.fame + m.famePayout,
      count: c.count + 1
    }));
  };

  const tierCounts = useMemo(() => {
    const counts: Partial<Record<Tier, number>> = {};
    for (const m of roster) counts[m.tier] = (counts[m.tier] ?? 0) + 1;
    return counts;
  }, [roster]);

  return (
    <article className="fp-bm">
      {/* ── header ──────────────────────────────────────────── */}
      <header className="fp-bm__head">
        <div className="fp-content">
          <span className="fp-eyebrow">Interactive · Underground Delivery Network</span>
          <h1>
            <GraffitiTag color="acid" rotate={-2} size="md">BLACK</GraffitiTag>
            {' '}
            <GraffitiTag color="magenta" rotate={3} size="md">MARKETS</GraffitiTag>
          </h1>
          <p className="fp-bm__lede">
            Each year a randomized roster of off-the-books buyers crops up.
            Roadside grifts at the bottom, valley-wide resistance supply lines
            at the top. They don't ask. They don't paperwork. They pay.
          </p>
        </div>
      </header>

      {/* ── controls ────────────────────────────────────────── */}
      <section className="fp-bm__controls">
        <div className="fp-content fp-bm__controls-inner">
          <div className="fp-bm__panel">
            <h3>Farmer Prestige</h3>
            <p className="fp-bm__panel-sub">
              Higher Prestige unlocks higher tiers. Off-Book at L10. Underground at L20.
              Insurgent at L30. Liberating at L40.
            </p>
            <div className="fp-bm__slider-row">
              <input
                type="range"
                min={0}
                max={50}
                value={prestige}
                onChange={(e) => setPrestige(Number(e.target.value))}
                aria-label="Prestige level"
              />
              <span className="fp-bm__slider-value fp-mono">L{prestige}</span>
            </div>
            <div className="fp-bm__tier-pips">
              {TIERS.map(t => {
                const unlocked = prestige >= t.prestigeReq;
                return (
                  <span
                    key={t.tier}
                    className={`fp-bm__pip fp-bm__pip--${t.tier.toLowerCase()}${unlocked ? ' fp-bm__pip--on' : ''}`}
                    title={`${t.display} — unlocks at L${t.prestigeReq}`}
                  >
                    {t.display}
                    <small>L{t.prestigeReq}+</small>
                  </span>
                );
              })}
            </div>
          </div>

          <div className="fp-bm__panel">
            <h3>Calendar Control</h3>
            <p className="fp-bm__panel-sub">
              Advance the year to wipe the roster and reroll. Uncompleted
              markets lapse silently — no penalty, no carry-over.
            </p>
            <div className="fp-bm__year-row">
              <div>
                <div className="fp-stamp fp-bm__year-label">YEAR</div>
                <div className="fp-bm__year-value">{year}</div>
              </div>
              <Button variant="primary" onClick={advanceYear}>▶ Advance year · reroll roster</Button>
            </div>
            <div className="fp-bm__year-summary fp-mono">
              {roster.length} markets on board · {Object.entries(tierCounts).map(([t, n]) => `${n} ${t.toLowerCase().replace('_', '-')}`).join(' · ')}
            </div>
          </div>

          <div className="fp-bm__panel fp-bm__panel--ledger">
            <h3>Personal Ledger</h3>
            <p className="fp-bm__panel-sub">
              Click any open market to deliver the goal volume and claim the
              payout. Tracked here for the session.
            </p>
            <div className="fp-bm__ledger">
              <Counter label="Cash" value={formatCash(claimed.cash)} tone="acid" />
              <Counter label="Scrip" value={`${claimed.scrip}`} tone="yellow" />
              <Counter label="Fame" value={formatLiters(claimed.fame)} tone="magenta" />
              <Counter label="Markets cleared" value={`${claimed.count}`} tone="white" />
            </div>
          </div>
        </div>
      </section>

      {/* ── the corkboard ───────────────────────────────────── */}
      <section className="fp-bm__board" aria-live="polite">
        <div className="fp-content">
          <div className="fp-bm__board-head">
            <span className="fp-stamp">DEAD-DROP NOTICEBOARD · Y{year}</span>
            <span className="fp-stamp">{rolling ? 'ROLLING…' : `${roster.length} ACTIVE`}</span>
          </div>

          <div className={`fp-bm__cork ${rolling ? 'fp-bm__cork--rolling' : ''}`}>
            {!rolling && roster.length === 0 && (
              <div className="fp-bm__empty">
                Roster empty. Raise Prestige and try advancing the year.
              </div>
            )}
            {!rolling && roster.map((m, i) => (
              <MarketCard key={m.id} m={m} index={i} onClaim={claimMarket} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}

function Counter({
  label,
  value,
  tone
}: {
  label: string;
  value: string;
  tone: 'acid' | 'yellow' | 'magenta' | 'white';
}) {
  return (
    <div className={`fp-bm__counter fp-bm__counter--${tone}`}>
      <div className="fp-bm__counter-label">{label}</div>
      <div className="fp-bm__counter-value fp-mono">{value}</div>
    </div>
  );
}

function MarketCard({
  m,
  index,
  onClaim
}: {
  m: Market;
  index: number;
  onClaim: (m: Market) => void;
}) {
  // each card gets a stable random tilt + a tiny stagger on entry
  const tilt = useMemo(() => (Math.random() * 6 - 3).toFixed(2), [m.id]);
  const stagger = `${index * 60}ms`;
  const copy = TIER_COPY[m.tier];
  const pinSide = index % 2 === 0 ? 'left' : 'right';

  const click = () => {
    if (m.isEligible && !m.isComplete) onClaim(m);
  };

  return (
    <article
      className={`fp-bm__card fp-bm__card--${m.tier.toLowerCase()}${m.isComplete ? ' fp-bm__card--done' : ''}${!m.isEligible ? ' fp-bm__card--locked' : ''}`}
      style={{
        ['--tilt' as string]: `${tilt}deg`,
        ['--delay' as string]: stagger
      }}
      onClick={click}
      role={m.isEligible && !m.isComplete ? 'button' : undefined}
      tabIndex={m.isEligible && !m.isComplete ? 0 : undefined}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && m.isEligible && !m.isComplete) {
          e.preventDefault();
          click();
        }
      }}
    >
      <span className={`fp-bm__pin fp-bm__pin--${pinSide}`} aria-hidden="true" />

      <header className="fp-bm__card-head">
        <span className="fp-bm__card-tier">{m.display}</span>
        <span className="fp-bm__card-kicker">{copy.kicker}</span>
      </header>

      <h3 className="fp-bm__card-vendor">{m.vendor}</h3>
      <p className="fp-bm__card-mood">{copy.mood}</p>

      <dl className="fp-bm__card-fields">
        <div>
          <dt>Crop</dt>
          <dd>{m.crop}</dd>
        </div>
        <div>
          <dt>Goal</dt>
          <dd>{formatLiters(m.goal)}</dd>
        </div>
        <div>
          <dt>Cash payout</dt>
          <dd>{formatCash(m.cashPayout)}</dd>
        </div>
        <div>
          <dt>Scrip + Fame</dt>
          <dd>{m.scripPayout} · {formatLiters(m.famePayout)}</dd>
        </div>
        <div>
          <dt>Gates</dt>
          <dd>P{m.prestigeReq} · {m.crop} L{m.masteryReq}</dd>
        </div>
      </dl>

      {!m.isEligible && (
        <div className="fp-bm__card-lock">
          <span className="fp-stamp">LOCKED · NEEDS P{m.prestigeReq}</span>
        </div>
      )}

      {m.isComplete && (
        <div className="fp-bm__card-stamp">DELIVERED</div>
      )}

      {m.isEligible && !m.isComplete && (
        <div className="fp-bm__card-action">
          <span className="fp-stamp">CLICK TO DELIVER</span>
        </div>
      )}
    </article>
  );
}
