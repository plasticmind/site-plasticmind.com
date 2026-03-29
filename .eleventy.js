/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */

// plugins
const eleventyPluginNavigation = require("@11ty/eleventy-navigation");
const eleventyPluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const timeToRead = require('eleventy-plugin-time-to-read');
const markdownIt = require("markdown-it");

// filters
const limit = require("./src/_11ty/filters/limit.js");
const { dateISO, dateFull, dateFullWeekday, dateFeed, dateYear, dateShort, dateWork, dateMedium } = require("./src/_11ty/filters/date.js");
const shuffle = require("./src/_11ty/filters/shuffle.js");
const groupByYear = require("./src/_11ty/filters/groupByYear.js");
const slugify = require("./src/_11ty/filters/slugify.js");
const relatedPosts = require("./src/_11ty/filters/relatedPosts.js");
const postsByMonthYear = require("./src/_11ty/filters/postsByMonthYear.js");

// collections
const posts = require("./src/_11ty/collections/posts.js");
const tagList = require("./src/_11ty/collections/tagList.js");
const categoryList = require("./src/_11ty/collections/categoryList.js");

module.exports = (eleventyConfig) => {

    // filters
    eleventyConfig.addFilter("dateISO", dateISO);
    eleventyConfig.addFilter("dateFull", dateFull);
    eleventyConfig.addFilter("dateFullWeekday", dateFullWeekday);
    eleventyConfig.addFilter("dateFeed", dateFeed);
    eleventyConfig.addFilter("dateYear", dateYear);
    eleventyConfig.addFilter("dateShort", dateShort);
    eleventyConfig.addFilter("dateWork", dateWork);
    eleventyConfig.addFilter("dateMedium", dateMedium);
    eleventyConfig.addFilter("groupByYear", groupByYear);
    eleventyConfig.addFilter("slugify", slugify);
    eleventyConfig.addFilter("limit", limit);
    eleventyConfig.addFilter("shuffle", shuffle);
    eleventyConfig.addFilter("relatedPosts", relatedPosts);
    eleventyConfig.addFilter("postsByMonthYear", postsByMonthYear);

    // collections
    eleventyConfig.addCollection("posts", posts);
    eleventyConfig.addCollection("tagList", tagList);
    eleventyConfig.addCollection("categoryList", categoryList);

    // plugins
    eleventyConfig.addPlugin(eleventyPluginNavigation);
    eleventyConfig.addPlugin(eleventyPluginRss);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(timeToRead, {
        style: 'short'
    });

    // markdown-it with smart quotes / typographer
    const md = markdownIt({
        html: true,
        typographer: true
    });
    eleventyConfig.setLibrary("md", md);

    // smartquotes filter for frontmatter strings (titles, subtitles, etc.)
    eleventyConfig.addFilter("smartquotes", (text) => {
        if (!text) return text;
        return text
            .replace(/"(\s)/g, '\u201D$1')       // closing double quote before space
            .replace(/(\s)"/g, '$1\u201C')        // opening double quote after space
            .replace(/^"/g, '\u201C')             // opening double quote at start
            .replace(/"$/g, '\u201D')             // closing double quote at end
            .replace(/"([.,;:!?)\]])/g, '\u201D$1') // closing before punctuation
            .replace(/(\w)"/g, '$1\u201D')        // closing after word char
            .replace(/"(\w)/g, '\u201C$1')        // opening before word char
            .replace(/'(\s)/g, '\u2019$1')        // closing single quote
            .replace(/(\s)'/g, '$1\u2018')        // opening single quote after space
            .replace(/^'/g, '\u2018')             // opening single quote at start
            .replace(/'$/g, '\u2019')             // closing single quote at end
            .replace(/(\w)'/g, '$1\u2019')        // apostrophe / closing after word
            .replace(/'(\w)/g, '\u2018$1')        // opening before word char
            .replace(/--/g, '\u2014')             // em dash
            .replace(/\.\.\./g, '\u2026');        // ellipsis
    });

    // passthrough copy
    eleventyConfig.addPassthroughCopy({ "./src/static/": "/" });
    eleventyConfig.addPassthroughCopy("./src/assets/img/"); // Theme images
    eleventyConfig.addPassthroughCopy("./src/assets/i/"); // Post-related images
    eleventyConfig.addPassthroughCopy("./src/assets/fonts/");
    eleventyConfig.addPassthroughCopy("./src/assets/css/");
    eleventyConfig.addPassthroughCopy("./src/assets/js/");
    eleventyConfig.addPassthroughCopy("./src/robots.txt");
    eleventyConfig.addPassthroughCopy("./src/_redirects"); // Cloudflare Pages redirects

    // base config
    return {
        dir: {
            input: "src",
            output: "public",
            includes: "_includes",
            data: "_data"
        },
        templateFormats: ["njk", "md"],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    };
};