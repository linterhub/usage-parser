const sections = require('./sections/test.js');
const config = require('./config/test.js');
const mocha = require('mocha');

mocha.describe('Sections test', () => {
    sections();
});

mocha.describe('Config test', () => {
    config();
});
