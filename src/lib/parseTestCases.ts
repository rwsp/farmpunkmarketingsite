/**
 * Parser for TESTCASES.md.
 *
 * The file has two distinct content shapes:
 *
 * (1) Regular test groups: `### Group Name` + blurb + a 4-col table
 *     `| ID | Name | Steps | Expected |`
 *
 * (2) The "Rapid Smoke Test Script" group has a different shape entirely:
 *     `### Rapid Smoke Test Script` + intro + many `#### Sub-section` blocks.
 *     One sub-section is a 6-col testable table (Testing Script), one is a
 *     numbered list of testable items (Pre-Test Setup), the rest are pure
 *     reference prose. We parse it into a dedicated `SmokeTest` shape.
 */

const SMOKE_TITLE = 'Rapid Smoke Test Script';

// ── Regular test groups ─────────────────────────────────────────
export type Test = {
  id: string;
  name: string;
  steps: string;
  expected: string;
};

export type TestGroup = {
  title: string;
  blurb: string;
  tests: Test[];
};

// ── Smoke test (separate shape) ─────────────────────────────────
export type SmokeItem = {
  id: string;          // e.g. SMK-PRE-1, SMK-RUN-1
  index: number;       // 1, 2, ...
  label: string;       // headline
  action?: string;     // for the 6-col Testing Script table
  expected?: string;   // for the 6-col Testing Script table
  body?: string;       // for numbered-list items (combined text)
};

export type SmokeSection = {
  title: string;       // "Purpose" / "Requirements" / "Testing Script" / etc.
  slug: string;        // 'purpose' / 'testing-script' / etc.
  body: string;        // raw markdown body for prose-only sections
  items: SmokeItem[];  // testable items (empty for prose-only sections)
  testable: boolean;   // true iff items.length > 0
};

export type SmokeTest = {
  intro: string;       // first paragraph after the section heading
  sections: SmokeSection[];
};

// ── Top-level result ────────────────────────────────────────────
export type ParsedTests = {
  groups: TestGroup[];
  smoke: SmokeTest | null;
};

export function parseTestCases(md: string): ParsedTests {
  const lines = md.split(/\r?\n/);
  const groups: TestGroup[] = [];
  let smoke: SmokeTest | null = null;
  let i = 0;

  // skip preamble
  while (i < lines.length && !lines[i].startsWith('### ')) i++;

  while (i < lines.length) {
    if (!lines[i].startsWith('### ')) {
      i++;
      continue;
    }

    const title = lines[i].slice(4).trim();
    i++;

    if (title === SMOKE_TITLE) {
      const result = parseSmokeSection(lines, i);
      smoke = result.smoke;
      i = result.endIdx;
      continue;
    }

    const result = parseGroupSection(title, lines, i);
    groups.push(result.group);
    i = result.endIdx;
  }

  return { groups, smoke };
}

// ── Group parsing ───────────────────────────────────────────────
function parseGroupSection(
  title: string,
  lines: string[],
  startIdx: number
): { group: TestGroup; endIdx: number } {
  let i = startIdx;
  const blurbLines: string[] = [];
  while (
    i < lines.length &&
    !lines[i].startsWith('### ') &&
    !isTableHeader(lines[i])
  ) {
    const trimmed = lines[i].trim();
    if (trimmed) blurbLines.push(trimmed);
    i++;
  }
  const blurb = blurbLines.join(' ').trim();

  const tests: Test[] = [];
  if (i < lines.length && isTableHeader(lines[i])) {
    i++;
    if (i < lines.length && /^\|[-:|\s]+\|$/.test(lines[i].trim())) i++;
    while (i < lines.length && lines[i].trim().startsWith('|')) {
      const cells = parseRowCells(lines[i]);
      if (cells.length >= 4 && cells[0] && /^[A-Z]+-\d+/.test(cells[0])) {
        tests.push({
          id: cells[0],
          name: cells[1],
          steps: cells[2],
          expected: cells[3]
        });
      }
      i++;
    }
  }

  return { group: { title, blurb, tests }, endIdx: i };
}

// ── Smoke-test parsing ──────────────────────────────────────────
function parseSmokeSection(
  lines: string[],
  startIdx: number
): { smoke: SmokeTest; endIdx: number } {
  let i = startIdx;

  // intro = paragraphs between the ### heading and the first ####
  const introLines: string[] = [];
  while (
    i < lines.length &&
    !lines[i].startsWith('#### ') &&
    !lines[i].startsWith('### ')
  ) {
    const t = lines[i].trim();
    if (t) introLines.push(t);
    i++;
  }
  const intro = introLines.join(' ').trim();

  const sections: SmokeSection[] = [];
  while (i < lines.length && !lines[i].startsWith('### ')) {
    if (!lines[i].startsWith('#### ')) {
      i++;
      continue;
    }
    const title = lines[i].slice(5).trim();
    i++;

    const contentLines: string[] = [];
    while (
      i < lines.length &&
      !lines[i].startsWith('#### ') &&
      !lines[i].startsWith('### ')
    ) {
      contentLines.push(lines[i]);
      i++;
    }

    const slug = slugify(title);
    const items = extractSmokeItems(slug, contentLines);
    const body = items.length > 0
      ? '' // testable section — body lives inside the items
      : contentLines.join('\n').trim();

    sections.push({
      title,
      slug,
      body,
      items,
      testable: items.length > 0
    });
  }

  return { smoke: { intro, sections }, endIdx: i };
}

function extractSmokeItems(slug: string, lines: string[]): SmokeItem[] {
  // Detect the testing-script table first (6-column with `# | Step | Action | Expected | …`)
  const tableHeaderIdx = lines.findIndex(l =>
    /^\|\s*#\s*\|\s*Step\s*\|/i.test(l.trim())
  );
  if (tableHeaderIdx !== -1) {
    return parseSmokeTable(slug, lines.slice(tableHeaderIdx));
  }

  // Otherwise look for a numbered list (`1. `, `2. `, …)
  const numberedItems = lines
    .map(l => l.match(/^(\d+)\.\s+(.+)$/))
    .filter((m): m is RegExpMatchArray => m !== null);
  if (numberedItems.length >= 2) {
    return numberedItems.map(m => ({
      id: `SMK-${slug.toUpperCase().slice(0, 3)}-${m[1]}`,
      index: Number(m[1]),
      label: m[2].trim(),
      body: ''
    }));
  }

  return [];
}

function parseSmokeTable(slug: string, lines: string[]): SmokeItem[] {
  const items: SmokeItem[] = [];
  // first line is the header, second is the |---|---| separator, then rows
  let i = 1;
  if (i < lines.length && /^\|[-:|\s]+\|$/.test(lines[i].trim())) i++;

  while (i < lines.length && lines[i].trim().startsWith('|')) {
    const cells = parseRowCells(lines[i]);
    // expected cells: # | Step | Action | Expected | Pass/Fail | Notes
    if (cells.length >= 4 && /^\d+$/.test(cells[0])) {
      items.push({
        id: `SMK-${slug.toUpperCase().slice(0, 3)}-${cells[0]}`,
        index: Number(cells[0]),
        label: cells[1],
        action: cells[2],
        expected: cells[3]
      });
    }
    i++;
  }
  return items;
}

// ── Helpers ─────────────────────────────────────────────────────
function isTableHeader(line: string): boolean {
  return /^\|\s*ID\s*\|/i.test(line.trim());
}

function parseRowCells(row: string): string[] {
  const parts = row.split('|');
  return parts.slice(1, -1).map(c => c.trim());
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ── Inline + block markdown rendering ───────────────────────────
const ESC: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};
function escHtml(s: string): string {
  return s.replace(/[&<>]/g, c => ESC[c]);
}

/** Render inline markdown (`code`, **bold**) safely as HTML. */
export function renderInline(text: string): string {
  return escHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

/**
 * Render a chunk of markdown as HTML. Handles paragraphs, bullet lists,
 * numbered lists, tables, and code fences. Headings inside the body are
 * rendered as bolded paragraphs (we don't want to compete with the
 * section heading).
 */
export function renderMarkdownBlocks(md: string): string {
  if (!md) return '';
  const lines = md.split(/\r?\n/);
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) { i++; continue; }

    // fenced code block
    if (trimmed.startsWith('```')) {
      const buf: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        buf.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      out.push(`<pre><code>${escHtml(buf.join('\n'))}</code></pre>`);
      continue;
    }

    // table
    if (trimmed.startsWith('|') && i + 1 < lines.length && /^\|[-:|\s]+\|$/.test(lines[i + 1].trim())) {
      const headers = parseRowCells(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        rows.push(parseRowCells(lines[i]));
        i++;
      }
      out.push(renderTable(headers, rows));
      continue;
    }

    // bullet list
    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i++;
      }
      out.push(`<ul>${items.map(it => `<li>${renderInline(it)}</li>`).join('')}</ul>`);
      continue;
    }

    // numbered list
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      out.push(`<ol>${items.map(it => `<li>${renderInline(it)}</li>`).join('')}</ol>`);
      continue;
    }

    // paragraph — collect until blank or block-start
    const paraLines: string[] = [trimmed];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('|') &&
      !lines[i].trim().startsWith('```') &&
      !/^[-*]\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    out.push(`<p>${renderInline(paraLines.join(' '))}</p>`);
  }

  return out.join('');
}

function renderTable(headers: string[], rows: string[][]): string {
  const head = `<thead><tr>${headers.map(h => `<th>${renderInline(h)}</th>`).join('')}</tr></thead>`;
  const body = `<tbody>${rows
    .map(r => `<tr>${r.map(c => `<td>${renderInline(c)}</td>`).join('')}</tr>`)
    .join('')}</tbody>`;
  return `<table>${head}${body}</table>`;
}

/** Pull "**Label:**" sub-sections out of a step/expected cell. */
export function structureCell(text: string): { intro: string; sections: { label: string; body: string }[] } {
  const re = /\*\*([A-Z][\w \-]+):\*\*/g;
  const matches = [...text.matchAll(re)];
  if (matches.length === 0) return { intro: text, sections: [] };

  const intro = text.slice(0, matches[0].index).trim();
  const sections: { label: string; body: string }[] = [];
  for (let k = 0; k < matches.length; k++) {
    const m = matches[k];
    const next = matches[k + 1];
    const start = (m.index ?? 0) + m[0].length;
    const end = next ? next.index : text.length;
    sections.push({
      label: m[1],
      body: text.slice(start, end).trim()
    });
  }
  return { intro, sections };
}
