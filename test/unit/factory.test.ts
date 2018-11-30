import 'mocha';
import sinon, { SinonStub } from 'sinon';

import {Group} from '../../src/models/group';
import {Section} from '../../src/models/section';
import {Command} from '../../src/models/command';
import {Argument} from '../../src/models/argument';
import {LineType} from '../../src/types/lineType';
import {LineParts} from './../../src/models/lineParts';
import {ClientFactory} from '../../src/factory/сlientFactory';

const sandbox = sinon.createSandbox();

describe('Client Factory', () => {
    const clientFactory = new ClientFactory();
    const groupInstanceStub = sandbox.createStubInstance(Group);
    const sectionInstanceStub = sandbox.createStubInstance(Section);
    const commandInstanceStub = sandbox.createStubInstance(Command);
    const argumentInstanceStub = sandbox.createStubInstance(Argument);
    const linePartsInstanceStub = sandbox.createStubInstance(LineParts);

    beforeEach(() => {
        sandbox.stub(Group, 'create').returns(groupInstanceStub);
        sandbox.stub(Section, 'create').returns(sectionInstanceStub);
        sandbox.stub(LineParts, 'create').returns(linePartsInstanceStub);
        sandbox.stub(Group.prototype, 'addLine').returns(groupInstanceStub);
        sandbox.stub(String.prototype, 'firstMatch').returns(undefined);
    });
    afterEach(() => { sandbox.restore(); });

    describe('Create Groups', () => {
        afterEach(() => {sandbox.reset();});

        it('Empty lines', () => {
            // arrange
            const lines = new Array<string>();
            // act
            const result = clientFactory.createGroups(lines);
            // assert
            sandbox.assert.match(result, []);
        });
        it('Lines exist', () => {
            // arrange
            const lines = ['', ''];
            // act
            const result = clientFactory.createGroups(lines);
            // assert
            sandbox.assert.match(result.length, 1);
        });
    });
    describe('Create Properties', () => {
        beforeEach(() => {
            sandbox.stub(Command, 'create').returns(commandInstanceStub);
            sandbox.stub(Argument, 'create').returns(argumentInstanceStub);
            sandbox.stub(String.prototype, 'unify').returns('');
        });
        afterEach(() => { sandbox.reset(); });

        it('Empty lines', () => {
            // arrange
            const lines = [linePartsInstanceStub];
            // act
            const result = clientFactory.createProperties(lines);
            // assert
            sandbox.assert.match(result, []);
        });
        it('Command', () => {
            // arrange
            linePartsInstanceStub.type = LineType.command;
            const lines = [linePartsInstanceStub];
            // act
            const result = clientFactory.createProperties(lines);
            // assert
            sandbox.assert.match(result, [commandInstanceStub]);
        });
        it('Argument', () => {
            // arrange
            linePartsInstanceStub.type = LineType.argument;
            const lines = [linePartsInstanceStub];
            // act
            const result = clientFactory.createProperties(lines);
            // assert
            sandbox.assert.match(result, [argumentInstanceStub]);
        });
    });
    describe('Create Sections', () => {
        beforeEach(() => {
            sandbox.stub(clientFactory, 'createExamples').returns(undefined);
            sandbox.stub(clientFactory, 'createProperties').returns([argumentInstanceStub]);
        });
        afterEach(() => {sandbox.reset();});

        it('Empty Groups', () => {
            // arrange
            const groups = Array<Group>();
            // act
            const result = clientFactory.createSections(groups);
            // assert
            sandbox.assert.match(result, []);
        });
        it('Exists Groups', () => {
            // arrange
            groupInstanceStub.lines = [linePartsInstanceStub];
            argumentInstanceStub.longName = '-s';
            // act
            const result = clientFactory.createSections([groupInstanceStub]);
            sectionInstanceStub.name = undefined;
            sectionInstanceStub.properties = [argumentInstanceStub];
            // assert
            sandbox.assert.match(result, [sectionInstanceStub]);
        });
    });

    describe('Create Examples', () => {
        afterEach(() => {sandbox.reset();});

        it('Empty Examples', () => {
            // arrange
            groupInstanceStub.lines = [];
            // act
            clientFactory.createExamples(groupInstanceStub);
            // assert
            sandbox.assert.match(clientFactory.examples, []);
        });
        it('Exist Examples', () => {
            // arrange
            linePartsInstanceStub.right = 'text';
            groupInstanceStub.lines = [linePartsInstanceStub];
            // act
            clientFactory.createExamples(groupInstanceStub);
            // assert
            sandbox.assert.match(clientFactory.examples, ["text"]);
        });

    });
    describe('Create Usage', () => {
        afterEach(() => {sandbox.reset();});

        it('Empty Sections', () => {
            // arrange
            const sections = new Array<Section>();
            // act
            const result = clientFactory.createUsage(sections);
            // assert
            sandbox.assert.match(result, undefined);
        });
        it('Exist Sections', () => {
            // arrange
            const sections = [sectionInstanceStub];
            // act
            const result = clientFactory.createUsage(sections);
            // assert
            sandbox.assert.match(result!.sections, sections);
        });
    });
});
