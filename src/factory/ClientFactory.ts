import {Usage} from './../models/usage';
import {Group} from './../models/group';
import {Section} from './../models/section';
import {Argument} from './../models/argument';

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
        }, new Array<Group>());
    }

    /**
     * Create Arguments from the lines. Each of line is splitting to 2 parts before create Argument
     * @param {string[]} lines - The lines which contains argument and description
     * @return {Argument[]} - The array of arguments with properties
     */
    static createArguments = (lines: string[]) : Argument[]  => {
        return lines.reduce((acum, line) => {
            const cleanLine = line.trimEnd(config.settings.trimEnd);
            const parts = cleanLine
                .split(config.reg.tabulation)
                .filter((x: string) => x !== '');
            if (!parts.length) { return acum; }
            const argsLine = parts[0].includes(config.reg.arg.start) ? parts.shift() : undefined;
            const descLine = parts.join(config.settings.line.join).unify();
            const arg = Argument.create(argsLine, descLine);
            acum.push(arg);
            return acum;
        }, new Array<Argument>());
    }

    /**
     * Create sections from groups
     * @param groupsArray - The array of groups
     * @return {Section[]} - The array of sections
     */
    static createSections (groupsArray: Group[]) : Section[] {
        return groupsArray.reduce((acum, group) => {
            const argsArray = ClientFactory.createArguments(group.lines);
            const argsClear = argsArray.filter((arg) =>
                !(arg.longName === undefined && arg.shortName === undefined));
            if (argsClear.length) {
                const section =  Section.create(group.name, argsClear);
                acum.push(section);
            }
            return acum;
        }, new Array<Section>());
    }


    /**
     * Create Usage object with sections and delimiter
     * @param {Section[]} sectionsArray - The array sections for usage
     * @param {string} [delimiter="undefined"] - The usage delimiter
     * @return {Usage | undefined} - The usage or undefined, if array groups is empty
     */
    static createUsage(sectionsArray: Section[], delimiter: string | undefined = undefined) : Usage | undefined {
        const ignoredSectionRegExp = new RegExp(config.settings.blackList.section.join('|'), 'i');
        const sectionsClear = sectionsArray.filter((item) => {
            // TODO: не получиться заблокировать `undefined`
            return item.name ? item.name.search(ignoredSectionRegExp) === -1 : true;
        });
        const usage = sectionsClear.length ? Usage.create(sectionsClear, delimiter) : undefined;
        return usage;
    }
}

export {ClientFactory};
