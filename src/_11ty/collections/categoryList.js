const slugify = require("../filters/slugify.js");

/**
 * Extract unique primary_category values from all posts
 *
 * @param {Object} collection - Eleventy collection API
 * @return {Array} Array of { name, slug } objects sorted alphabetically
 */
module.exports = function(collection) {
    const categorySet = new Set();

    collection.getFilteredByGlob("./src/content/posts/*.md").forEach(post => {
        const category = post.data.primary_category;
        if (category && category.trim()) {
            categorySet.add(category.trim());
        }
    });

    return Array.from(categorySet)
        .map(name => ({
            name: name,
            slug: slugify(name)
        }))
        .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
};
