import mocha from 'mocha';
import sinon from 'sinon';

import { Group } from '../src/models/group';
import { ClientFactory } from './../src/factory/ClientFactory';
import { Section } from '../src/models/section';

const sandbox = sinon.createSandbox();

describe('Client Factory', () => {
    const groupInstanceStub = sandbox.createStubInstance(Group);
    const sectionInstanceStub = sandbox.createStubInstance(Section);
    beforeEach(() => {
        sandbox.stub(Group, 'create').returns(groupInstanceStub);
        sandbox.stub(Section, 'create').returns(sectionInstanceStub);
        sandbox.stub(Group.prototype, 'addLine').returns(undefined);
        sandbox.stub(String.prototype, 'firstMatch').returns(undefined);
    });
    afterEach(() => { sandbox.restore(); });

    describe('Create Groups', () => {
        afterEach(() => { sandbox.reset(); });

        it('Group name is exist', () => {
            // arrange
            const clearLines = ['', ''];
            // act
            const result = ClientFactory.createGroups(clearLines);
            // assert
            sandbox.assert.match(result.length, 1);
        });
    });
    describe('Create Sections', () => {
        afterEach(() => { sandbox.reset(); });

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
            const groups = [groupInstanceStub];
            // act
            const result = ClientFactory.createSections(groups);
            // assert
            sandbox.assert.match(result, [sectionInstanceStub]);
        });
    });
    describe('Create Usage', () => {
        afterEach(() => { sandbox.reset(); });

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
