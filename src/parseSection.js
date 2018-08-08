// Import functions
const argumentsFill = require('./argumentsFill.js');

/**
 * Parse section Options and add arguments to context
 * @param {string} section - section Options
 * @param {object} context - internal config
 * @param {object} argumentTemplate - template of parsed argument
 */
const options = (section, context, argumentTemplate) => {
    try {
        splitSection(section).forEach((option) => {
            if (option.indexOf('-') === 0) {
                let argument = Object.assign({}, argumentTemplate);
                let argumentNames = '';
                let argumentDescription = '';

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

/**
 * Parse section Usage and add argument "path" to context
 * @param {string} section - section Usage
 * @param {object} context - internal config
 * @param {object} argumentTemplate - template of parsed argument
 */
const usage = (section, context, argumentTemplate) => {
    let argument = Object.assign({}, argumentTemplate);
    argument.longName = '';
    argument.description = 'Path to file or folder to analyze';
    const regularExp = new RegExp(context.regexp.filePath, 'gi');
    if (section.match(regularExp)) {
        context.options.push(argument);
    }
};

/**
 * Parse section Examples and set delimiter in context
 * @param {string} section - section Usage
 * @param {object} context - internal config
 */
const examples = (section, context) => {
    const delimitersTemplate = [' ', '='];
    delimitersTemplate.forEach((delimiter) => {
        const regularExp = new RegExp(context.regexp.delimiter.start +
            delimiter + context.regexp.delimiter.end, 'gi');
        section.match(regularExp) ? context.delimiter = delimiter : '';
    });
};

/**
 * Split section Options for array of arguments (argument + decription)
 * @param {string} section - section Options
 * @return {Array} - arguments from Options
 */
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

// Export functions
exports = module.exports = {
    options: options,
    usage: usage,
    examples: examples,
};
