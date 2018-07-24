const sections = require('./sections/test.js');
const mocha = require('mocha');

mocha.describe('Sections test', () => {
    sections();
});

