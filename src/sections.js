// Import functions
const arguments = require('./arguments.js');

/**
 * Parse section Options and add arguments to context
 * @param {string} section - section Options
 * @param {object} context - internal config
 */
const options = (section, context) => {
    try {
        splitOptionsSection(section).forEach((object) => {
            const argument = arguments.getArgumentObject(object, context);
            context.options.push(argument);
        });
    } catch (error) {
        throw error;
    }
};

/**
 * Parse section Usage and add argument "path" to context
 * @param {string} section - section Usage
 * @param {object} context - internal config
 */
const usage = (section, context) => {
    const result = arguments.getValueByRegexp(section, context.regexp.path);
    if (result) {
        let argument = context.get.template.argument();
        argument.longName = '';
        context.options.push(argument);
    }
};

/**
 * Parse section Examples and set delimiter in context
 * @param {string} section - section Usage
 * @param {object} context - internal config
 */
const examples = (section, context) => {
    const delimiter = arguments.getDelimiterValue(
        section, context.regexp.delimiter);
    context.delimiter = delimiter ? delimiter : context.delimiter;
    arguments.checkFlagsByExamples(section, context);
};

/**
 * Split section Options for array of arguments (argument + description)
 * @param {string} section - section Options
 * @return {Array} - Array of arguments with properties and description
 */
const splitOptionsSection = (section) => {
    let result = [];
    section.split('\n').forEach((string) => {
        string = string.trim();
        if (string.search(/-[\S]+/) === 0) {
            result.push(splitStringWithArguments(string));
        } else if (result.length > 0 &&
            string.match(/([\S]|[\S]+[\s][\S]+):$/) === null) {
            result[result.length - 1].description += string + ' ';
        }
    });
    return result;
};

/**
 * Split argument string by double space and argument object
 * @param {string} string - argument string
 * @return {Object} - Object of argument with description (if it exist)
 */
const splitStringWithArguments = (string) => {
    let result = {arg: '', description: ''};
    string.split('  ').forEach((subStr) => {
        subStr = subStr.trim();
        if (subStr.indexOf('-') === 0) {
            result.arg = subStr;
        } else {
            result.description += subStr ? subStr + ' ': '';
        }
    });
    return result;
};

// Export functions
exports = module.exports = {
    options: options,
    usage: usage,
    examples: examples,
};
