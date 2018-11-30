import {config} from '../config';
import {LineType} from '../types/lineType';

import '../interface/String';

/**
 * The line parts object. It includes left and right part of the string, also type of it
 */
export class LineParts {

    /**
     * The left part of string. It can contains value of argument, command name or undefined
     * @type {string}
     */
    left: string | undefined;

    /**
     * The right part of string. It can contains description of left part
     * @type {string}
     */
    right: string;

    /**
     * Type of string
     * @type {LineType}
     */
    type: LineType = LineType.undefined;

    /**
     * @constructor
     * @param {string | undefined} left - The left part of string. It can contains value of argument, command name or undefined
     * @param {string} right - The right part of string. It can contains description of left part
     * @param {LineType} type  - The type of string
     */
    constructor(left : string | undefined, right : string, type : LineType = LineType.undefined) {
        this.type = type;
        this.left = left;
        this.right = right;
    }

    /**
     * Get fully line. It consist of the left and the right part of line
     */
    get fully() {
        const thisLeftPart = this.left ? this.left + config.settings.line.join : '';
        return thisLeftPart + this.right;
    }

    /**
     * Update current parts of line. It updates only right part
     * @param lineParts - The lines parts object which need to add to current
     * @returns {LineParts} - This object
     */
    update(lineParts: LineParts) : LineParts {
        const thisRightPart = this.right ? this.right + config.settings.line.join : '';
        this.right = thisRightPart + lineParts.right;
        return this;
    }

    /**
     * Create line parts object from single line. It split input line and identity the type of it
     * @param line - The line which needs to split
     * @returns {LineParts} - The line parts object
     */
    static create(line:string) : LineParts {
        const cleanLine = line.trimEnd(config.settings.trimEnd);
        const parts = cleanLine
            .split(config.reg.tabulation)
            .filter((x: string) => x !== '');

        const isCommand = config.reg.command.firstMatch(parts[0]);
        const isArgument = config.reg.arg.start.firstMatch(parts[0]);
        const type = isCommand ? LineType.command : isArgument ? LineType.argument : LineType.undefined;
        const leftPart = type !== LineType.undefined ? parts.shift() : undefined;
        const rightPart = parts.join(config.settings.line.join);
        return new LineParts(leftPart, rightPart, type);
    }
}
