import mocha from 'mocha';
import sinon from 'sinon';

import './../src/extensions/String';

const sandbox = sinon.createSandbox();

describe('String extension', () => {
    describe('firstMatch', () => {
        afterEach(() => { sandbox.restore(); });

        it('if input line is undefined', () => {
            // arrange
            const input = '\d';

            // act
            const result = input.firstMatch(undefined);

            // assert
            sandbox.assert.match(result, undefined);
        });
        it('if matches is undefined', () => {
            // arrange
            const input = '\d';
            sandbox.stub(String.prototype, 'match').returns(undefined);

            // act
            const result = input.firstMatch('2');

            // assert
            sandbox.assert.match(result, undefined);
        });
        it('if matches is exist', () => {
            // arrange
            const input = '\d';
            sandbox.stub(String.prototype, 'match').returns(['2', '2']);

            // act
            const result = input.firstMatch('2');

            // assert
            sandbox.assert.match(result, '2');
        });
    });
});
