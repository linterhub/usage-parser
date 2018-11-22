import 'mocha';
import sinon, { SinonStub } from 'sinon';

import { Group } from '../../src/models/group';
import { Section } from '../../src/models/section';
import { Argument } from '../../src/models/argument';
import { ClientFactory } from '../../src/factory/ClientFactory';

const sandbox = sinon.createSandbox();

describe('Client Factory', () => {
    const groupInstanceStub = sandbox.createStubInstance(Group);
    const sectionInstanceStub = sandbox.createStubInstance(Section);
    const argumentInstanceStub = sandbox.createStubInstance(Argument);

    beforeEach(() => {
        sandbox.stub(Group, 'create').returns(groupInstanceStub);
        sandbox.stub(Section, 'create').returns(sectionInstanceStub);
        sandbox.stub(Argument, 'create').returns(argumentInstanceStub);
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
            const result = ClientFactory.createGroups(lines);
            // assert
            sandbox.assert.match(result, []);
        });
        it('Lines exist', () => {
            // arrange
            const lines = ['', ''];
            // act
            const result = ClientFactory.createGroups(lines);
            // assert
            sandbox.assert.match(result.length, 1);
        });
    });
    describe('Create Arguments', () => {
        let trimEnd : SinonStub;
        let unify : SinonStub;

        beforeEach(() => {
            trimEnd = sandbox.stub(String.prototype, 'trimEnd');
            unify = sandbox.stub(String.prototype, 'unify');
        });
        afterEach(() => {sandbox.reset();});

        it('Empty lines', () => {
            // arrange
            const line = '';
            const lines = [line];
            trimEnd.returns(line);
            unify.returns(line);
            // act
            const result = ClientFactory.createArguments(lines);
            // assert
            sandbox.assert.match(result, []);
        });
        it('Exists lines', () => {
            // arrange
            const line = '-s  Description';
            const lines = [line];
            trimEnd.returns(line);
            unify.returns(line);
            // act
            const result = ClientFactory.createArguments(lines);
            // assert
            sandbox.assert.match(result, [argumentInstanceStub]);
        });
    });
    describe('Create Sections', () => {
        afterEach(() => {sandbox.reset();});

        it('Empty Groups', () => {
            // arrange
            const groups = Array<Group>();
            // act
            const result = ClientFactory.createSections(groups);
            // assert
            sandbox.assert.match(result, []);
        });
        it('Exists Groups', () => {
            // arrange
            groupInstanceStub.lines = [''];
            argumentInstanceStub.longName = '-s';
            sandbox.stub(ClientFactory, 'createArguments').returns([argumentInstanceStub]);
            // act
            const result = ClientFactory.createSections([groupInstanceStub]);
            // assert
            sandbox.assert.match(result, [sectionInstanceStub]);
        });
    });
    describe('Create Usage', () => {
        afterEach(() => {sandbox.reset();});

        it('Empty Sections', () => {
            // arrange
            const sections = new Array<Section>();
            // act
            const result = ClientFactory.createUsage(sections);
            // assert
            sandbox.assert.match(result, undefined);
        });
        it('Exist Sections', () => {
            // arrange
            const sections = [sectionInstanceStub];
            // act
            const result = ClientFactory.createUsage(sections);
            // assert
            sandbox.assert.match(result!.sections, sections);
        });
    });
});
