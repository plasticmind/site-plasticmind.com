const slugify = require("../filters/slugify.js");

/**
 * Hub pages that opt out of collections.all (tags, categories, and the
 * section indexes) but still belong in the sitemap. Each hub's lastmod is
 * the date of the newest post it lists.
 *
 * @param {Object} collection - Eleventy collection API
 * @return {Array} Array of { url, lastmod, priority } objects
 */
module.exports = function(collection) {
    const posts = collection
        .getFilteredByGlob("./src/content/posts/*.md")
        .filter((post) => post.url && !post.data.noindex);

    const newest = (list) =>
        list.reduce((latest, post) => (post.date > latest ? post.date : latest), new Date(0));

    const hubs = [
        { url: "/work/", lastmod: null, priority: "0.9" },
        { url: "/journal/", lastmod: newest(posts), priority: "0.9" },
        { url: "/archives/", lastmod: newest(posts), priority: "0.6" },
    ];

    const tags = new Map();
    const categories = new Map();
    for (const post of posts) {
        for (const tag of post.data.tags || []) {
            if (!tag || !tag.trim()) continue;
            const slug = slugify(tag.trim());
            tags.set(slug, [...(tags.get(slug) || []), post]);
        }
        const category = (post.data.primary_category || "").trim();
        if (category) {
            const slug = slugify(category);
            categories.set(slug, [...(categories.get(slug) || []), post]);
        }
    }

    for (const [slug, list] of tags) {
        hubs.push({ url: `/tags/${slug}/`, lastmod: newest(list), priority: "0.6" });
    }
    for (const [slug, list] of categories) {
        hubs.push({ url: `/category/${slug}/`, lastmod: newest(list), priority: "0.5" });
    }

    return hubs;
};
