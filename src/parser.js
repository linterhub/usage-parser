'use strict';

const parser = (help, config) => {
    const handle = require('./handle.js');
    const templatizer = require('./templatizer.js');

    return templatizer(handle(help, config));
};

module.exports = parser;
