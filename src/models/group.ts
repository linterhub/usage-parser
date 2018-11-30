import {LineType} from '../types/lineType';
import {LineParts} from './lineParts';

/**
 * The Group with name and array of lines
 */
export class Group {

    /**
     * The Name of group
     * @type {string | undefined}
     */
    name?: string | undefined;

    /**
     * The Array of lines
     * @type {string[]}
     */
    lines: LineParts[];

    /**
     * If the next line needs to add alone
     * @type {boolean}
     */
    nextIsProperty: boolean;

    /**
     * @constructor
     * @param {string | undefined } name - The name of group
     * @param {string[]} lines - The array of lines
     */
    constructor(name : string | undefined, lines: LineParts[]){
        this.name = name;
        this.lines = lines;
        this.nextIsProperty = true;
    }

    /**
     * Added line to Group. If it not contain argument, then join it with last line on the Group
     * @param {string} line - The Input line for add
     * @return {Group} - The current Group with added line
     */
    addLine(line: string) : Group {

        const linesParts = LineParts.create(line);
        const isEmptyLine = line === '';

        this.nextIsProperty = isEmptyLine || linesParts.type !== LineType.undefined || !this.lines.length;

        const readyLineParts = this.nextIsProperty ? linesParts : this.lines.pop()!.update(linesParts);

        this.lines.push(readyLineParts);
        this.nextIsProperty = isEmptyLine;
        return this;
    }

    /**
     * Create Group with name and array of lines
     * @param {string | undefined} [name="undefined"] - The name of group, default is `undefined`
     * @param {LineParts[]} [lines="[]"] - The array of lines, default is `[]`
     * @return {Group} - The Group
     */
    static create(name : string | undefined = undefined, lines: LineParts[] = []) : Group {
        return new Group(name, lines);
    }
}
