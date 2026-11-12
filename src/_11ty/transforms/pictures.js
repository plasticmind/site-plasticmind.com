const manifest = require("../image-manifest.json");

const SITE = /^https?:\/\/(www\.)?plasticmind\.com/i;
const BODY_SIZES = "(min-width: 800px) 768px, 100vw";

const attr = (tag, name) => {
    const match = tag.match(new RegExp(`\\s${name}\\s*=\\s*(["'])(.*?)\\1`, "is"));
    return match ? match[2] : null;
};

const addAttrs = (tag, attrs) =>
    tag.replace(/\s*\/?>$/, (end) => `${attrs.map(([k, v]) => ` ${k}="${v}"`).join("")}${end.includes("/") ? " />" : ">"}`);

/**
 * Serves post images as WebP. Wraps each <img> that has WebP copies (see
 * scripts/optimize-images.js) in a <picture>, and fills in width, height,
 * lazy loading, and async decoding. The first image on a page loads eagerly,
 * since it's often the largest thing on screen.
 */
module.exports = function pictures(content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) return content;

    let first = true;
    return content.replace(/<picture\b[\s\S]*?<\/picture>|<img\b[^>]*>/gi, (tag, offset) => {
        if (tag.startsWith("<picture")) {
            first = false;
            return tag;
        }
        const isFirst = first;
        first = false;

        const src = attr(tag, "src");
        if (!src) return tag;
        let key = src.replace(SITE, "");
        try {
            key = decodeURI(key);
        } catch (error) {
            // Leave malformed URLs alone.
        }
        const image = manifest[key];

        const extra = [];
        let width = attr(tag, "width");
        let height = attr(tag, "height");
        if (image) {
            if (!width && !height) {
                width = String(image.width);
                height = String(image.height);
                extra.push(["width", width], ["height", height]);
            } else if (width && !height && /^\d+$/.test(width)) {
                extra.push(["height", String(Math.round((width * image.height) / image.width))]);
            } else if (height && !width && /^\d+$/.test(height)) {
                extra.push(["width", String(Math.round((height * image.width) / image.height))]);
            }
        }
        if (!isFirst && !attr(tag, "loading")) extra.push(["loading", "lazy"]);
        if (!attr(tag, "decoding")) extra.push(["decoding", "async"]);
        const img = extra.length ? addAttrs(tag, extra) : tag;

        if (!image) return img;

        const before = content.slice(Math.max(0, offset - 120), offset);
        const fullBleed = before.includes("c-feature-image");
        const shown = Number(width);
        const sizes = fullBleed ? "100vw" : shown && shown < 768 ? `(min-width: ${shown}px) ${shown}px, 100vw` : BODY_SIZES;
        const srcset = image.small
            ? `${image.small} 800w, ${image.webp} ${image.webpWidth}w`
            : image.webp;
        const sizesAttr = image.small ? ` sizes="${sizes}"` : "";

        return `<picture><source type="image/webp" srcset="${srcset}"${sizesAttr}>${img}</picture>`;
    });
};
