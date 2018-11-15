import { ArgumentType } from '../types/argumentType';
import { config } from './../config';

/**
 * The Argument Type class which include type and aliases, also method for indentify
 */
export class ArgumentTypes {

    /**
     * The Map which include type of argument and his aliases.
     */
    map: Map<ArgumentType, string[]>;

    /**
     * @constructor
     * @param {Map<ArgumentType, string[]} map - The Map which include type of argument and his aliases.
     */
    constructor(map : Map<ArgumentType, string[]>) {
        this.map = map;
    }

    /**
     * Try to find ArgumentType in the line, default is `ArgumentType.undefined`
     * @param line - The line in which need to find ArgumentType
     * @return {ArgumentType} - The ArgumentType which find in line
     */
    indetifyType(line: string | undefined) : ArgumentType {
        if (!line) { return ArgumentType.undefined; }
        for (const [key, value] of this.map) {
            if (value.some((item) => line.toLowerCase().includes(item))) {
                return key;
            }
        }
        return ArgumentType.undefined;
    }

    /**
     * Create Argument Type with map, which include type and aliases.
     * @param {Map<ArgumentType, string[]>} [map="undefined"] - The Map which include type of argument and his aliases.
     * If map is `undefined`, get map from config. Default is `undefined`
     * @return {ArgumentTypes} - The Argument Type class with map
     */
    static create(map: Map<ArgumentType, string[]> | undefined = undefined) : ArgumentTypes {
        const argumentTypesMap = new Map<ArgumentType, string[]>([
            [ArgumentType.string, config.types.string],
            [ArgumentType.number, config.types.number],
            [ArgumentType.boolean, config.types.boolean],
            [ArgumentType.array, config.types.array],
            [ArgumentType.object,config.types.object]
        ]);
        const argumentTypes = new ArgumentTypes(map || argumentTypesMap);
        return argumentTypes;
    }
}
