import { Link } from 'react-router-dom';
import { GraffitiTag } from '../components/ui/GraffitiTag';
import { DossierCard } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import './features.css';

const FEATURE_GROUPS = [
  {
    heading: 'Money & Credit',
    items: [
      ['Annual Taxes', 'Land + equipment, fired at Feb each year. Exponential land curve.'],
      ['Cartel Franchise Extortion Fee', 'Progressive cut on revenue. Each share -1%.'],
      ['Mandatory Financing', '20% down, 12% interest, 36 months. Lease is gone.'],
      ['Debt Cap', 'Scales with land + equipment + balance. Min $100k.'],
      ['Credit Rating F→A', 'Drops on default. Climbs on a clean year.'],
      ['Vanilla Loan Override', '$50k cap, 3× interest. Emergency only.'],
      ['Minimum Cash Reserve', '3× monthly obligations. Purchases blocked below.'],
      ['Farmland Surcharge', '2% to 40% acquisition fee. Scales with acres held.']
    ]
  },
  {
    heading: 'RPG & Progression',
    items: [
      ['17-skill Tree', 'Farm, finance, storage, weather, vehicle skills.'],
      ['Crop Mastery', 'Per-crop fame. Yield + price tiers every 5/10 levels.'],
      ['Farmer Prestige', 'Global level. Vehicle gifts, perks, titles.'],
      ['12-perk Rotation', 'Cycle-based with cap drops. Includes Backroom Dealers.'],
      ['Prestige Reward Catalog', '13 default vehicle gifts at L3 → L100.'],
      ['Farmer Titles', 'Field Serf → Rebel Baron, derived from Prestige.']
    ]
  },
  {
    heading: 'Production & Markets',
    items: [
      ['Crop Licensing', '6-tier per-crop sell volume cap. -80% over.'],
      ['Crop Novelty Bonus', '+15% / +25% rotation incentive.'],
      ['Crop Spoilage', '3% of grain per month. Don\'t hoard.'],
      ['Weather System', '45 entries × 5 rarity tiers. One year = one weather.'],
      ['Black Markets', '5-tier underground buyer roster. Refreshes annually.']
    ]
  },
  {
    heading: 'Resistance',
    items: [
      ['Shares', '0–100. Each weakens Cartel grip 1%.'],
      ['Dividends', 'Cash. Lifetime-fund tier ladder $2k → $10k per share.'],
      ['Reclamation Warchest', 'One-way fund. $1B cap. Win condition.'],
      ['Opposition Events', '10 cartel retaliations. Pressure scales with shares.']
    ]
  },
  {
    heading: 'Operations',
    items: [
      ['Shelter Detection', 'Indoor-area test for SHEDS-category placeables.'],
      ['Vehicle Storage Enforcement', 'Wear, vandals, theft on exposed gear.'],
      ['Asset Sell Block', 'Once bought, always bought. The museum doctrine.'],
      ['No Generators', 'Solar + wind placeables refused.']
    ]
  }
];

export function Features() {
  return (
    <article className="fp-feat">
      <header className="fp-feat__head">
        <div className="fp-content">
          <span className="fp-eyebrow">Features · Shipped in v0.0.34</span>
          <h1>
            <GraffitiTag color="acid" rotate={-2} size="md">EVERY</GraffitiTag>
            {' '}
            <GraffitiTag color="magenta" rotate={2} size="md">SYSTEM</GraffitiTag>
          </h1>
          <p className="fp-feat__lede">
            Forty-plus interlocking systems that turn the base game into a
            financial, RPG, and rebellion overhaul. Click into the{' '}
            <Link to="/field-manual">Field Manual</Link> for full mechanics
            on each.
          </p>
        </div>
      </header>

      <div className="fp-content fp-feat__body">
        {FEATURE_GROUPS.map(group => (
          <section key={group.heading} className="fp-feat__group">
            <h2>{group.heading}</h2>
            <div className="fp-feat__grid">
              {group.items.map(([title, body], i) => (
                <DossierCard
                  key={title}
                  tilt={i % 2 ? -0.4 : 0.4}
                  tone="wood"
                >
                  <h3>{title}</h3>
                  <p style={{ margin: 0, fontSize: '0.95rem' }}>{body}</p>
                </DossierCard>
              ))}
            </div>
          </section>
        ))}

        <div className="fp-feat__cta">
          <Button to="/field-manual" variant="primary">Open the Field Manual →</Button>
          <Button to="/quick-reference" variant="ghost">Get the Quick Reference card →</Button>
        </div>
      </div>
    </article>
  );
}
