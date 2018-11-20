import 'mocha';
import sinon from 'sinon';

import { Group } from '../src/models/group';
import { Argument } from '../src/models/argument';
import { ArgumentType } from '../src/types/argumentType';
import { ArgumentTypes } from '../src/models/argumentTypes';

const sandbox = sinon.createSandbox();

describe('Models', () => {
    afterEach(() => {sandbox.restore();});

    describe('Argument Types', () => {
        it('Identity Type', () => {
            // arrange
            const types = ArgumentTypes.create();
            const line = 'string';
            // act
            const result = types.indetifyType(line);
            // assert
            sandbox.assert.match(result, ArgumentType.string);
        });
    });
    describe('Group', () => {
        it('line consist a lot of parts', () => {
            // arrange
            const lines = [
                '-a  Description',
                'Description part 2'
            ];
            // act
            const group =  Group.create();
            lines.forEach((line) => group.addLine(line));
            // assert
            sandbox.assert.match(group.lines[0], '-a  Description  Description part 2');
        });
    });
    describe('Argument', () => {
        describe('Is Value', () => {
            const argument = sandbox.createStubInstance(Argument);
            afterEach(() => {sandbox.reset();});

            it('Type is undefined', () => {
                // arrange
                argument.type = ArgumentType.undefined;
                // act
                const result = argument._isValue();
                // assert
                sandbox.assert.match(result, true);
            });
            it('Type is boolean', () => {
                // arrange
                argument.type = ArgumentType.boolean;
                // act
                const result = argument._isValue();
                // assert
                sandbox.assert.match(result, true);
            });
            it('Another type', () => {
                // arrange
                argument.type = ArgumentType.number;
                // act
                const result = argument._isValue();
                // assert
                sandbox.assert.match(result, undefined);
            });
        });
        describe('Get Values', () => {
            const argument = sandbox.createStubInstance(Argument);
            afterEach(() => {sandbox.reset();});

            it('Values does not exist', () => {
                // arrange
                const descLine = undefined;
                const argsLine = 'Description';
                const firstMatchStub = sandbox.stub(String.prototype, 'firstMatch').returns(undefined);
                // act
                const result = argument._getValues(argsLine, descLine);
                // assert
                sandbox.assert.match(result, undefined);

                firstMatchStub.restore();
            });
            it('Values are exist', () => {
                // arrange
                const descLine = '[one or false]';
                const argsLine = undefined;
                const firstMatch = sandbox.stub(String.prototype, 'firstMatch').returns(descLine);
                // act
                const result = argument._getValues(argsLine, descLine);
                // assert
                sandbox.assert.match(result, ['one', 'false']);

                firstMatch.restore();
           });
        });
        describe('Get Type', () => {
            let argument = sandbox.createStubInstance(Argument);
            const arguemntTypes = sandbox.createStubInstance(ArgumentTypes);
            const argsLine = '';
            beforeEach(() => {
                sandbox.stub(ArgumentTypes, 'create').returns(arguemntTypes);
            });
            afterEach(() => {
                argument = sandbox.createStubInstance(Argument);
                sandbox.reset();
            });

            it('Argument has values', () => {
                // arrange
                argument.values = [];
                // act
                const result = argument._getType(argsLine);
                // assert
                sandbox.assert.match(result, ArgumentType.string);
            });
            it('Default value is exist', () => {
                // arrange
                argument.default = '2';
                const convertStub = sandbox.stub(String.prototype, 'convert').returns(2);
                const indetifyTypeStub = sandbox.stub(ArgumentTypes.prototype, 'indetifyType').returns(ArgumentType.number);
                // act
                const result = argument._getType(argsLine);
                // assert
                sandbox.assert.match(result, ArgumentType.number);

                convertStub.restore();
                indetifyTypeStub.restore();
            });
            it('Is Undefined', () => {
                // arrange
                const indetityTypeStub = sandbox.stub(ArgumentTypes.prototype, 'indetifyType').returns(ArgumentType.undefined);
                // act
                const result = argument._getType(argsLine);
                // assert
                sandbox.assert.match(result, ArgumentType.undefined);

                indetityTypeStub.restore();
            });
        });
    });
});
