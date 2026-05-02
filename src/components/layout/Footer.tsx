import { GraffitiTag } from '../ui/GraffitiTag';
import './footer.css';

export function Footer() {
  return (
    <footer className="fp-footer">
      <div className="fp-content fp-footer__inner">
        <div className="fp-footer__brand">
          <GraffitiTag color="acid" rotate={-2} size="sm">FARMPUNK</GraffitiTag>
          <p className="fp-footer__motto">
            "The land was never theirs. It was only occupied."
          </p>
        </div>
        <div className="fp-footer__cols">
          <div>
            <h4>The Mod</h4>
            <ul>
              <li><a href="/field-manual">Field Manual</a></li>
              <li><a href="/quick-reference">Quick Reference</a></li>
              <li><a href="/calculators">Calculators</a></li>
              <li><a href="/console">Console Commands</a></li>
              <li><a href="/early-access">Early Access</a></li>
              <li><a href="/test-cases">Test Cases</a></li>
            </ul>
          </div>
          <div>
            <h4>Distribution</h4>
            <ul>
              <li><a href="/install">Install</a></li>
              <li><a href="/feedback">Feedback</a></li>
              <li>
                <a href="https://www.farming-simulator.com/mods.php" target="_blank" rel="noreferrer">
                  ModHub →
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  Source →
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="fp-footer__legal">
          <span className="fp-stamp">UNAFFILIATED · FAN MOD · FOR FS25</span>
          <span>FarmPunk is an early access mod. Farming Simulator 25 is a trademark of GIANTS Software.</span>
        </div>
      </div>
    </footer>
  );
}
