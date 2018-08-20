'use strict';

// Import functions
const getContext = require('./getContext.js');
const templatizer = require('./templatizer.js');
const validate = require('./configValidation.js');

// Import template
const configDefault = require('./template/configDefault.json');

// Create error if no docs passed
const noDocsError = new Error('No documentation passed');

/**
 * Do parsing of documentation and return JSON-Schema with result of parsing
 * @param {string} doc - documentation of cli
 * @param {object} config - user config of parser
 * @throws {error} - if no documentation passed
 * @return {object} context - internal config with parsed documentation
 */
const parser = (doc, config) => {
    const configValidated = config ? validate(config) : configDefault;
    if (!doc) throw noDocsError;
    const context = getContext(doc, configValidated);
    return templatizer(context, configValidated);
};

// Export function
module.exports = parser;
