import { SectionInterface } from "./Section";

export interface UsageInterface {
    /**
     * Array of Section object
     * @type {Section[]}
     */
    sections: SectionInterface[];

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
}
