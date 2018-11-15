import { Section } from './section';

/**
 * The Usage is a Object which contains Section of doc
 */
export class Usage {

    /**
     * Array of Section object
     * @type {Section[]}
     */
    sections: Section[];

    /**
     * Global delimiter of usage's doc
     * @type {?string | undefined}
     */
    delimiter?: string | undefined;

    /**
     * @constructor
     * @param {Section[]} sections - The array of Sections
     * @param {string | undefined} delimiter - The delimiter of usage
     */
    constructor(sections: Section[], delimiter: string | undefined) {
        this.delimiter = delimiter;
        this.sections = sections;
    }

    /**
     * Create The Usage class
     * @param {Section[]} sections - The array of Sections
     * @param {string | undefined} [delimiter="undefined"] - The delimiter of usage, default is `undefined`
     * @return {Usage} - The Usage
     */
    static create(sections: Section[], delimiter: string | undefined = undefined) : Usage {
        return new Usage(sections, delimiter);
    }
}
