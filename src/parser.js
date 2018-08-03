'use strict';

const getContext = require('./getContext.js');
const templatizer = require('./templatizer.js');
const validate = require('./configValidation.js');
const configDefault = require('./template/configDefault.json');
const noDocsError = new Error('No documentation passed');

const parser = (doc, config) => {
    const configValidated = config ? validate(config) : configDefault;
    if (!doc) throw noDocsError;
    const context = getContext(doc, configValidated);
    return templatizer(context, configValidated);
};

module.exports = parser;
