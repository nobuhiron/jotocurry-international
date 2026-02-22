#!/usr/bin/env node
/**
 * cta-bg.jpg を WebP に変換・圧縮して public/ に出力する
 * prebuild で実行
 */
import sharp from 'sharp';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const inputPath = join(rootDir, 'public', 'cta-bg.jpg');
const outputPath = join(rootDir, 'public', 'cta-bg.webp');

if (!existsSync(inputPath)) {
  console.warn('[optimize-cta-bg] public/cta-bg.jpg not found, skipping');
  process.exit(0);
}

const inputBuffer = readFileSync(inputPath);
await sharp(inputBuffer)
  .webp({ quality: 80 })
  .toFile(outputPath);

console.log('[optimize-cta-bg] Created public/cta-bg.webp');
