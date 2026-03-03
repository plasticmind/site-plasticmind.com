const { DateTime } = require("luxon");

/**
 * Format dates to ISO
 *
 * @param {Date} date - JS date
 * @return {String} formatted date
 */

const dateISO = function(date) {
    const jsDate = new Date(date);
    const dt = DateTime.fromJSDate(jsDate);
    return dt.toISO();
};

/**
 * Format dates to readable
 *
 * @param {Date} date - JS date
 * @param {String} locale - locale code
 * @return {String} formatted date
 */

const dateFull = function(date, locale = "en") {
    const jsDate = new Date(date);
    const dt = DateTime.fromJSDate(jsDate);
    return dt.setLocale(locale).toLocaleString(DateTime.DATE_FULL);
};

/**
 * Format dates to readable w/ weekday
 *
 * @param {Date} date - JS date
 * @param {String} locale - locale code
 * @return {String} formatted date
 */

const dateFullWeekday = function(date, locale = "en") {
    const jsDate = new Date(date);
    const dt = DateTime.fromJSDate(jsDate);
    return dt.setLocale(locale).toLocaleString(DateTime.DATE_FULL_WITH_WEEKDAY);
};

/**
 * Get year from date
 *
 * @param {Date} date - JS date
 * @return {String} formatted year
 */

const dateYear = function(date) {
    const jsDate = new Date(date);
    const fullYear = jsDate.getFullYear();
    return fullYear;
}

/**
 * Format date for feeds
 *
 * @param {Date} date - JS date
 * @return {String} formatted year
 */

const dateFeed = function(date) {
    const jsDate = new Date(date);
    const dt = DateTime.fromJSDate(jsDate);
    return dt.toHTTP();
}

/**
 * Format date as short format (e.g., "01 Apr")
 *
 * @param {Date} date - JS date
 * @return {String} formatted date as "DD MMM"
 */

const dateShort = function(date) {
    const jsDate = new Date(date);
    const dt = DateTime.fromJSDate(jsDate);
    return dt.toFormat("dd LLL");
}

/**
 * Format work date from "YYYY-MM" to "MMM YYYY"
 *
 * @param {String} dateStr - Date string in YYYY-MM format
 * @return {String} formatted date as "MMM YYYY" or "Present" if null
 */

const dateWork = function(dateStr) {
    if (!dateStr) return "Present";
    const dt = DateTime.fromFormat(dateStr, "yyyy-MM");
    return dt.toFormat("LLL yyyy");
}

/**
 * Format date as medium format (e.g., "Jan 03, 2023")
 *
 * @param {Date} date - JS date
 * @return {String} formatted date as "MMM DD, YYYY"
 */

const dateMedium = function(date) {
    const jsDate = new Date(date);
    const dt = DateTime.fromJSDate(jsDate);
    return dt.toFormat("LLL dd, yyyy");
}

module.exports = { dateISO, dateFull, dateFullWeekday, dateFeed, dateYear, dateShort, dateWork, dateMedium };