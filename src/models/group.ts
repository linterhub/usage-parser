import {config} from './../config';

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
    lines: string[];

    /**
     * @constructor
     * @param {string | undefined } name - The name of group
     * @param {string[]} lines - The array of lines
     */
    constructor(name : string | undefined, lines: string[]){
        this.name = name;
        this.lines = lines;
    }

    /**
     * Added line to Group. If it not contain argument, then join it with last line on the Group
     * @param {string} line - The Input line for add
     * @return {Group} - The current Group with added line
     */
    addLine(line: string) : Group {
        const readyLine = line.includes(config.reg.arg.start) ?
            line : this.lines.pop() + config.settings.line.join + line;
        this.lines.push(readyLine);
        return this;
    }

    /**
     * Create Group with name and array of lines
     * @param {string | undefined} [name="undefined"] - The name of group, default is `undefined`
     * @param {string[]} [lines="[]"] - The array of lines, default is `[]`
     * @return {Group} - The Group
     */
    static create(name : string | undefined = undefined, lines: string[] = []) : Group {
        return new Group(name, lines);
    }
}
