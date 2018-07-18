'use strict';

const templatizer = (context) => {
    const argumentsTemplate = require('./template/args.json');
    const optionTemplate = require('./template/option.json');

    let result = argumentsTemplate;
    context.options.map((option) => {
        let optionSchema = Object.assign({}, optionTemplate);
        const argumentName = option.longName;
        switch (argumentName) {
            case '--version':
                optionSchema.id = 'linterhub:version';
                optionSchema.type = 'null';
                break;
            case '--help':
                optionSchema.id = 'linterhub:help';
                optionSchema.type = 'null';
                break;
            case '--config':
                optionSchema.id = 'linterhub:config';
                break;
            case '--stdin':
                optionSchema.id = 'linterhub:stdin';
                break;
            case '--stdin-filename':
            case '--stdin-filepath':
                optionSchema.id = 'linterhub:filename';
                break;
            case '':
                optionSchema.id = 'linterhub:path';
                optionSchema.description = 'Path to file or folder to analyze';
                break;
            default:
                optionSchema.id = (!option.isFlag ? 'args:' : '')
                    + option.longName;
                // TODO: argument types
        }
        optionSchema.description = option.description;
        optionSchema.default = option.default;
        result.definitions.arguments.properties[argumentName] = optionSchema;
    });

    result.delimiter = context.delimiter;
    return result;
};

module.exports = templatizer;
