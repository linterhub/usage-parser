// Import functions
const arguments = require('./arguments.js');
const util = require('./util.js');

/**
 * Parse section Options and add arguments to context
 * @param {string} section - section Options
 * @param {object} context - internal config
 */
const options = (section, context) => {
    splitOptionsSection(section).forEach((object) => {
        const argument = arguments.getArgumentObject(object, context);
        context.options.push(argument);
    });
    const delimiter =
        util.getFirstValueByRegexp(section, context.regexp.delimiter);
    context.delimiter = delimiter ? delimiter[1] : context.delimiter;
};

/**
 * Parse section Usage and add argument "path" to context
 * @param {string} section - section Usage
 * @param {object} context - internal config
 */
const usage = (section, context) => {
    const match = util.getFirstValueByRegexp(
        section, context.pathAlias.join('|'));
    if (match) context.options.push(setPathArgument());
};

/**
 * Parse section Examples and set delimiter in context
 * @param {string} section - section Usage
 * @param {object} context - internal config
 */
const examples = (section, context) => {
    const delimiter =
        util.getFirstValueByRegexp(section, context.regexp.delimiter);
    context.delimiter = delimiter ? delimiter[1] : context.delimiter;
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
        if (string.indexOf('-') === 0) {
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

/**
 * Set path argument. This is an argument, which used for analyzing
 * directory/files with CLI w/o additional commands and arguments
 * Example: $ eslint ~/js/my_project
 * @return {object} argument - path argument
 */
const setPathArgument = () => {
    return {
        longName: '',
        type: 'string',
        flag: false,
        usage: 'path',
        description: 'Path to file or folder to analyze',
    };
};

// Export functions
exports = module.exports = {
    options: options,
    usage: usage,
    examples: examples,
};
