import { UsageInterface } from "./Usage";
import { UsageProperty } from "./UsageProperty";

export interface CommandInterface extends UsageProperty {
    /**
     * The command name
     * @type {string}
     */
    command: string | undefined;

    /**
     * The command description
     * @type {?string | undefined}
     */
    description?: string | undefined;

    /**
     * The commands usage
     * @type {?Usage | undefined}
     */
    usage?: UsageInterface | undefined;
}
