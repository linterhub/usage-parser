import 'mocha';
import sinon from 'sinon';

import {Group} from '../../src/models/group';
import {Argument} from '../../src/models/argument';
import {LineType} from '../../src/types/lineType';
import {LineParts} from '../../src/models/lineParts';
import {ArgumentType} from '../../src/types/argumentType';
import {ArgumentTypes} from '../../src/models/argumentTypes';

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
    describe('Line Parts', () => {
        let lineParts : LineParts;
        beforeEach(() => {
            lineParts = sandbox.createStubInstance(LineParts);
        });
        afterEach(() => { sandbox.reset(); });
        after(() => { sandbox.restore(); });

        it('argument', () => {
            // arrange
            const line = '-s  Description';
            lineParts.left = '-s';
            lineParts.right = 'Description';
            lineParts.type = LineType.argument;
            // act
            const result = LineParts.create(line);
            // assert
            sandbox.assert.match(result, lineParts);
        });
        it('command', () => {
            // arrange
            const line = 'command  Description';
            lineParts.left = 'command';
            lineParts.right = 'Description';
            lineParts.type = LineType.command;
            // act
            const result = LineParts.create(line);
            // assert
            sandbox.assert.match(result, lineParts);
        });

        it('update', () => {
            // arange
            const arrangeLineParts = LineParts.create('');
            // act
            const result = arrangeLineParts.update(lineParts);
            // assert
            sandbox.assert.match(result, lineParts);
        });
    });

    describe('Group', () => {
        let lineParts : LineParts;

        beforeEach(() => {
            lineParts = sandbox.createStubInstance(LineParts);
            sinon.stub(LineParts, 'create').returns(lineParts);
        });
        afterEach(() => { sandbox.reset(); });
        after(() => { sandbox.restore(); });

        it('line consist a lot of parts', () => {
            // arrange
            const lines = [
                '-a  Description',
                'Description part 2'
            ];
            lineParts.left = '-a';
            lineParts.right = 'Description  Description part 2';
            lineParts.type = LineType.argument;

            // act
            const group =  Group.create();
            lines.forEach((line) => group.addLine(line));
            // assert
            sandbox.assert.match(group.lines[0], lineParts);
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
                sandbox.assert.match(result, undefined);
            });
            it('Type is boolean', () => {
                // arrange
                argument.type = ArgumentType.boolean;
                // act
                const result = argument._isValue();
                // assert
                sandbox.assert.match(result, undefined);
            });
            it('Another type', () => {
                // arrange
                argument.type = ArgumentType.number;
                // act
                const result = argument._isValue();
                // assert
                sandbox.assert.match(result, true);
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
