import { UsageProperty } from "./UsageProperty";
import { ArgumentType } from "../types/argumentType";

export interface ArgumentInterface extends UsageProperty {
    /**
     * The full name of the argument
     * @type {?string | undefined}
     */
    longName?: string | undefined;

    /**
     * The short name of the argument
     * @type {?string | undefined}
     */
    shortName?: string | undefined;

    /**
     * The description of the argument
     * @type {?string | undefined}
     */
    description? : string | undefined;

    /**
     * The type of argument
     * @type {ArgumentType | undefined}
     */
    type: ArgumentType | undefined;

    /**
     * The possible values of argument
     * @type {?string[] | undefined}
     */
    values?: string[] | undefined;

    /**
     * The default value of argument
     * @type {?string | undefined}
     */
    default?: string | undefined;

    /**
     * The argument is required
     * @type {?boolean | undefined}
     */
    required?: boolean | undefined;

    /**
     * The argument has value
     * @type {?boolean | undefined}
     */
    hasValue?: boolean | undefined;

    /**
     * The delimiter of argument
     * @type {?string | undefined}
     */
    delimiter?: string | undefined;

    /**
     * The argument has deprecated
     * @type {?boolean | undefined}
     */
    deprecated?: boolean | undefined;
}
