import { Group } from './group';

/**
 * The Usage is a Object which contains Groups of doc
 */
export class Usage {

    /**
     * Array of Group object
     * @type {Group[]}
     */
    groups: Group[];

    /**
     * Global delimiter of usage's doc
     * @type {?string | undefined}
     */
    delimiter?: string | undefined;

    /**
     * @constructor
     * @param {Group[]} groups - The array of Groups
     * @param {string | undefined} delimiter - The delimiter of usage
     */
    constructor(groups: Group[], delimiter: string | undefined) {
        this.delimiter = delimiter;
        this.groups = groups;
    }

    /**
     * Create The Usage class
     * @param {Groups[]} groups - The array of Groups
     * @param {string | undefined} delimiter - The delimiter of usage
     * @return {Usage} - The Usage
     */
    static create(groups: Group[], delimiter: string | undefined) : Usage {
        return new Usage(groups, delimiter);
    }
}
