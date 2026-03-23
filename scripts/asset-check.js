#!/usr/bin/env node
/**
 * Asset Check — verify image references in posts resolve to local files.
 *
 * Usage:
 *   node scripts/asset-check.js                # Check all posts
 *   node scripts/asset-check.js post-slug.md   # Check one post
 *   node scripts/asset-check.js --missing-only  # Only show broken refs
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '..', 'src', 'content', 'posts');
const PUBLIC_DIR = path.join(__dirname, '..', 'src');

const MISSING_ONLY = process.argv.includes('--missing-only');
const targetFile = process.argv.find(a => a.endsWith('.md'));

const IMAGE_PATTERNS = [
  /!\[[^\]]*\]\(([^)]+)\)/g,
  /<img[^>]+src=["']([^"']+)["'][^>]*>/gi,
  /^featured_image_url:\s*(.+)$/gm,
  /background-image:\s*url\(["']?([^"')]+)["']?\)/gi,
  /href=["']([^"']+\.(?:jpg|jpeg|png|gif|svg|webp|zip|mp4))["']/gi,
];

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.mp4', '.mov', '.zip']);

function isImageUrl(url) {
  const ext = path.extname(url.split('?')[0]).toLowerCase();
  return IMAGE_EXTS.has(ext);
}

function checkPost(file) {
  const filePath = path.join(POSTS_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const results = { local: [], external: [], missing: [] };

  for (const pattern of IMAGE_PATTERNS) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(content)) !== null) {
      let url = match[1].trim();
      if (!url || !isImageUrl(url)) continue;

      if (url.startsWith('http') || url.startsWith('//')) {
        results.external.push(url);
      } else if (url.startsWith('/')) {
        // Check if file exists in src/assets structure
        // /i/something → src/assets/i/something
        // /assets/img/something → src/assets/img/something
        let localPath;
        if (url.startsWith('/i/')) {
          localPath = path.join(PUBLIC_DIR, 'assets', url);
        } else if (url.startsWith('/assets/')) {
          localPath = path.join(PUBLIC_DIR, url);
        } else {
          localPath = path.join(PUBLIC_DIR, 'assets', url);
        }

        if (fs.existsSync(localPath)) {
          results.local.push(url);
        } else {
          results.missing.push(url);
        }
      }
    }
  }

  return results;
}

// ── Run ──
const files = targetFile
  ? [targetFile]
  : fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

let totalMissing = 0;

for (const file of files) {
  const results = checkPost(file);

  if (MISSING_ONLY && results.missing.length === 0) continue;

  if (results.missing.length > 0 || (!MISSING_ONLY && (results.local.length > 0 || results.external.length > 0))) {
    console.log(`\n${file}:`);
    if (!MISSING_ONLY) {
      results.local.forEach(u => console.log(`  ✓ ${u}`));
      results.external.forEach(u => console.log(`  ⊘ ${u} (external)`));
    }
    results.missing.forEach(u => console.log(`  ✗ ${u} (MISSING)`));
    totalMissing += results.missing.length;
  }
}

if (totalMissing > 0) {
  console.log(`\n${totalMissing} missing local references.`);
} else if (MISSING_ONLY) {
  console.log('All local image references resolve correctly.');
}
