import {config} from '../config';
import {LineType} from '../types/lineType';
import {Usage} from '../models/usage';
import {Group} from '../models/group';
import {Section} from '../models/section';
import {Command} from '../models/command';
import {Argument} from '../models/argument';
import {LineParts} from '../models/lineParts';
import {UsageProperty} from '../interface/UsageProperty';

import '../interface/String';

/**
 * The client factory with describe how to work with main data in Usage Parser
 */
class ClientFactory {

    /**
     * Examples of usage
     * @type {string[] | undefined}
     */
    examples: string[];

    constructor() {
        this.examples = [];
    }

    /**
     * Split input by regExp from config and returns array of lines
     * @param {string} input - input via string
     * @return {string[]} - The array of lines
     */
    splitLine(input: string) {
        const linesArray = input.split(config.settings.line.breaker);
        return linesArray;
    }

    /**
     * Create groups from lines, where identity of group is regExp from config
     * @param {string[]} linesClear - The array of lines
     * @return {Group[]} - The array of groups
     */
    createGroups(linesClear: string[]) : Group[] {
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
     * Create Usage properties from the lines. Each of line is splitting to 2 parts before create Argument
     * @param {string[]} lines - The lines which contains arguments, commands and description
     * @return {UsageProperty[]} - The array of properties
     */
    createProperties = (lines: LineParts[]) : UsageProperty[]  => {
        return lines.reduce((acum, line) => {
            const clearRight = line.right ? line.right.unify() : line.right;
            switch(line.type) {
                case LineType.command:
                    acum.push(Command.create(line.left, clearRight));
                    break;
                case LineType.argument:
                    acum.push(Argument.create(line.left, clearRight));
                    break;
                default:
                    break;
            }
            return acum;
        }, new Array<UsageProperty>());
    }


    /**
     * Create examples from group lines
     * @param group - The group from which need to create examples
     * @returns {void}
     */
    createExamples(group: Group) : void {
        this.examples = group.lines.reduce((acum, line) => {
            const examplesArray = line.fully.split(config.reg.tabulation);
            const examplesClear = examplesArray.filter((x: string) => x !== '');
            acum = acum.concat(examplesClear);
            return acum;
        }, this.examples);
    }

    /**
     * Create sections from groups
     * @param {Group[]} groupsArray - The array of groups
     * @return {Section[]} - The array of sections
     */
    createSections (groupsArray: Group[]) : Section[] {
        const exampleRegExp = new RegExp(config.settings.example.join('|'), 'i');
        return groupsArray.reduce((acum, group) => {

            if (group.name && group.name.search(exampleRegExp) !== -1) {
                this.createExamples(group);
                return acum;
            }

            const propertiesArray = this.createProperties(group.lines);
            const propertiesClear = propertiesArray.filter((property) => {
                return property instanceof Argument ?
                    !(property.longName === undefined && property.shortName === undefined) : true;
            });

            if (propertiesClear.length) {
                const section =  Section.create(group.name, propertiesClear);
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
    createUsage(sectionsArray: Section[], delimiter: string | undefined = undefined) : Usage | undefined {
        const ignoredSectionRegExp = new RegExp(config.settings.blackList.section.join('|'), 'i');
        const sectionsClear = sectionsArray.filter((item) => {
            return item.name ? item.name.search(ignoredSectionRegExp) === -1 : true;
        });

        const usageExamples = this.examples.length ? this.examples : undefined;
        const usage = sectionsClear.length ? Usage.create(sectionsClear, delimiter, usageExamples) : undefined;
        return usage;
    }
}

export {ClientFactory};
