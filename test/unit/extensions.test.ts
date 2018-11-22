import 'mocha';
import sinon from 'sinon';

import '../../src/extensions/String';

const sandbox = sinon.createSandbox();

describe('String extension', () => {
    afterEach(() => {sandbox.restore();});

    describe('firstMatch', () => {
        afterEach(() => { sandbox.reset(); });

        it('if matches is undefined', () => {
            // arrange
            const input = '\d';
            const line = '2';
            sandbox.stub(String.prototype, 'match').returns(null);
            // act
            const result = input.firstMatch(line);
            // assert
            sandbox.assert.match(result, undefined);
        });
        it('if matches is exist', () => {
            // arrange
            const input = '\d';
            const line = '2';
            sandbox.stub(String.prototype, 'match').returns(['2', '2']);
            // act
            const result = input.firstMatch(line);
            // assert
            sandbox.assert.match(result, '2');
        });
    });

    describe('convert', () => {
        afterEach(() => { sandbox.reset(); });

        it('Boolean', () => {
            // arrange
            const input = 'false';
            // act
            const result = input.convert();
            // assert
            sandbox.assert.match(result, false);
        });
        it('Number', () => {
            // arrange
            const input = '1';
            // act
            const result = input.convert();
            // assert
            sandbox.assert.match(result, 1);
        });
        it('String', () => {
            // arrange
            const input = 'String';
            // act
            const result = input.convert();
            // assert
            sandbox.assert.match(result, input);
        });
    });
});
