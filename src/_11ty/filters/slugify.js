/**
 * Convert a string to a URL-friendly slug
 *
 * @param {String} str - String to slugify
 * @return {String} URL-safe slug
 */
module.exports = function(str) {
    if (!str) return '';
    return str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};
