import { UsageProperty } from "./UsageProperty";

export interface SectionInterface {
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
}
