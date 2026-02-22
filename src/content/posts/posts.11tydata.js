const slugify = require('@sindresorhus/slugify');
const todaysDate = new Date();

function showDraft(data) {
    const isDraft = 'draft' in data && data.draft !== false;
    const isFutureDate = data.page.date > todaysDate;
    return (!isDraft && !isFutureDate);
}

module.exports = () => {
    return {
        layout: 'layouts/post.njk',
        ogtype: 'article',
        "changefreq": "monthly",
        "priority": "0.8",
        eleventyComputed: {
            eleventyExcludeFromCollections: data => showDraft(data) ? data.eleventyExcludeFromCollections : true,
            permalink: data => {
                if (!showDraft(data)) return false;
                const slug = data.slug || (typeof data.title === 'string' ? slugify(data.title) : data.page.fileSlug);
                return `/journal/${slug}/`;
            },
        }
    }
}