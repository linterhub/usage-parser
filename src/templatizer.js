'use strict';

// Import module
const fs = require('fs');

// Import templates
const argumentsTemplate = JSON.parse(fs.readFileSync('./src/template/args.json'));
const optionTemplate = require('./template/option.json');

/**
 * Fill template schema with parsed arguments and return it
 * @param {object} context - internal config with parsed arguments
 * @param {object} config - user config
 * @return {object} - filled template schema with parsed arguments
 */
const templatizer = (context, config) => {
    argumentsTemplate.definitions.arguments.properties = {};
    let result = argumentsTemplate;
    const customPrefix = config.prefixes.custom;
    const nonFlagPrefix = config.prefixes.nonFlag;
    context.options.map((option) => {
        let optionSchema = Object.assign({}, optionTemplate);
        const argumentName = option.longName ? option.longName :
                (option.shortName ? option.shortName : '');
        switch (argumentName) {
            case '--version':
                optionSchema.id = customPrefix + 'version';
                optionSchema.type = 'null';
                break;
            case '--help':
                optionSchema.id = customPrefix + 'help';
                optionSchema.type = 'null';
                break;
            case '--config':
                optionSchema.id = customPrefix + 'config';
                break;
            case '--stdin':
                optionSchema.id = customPrefix + 'stdin';
                break;
            case '--stdin-filename':
            case '--stdin-filepath':
                optionSchema.id = customPrefix + 'filename';
                break;
            case '':
                optionSchema.id = customPrefix + 'path';
                option.description = 'Path to file or folder to analyze';
                break;
            default:
                option.longName =
                    option.longName ? option.longName : option.shortName;
                optionSchema.id = (!option.isFlag ? nonFlagPrefix : '')
                    + option.longName;
        }
        optionSchema.description = option.description;
        optionSchema.default = option.defaultValue ? option.defaultValue : null;
        result.definitions.arguments.properties[argumentName] = optionSchema;
    });

    result.delimiter = context.delimiter;
    return result;
};

// Export function
module.exports = templatizer;
