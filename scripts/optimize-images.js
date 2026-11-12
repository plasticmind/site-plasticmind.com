/**
 * Makes WebP copies of the post images in src/assets/i and records each
 * image's size, so the "pictures" transform in .eleventy.js can serve WebP
 * with width and height set.
 *
 * Run it after adding images: node scripts/optimize-images.js
 * It skips images whose WebP copies are already newer than the original.
 *
 * For each photo.jpg (or .jpeg, .png) it writes:
 *   photo.webp        at most 1600px wide
 *   photo-800w.webp   800px wide, only when the original is wider than 800px
 * GIFs (which may be animated) and SVGs are left alone.
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const DIR = path.join(__dirname, "../src/assets/i");
const MANIFEST = path.join(__dirname, "../src/_11ty/image-manifest.json");
const MAX = 1600;
const SMALL = 800;

const isNewer = (output, input) =>
    fs.existsSync(output) && fs.statSync(output).mtimeMs >= fs.statSync(input).mtimeMs;

async function main() {
    const manifest = {};
    let made = 0;
    let before = 0;
    let after = 0;

    const files = fs.readdirSync(DIR).filter((name) => /\.(jpe?g|png)$/i.test(name)).sort();
    for (const name of files) {
        const input = path.join(DIR, name);
        const base = name.replace(/\.(jpe?g|png)$/i, "");
        const full = path.join(DIR, `${base}.webp`);
        const small = path.join(DIR, `${base}-${SMALL}w.webp`);

        let meta;
        try {
            meta = await sharp(input).rotate().metadata();
        } catch (error) {
            console.warn(`Skipped ${name}: ${error.message}`);
            continue;
        }
        // EXIF orientations 5-8 swap width and height.
        const turned = meta.orientation >= 5;
        const width = turned ? meta.height : meta.width;
        const height = turned ? meta.width : meta.height;
        const quality = /\.png$/i.test(name) ? 85 : 78;

        if (!isNewer(full, input)) {
            await sharp(input)
                .rotate()
                .resize({ width: MAX, withoutEnlargement: true })
                .webp({ quality, effort: 5 })
                .toFile(full);
            made++;
        }
        if (width > SMALL && !isNewer(small, input)) {
            await sharp(input)
                .rotate()
                .resize({ width: SMALL })
                .webp({ quality, effort: 5 })
                .toFile(small);
            made++;
        }

        const fullWidth = Math.min(width, MAX);
        before += fs.statSync(input).size;
        after += fs.statSync(full).size;
        manifest[`/assets/i/${name}`] = {
            width,
            height,
            webp: `/assets/i/${base}.webp`,
            webpWidth: fullWidth,
            ...(width > SMALL ? { small: `/assets/i/${base}-${SMALL}w.webp` } : {}),
        };
    }

    fs.writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 1)}\n`);
    console.log(
        `${files.length} images, ${made} WebP files written. ` +
            `Originals ${(before / 1e6).toFixed(1)} MB, full-size WebP ${(after / 1e6).toFixed(1)} MB.`
    );
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
