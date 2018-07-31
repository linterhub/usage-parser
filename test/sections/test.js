const fs = require('fs');
const parser = require('./../../src/parser.js');
const chai = require('chai');
const testsData = require('./test.json');
const configDefault = require('./../../src/template/configDefault.json');
const mocha = require('mocha');

const main = () => {
    testsData.tests.forEach((test) => {
        mocha.it(`test ${test.description}`, (done) => {
            const config = test.config ? require(test.config) : configDefault;
            runTest(test, config, done);
        });
    });
};

const runTest = (test, config, done) => {
    const doc = fs.readFileSync(test.$ref, 'utf8');
    if (test.object === 'exception') {
        const result = chai.expect(() => parser(doc, config));
        test.valid ? result.to.not.throw() : result.to.throw();
        done();
    }
};

module.exports = main;
