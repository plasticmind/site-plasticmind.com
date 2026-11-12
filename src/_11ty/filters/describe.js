const fs = require("fs");

const cache = new Map();

/**
 * Turns a post's source file into a plain-text summary for meta
 * descriptions. Used when a post has no meta_description, excerpt, or
 * subtitle.
 *
 * @param {String} inputPath - The post's source path (page.inputPath)
 * @param {Number} max - Longest summary to return, in characters
 * @return {String} The opening of the post, cut at a word boundary
 */
module.exports = function describe(inputPath, max = 155) {
    if (!inputPath) return "";
    const key = `${inputPath}:${max}`;
    if (cache.has(key)) return cache.get(key);

    let text = "";
    try {
        text = fs.readFileSync(inputPath, "utf8");
    } catch (error) {
        return "";
    }

    text = text
        .replace(/^---[\s\S]*?\n---/, "") // frontmatter
        .replace(/{%[\s\S]*?%}|{{[\s\S]*?}}|{#[\s\S]*?#}/g, " ") // Nunjucks
        .replace(/<(script|style|figure|figcaption|pre|code)[\s\S]*?<\/\1>/gi, " ")
        .replace(/```[\s\S]*?```/g, " ") // fenced code
        .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // markdown images
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // markdown links
        .replace(/<[^>]+>/g, " ") // HTML tags
        .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, "") // block markers
        .replace(/[*_`~]+/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&[a-z]+;|&#\d+;/gi, " ")
        .replace(/\s+/g, " ")
        .trim();

    if (text.length > max) {
        const cut = text.slice(0, max - 1);
        const end = cut.lastIndexOf(" ");
        text = `${(end > max * 0.6 ? cut.slice(0, end) : cut).replace(/[\s,;:.–—-]+$/, "")}…`;
    }

    cache.set(key, text);
    return text;
};

/**
 * Finds the first local image in a post's source, for share cards on posts
 * without a featured_image_url.
 *
 * @param {String} inputPath - The post's source path (page.inputPath)
 * @return {String} The image path, or an empty string
 */
module.exports.firstImage = function firstImage(inputPath) {
    if (!inputPath) return "";
    let text = "";
    try {
        text = fs.readFileSync(inputPath, "utf8").replace(/^---[\s\S]*?\n---/, "");
    } catch (error) {
        return "";
    }
    const match =
        text.match(/!\[[^\]]*\]\((\/assets\/i\/[^)\s]+\.(?:jpe?g|png|webp))/i) ||
        text.match(/<img[^>]+src=["'](\/assets\/i\/[^"']+\.(?:jpe?g|png|webp))["']/i);
    return match ? match[1] : "";
};
