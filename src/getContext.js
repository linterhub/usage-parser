'use strict';

// Import internal config
const context = require('./template/context.js');

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
 * Search for all sections with given name in documentation and return it
 * @param {string} sectionName - name of section
 * @param {string} help - documentation of cli
 * @param {object} context - internal config
 * @return {array} - found sections
 */
const findSection = (sectionName, help, context) => {
    try {
        const regularExp = new RegExp(context.regexp.section.search.start +
            sectionName + context.regexp.section.search.end, 'gmi');
        const matches = help.match(regularExp);
        return matches ? matches.map((match) => match.trim()) : [];
    } catch (error) {
        throw error;
    }
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
    let section = findSection(name, help, context);
    return validateSection(section) ? data.concat(section) :
        Array.isArray(configSection.postfix) ?
            setSectionWithPostfixArray(
                name, help, context, configSection, data) :
            setSectionWithPostfixSingle(
                name, help, context, configSection.postfix, data);
};

/**
 * Check if found section contains text
 * @param {String} section - found section
 * @return {Boolean} - is section valid
 */
const validateSection = (section) => {
    return section.length > 0;
};

/**
 * Searches for section by name + all postfixes and
 * adds it to data [Postfix is array]
 * @param {string} name - name of section
 * @param {string} help - documentation of cli
 * @param {object} context - internal config
 * @param {object} configSection - section from user configuration
 * @param {array} data - data from context where all found sections are added
 * @return {array} data - data from context where all found sections are added
 */
const setSectionWithPostfixArray =
    (name, help, context, configSection, data) => {
        for (let postfix of configSection.postfix) {
            let section = findSection(name + postfix, help, context);
            if (validateSection(section)) {
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
 * @param {object} context - internal config
 * @param {object} postfix - postfix for name from user configuration
 * @param {array} data - data from context where all found sections are added
 * @return {array} data - data from context where all found sections are added
 */
const setSectionWithPostfixSingle = (name, help, context, postfix, data) => {
    let section = findSection(name + postfix, help, context);
    return validateSection(section) ? data.concat(section) : data;
};

// Export function
module.exports = getContext;
