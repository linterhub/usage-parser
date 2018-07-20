'use strict';

const handle = require('./handle.js');
const templatizer = require('./templatizer.js');
const validate = require('./configValidation.js');

const parser = (help, config) => {
    config = validate(config);
    return templatizer(handle(help, config));
};

module.exports = parser;
