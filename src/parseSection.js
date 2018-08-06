const argumentsFill = require('./argumentsFill.js');

const options = (section, context, argumentTemplate) => {
    try {
        splitSection(section).forEach((option) => {
            if (option.indexOf('-') === 0) {
                let argument = Object.assign({}, argumentTemplate);
                let argumentNames = '';
                let argumentDescription = '';

                const argumentEnumValues = getEnum(option, context);
                if (argumentEnumValues.length !== 0) {
                    argument.enum = argumentEnumValues;
                }
                option.trim().split(/\s\s+/).map((section, index) => {
                    if (index === 0) {
                        argumentNames = section;
                    } else {
                        argumentDescription += argumentDescription ?
                            ' ' + section : section;
                    }
                });
                argumentsFill.setArgument(argumentNames, argument);
                argumentsFill.setDescription(argumentDescription,
                    argument, context);
                context.options.push(argument);
            }
        });
    } catch (error) {
        throw error;
    }
};

const usage = (section, context, argumentTemplate) => {
    let argument = Object.assign({}, argumentTemplate);
    argument.longName = '';
    const regularExp = new RegExp(context.regexp.filePath, 'gi');
    if (section.match(regularExp)) {
        context.options.push(argument);
    }
};

const examples = (section, context) => {
    const delimitersTemplate = [' ', '='];
    delimitersTemplate.forEach((delimiter) => {
        const regularExp = new RegExp(context.regexp.delimiter.start +
            delimiter + context.regexp.delimiter.end, 'gi');
        section.match(regularExp) ? context.delimiter = delimiter : '';
    });
};

const splitSection = (section) => {
    try {
        let result = [];
        const strings = section.split('\n').slice(1);

        let j = 0;

        strings.forEach((str) => {
            str = str.trim();

            if (str.indexOf('-') === 0) {
                result.push(str);
                j++;
            } else if (j > 0) {
                result[j - 1] = result[j - 1] + '  ' + str;
            }
        });
        return result;
    } catch (error) {
        throw error;
    }
};

/**
 * Searches for enum values of an argument
 * @param {string} option - argument with description from Options section
 * @param {object} context - internal config
 * @return {array} - enum values of argument
 */
const getEnum = (option, context) => {
    const match = option.match(context.regexp.enumValues.enum);
    return match ?
        match[1].split(context.regexp.enumValues.split) : [];
};

exports = module.exports = {
    options: options,
    usage: usage,
    examples: examples,
};
