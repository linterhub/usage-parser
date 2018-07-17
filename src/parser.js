'use strict';

const parser = (help) => {
    const handle = require('./handle.js');
    const templatizer = require('./templatizer.js');

    return templatizer(handle(help));
};

module.exports = parser;
