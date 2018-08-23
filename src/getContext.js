'use strict';

// Import internal config
const context = require('./template/context.js');

// Import functions
const util = require('./util.js');

/**
 * Parse whole documentation and fill context
 * @param {string} help - documentation of cli
 * @param {object} config - user config of parser
 * @return {object} context - internal config with parsed documentation
 */
const getContext = (help, config) => {
    try {
        context.options = [];
        context.delimiter = config.delimiter;
        Object.keys(context.section).forEach((sectionName) => {
            let contextSection = context.section[sectionName];
            let configSection = config.section[sectionName];
            let data = [];
            if (Array.isArray(configSection.names)) {
                for (let name of configSection.names) {
                    data = setSectionByNames(
                        name,
                        data,
                        help,
                        context,
                        configSection);
                }
            } else {
                data = setSectionByNames(
                    configSection.names,
                    data,
                    help,
                    context,
                    configSection);
            }
            if (data.length > 0) {
                data.forEach((object) =>
                    contextSection.func(object, context));
            } else if (configSection.parseWhole) {
                contextSection.func(help, context);
            } else if (contextSection.required) {
                throw new Error(`Required section ${sectionName} not found`);
            }
        });
        return context;
    } catch (error) {
        throw error;
    }
};

/**
 * Searches for sections matches regexp
 * @param {string} sectionName - name of section
 * @param {string} help - documentation of cli
 * @return {array} - found sections
 */
const findSections = (sectionName, help) => {
    let matches = util.getValuesByRegexpGlobally(help,
        context.regexp.section.search.start + sectionName +
        context.regexp.section.search.end);
    return matches ? matches.map((match) => match.trim()) : [];
};

/**
 * Searches for section by name, validate it and adds it to data
 * If no sections found - use postfixes
 * @param {string} name - name of section from user config
 * @param {array} data - data from context where all found sections are added
 * @param {string} help - documentation of cli
 * @param {object} context - internal config
 * @param {object} configSection - section from user configuration
 * @return {array} data - data from context where all found sections are added
 */
const setSectionByNames = (name, data, help, context, configSection) => {
    let sections = findSections(name, help);
    return validateSections(sections) ? data.concat(sections) :
        Array.isArray(configSection.postfix) ?
            setSectionWithPostfixArray(
                name, help, configSection, data) :
            setSectionWithPostfixSingle(
                name, help, configSection.postfix, data);
};

/**
 * Check if found section or array of sections contains text
 * @param {Array} sections - found sections
 * @return {Boolean} - is section or sections valid
 */
const validateSections = (sections) => {
    return sections.length > 0;
};

/**
 * Searches for section by name + all postfixes and
 * adds it to data [Postfix is array]
 * @param {string} name - name of section
 * @param {string} help - documentation of cli
 * @param {object} configSection - section from user configuration
 * @param {array} data - data from context where all found sections are added
 * @return {array} data - data from context where all found sections are added
 */
const setSectionWithPostfixArray =
    (name, help, configSection, data) => {
        for (let postfix of configSection.postfix) {
            let section = findSections(name + postfix, help);
            if (validateSections(section)) {
                data = data.concat(section);
            }
        }
        return data;
    };

/**
 * Searches for section by name + postfix and
 * adds it to data [Postfix is string]
 * @param {string} name - name of section
 * @param {string} help - documentation of cli
 * @param {object} postfix - postfix for name from user configuration
 * @param {array} data - data from context where all found sections are added
 * @return {array} data - data from context where all found sections are added
 */
const setSectionWithPostfixSingle = (name, help, postfix, data) => {
    let section = findSections(name + postfix, help);
    return validateSections(section) ? data.concat(section) : data;
};

// Export function
module.exports = getContext;
