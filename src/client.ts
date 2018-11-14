import {Usage} from './models/usage';
import {config} from './config';
import {ClientFactory} from './factory/ClientFactory';

import './extensions/String';

/**
 * The client for convert input string to Usage
 */
class Client {

    /**
     * The Input string
     * @type {string}
     */
    input: string;

    /**
     * @constructor
     * @param {string}  input - The input string for convert
     */
    constructor(input: string){
        this.input = input;
    }


    /**
     * Try to convert input string to Usage
     * @return {Usage} - The Usage with sections and arguments
     */
    parse() : Usage | undefined {
        const lines = ClientFactory.splitLine(this.input);
        const groups = ClientFactory.createGroups(lines);

        const delimiter = config.reg.delimiter.firstMatch(this.input);
        const usage = ClientFactory.createUsage(groups, delimiter);
        return usage;
    }
}

export {Client};
