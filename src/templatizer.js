'use strict';

/**
 * Fill template schema with parsed arguments and return it
 * @param {object} context - internal config with parsed arguments
 * @param {object} config - user config
 * @return {object} - filled template schema with parsed arguments
 */
const templatizer = (context, config) => {
    let result = context.get.template.args();
    const customPrefix = config.prefixes.custom;
    const nonFlagPrefix = config.prefixes.nonFlag;
    context.options.map((option) => {
        let optionSchema = context.get.template.option();
        const argumentName = option.longName ? option.longName :
            (option.shortName ? option.shortName : '');
        switch (argumentName) {
            case '--version':
                optionSchema.id = `${customPrefix}:version`;
                optionSchema.type = null;
                break;
            case '--help':
                optionSchema.id = `${customPrefix}:help`;
                optionSchema.type = null;
                break;
            case '--config':
                optionSchema.id = `${customPrefix}:config`;
                break;
            case '--stdin':
                optionSchema.id = `${customPrefix}:stdin`;
                break;
            case '--stdin-filename':
            case '--stdin-filepath':
                optionSchema.id = `${customPrefix}:filename`;
                break;
            case '':
                optionSchema.id = `${customPrefix}:path`;
                option.description = 'Path to file or folder to analyze';
                break;
            default:
                const prefix = !option.isFlag ? `${nonFlagPrefix}:` : '';
                optionSchema.id = prefix + argumentName;
                optionSchema.type = option.isFlag ? null : option.type;
        }
        optionSchema.description = option.description;
        if (option.defaultValue !== null) {
            optionSchema.default = option.defaultValue;
        }
        if (option.enum) optionSchema.enum = option.enum;
        if (!option.usage) optionSchema.usage = option.usage;
        result.definitions.arguments.properties[argumentName] = optionSchema;
    });

    result.delimiter = context.delimiter;
    return result;
};

// Export function
module.exports = templatizer;
