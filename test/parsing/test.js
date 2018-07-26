const fs = require('fs');
const parser = require('./../../src/parser.js');
const testsData = require('./test.json');
const config = require('./../../src/template/configDefault.json');
const mocha = require('mocha');
const assert = require('assert');

const main = () => {
    testsData.tests.forEach((test) => {
        const doc = fs.readFileSync(test.$ref, 'utf8');
        mocha.it(`test ${test.description}`, () => {
            const result = JSON.stringify(parser(doc, config), '', '    ');
            const result1 = JSON.stringify(require(test.result), '', '    ');
            test.valid ? assert.equal(result, result1) :
                assert.notEqual(result, test.result);
        });
    });
};

module.exports = main;
