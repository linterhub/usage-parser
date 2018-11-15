import { Argument } from "./argument";

/** The section with arguments of usage's doc */
export class Section {

    /**
     * Name of section
     * @type {string | undefined}
     */
    name?: string | undefined;

    /**
     * Array of arguments
     * @type {string[]}
     */
    args: Argument[];

    /**
     * @constructor
     * @param {string | undefined} name - The name of section
     * @param {Argument[]} args - The array of arguments
     */
    constructor(name: string | undefined, args: Argument[]) {
        this.name = name;
        this.args = args;
    }

    /**
     * Create the section with arguments of usage's doc
     * @param {string | undefined} [name="undefined"] - The name of section, default is `undefined`
     * @param {Argument[]} [args="[]"] - The array of lines, default is `[]`
     * @return {Section} - The Section
     */
    static create(name: string | undefined = undefined, args: Argument[] = []) : Section {
        return new Section(name, args);
    }
}
