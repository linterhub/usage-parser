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
        // act
        const group =  Group.create(undefined);
        lines.forEach((line) => group.addLine(line));
        // assert
        sandbox.assert.match(group.lines[0], '-a  Description  Description part 2');
    });
});
