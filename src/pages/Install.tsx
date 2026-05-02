import { GraffitiTag } from '../components/ui/GraffitiTag';
import { PaperPanel, Callout } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import './info-page.css';

export function Install() {
  return (
    <article className="fp-info">
      <header className="fp-info__head">
        <div className="fp-content">
          <span className="fp-eyebrow">Install · v0.0.34</span>
          <h1>
            <GraffitiTag color="acid" rotate={-2} size="md">INSTALL</GraffitiTag>
          </h1>
          <p className="fp-info__lede">
            Two-minute setup. Drop the mod into your Farming Simulator 25
            mods folder, enable it on a save, and you're done.
          </p>

          <div className="fp-info__ctas">
            <Button href="https://www.farming-simulator.com/mods.php" variant="primary">
              Get from ModHub ↗
            </Button>
            <Button href="https://github.com" variant="ghost">
              Source on GitHub ↗
            </Button>
          </div>
        </div>
      </header>

      <div className="fp-content fp-info__body">
        <PaperPanel>
          <h2>Steps</h2>
          <ol className="fp-info__steps">
            <li>
              <strong>Download.</strong> Grab the latest{' '}
              <code>FarmPunk_x.x.x.zip</code> from ModHub or the source repo.
            </li>
            <li>
              <strong>Drop into your mods folder.</strong> The folder lives at{' '}
              <code>%USERPROFILE%/Documents/My Games/FarmingSimulator2025/mods/</code>{' '}
              on Windows. (On Mac it's{' '}
              <code>~/Library/Application Support/FarmingSimulator2025/mods/</code>.)
              Don't unzip — FS25 reads the .zip directly.
            </li>
            <li>
              <strong>Launch FS25 and start a new save.</strong> FarmPunk
              changes how the economy works from the very first day. Loading
              an existing save is fine, but starting fresh gets the cleanest
              experience.
            </li>
            <li>
              <strong>Enable FarmPunk in the mod list</strong> when you create
              the save. You'll see it labeled <code>AgriCorp</code> internally.
            </li>
            <li>
              <strong>(Optional) Confirm it's live.</strong> Open the in-game
              console with the <code>~</code> key and run{' '}
              <code>farmPunkStats</code>. If you see a printout, you're good.
            </li>
          </ol>

          <h2>If it doesn't load</h2>
          <ul>
            <li>
              <strong>Double-check the path.</strong> The mods folder is the
              one with your existing FS25 mods inside it. If the folder
              doesn't exist yet, FS25 creates it the first time you launch
              the game.
            </li>
            <li>
              <strong>Don't unzip.</strong> Leave it as a .zip file.
            </li>
            <li>
              <strong>Make sure mods are enabled in your save.</strong> Saves
              created with mods turned off won't load mods later.
            </li>
            <li>
              <strong>Check the FS25 log.</strong> If there's a startup error,
              the log file is at{' '}
              <code>%USERPROFILE%/Documents/My Games/FarmingSimulator2025/log.txt</code>.
              The line you want will mention <code>FarmPunk</code> or{' '}
              <code>AgriCorp</code>.
            </li>
          </ul>
        </PaperPanel>

        <Callout kind="warning" title="Multiplayer is not supported">
          FarmPunk is single-player only. The mod's financial systems wrap
          single-player save state and don't sync to other players. Loading
          a multiplayer save with FarmPunk active is unsupported and will
          probably break things.
        </Callout>
      </div>
    </article>
  );
}
