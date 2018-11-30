import {config} from './config';
import {Usage} from './models/usage';
import {ClientFactory} from './factory/сlientFactory';

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
        const clientFactory = new ClientFactory();
        const lines = clientFactory.splitLine(this.input);
        const groups = clientFactory.createGroups(lines);
        const sections = clientFactory.createSections(groups);

        const delimiter = config.reg.delimiter.firstMatch(this.input);
        const usage = clientFactory.createUsage(sections, delimiter);
        return usage;
    }
}

export {Client};
