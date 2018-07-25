const fs = require('fs');
const parser = require('./../../src/parser.js');
const chai = require('chai');
const testsData = require('./test.json');
const doc = fs.readFileSync('./test/sections/files/full.valid.txt', 'utf8');
const mocha = require('mocha');

const main = () => {
    testsData.tests.forEach((test) => {
        mocha.it(`test ${test.description}`, (done) => {
            runTest(test, done);
        });
    });
};

const runTest = (test, done) => {
    if (test.object === 'exception') {
        const config = require(test.$ref);
        const result = chai.expect(() => parser(doc, config));
        test.valid ? result.to.not.throw() : result.to.throw();
        done();
    }
};

module.exports = main;
