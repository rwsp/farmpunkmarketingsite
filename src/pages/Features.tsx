import { Link } from 'react-router-dom';
import { GraffitiTag } from '../components/ui/GraffitiTag';
import { DossierCard } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SKILLS } from '../data/skills';
import { PERKS } from '../data/perks';
import { CARTEL_ATTACKS } from '../data/cartelAttacks';
import './features.css';

const FEATURE_GROUPS = [
  {
    heading: 'RPG & Progression',
    blurb: 'Skills, prestige, perks, vehicles you survive long enough to earn.',
    items: [
      ['Manager Skill Tree', '17 scrip-purchased skills × 10 levels each. Yield, sale price, vehicle, finance, resilience.'],
      ['Crop Mastery', 'Per-crop fame counter. Yield + price tier every 5/10 levels. Uncapped.'],
      ['Farmer Prestige', 'Global level. Vehicle gifts at L3, 5, 10, 15… up to L100.'],
      ['Farmer Prestige Perks', '12-perk rotation cycle. Cycle K skips K−1 levels between grants.'],
      ['Prestige Reward Catalog', '13 default vehicle gifts at preset levels. Authoring tool included.'],
      ['Farmer Titles', 'Field Serf → Rebel Baron, derived from Prestige.'],
      ['Vehicle Storage Enforcement', 'Wear, vandals, theft on exposed gear every month.'],
      ['Black Markets', '5-tier underground buyer roster. Refreshes annually with vendor flavor + payouts.']
    ]
  },
  {
    heading: 'Resistance',
    blurb: 'Buy back the company. Build the warchest. Push back.',
    items: [
      ['Shares', '0–100. Each weakens Cartel grip 1%. The franchise-fee escape hatch.'],
      ['Dividends', 'Cash. Lifetime-fund tier ladder $2k → $10k per share.'],
      ['Reclamation Warchest', 'One-way fund. $1B cap. Win condition + cartel defense.'],
      ['Cartel Attacks', '10 retaliations. Pressure score = shares − Warchest defense.']
    ]
  },
  {
    heading: 'Production & Markets',
    blurb: 'What you grow, when you grow it, and who pays for it.',
    items: [
      ['Crop Licensing', '6-tier per-crop sell volume cap. −80% over the cap.'],
      ['Crop Novelty Bonus', '+15% / +25% rotation incentive. Locked at year start.'],
      ['Crop Spoilage', '3% of grain per month. Don\'t hoard.'],
      ['Weather System', '45 entries × 5 rarity tiers. One year = one weather, locked at P1.']
    ]
  },
  {
    heading: 'Money & Credit',
    blurb: 'Boring. Required. The Cartel\'s ledger and the systems that enforce it.',
    items: [
      ['Annual Taxes', 'Land + equipment, fired at Feb each year. Exponential land curve.'],
      ['Cartel Franchise Extortion Fee', 'Progressive cut on revenue. Each share −1%. Up to 20% on top earners.'],
      ['Mandatory Financing', '20% down, 12% interest, 36 months. Lease is gone.'],
      ['Debt Cap', 'Scales with land + equipment + balance. Min $100k.'],
      ['Credit Rating F→A', 'Drops on default. Climbs on a clean year.'],
      ['Vanilla Loan Override', '$50k cap, 3× interest. Emergency only.'],
      ['Minimum Cash Reserve', '3× monthly obligations. Purchases blocked below.'],
      ['Farmland Surcharge', '2% to 40% acquisition fee. Scales with acres held.'],
      ['Annual Profit & Expenditure Tracking', 'Per-year revenue + expense ledger. Drives bonuses, brackets, dividends.'],
      ['Farmer Wallet (Scrip)', 'Secondary currency for skills, shares, licenses. Cannot be exchanged.'],
      ['Asset Sell Block', 'Once bought, always bought. The museum doctrine.'],
      ['No Generators', 'Solar + wind placeables refused. The company keeps the meter.']
    ]
  }
];

const TOTAL_VISIBLE =
  SKILLS.length +
  PERKS.length +
  CARTEL_ATTACKS.length +
  FEATURE_GROUPS.reduce((n, g) => n + g.items.length, 0)
  // subtract the three family roll-ups so we don't double-count
  - 3;

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
            financial, RPG, and rebellion overhaul. Counted at the level the
            mod actually ships them: <strong>{TOTAL_VISIBLE}+ distinct
            behaviors</strong> across {FEATURE_GROUPS.length} categories,
            including all {SKILLS.length} skills, {PERKS.length} perks, and{' '}
            {CARTEL_ATTACKS.length} Cartel attacks. Click into the{' '}
            <Link to="/field-manual">Field Manual</Link> for full mechanics
            on each.
          </p>
        </div>
      </header>

      <div className="fp-content fp-feat__body">
        {FEATURE_GROUPS.map(group => (
          <section key={group.heading} className="fp-feat__group">
            <header className="fp-feat__group-head">
              <h2>{group.heading}</h2>
              <p>{group.blurb}</p>
            </header>
            <div className="fp-feat__grid">
              {group.items.map(([title, body], i) => {
                const isFamilyCard =
                  title === 'Manager Skill Tree' ||
                  title === 'Farmer Prestige Perks' ||
                  title === 'Cartel Attacks';
                const familySlug =
                  title === 'Manager Skill Tree' ? 'skills'
                  : title === 'Farmer Prestige Perks' ? 'perks'
                  : title === 'Cartel Attacks' ? 'cartel-attacks'
                  : null;
                const card = (
                  <DossierCard
                    key={title}
                    tilt={i % 2 ? -0.4 : 0.4}
                    tone={isFamilyCard ? 'manila' : 'wood'}
                    badge={isFamilyCard ? 'FAMILY' : undefined}
                  >
                    <h3>{title}</h3>
                    <p style={{ margin: 0, fontSize: '0.95rem' }}>{body}</p>
                    {isFamilyCard && (
                      <>
                        <hr className="fp-rule" />
                        <span className="fp-mono" style={{ fontSize: '0.78rem' }}>
                          Open the catalog →
                        </span>
                      </>
                    )}
                  </DossierCard>
                );
                return familySlug
                  ? <Link key={title} to={`/field-manual/${familySlug}`} className="fp-feat__link">{card}</Link>
                  : card;
              })}
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
