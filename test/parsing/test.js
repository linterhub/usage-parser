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
            const parserResult =
                JSON.stringify(parser(doc, config), '', '    ');
            const requiredResult =
                JSON.stringify(require(test.result), '', '    ');
            test.valid ? assert.equal(parserResult, requiredResult) :
                assert.notEqual(parserResult, test.result);
        });
    });
};

module.exports = main;
