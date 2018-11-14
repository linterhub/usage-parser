import mocha from 'mocha';
import sinon from 'sinon';

import { Group } from './../src/models/group';

const sandbox = sinon.createSandbox();

describe('Group', () => {
    afterEach(() => { sandbox.restore(); });

    it('line consist a lot of parts', () => {
        // arrange
        const lines = [
            '-a  Description',
            'Description part 2'
        ];
        const addLineSpy = sandbox.spy(Group.prototype, 'addLine');
        const createSpy = sandbox.spy(Group, 'create');

        // act
        const group =  Group.create(undefined);
        lines.forEach((line) => group.addLine(line));

        // assert
        sandbox.assert.calledOnce(createSpy);
        sandbox.assert.calledTwice(addLineSpy);
        sandbox.assert.match(group.lines[0], '-a  Description  Description part 2');
    });
});
