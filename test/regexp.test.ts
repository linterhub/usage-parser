import 'mocha';
import sinon from 'sinon';

import './../src/extensions/String';
import { config } from './../src/config';

const sandbox = sinon.createSandbox();

describe('RegExp', () => {

    const runMatch = (line: string, regExp: string) => line.match(new RegExp(regExp, 'im'));
    const runSplit = (line: string, regExp: RegExp) => line.split(regExp).filter((x) => x !== '');
    const identity = sinon.match((value) => {
        return value ? true : false;
    }, 'Value must be exist');

    describe('Argument name', () => {
        it('start at', () => {
            const line = '-argument';
            const result = runMatch(line, config.reg.arg.start);
            sandbox.assert.match(result, identity);
        });
        it('long', () => {
            const line = '--long-arg';
            const result = runMatch(line, config.reg.arg.long);
            sandbox.assert.match(result, identity);
        });
        it('short', () => {
            const line = '-short';
            const result = runMatch(line, config.reg.arg.short);
            sandbox.assert.match(result, identity);
        });
        it('not case sensitive', () => {
            const longName = '--LOoNG-ArguMent';
            const shortName = '-shoOrt';

            const longArg = runMatch(longName, config.reg.arg.long);
            const shortArg = runMatch(shortName, config.reg.arg.short);

            sandbox.assert.match(longArg, identity);
            sandbox.assert.match(shortArg, identity);
        });
    });
    describe('Section', () => {
        it('one word', () => {
            const line = 'Section';
            const result = runMatch(line, config.reg.section);
            sandbox.assert.match(result, identity);
        });
        it('two words', () => {
            const line = ' Section name:';
            const result = runMatch(line, config.reg.section);
            sandbox.assert.match(result, identity);
        });
        it('three words', () => {
            const line = 'Long section name:';
            const result = runMatch(line, config.reg.section);
            sandbox.assert.match(result, identity);
        });
        it('four words', () => {
            const line = ' So long section name:';
            const result = runMatch(line, config.reg.section);
            sandbox.assert.match(result, identity);
        });
        it('not case sensitive', () => {
            const line = 'SeCtion NaMe:';
            const result = runMatch(line, config.reg.section);
            sandbox.assert.match(result, identity);
        });
    });
    describe('Delimiter', () => {
        it('sign', () => {
            const line = '-arg=value';
            const result = runMatch(line, config.reg.delimiter);
            sandbox.assert.match(result, identity);
        });
        it('space', () => {
            const line =  '-arg value';
            const result = runMatch(line, config.reg.delimiter);
            sandbox.assert.match(result, identity);
        });
    });
    describe('Tabulation', () => {
        it('tabulation', () => {
            const line =  'str \\t str';
            const result = runSplit(line, config.reg.tabulation);
            sandbox.assert.match(result.length, 2);
        });
        it('two spaces', () => {
            const line =  'str  str';
            const result = runSplit(line, config.reg.tabulation);

            sandbox.assert.match(result.length, 2);
        });
        it('two whitespace character', () => {
            const line =  'str \\s\\s str';
            const result = runSplit(line, config.reg.tabulation);
            sandbox.assert.match(result.length, 2);
        });
    });
    describe('Deprecated', () => {
        it('exist', () => {
            const line =  'Description of argument which is (deprecated>';
            const result = runMatch(line, config.reg.deprecated);
            sandbox.assert.match(result, identity);
        });
        it('not case sensitive', () => {
            const line =  'Description of argument which is *dEprEcAted]';
            const result = runMatch(line, config.reg.deprecated);
            sandbox.assert.match(result, identity);
        });
    });
    describe('Require', () => {
        it('exist', () => {
            const line =  '-arg required';
            const result = runMatch(line, config.reg.required);
            sandbox.assert.match(result, identity);
        });
        it('not case sensitive', () => {
            const line =  '-arg *ReQuIred]';
            const result = runMatch(line, config.reg.required);
            sandbox.assert.match(result, identity);
        });
    });
    describe('Enums', () => {
        describe('Separators', () => {
            it('space', () => {
                const line =  '<value1 value2>';
                const result = runSplit(line, config.reg.enums.split);
                sandbox.assert.match(result.length, 2);
            });
            it('or', () => {
                const line =  '<value1 or value2>';
                const result = runSplit(line, config.reg.enums.split);
                sandbox.assert.match(result.length, 2);
            });
            it('coma', () => {
                const line =  '<value1, value2>';
                const result = runSplit(line, config.reg.enums.split);
                sandbox.assert.match(result.length, 2);
            });
            it('vertical bar', () => {
                const line =  '<value1|value2>';
                const result = runSplit(line, config.reg.enums.split);
                sandbox.assert.match(result.length, 2);
            });
            it('full', () => {
                const line =  '<value1|value2 or value3, value4 value5>';
                const result = runSplit(line, config.reg.enums.split);
                sandbox.assert.match(result.length, 5);
            });
        });
        describe('Open and close tags', () => {
            it('brackets and parentheses', () => {
                const line =  '[value or value)';
                const result = runMatch(line, config.reg.enums.values);
                sandbox.assert.match(result, identity);
            });
            it('double and single quotes', () => {
                const line =  '"value or value>\'';
                const result = runMatch(line, config.reg.enums.values);
                sandbox.assert.match(result, identity);
            });
            it('less and greater than sign', () => {
                const line =  '<value or value>';
                const result = runMatch(line, config.reg.enums.values);
                sandbox.assert.match(result, identity);
            });
        });
    });
    describe('Default', () => {
        describe('Separator', () => {
            it('is', () => {
                const line =  'default is value';
                const result = runMatch(line, config.reg.default);
                sandbox.assert.match(result, identity);
            });
            it('to', () => {
                const line =  'default to value';
                const result = runMatch(line, config.reg.default);
                sandbox.assert.match(result, identity);
            });
            it('at', () => {
                const line =  'default at value';
                const result = runMatch(line, config.reg.default);
                sandbox.assert.match(result, identity);
            });
            it('colon', () => {
                const line =  'default: value';
                const result = runSplit(line, config.reg.enums.split);
                sandbox.assert.match(result, identity);
            });
            it('quotes', () => {
                const line =  'default "value\'';
                const result = runMatch(line, config.reg.default);
                sandbox.assert.match(result, identity);
            });
            it('without separator', () => {
                const line =  'default value';
                const result = runMatch(line, config.reg.default);
                sandbox.assert.match(result, identity);
            });
        });
        describe('Open and close chars', () => {
            it('brackets and parentheses', () => {
                const line =  '[default is value)';
                const result = runMatch(line, config.reg.default);
                sandbox.assert.match(result, identity);
            });
            it('without closing chars', () => {
                const line =  'default is value';
                const result = runMatch(line, config.reg.default);
                sandbox.assert.match(result, identity);
            });
        });
        describe('possible values', () => {
            it('default', () => {
                const line =  'default is value';
                const result = runMatch(line, config.reg.default);
                sandbox.assert.match(result, identity);
            });
            it('defaults', () => {
                const line =  'defaults is value';
                const result = runMatch(line, config.reg.default);
                sandbox.assert.match(result, identity);
            });
            it('not case sensitive', () => {
                const line =  'dEfAuLt is value';
                const result = runMatch(line, config.reg.default);
                sandbox.assert.match(result, identity);
            });
        });
    });
});
