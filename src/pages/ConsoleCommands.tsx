import { useMemo, useState } from 'react';
import { GraffitiTag } from '../components/ui/GraffitiTag';
import { PaperPanel } from '../components/ui/Card';
import './console.css';

type Cmd = { cmd: string; args: string; desc: string; cat: string };

const COMMANDS: Cmd[] = [
  { cat: 'Money', cmd: 'farmPunkLoanSummary', args: '—', desc: 'All active loans with principal, remaining, monthly payment, debt cap status.' },
  { cat: 'Money', cmd: 'farmPunkBuyLand', args: '<farmlandId>', desc: 'Finance a land purchase by farmland ID.' },
  { cat: 'Money', cmd: 'farmPunkBuyVehicle', args: '—', desc: 'Finance the vehicle currently open in the shop.' },
  { cat: 'Money', cmd: 'farmPunkReserveSummary', args: '—', desc: 'Current cash reserve requirement and whether it is met.' },
  { cat: 'Money', cmd: 'farmPunkStats', args: '—', desc: 'Farmer title, year-over-year revenue, expenditure, profit.' },
  { cat: 'Money', cmd: 'farmPunkWallet', args: '—', desc: 'Wallet balance, base salary, projected year-end bonus.' },
  { cat: 'Money', cmd: 'farmPunkCredit', args: '—', desc: 'Credit rating summary and effective new-loan rate.' },
  { cat: 'Money', cmd: 'farmPunkVanillaLoan', args: '—', desc: '$50k cap, 3× interest. Vanilla emergency channel.' },
  { cat: 'Money', cmd: 'farmPunkFranchiseFee', args: '—', desc: 'Preview current year fee. Bracket breakdown, gross/net.' },

  { cat: 'Skills', cmd: 'farmPunkBuySkill', args: '<skillName>', desc: 'Purchase next level. cropYield, salePrice, etc.' },
  { cat: 'Skills', cmd: 'farmPunkSkills', args: '—', desc: 'All 17 skill levels, costs to next, wallet balance.' },

  { cat: 'Shares', cmd: 'farmPunkBuyShare', args: '—', desc: 'Purchase one FarmPunk share if eligible.' },
  { cat: 'Shares', cmd: 'farmPunkShares', args: '—', desc: 'Shares owned, eligibility tier, dividend block.' },

  { cat: 'Warchest', cmd: 'farmPunkWarchest', args: '—', desc: 'Balance, percent to win, full deposit ledger.' },
  { cat: 'Warchest', cmd: 'farmPunkWarchestDeposit', args: '<amount>', desc: 'Deposit farm cash. One-way. No withdraws.' },

  { cat: 'Production', cmd: 'farmPunkLicense', args: '—', desc: 'All crop licenses: tier, cap, sold, headroom.' },
  { cat: 'Production', cmd: 'farmPunkBuyLicense', args: '<CROPNAME>', desc: 'Upgrade a crop license one tier.' },
  { cat: 'Production', cmd: 'farmPunkNovelty', args: '—', desc: 'Per-crop last sold, gap, current boost.' },
  { cat: 'Production', cmd: 'farmPunkMastery', args: '—', desc: 'Prestige + per-crop Mastery levels.' },
  { cat: 'Production', cmd: 'farmPunkRewards', args: '—', desc: 'Prestige reward catalog. CLAIMED / PENDING / LOCKED.' },
  { cat: 'Production', cmd: 'farmPunkPerks', args: '—', desc: 'Active perks, levels, BD counter, next grant level.' },
  { cat: 'Production', cmd: 'farmPunkSpoilage', args: '—', desc: 'Per-crop on hand + projected next-period loss.' },
  { cat: 'Production', cmd: 'farmPunkWeather', args: '—', desc: 'Current weather, mods, history, catalog counts.' },

  { cat: 'Resistance', cmd: 'farmPunkOpposition', args: '—', desc: 'Pressure score, active effects, cooldown set, forecast.' },
  { cat: 'Resistance', cmd: 'farmPunkBlackMarkets', args: '—', desc: 'Active board, vendors, eligibility, payout previews.' },

  { cat: 'Operations', cmd: 'farmPunkShelterCheck', args: '—', desc: 'Per-vehicle SHELTERED / EXPOSED tally.' },
  { cat: 'Operations', cmd: 'farmPunkStorageStatus', args: '—', desc: 'Exposed equipment ranked by sell price + odds.' }
];

const CATS = Array.from(new Set(COMMANDS.map(c => c.cat)));

export function ConsoleCommands() {
  const [q, setQ] = useState('');
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return COMMANDS.filter(c => {
      if (activeCat && c.cat !== activeCat) return false;
      if (!q) return true;
      const needle = q.toLowerCase();
      return (
        c.cmd.toLowerCase().includes(needle) ||
        c.desc.toLowerCase().includes(needle) ||
        c.cat.toLowerCase().includes(needle)
      );
    });
  }, [q, activeCat]);

  return (
    <article className="fp-console">
      <header className="fp-console__head">
        <div className="fp-content">
          <span className="fp-eyebrow">Console Commands · Player + Testing</span>
          <h1>
            <GraffitiTag color="acid" rotate={-2} size="md">CONSOLE</GraffitiTag>
          </h1>
          <p className="fp-console__lede">
            Player-facing summary commands and testing tools. The full list
            (including <code>farmPunkForce*</code> testing helpers) lives in
            the mod README. All commands take effect on the player farm only.
          </p>
        </div>
      </header>

      <div className="fp-content">
        <div className="fp-console__controls">
          <input
            className="fp-console__search"
            placeholder="Search commands…"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <div className="fp-console__cats">
            <button
              className={`fp-console__cat${!activeCat ? ' fp-console__cat--active' : ''}`}
              onClick={() => setActiveCat(null)}
            >
              All
            </button>
            {CATS.map(c => (
              <button
                key={c}
                className={`fp-console__cat${activeCat === c ? ' fp-console__cat--active' : ''}`}
                onClick={() => setActiveCat(c === activeCat ? null : c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <PaperPanel>
          <table className="fp-console__table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Command</th>
                <th>Args</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.cmd}>
                  <td><span className="fp-stamp">{c.cat}</span></td>
                  <td><code>{c.cmd}</code></td>
                  <td><code className="fp-console__args">{c.args}</code></td>
                  <td>{c.desc}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="fp-console__empty">
                    No commands matched. Try a shorter search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </PaperPanel>
      </div>
    </article>
  );
}
