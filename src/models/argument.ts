import {config} from '../config';
import {ArgumentType} from '../types/argumentType';
import {ArgumentTypes} from './argumentTypes';
import { ArgumentInterface } from '../interface/Argument';

import '../extensions/String';

/** Argument object of usage's doc */
export class Argument implements ArgumentInterface {
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

    /**
     * @constructor
     * @param {string | undefined} argsLine - The line which include anything but description
     * @param {string } descLine - The line which include only description
     */
    constructor(argsLine: string | undefined, descLine: string | undefined) {
        this.longName = config.reg.arg.long.firstMatch(argsLine);
        this.shortName = config.reg.arg.short.firstMatch(argsLine);
        this.description = descLine;

        this.values = this._getValues(argsLine, descLine);
        this.default = config.reg.default.firstMatch(descLine);
        this.required = config.reg.required.firstMatch(argsLine) ? true : undefined;
        this.delimiter = config.reg.delimiter.firstMatch(argsLine);
        this.deprecated = config.reg.deprecated.firstMatch(descLine) ? true : undefined;

        this.type = this._getType(argsLine);
        this.hasValue = this._isValue();
    }


    /**
     * Check is argument is value by type of argument
     * @return {true | undefined} - If argument is value return `true`, else `undefined`
     */
    _isValue() : true | undefined {
        return (this.type !== ArgumentType.undefined && this.type !== ArgumentType.boolean)
            ? true : undefined;
    }

    /**
     * Try to identify ArgumentType from line, which include argument names
     * @param {string | undefined} argsLine - The line which include argument names
     * @return {ArgumentType} - The ArgumentType of argument
     */
    _getType(argsLine: string | undefined) : ArgumentType {
        if (this.values !== undefined) return ArgumentType.string;
        const argumentsTypes = ArgumentTypes.create();
        const typeOfArgument = argumentsTypes.indetifyType(this.default ? typeof this.default.convert() : argsLine);
        return typeOfArgument;
    }

    /**
     * Get values of arguments by origin string and return it in array strings
     * @param {string | undefined} argsLine - The string which contains argument names
     * @param {string} descLine - The string which contains only description of argument
     * @return {string[] | undefined} - The array strings or undefined. Undefined if values cannot identify
     */
    _getValues(argsLine: string | undefined, descLine: string | undefined) : string[] | undefined {
        const fullLine = (argsLine || '') + config.reg.tabulation + descLine;
        const valuesLine = config.reg.enums.values.firstMatch(fullLine);
        const valuesArray = valuesLine ? valuesLine
            .split(config.reg.enums.split)
            .filter((x) => x !== '') : undefined;
        return valuesArray && valuesArray.length ? valuesArray : undefined;
    }

    /**
     * Create Argument with properties
     * @param {string | undefined} argsLine - The line which include anything but description
     * @param {string} descLine - The line which include only description
     * @return {Argument} - The Argument
     */
    static create(argsLine: string | undefined, descLine: string | undefined) {
        return new Argument(argsLine, descLine);
    }
}
