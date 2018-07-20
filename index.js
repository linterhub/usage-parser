'use strict';

const parser = require('./src/parser.js');
const configDefault = require('./src/template/configDefault.json');
const argv = require('yargs').argv;
const noDocsError = new Error('No documentation passed');

const docs = argv.docs ? argv.docs : '';
const config = argv.config ? argv.config : configDefault;


if (docs) {
    const result = parser(docs, config);
    console.log(result);
} else {
    throw noDocsError;
}
