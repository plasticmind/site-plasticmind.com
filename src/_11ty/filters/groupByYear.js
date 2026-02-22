/**
 * Group posts by year
 *
 * @param {Array} posts - Array of post objects
 * @return {Array} Array of { year, posts } objects sorted descending by year
 */
module.exports = function(posts) {
    const groups = {};

    posts.forEach(post => {
        const date = new Date(post.data.date || post.date);
        const year = date.getFullYear();

        if (!groups[year]) {
            groups[year] = [];
        }
        groups[year].push(post);
    });

    // Convert to array and sort descending by year
    return Object.keys(groups)
        .map(year => ({
            year: parseInt(year, 10),
            posts: groups[year]
        }))
        .sort((a, b) => b.year - a.year);
};
