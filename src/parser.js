'use strict';

const handle = require('./handle.js');
const templatizer = require('./templatizer.js');
const validate = require('./configValidation.js');

const parser = (help, config) => {
    config = validate(config);
    const context = handle(help, config);
    return templatizer(context, config);
};

module.exports = parser;
