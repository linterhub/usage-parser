import {Usage} from './../models/usage';
import {Group} from './../models/group';

import {config} from './../config';
import './../interface/String';

/**
 * The client factory with describe how to work with main data in Usage Parser
 */
class ClientFactory {
    constructor() {}

    /**
     * Split input by regExp from config and returns array of lines
     * @param input - input via string
     * @return {string[]} - The array of lines
     */
    static splitLine(input: string) {
        const linesArray = input.split(config.settings.line.breaker);
        const linesClear = linesArray.filter((x) => x !== '');
        return linesClear;
    }

    /**
     * Create groups from lines, where identity of group is regExp from config
     * @param linesClear - The array of lines
     * @return {Group[]} - The array of groups
     */
    static createGroups(linesClear: string[]) : Group[] {
        return linesClear.reduce((acum, line) => {
            const section = config.reg.section.firstMatch(line);

            if (section || !acum.length) {
                acum.push(Group.create(section || undefined));
            } else {
                acum[acum.length - 1].addLine(line);
            }
            return acum;
        }, Array<Group>());
    }

    /**
     * Create Usage object with groups and delimiter
     * @param {Group[]} groups - The array groups for usage
     * @param {string} [delimiter="undefined"] - The usage delimiter
     * @return {Usage | undefined} - The usage or undefined, if array groups is empty
     */
    static createUsage(groups: Group[], delimiter: string | undefined = undefined) : Usage | undefined {
        return groups.length ? Usage.create(groups, delimiter) : undefined;
    }
}

export {ClientFactory};
