import {UsageProperty} from "../interface/UsageProperty";
import { SectionInterface } from "../interface/Section";

import '../interface/String';

/** The section with properties of usage's doc */
export class Section implements SectionInterface {

    /**
     * Name of section
     * @type {string | undefined}
     */
    name?: string | undefined;

    /**
     * Array of properties
     * @type {string[]}
     */
    properties: UsageProperty[];

    /**
     * @constructor
     * @param {string | undefined} name - The name of section
     * @param {UsageProperty[]} properties - The array of properties
     */
    constructor(name: string | undefined, properties: UsageProperty[]) {
        this.name = name;
        this.properties = properties;
    }

    /**
     * Create the section with properties of usage's doc
     * @param {string | undefined} [name="undefined"] - The name of section, default is `undefined`
     * @param {UsageProperty[]} [properties="[]"] - The array of lines, default is `[]`
     * @return {Section} - The Section
     */
    static create(name: string | undefined = undefined, properties: UsageProperty[] = []) : Section {
        return new Section(name !== undefined ? name.unify() : name, properties);
    }
}
