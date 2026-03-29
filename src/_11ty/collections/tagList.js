const slugify = require("../filters/slugify.js");

/**
 * Extract unique tags from all posts
 *
 * @param {Object} collection - Eleventy collection API
 * @return {Array} Array of { name, slug } objects sorted alphabetically
 */
module.exports = function(collection) {
    const tagSet = new Set();

    collection.getFilteredByGlob("./src/content/posts/*.md").forEach(post => {
        const tags = post.data.tags || [];
        tags.forEach(tag => {
            if (tag && tag.trim()) {
                tagSet.add(tag.trim());
            }
        });
    });

    return Array.from(tagSet)
        .map(name => ({
            name: name,
            slug: slugify(name)
        }))
        .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
};
