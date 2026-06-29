/**
 * convert-to-webp.js
 * Converts every jpg/jpeg/png image in the car-image folders to WebP (quality 85).
 * Originals are kept. Run:  node scripts/convert-to-webp.js
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const folders = [
  'assets/images/34',
  'assets/images/cars',
  'assets/images/side view'
];

const SRC_EXT = ['.jpg', '.jpeg', '.png'];

(async function run() {
  let converted = 0, skipped = 0, failed = 0;
  let srcBytes = 0, outBytes = 0;
  const failures = [];

  for (const rel of folders) {
    const dir = path.join(ROOT, rel);
    if (!fs.existsSync(dir)) {
      console.warn('! folder not found: ' + rel);
      continue;
    }
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!SRC_EXT.includes(ext)) continue;

      const srcPath = path.join(dir, file);
      const base = path.basename(file, ext);
      const outPath = path.join(dir, base + '.webp');

      try {
        const before = fs.statSync(srcPath).size;
        await sharp(srcPath).webp({ quality: 85 }).toFile(outPath);
        const after = fs.statSync(outPath).size;
        srcBytes += before;
        outBytes += after;
        converted++;
        console.log('✓ converted: ' + rel + '/' + file + ' → ' + base + '.webp'
          + '  (' + (before / 1024).toFixed(0) + 'KB → ' + (after / 1024).toFixed(0) + 'KB)');
      } catch (err) {
        failed++;
        failures.push(rel + '/' + file + ' — ' + err.message);
        console.error('✗ failed: ' + rel + '/' + file + ' — ' + err.message);
      }
    }
  }

  console.log('\n── Summary ──');
  console.log('Converted: ' + converted);
  console.log('Skipped (non-image): ' + skipped);
  console.log('Failed: ' + failed);
  if (converted) {
    const reduction = srcBytes ? (1 - outBytes / srcBytes) * 100 : 0;
    console.log('Total source size: ' + (srcBytes / 1024).toFixed(0) + 'KB');
    console.log('Total WebP size:   ' + (outBytes / 1024).toFixed(0) + 'KB');
    console.log('Average size reduction: ' + reduction.toFixed(1) + '%');
  }
  if (failures.length) {
    console.log('\nFailures:');
    failures.forEach(f => console.log('  - ' + f));
  }
})();
