'use strict';

const parser = require('./src/parser.js');

const result = parser(process.argv[2]);
console.log(result);
