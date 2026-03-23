# Asset Reference

## Structure

All post images live flat in `src/assets/i/` and are served at `/assets/i/` in the built site.

```
src/assets/i/
├── logos/              # Company logos for work page
├── jesse-profile.jpg   # Profile photos
├── jesse-gardner.jpg
└── (447 migrated post images, flat)
```

New post images go directly in `src/assets/i/filename.jpg` and are referenced as `/assets/i/filename.jpg`.

## Migration Status

- **447 images** migrated from WP assets dump → flat in `src/assets/i/`
- **156 posts** had URLs rewritten to local `/assets/i/` paths
- **1 filename collision** resolved with a prefix

### Missing Assets (55 references)

These reference folders not in the WP assets dump (`/images/`, `/weblog/`, `/photos/`, `/portfolio/`, `/img/`). Mostly very old posts. If those folders are recovered, re-run `scripts/asset-migrate.js --write`.

### External Image Hosts (182 references)

- **Flickr** (~140 refs) — still hosted
- **Skitch** (14 refs) — service defunct, images gone
- **Other** (~28 refs) — Google, Vox, NBC News, etc.

## Helper Scripts

```bash
# Check for broken image references
node scripts/asset-check.js --missing-only

# Check a specific post
node scripts/asset-check.js post-slug.md

# Search the WP dump for a file
find /tmp/plasticmind-com-assets -iname "*filename*" -type f

# Re-run migration (safe to run multiple times)
node scripts/asset-migrate.js          # dry run
node scripts/asset-migrate.js --write  # apply
```

## WP Assets Dump

Located at `/tmp/plasticmind-com-assets/`. Key folders:

| Folder | Files | Size |
|--------|-------|------|
| `wp-content/uploads/` | ~3,920 | ~890 MB |
| `i/` | 466 | 6 MB |
| `assets/` | 877 | 114 MB |
