import {Usage} from "./usage";
import { CommandInterface } from "../interface/Command";

/**
 * The command with name, description and usage, if they exist
 */
class Command implements CommandInterface  {

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
    usage?: Usage | undefined;

    /**
     * @constructor
     * @param {string} command - The command name
     * @param {string | undefined } descripton - The command description
     * @param {Usage | undefined} usage - The command usage
     */
    constructor(
        command: string | undefined,
        descripton: string | undefined,
        usage: Usage | undefined
    ) {
        this.command = command;
        this.usage = usage;
        this.description = descripton;
    }

    /**
     * Create Command object with name, description and usage
     * @param {string} command - The command name
     * @param {string | undefined } [descripton="undefined"] - The command description
     * @param {Usage | undefined} [usage="undefined"] - The command usage
     * @returns {Command} - The command object
     */
    static create(
        command: string | undefined,
        description: string | undefined = undefined,
        usage: Usage | undefined = undefined
    ) {
        return new Command(command, description, usage);
    }
}

export { Command };
