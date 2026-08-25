// Turn the hero originals in assets/hero/ into what the site actually serves.
//
// The originals stay out of public/ on purpose: everything in public/ is copied into the
// build verbatim, and shipping 4.5 MB of PNG to every visitor to display a darkened
// background would be a waste nobody would notice until their phone bill did.
//
// Run: npm run images   — then commit what lands in public/hero/.

import { mkdir, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const SOURCE = 'assets/hero';
const OUT = 'public/hero';

// One width for phones, one for everything else. The originals are 1935px wide, so there is
// nothing to gain by asking for more.
const WIDTHS = [1000, 1935];

await mkdir(OUT, { recursive: true });

const files = (await readdir(SOURCE)).filter((f) => /\.(png|jpe?g)$/i.test(f));
if (files.length === 0) throw new Error(`No hero originals found in ${SOURCE}`);

let total = 0;

for (const file of files.sort()) {
  const name = file.replace(/\.[^.]+$/, '');
  const src = join(SOURCE, file);

  for (const width of WIDTHS) {
    const webp = join(OUT, `${name}-${width}.webp`);
    await sharp(src).resize({ width }).webp({ quality: 74, effort: 6 }).toFile(webp);
    total += (await stat(webp)).size;
  }

  // A JPEG for anything that cannot read WebP. Only the large one — a browser that old is
  // rare enough not to warrant a second size.
  const jpg = join(OUT, `${name}-1935.jpg`);
  await sharp(src).resize({ width: 1935 }).jpeg({ quality: 78, mozjpeg: true }).toFile(jpg);
  total += (await stat(jpg)).size;

  console.log(`  ${name.padEnd(10)} done`);
}

console.log(`\n${files.length} images -> ${(total / 1024 / 1024).toFixed(2)} MB total in ${OUT}`);
