import { useState, useEffect } from 'react';
import { GraffitiTag } from '../components/ui/GraffitiTag';
import { Button } from '../components/ui/Button';
import farmpunkIcon from '../assets/farmpunk-icon.png';
import './endgame.css';

const STAGES = [
  {
    pct: 0,
    title: 'Field Serf',
    sub: 'You are a manager on stolen land.',
    blurb:
      "The Cartel owns 100% of the company that controls your family's farm. Every system around you is designed to keep you productive but dependent.",
    quote: 'The farm is not yours yet.',
    pressure: 0
  },
  {
    pct: 25,
    title: 'First Quarter',
    sub: 'You hold one in four. The Cartel notices.',
    blurb:
      'Twenty-five shares. Twenty-five percent off the franchise fee. The Cartel\'s lawyers start drafting countermeasures. Tariffs, audits, smear campaigns become routine.',
    quote: 'Every share weakens the legal grip.',
    pressure: 25
  },
  {
    pct: 50,
    title: 'Half The Company',
    sub: 'A coin flip. Their boardroom or yours.',
    blurb:
      "Fifty shares. The franchise fee is half what it was. The opposition is real now — most years bring 2-3 retaliations. The Warchest is no longer optional.",
    quote: 'The Cartel owns the rules until you make them expensive to enforce.',
    pressure: 50
  },
  {
    pct: 75,
    title: 'Three-Quarter Hold',
    sub: 'They are bleeding. They are vicious.',
    blurb:
      "Seventy-five shares. The franchise bill is a quarter of what it once was. Goons visit. Crops get poisoned. The Warchest is the only thing keeping the worst events off the board.",
    quote: 'Every upgrade is leverage. Every deposit is defense.',
    pressure: 75
  },
  {
    pct: 100,
    title: 'Reclamation',
    sub: 'The land is yours. The valley is next.',
    blurb:
      "All one hundred shares. The franchise fee is zero. The dividend ledger is fat. With $1B in the Warchest, the Cartel has lost its grip on the valley too.",
    quote: 'You do not inherit freedom. You buy it back.',
    pressure: 0 /* defended fully at 100% Warchest */
  }
];

const CARTEL_GRIPS = [
  { id: 'banks', label: 'Banks', emoji: '$' },
  { id: 'family', label: 'Family', emoji: '·' },
  { id: 'friends', label: 'Friends', emoji: '·' },
  { id: 'markets', label: 'Local Markets', emoji: '$' },
  { id: 'sheriffs', label: 'Sheriffs', emoji: '★' },
  { id: 'councils', label: 'Town Councils', emoji: '☷' }
];

export function Endgame() {
  const [stageIdx, setStageIdx] = useState(0);
  const [warchestPct, setWarchestPct] = useState(0);
  const stage = STAGES[stageIdx];

  // pressure score = sharesOwned − defense
  // (using stage pct as shares for the dramatization)
  const sharesOwned = stage.pct;
  const defense = Math.floor((warchestPct / 100) * 100);
  const pressureScore = Math.max(-100, Math.min(100, sharesOwned - defense));
  const pressureMagnitude = Math.max(0, pressureScore);

  // grips broken by warchest — ramp from right to left
  const gripsBroken = Math.min(CARTEL_GRIPS.length, Math.floor((warchestPct / 100) * CARTEL_GRIPS.length + 0.0001));

  // dramatic auto-advance "play" mode
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setStageIdx(i => {
        if (i >= STAGES.length - 1) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
      setWarchestPct(p => Math.min(100, p + 25));
    }, 2200);
    return () => clearInterval(id);
  }, [playing]);

  const won = stageIdx === STAGES.length - 1 && warchestPct >= 100;

  // Modal takeover: when the win moment first triggers, fullscreen it.
  // Click anywhere → back to the inline reveal under the controls.
  // If the player drops below the win and re-crosses, the modal re-fires.
  const [showModal, setShowModal] = useState(false);
  const [hasFiredForThisWin, setHasFiredForThisWin] = useState(false);
  useEffect(() => {
    if (won && !hasFiredForThisWin) {
      setShowModal(true);
      setHasFiredForThisWin(true);
    } else if (!won && hasFiredForThisWin) {
      setShowModal(false);
      setHasFiredForThisWin(false);
    }
  }, [won, hasFiredForThisWin]);

  // Esc also dismisses
  useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [showModal]);

  return (
    <article className="fp-eg">
      {/* ── stage header ──────────────────────────────────────── */}
      <header className="fp-eg__head">
        <div className="fp-content">
          <span className="fp-eyebrow">Endgame · Interactive Sequence</span>
          <h1>
            <GraffitiTag color="acid" rotate={-2} size="md">THE</GraffitiTag>
            {' '}
            <GraffitiTag color="magenta" rotate={3} size="md">RECLAMATION</GraffitiTag>
            {' '}
            <GraffitiTag color="acid" rotate={-1} size="md">SEQUENCE</GraffitiTag>
          </h1>
          <p className="fp-eg__lede">
            Drag the slider. Watch ownership grow. Watch the Cartel push back.
            Watch the Warchest break their grip on the valley.
          </p>
        </div>
      </header>

      {/* ── interactive stage ─────────────────────────────────── */}
      <section className={`fp-eg__stage fp-eg__stage--p${stage.pct}`}>
        <div
          className="fp-eg__pressure"
          style={{ ['--pressure' as string]: pressureMagnitude }}
          aria-hidden="true"
        />
        <div className="fp-eg__warning-tape" aria-hidden="true" />
        <div className="fp-eg__noise" aria-hidden="true" />

        <div className="fp-content fp-eg__stage-inner">
          <div className="fp-eg__readout">
            <div className="fp-eg__pct-block">
              <div className="fp-eg__pct">{stage.pct}<span>%</span></div>
              <div className="fp-eg__pct-label">Ownership</div>
            </div>
            <div className="fp-eg__title-block">
              <div className="fp-eg__title-stamp">STAGE {stageIdx + 1} / {STAGES.length}</div>
              <h2 className="fp-eg__title">{stage.title}</h2>
              <p className="fp-eg__sub">{stage.sub}</p>
            </div>
          </div>

          <p className="fp-eg__blurb">{stage.blurb}</p>

          <p className="fp-eg__quote">
            <GraffitiTag color={stage.pct >= 75 ? 'acid' : 'magenta'} rotate={-1.5} size="sm">
              "{stage.quote}"
            </GraffitiTag>
          </p>
        </div>
      </section>

      {/* ── controls + grips ──────────────────────────────────── */}
      <section className="fp-eg__controls">
        <div className="fp-content">
          <div className="fp-eg__grid">
            {/* Ownership stages */}
            <div className="fp-eg__panel">
              <h3>Ownership Stage</h3>
              <p className="fp-eg__panel-sub">
                Each stage represents the player buying back another quarter of
                the company that controls their farm.
              </p>
              <div className="fp-eg__stage-buttons">
                {STAGES.map((s, i) => (
                  <button
                    key={s.pct}
                    className={`fp-eg__stage-btn${i === stageIdx ? ' fp-eg__stage-btn--active' : ''}`}
                    onClick={() => setStageIdx(i)}
                  >
                    <span className="fp-eg__stage-btn-pct">{s.pct}%</span>
                    <span className="fp-eg__stage-btn-title">{s.title}</span>
                  </button>
                ))}
              </div>
              <div className="fp-eg__play">
                <Button
                  variant={playing ? 'rust' : 'rebel'}
                  onClick={() => {
                    if (playing) { setPlaying(false); return; }
                    setStageIdx(0);
                    setWarchestPct(0);
                    setPlaying(true);
                  }}
                >
                  {playing ? '⏸ Pause sequence' : '▶ Play full sequence'}
                </Button>
              </div>
            </div>

            {/* Warchest slider */}
            <div className="fp-eg__panel">
              <h3>Reclamation Warchest</h3>
              <p className="fp-eg__panel-sub">
                Cap is $1,000,000,000. Every $10M cancels one share of Cartel
                pressure. Every dollar deposited is gone forever.
              </p>
              <div className="fp-eg__warchest">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={warchestPct}
                  onChange={e => setWarchestPct(Number(e.target.value))}
                  aria-label="Warchest fill percentage"
                />
                <div className="fp-eg__warchest-readout">
                  <span className="fp-mono">${(warchestPct * 10_000_000).toLocaleString()}</span>
                  <span className="fp-stamp"> / $1,000,000,000</span>
                </div>
                <div className="fp-eg__warchest-bar">
                  <div
                    className="fp-eg__warchest-fill"
                    style={{ width: `${warchestPct}%` }}
                  />
                  <div className="fp-eg__warchest-labels">
                    <span>EMPTY</span>
                    <span>VALLEY RECLAIMED</span>
                  </div>
                </div>
              </div>

              <div className="fp-eg__counters">
                <Counter
                  label="Pressure score"
                  value={pressureScore}
                  tone={pressureScore <= 0 ? 'safe' : pressureScore < 50 ? 'warn' : 'danger'}
                />
                <Counter label="Shares" value={sharesOwned} suffix="/100" tone="rebel" />
                <Counter label="Defense" value={defense} suffix=" pts" tone="safe" />
              </div>
            </div>
          </div>

          {/* Cartel grips */}
          <div className="fp-eg__grips-panel">
            <h3>Cartel's Grip On The Valley</h3>
            <p className="fp-eg__panel-sub">
              As the Warchest fills, the Cartel's grip slips one institution at
              a time. Each grip broken is one corner of the valley liberated.
            </p>
            <div className="fp-eg__grips">
              {CARTEL_GRIPS.map((g, i) => {
                const broken = i < gripsBroken;
                return (
                  <div
                    key={g.id}
                    className={`fp-eg__grip ${broken ? 'fp-eg__grip--broken' : ''}`}
                  >
                    <div className="fp-eg__grip-doc">
                      <div className="fp-eg__grip-stamp">
                        {broken ? 'LIBERATED' : 'CARTEL CONTROL'}
                      </div>
                      <div className="fp-eg__grip-label">{g.label}</div>
                      <div className="fp-eg__grip-emoji" aria-hidden="true">{g.emoji}</div>
                      {broken && (
                        <div className="fp-eg__grip-graffiti">
                          <GraffitiTag color="acid" rotate={-7} size="sm">FREE</GraffitiTag>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── final reclamation ─────────────────────────────────── */}
      {won && (
        <section
          className={`fp-eg__final ${showModal ? 'fp-eg__final--modal' : ''}`}
          role={showModal ? 'dialog' : 'status'}
          aria-modal={showModal || undefined}
          aria-live="polite"
          aria-label={showModal ? 'Reclamation complete' : undefined}
          onClick={showModal ? () => setShowModal(false) : undefined}
        >
          <div className="fp-eg__final-flash" aria-hidden="true" />
          <div className="fp-content fp-eg__final-inner">
            <span className="fp-eyebrow" style={{ borderColor: 'var(--fp-acid-green)', color: 'var(--fp-acid-green)' }}>
              Win Condition Satisfied · Both Endgames Complete
            </span>

            {/* The mod's actual ModHub icon, sprayed over the page like a tag */}
            <figure className="fp-eg__final-tag">
              <img
                src={farmpunkIcon}
                alt="FARMPUNK graffiti tag — the valley is reclaimed"
                className="fp-eg__final-img"
              />
              <div className="fp-eg__final-img-shadow" aria-hidden="true" />
              <figcaption className="fp-eg__final-img-cap">
                <span className="fp-stamp">TAG SPRAYED · BARN DOOR · VALLEY-WIDE</span>
              </figcaption>
            </figure>

            <h2 className="fp-eg__final-title">
              <GraffitiTag color="acid" rotate={-3} size="lg">RECLAIMED</GraffitiTag>
            </h2>
            <p className="fp-eg__final-quote">
              "Buy the shares. Build the Warchest. Reclaim your family's farm.
              Help take back the valley. The land was never theirs. It was only
              occupied."
            </p>

            {showModal && (
              <button
                type="button"
                className="fp-eg__final-dismiss"
                onClick={(e) => { e.stopPropagation(); setShowModal(false); }}
                aria-label="Close reclamation reveal"
              >
                Click anywhere to dismiss · ESC
              </button>
            )}
          </div>
        </section>
      )}
    </article>
  );
}

function Counter({
  label,
  value,
  suffix = '',
  tone
}: {
  label: string;
  value: number;
  suffix?: string;
  tone: 'safe' | 'warn' | 'danger' | 'rebel';
}) {
  return (
    <div className={`fp-eg__counter fp-eg__counter--${tone}`}>
      <div className="fp-eg__counter-label">{label}</div>
      <div className="fp-eg__counter-value">
        {value}
        <span className="fp-eg__counter-suffix">{suffix}</span>
      </div>
    </div>
  );
}
