import { GraffitiTag } from '../components/ui/GraffitiTag';
import { PaperPanel, Callout } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import './info-page.css';

export function Feedback() {
  return (
    <article className="fp-info">
      <header className="fp-info__head">
        <div className="fp-content">
          <span className="fp-eyebrow">Feedback · Early Access</span>
          <h1>
            <GraffitiTag color="magenta" rotate={-2} size="md">FEEDBACK</GraffitiTag>
          </h1>
          <p className="fp-info__lede">
            FarmPunk is in active early access. Real reports from real
            playthroughs are how the balance gets dialed in. Here's what to
            send and where to send it.
          </p>

          <div className="fp-info__ctas">
            <Button href="https://github.com" variant="primary">
              Open an issue ↗
            </Button>
          </div>
        </div>
      </header>

      <div className="fp-content fp-info__body">
        <PaperPanel>
          <h2>Bug reports</h2>
          <p>Include all of the following so we can reproduce and fix it:</p>
          <ul>
            <li><strong>FarmPunk version</strong> (visible in the in-game debug HUD or in the mod list).</li>
            <li><strong>Farming Simulator 25 version.</strong></li>
            <li>
              <strong>The contents of <code>log.txt</code></strong>{' '}
              (at <code>%USERPROFILE%/Documents/My Games/FarmingSimulator2025/log.txt</code>).
              Paste the chunk near the error, not the whole file.
            </li>
            <li>
              <strong>What you did right before the bug.</strong>{' '}
              "I ran <code>farmPunkBuyShare</code> and got X" beats "shares are broken."
            </li>
            <li>
              <strong>Output from any relevant <code>farmPunk*</code> console
              command.</strong> Most systems have a read-only summary command —
              the output is goldfor reproducing.
            </li>
          </ul>

          <h2>Balance feedback</h2>
          <p>
            Numbers in early access are still in motion. If a system feels
            broken, too easy, or impossibly punishing — say so. Include:
          </p>
          <ul>
            <li>
              <strong>Save year</strong> (how many in-game years in you are).
            </li>
            <li>
              <strong>Share count</strong> and <strong>Warchest balance</strong>{' '}
              (run <code>farmPunkShares</code> and <code>farmPunkWarchest</code>).
            </li>
            <li>
              <strong>Farmer Prestige level</strong> (run <code>farmPunkMastery</code>).
            </li>
            <li>
              <strong>One sentence describing the moment that felt off.</strong>{' '}
              "Year 8, 30 shares, $0 in Warchest, the Cartel rolled 3 attacks
              and I lost the farm in one month" — that's the kind of thing
              that drives a balance pass.
            </li>
          </ul>

          <h2>Feature requests</h2>
          <p>
            Welcome — but read the{' '}
            <a href="/early-access">Early Access page</a> first. Anything in
            the README's <em>Postponed</em> section will get filed but
            probably won't ship soon. Anything in <em>Planned</em> is on the
            list already.
          </p>
        </PaperPanel>

        <Callout kind="rebellion" title="What gets fixed first">
          Crashes and save-corrupting bugs jump the queue. Then balance
          issues that affect normal play. Then quality-of-life. Pure feature
          requests are weighed against everything already in flight.
        </Callout>
      </div>
    </article>
  );
}
