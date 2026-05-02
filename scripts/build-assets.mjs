/**
 * Re-encodes the source ModHub icon into web-friendly variants.
 *
 *   src: ./farmpunk.png            (canonical, ~2.9 MB)
 *   →    src/assets/farmpunk-icon.png        (full-res, untouched copy)
 *   →    src/assets/farmpunk-icon@small.webp (480px wide, ~80% quality)
 *   →    public/farmpunk-icon.png            (favicon / OG)
 *
 * Run via `npm run build:assets`. Idempotent — overwrites destinations.
 */
import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'farmpunk.png');
const ASSETS = path.join(root, 'src', 'assets');
const PUBLIC = path.join(root, 'public');

await fs.mkdir(ASSETS, { recursive: true });
await fs.mkdir(PUBLIC, { recursive: true });

await fs.copyFile(SRC, path.join(ASSETS, 'farmpunk-icon.png'));
await fs.copyFile(SRC, path.join(PUBLIC, 'farmpunk-icon.png'));

await sharp(SRC)
  .resize({ width: 480, withoutEnlargement: true })
  .webp({ quality: 82, effort: 5 })
  .toFile(path.join(ASSETS, 'farmpunk-icon@small.webp'));

const stats = await Promise.all([
  fs.stat(path.join(ASSETS, 'farmpunk-icon.png')),
  fs.stat(path.join(ASSETS, 'farmpunk-icon@small.webp'))
]);
const fmt = (b) => `${(b / 1024).toFixed(1)} kB`;
console.log(`✓ farmpunk-icon.png        ${fmt(stats[0].size)}`);
console.log(`✓ farmpunk-icon@small.webp ${fmt(stats[1].size)}`);
