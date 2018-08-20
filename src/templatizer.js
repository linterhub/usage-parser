'use strict';

/**
 * Fill template schema with parsed arguments and return it
 * @param {object} context - internal config with parsed arguments
 * @return {object} - filled template schema with parsed arguments
 */
const templatizer = (context) => {
    let result = {
        arguments: [],
        delimiter: context.delimiter,
    };
    context.options.map((option) => {
        let argument = context.get.template.argument();
        argument = {
            name: option.longName ? option.longName :
                (option.shortName ? option.shortName : ''),
            type: option.flag ? null : option.type,
            description: option.description,
            flag: option.flag,
        };
        if (option.longName && option.shortName) {
            argument.alias = option.shortName;
        }
        let usage = getUsage(context, option, argument.name);
        if (usage) argument.usage = usage;
        if (option.defaultValue !== null) {
            argument.default = option.defaultValue;
        }
        if (option.enum) argument.enum = option.enum;

        result.arguments.push(argument);
    });

    return result;
};

/**
 * Get usage property of an argument
 * @param {object} context - internal config
 * @param {object} option - parsed argument
 * @param {string} argumentName - name of an argument
 * @return {string} usage - argument usage
 */
const getUsage = (context, option, argumentName) => {
    const usageDictionary = context.get.dictionary.usage();
    if (!option.usage) return 'none';
    let usage = Object.keys(usageDictionary).find((arg) => {
        return usageDictionary[arg].find((name) => {
            return argumentName.toLowerCase() === name;
        });
    });
    return usage ? usage : null;
};

// Export function
module.exports = templatizer;
