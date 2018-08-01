'use strict';
const fs = require('fs');
const argumentsTemplate = JSON.parse(fs.readFileSync('./src/template/args.json'));
const optionTemplate = require('./template/option.json');

const templatizer = (context, config) => {
    argumentsTemplate.definitions.object.properties = {};
    let result = argumentsTemplate;
    context.options.map((option) => {
        let optionSchema = Object.assign({}, optionTemplate);
        const argumentName = option.longName ? option.longName :
                (option.shortName ? option.shortName : '');
        switch (argumentName) {
            case '--version':
                optionSchema.type = 'null';
                optionSchema.usage = 'version';
                break;
            case '--help':
                optionSchema.type = 'null';
                optionSchema.usage = 'help';
                break;
            case '--config':
                optionSchema.usage = 'config';
                break;
            case '--stdin':
                optionSchema.usage = 'stdin';
                break;
            case '':
                optionSchema.named = false;
                optionSchema.usage = 'none';
                break;
            default:
                optionSchema.usage = 'arg';
                optionSchema.named = true;
        }
        optionSchema.description = option.description;
        optionSchema.default = option.defaultValue ? option.defaultValue : null;
        result.definitions.object.properties[argumentName] = optionSchema;
    });

    result.delimiter = context.delimiter;
    return result;
};

module.exports = templatizer;
