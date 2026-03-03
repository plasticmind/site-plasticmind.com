/**
 * Build a nested structure of post counts by year and month for heatmap display
 *
 * @param {Array} posts - Array of post objects from Eleventy collection
 * @return {Object} { years: [2003..2026], months: [1..12], data: { "2023": { "3": 4, "7": 2 } } }
 */
module.exports = function(posts) {
    const MIN_YEAR = 2000; // Ignore posts with dates before 2000 (bad data from migration)
    const data = {};
    let minYear = Infinity;
    let maxYear = -Infinity;

    posts.forEach(post => {
        const date = new Date(post.data.date || post.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 1-indexed

        if (year < MIN_YEAR) return; // Skip bad dates

        if (year < minYear) minYear = year;
        if (year > maxYear) maxYear = year;

        if (!data[year]) data[year] = {};
        data[year][month] = (data[year][month] || 0) + 1;
    });

    // Build array of all years (only those with data, to avoid empty columns)
    const years = [];
    for (let y = minYear; y <= maxYear; y++) {
        years.push(y);
    }

    return {
        years: years,
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        data: data
    };
};
