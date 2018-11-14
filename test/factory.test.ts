import mocha from 'mocha';
import sinon from 'sinon';

import { Group } from '../src/models/group';
import { ClientFactory } from './../src/factory/ClientFactory';

const sandbox = sinon.createSandbox();

describe('Client Factory', () => {
    const groupInstanceStub = sandbox.createStubInstance(Group);
    beforeEach(() => {
        sandbox.stub(Group, 'create').returns(groupInstanceStub);
        sandbox.stub(Group.prototype, 'addLine').returns(undefined);
        sandbox.stub(String.prototype, 'firstMatch').returns(undefined);
    });
    afterEach(() => { sandbox.restore(); });

    describe('Create Groups', () => {
        afterEach(() => {
            sandbox.reset();
        });
        it('Group name is exist', () => {
            // act
            const result = ClientFactory.createGroups(['', '']);

            // assert
            sandbox.assert.match(result.length, 1);
        });
    });
    describe('Create Usage', () => {
        afterEach(() => {
            sandbox.reset();
        });
        it('Empty Groups', () => {
            // act
            const result = ClientFactory.createUsage(new Array<Group>());

            // assert
            sandbox.assert.match(result, undefined);
        });
        it('Exist Groups', () => {
            // act
            const result = ClientFactory.createUsage([groupInstanceStub]);

            // assert
            sandbox.assert.match(result!.groups, [groupInstanceStub]);
        });
    });
});
