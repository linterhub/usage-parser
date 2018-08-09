// Import npm packages
const fs = require('fs');
const chai = require('chai');
const mocha = require('mocha');
const assert = require('assert');

// Import parser
const parser = require('./../src/parser.js');

// Import defaults
const docDefault = fs.readFileSync('./test/config/doc.txt', 'utf8');
const configDefault = require('./../src/template/configDefault.json');

/**
 * Run test
 * @param {array} testsData - data of tests (array of objects), include:
 * data of test [config, doc, result],
 * object of testing,
 * test validity [bool].
 */
const runTest = (testsData) => {
    testsData.tests.forEach((test) => {
        mocha.it(`${test.description}`, (done) => {
            const config = test.data.config ?
                require(test.data.config) : configDefault;
            const doc = test.data.doc ?
                fs.readFileSync(test.data.doc, 'utf8') : docDefault;

            switch (test.object) {
                case 'exception':
                    testException(test.valid, doc, config, done);
                    break;
                case 'result':
                    testResult(test.valid, doc, config, test.data.result, done);
                    break;
            }
        });
    });
};

/**
 * Check validity of tests for exeptions
 * @param {bool} valid - is test should be valid or not
 * @param {string} doc - documentation of cli
 * @param {object} config - user config
 * @param {function} done - returns if test passed without exceptions
 */
const testException = (valid, doc, config, done) => {
    const result = chai.expect(() => parser(doc, config));
    valid ? result.to.not.throw() : result.to.throw();
    done();
};

/**
 * Check validity of tests for parsing
 * @param {bool} valid - is test should be valid or not
 * @param {string} doc - documentation of cli
 * @param {object} config - user config
 * @param {string} result - path to result of test
 * @param {function} done - returns if test passed without exceptions
 */
const testResult = (valid, doc, config, result, done) => {
    const parserResult =
        JSON.stringify(parser(doc, config), '', '    ');
    const requiredResult =
        JSON.stringify(require(result), '', '    ');
    valid ? assert.equal(parserResult, requiredResult) :
        assert.notEqual(parserResult, result);
    done();
};

// Export function
module.exports = runTest;
