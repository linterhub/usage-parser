import 'mocha';
import fs from 'fs';
import path from 'path';
import {assert} from 'chai';
import UsageParser from '../../index';

const inputs = 'inputs/';
const results = 'results/';
const testFolder = './test/integration/';

describe('Integration', () => {
    it('Empty', () => {
        const input = fs.readFileSync(path.join(testFolder, inputs, 'arguments.absent.valid.txt')).toString();
        const actual = new UsageParser(input).parse();

        assert.deepEqual(actual, undefined);
    });
    it('With Sections', () => {
        const input = fs.readFileSync(path.join(testFolder, inputs, 'sections.exist.valid.txt')).toString();
        const answer = fs.readFileSync(path.join(testFolder, results, 'sections.exist.valid.json')).toString();

        const result = new UsageParser(input).parse();
        const actual = JSON.parse(JSON.stringify(result, null, 4));
        const expected = JSON.parse(answer);

        assert.deepEqual(actual, expected);
    });
    it('Without sections', () => {
        const input = fs.readFileSync(path.join(testFolder, inputs, 'sections.absent.valid.txt')).toString();
        const answer = fs.readFileSync(path.join(testFolder, results, 'sections.absent.valid.json')).toString();

        const result = new UsageParser(input.toString()).parse();
        const actual = JSON.parse(JSON.stringify(result, null, 4));
        const expected = JSON.parse(answer);

        assert.deepEqual(actual, expected);
    });
    it('Commands', () => {
        const input = fs.readFileSync(path.join(testFolder, inputs, 'commands.exist.valid.txt')).toString();
        const answer = fs.readFileSync(path.join(testFolder, results, 'commands.exist.valid.json')).toString();

        const result = new UsageParser(input.toString()).parse();
        const actual = JSON.parse(JSON.stringify(result, null, 4));
        const expected = JSON.parse(answer);

        assert.deepEqual(actual, expected);
    });
});
