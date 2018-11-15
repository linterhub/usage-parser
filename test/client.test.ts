import 'mocha';
import sinon from 'sinon';

import { Group } from '../src/models/group';
import { Usage } from './../src/models/usage';
import { Client } from './../src/client';
import { Section } from '../src/models/section';
import { ClientFactory } from './../src/factory/ClientFactory';

const sandbox = sinon.createSandbox();

describe('Client', () => {
    const groupInstanceStub = sandbox.createStubInstance(Group);
    const usageInstanceStub = sandbox.createStubInstance(Usage);
    const sectionInstanceStub = sandbox.createStubInstance(Section);
    beforeEach(() => {
        sandbox.stub(ClientFactory, 'splitLine').returns(['']);
        sandbox.stub(ClientFactory, 'createGroups').returns([groupInstanceStub]);
        sandbox.stub(ClientFactory, 'createUsage').returns(usageInstanceStub);
        sandbox.stub(ClientFactory, 'createSections').returns([sectionInstanceStub]);
        sandbox.stub(String.prototype, 'firstMatch').returns(undefined);
    });
    afterEach(() => { sandbox.reset(); });
    after(() => { sandbox.restore(); });

    it('Parse', () => {
        // arrange
        const client = new Client('');
        // act
        const result = client.parse();
        // assert
        sandbox.assert.match(result, usageInstanceStub);
    });
});
