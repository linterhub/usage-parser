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
    lines: string[];

    /**
     * @constructor
     * @param {string | undefined} name - The name of section
     * @param {string[]} lines - The array of arguments
     */
    constructor(name: string | undefined, lines: string[]) {
        this.name = name;
        this.lines = lines;
    }

    /**
     * Create the section with arguments of usage's doc
     * @param {string | undefined} [name="undefined"] - The name of section, default is `undefined`
     * @param {string[]} [lines="[]"] - The array of lines, default is `[]`
     * @return {Section} - The Section
     */
    static create(name: string | undefined = undefined, lines: string[] = []) : Section {
        return new Section(name, lines);
    }
}
