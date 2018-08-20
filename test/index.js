// Import tests data
const sections = require('./sections/test.json');
const config = require('./config/test.json');
const parsing = require('./parsing/test.json');

// Import npm package
const mocha = require('mocha');

// Import function
const test = require('./test.js');

// Run config tests
mocha.describe('Config test', () => test(config));

// Run sections tests
mocha.describe('Sections test', () => test(sections));

// Run parsing tests
mocha.describe('Parsing test', () => test(parsing));
