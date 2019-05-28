import {Section} from './section';
import { UsageInterface } from '../interface/Usage';

/**
 * The Usage is a Object which contains Section of doc
 */
export class Usage implements UsageInterface {

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
     * Examples of usage
     * @type {?string[] | undefined}
     */
    examples?: string[] | undefined;

    /**
     * @constructor
     * @param {Section[]} sections - The array of Sections
     * @param {string | undefined} delimiter - The delimiter of usage
     */
    constructor(
        sections: Section[],
        delimiter: string | undefined,
        examaples : string[] | undefined
    ) {
        this.delimiter = delimiter;
        this.sections = sections;
        this.examples = examaples;
    }

    /**
     * Create The Usage class
     * @param {Section[]} sections - The array of Sections
     * @param {string | undefined} [delimiter="undefined"] - The delimiter of usage, default is `undefined`
     * @return {Usage} - The Usage
     */
    static create(
        sections: Section[],
        delimiter: string | undefined = undefined,
        examples: string[] | undefined = undefined
    ) : Usage {
        const examaplesClear = examples ? examples.map((str) => str.trim()) : undefined;
        return new Usage(sections, delimiter, examaplesClear);
    }
}
