import { GraffitiTag } from '../components/ui/GraffitiTag';
import { Button } from '../components/ui/Button';
import { DossierCard, Callout, PaperPanel } from '../components/ui/Card';
import './early-access.css';

const SHIPPED = [
  'Annual Taxes (land + equipment)',
  'Cartel Franchise Extortion Fee',
  'Mandatory Financing (vehicles, buildings, land)',
  'Debt Cap & Cash Reserve',
  'Credit Rating F→A',
  'Vanilla Loan Override ($50k cap, 3× interest)',
  'Annual Profit & Expenditure Tracking',
  'Farmer Wallet (Scrip)',
  'Shares System + Lifetime Dividend Tier Ladder',
  '17-skill Manager Tree',
  'Crop Licensing (6 tiers)',
  'Crop Novelty Bonus',
  'Crop Mastery & Farmer Prestige',
  'Farmer Prestige Perks (12-perk rotation)',
  'Prestige Reward Catalog',
  'Crop Spoilage',
  'Shelter Detection',
  'Vehicle Storage Enforcement',
  'Weather System (45 entries)',
  'Asset Sell Block (museum doctrine)',
  'No Generators',
  'Reclamation Warchest',
  'Opposition Events (10 retaliations)',
  'Black Markets (5-tier roster)',
  'Farmer Titles',
  'Debug HUD'
];

const PLANNED = [
  'In-game Menu System (FarmPunk tab)',
  'Endgame plumbing — game-end trigger and victory cinematic',
  'Centralized farm silo coverage for BulkStorage and Spoilage'
];

const POSTPONED = [
  'Additional skills — Speed Specialization, Reduced AI Costs, Implement Weight Reduction',
  'Infinite skill levels',
  'Premium Vehicle Surcharge',
  'HTML UI Dashboard',
  'Meta Map Progression (cross-save goals)'
];

export function EarlyAccess() {
  return (
    <article className="fp-ea-page">
      <header className="fp-ea-page__head">
        <div className="fp-content">
          <span className="fp-eyebrow">Early Access · v0.0.34 · 05.01.26</span>
          <h1>
            <GraffitiTag color="acid" rotate={-2} size="md">EARLY</GraffitiTag>
            {' '}
            <GraffitiTag color="yellow" rotate={3} size="md">ACCESS</GraffitiTag>
          </h1>
          <p className="fp-ea-page__lede">
            FarmPunk is in active early access. Forty-plus systems are shipped
            and tested. The menu UI and final balance pass are still in flight.
            Saves are not yet promised to be forward-compatible across major
            versions — back up before each update.
          </p>

          <div className="fp-ea-page__ctas">
            <Button href="https://www.farming-simulator.com/mods.php" variant="primary">
              Get from ModHub ↗
            </Button>
            <Button href="https://github.com" variant="ghost">
              Source on GitHub ↗
            </Button>
          </div>
        </div>
      </header>

      <div className="fp-content fp-ea-page__body">
        <Callout kind="warning" title="What 'early access' means here">
          <p>
            All shipped systems work end-to-end and persist correctly. Numbers
            (rates, brackets, costs) may shift between versions as we balance.
            New systems are added in roughly bi-weekly cuts. Save-breaking
            changes are flagged in the version history.
          </p>
        </Callout>

        <div className="fp-ea-page__cols">
          <DossierCard tone="paper" badge="✓ COMPLETE" stamp={`${SHIPPED.length} SYSTEMS`}>
            <h3>Shipped & Live</h3>
            <ul className="fp-ea-page__list">
              {SHIPPED.map(s => <li key={s}>{s}</li>)}
            </ul>
          </DossierCard>

          <DossierCard tone="manila" badge="📋 PLANNED" stamp="IN FLIGHT">
            <h3>In Flight</h3>
            <ul className="fp-ea-page__list">
              {PLANNED.map(s => <li key={s}>{s}</li>)}
            </ul>
          </DossierCard>

          <DossierCard tone="wood" badge="◯ POSTPONED" stamp="ICEBOX">
            <h3>Icebox</h3>
            <ul className="fp-ea-page__list">
              {POSTPONED.map(s => <li key={s}>{s}</li>)}
            </ul>
          </DossierCard>
        </div>

        <PaperPanel>
          <h2>How to install</h2>
          <ol>
            <li>Download the latest <code>FarmPunk_x.x.x.zip</code> from ModHub or the source repo.</li>
            <li>Drop it into <code>%USERPROFILE%/Documents/My Games/FarmingSimulator2025/mods/</code>.</li>
            <li>Launch FS25, create a new save, enable the mod in the mod list.</li>
            <li>(Optional) Open the in-game console (<code>~</code>) and run <code>farmPunkStats</code> to confirm the mod is live.</li>
          </ol>
          <h2>How to give feedback</h2>
          <ul>
            <li>Bug reports: include the FarmPunk version, FS25 version, and the contents of <code>log.txt</code>.</li>
            <li>Balance feedback: please include your save year, share count, Warchest balance, and a one-line description of the moment that felt off.</li>
            <li>Feature requests for systems already in the README's Postponed section will be filed but probably not shipped.</li>
          </ul>
        </PaperPanel>
      </div>
    </article>
  );
}
