// Import npm package
const _ = require('lodash');

// Import functions
const util = require('./util.js');

/**
 * Get object with array of argument property and description, then convert
 * it to arguments template
 * @param {Object} object - object with include array of argument description
 * and properties string
 * @param {Object} context - internal config
 * @return {Object} - argument template
 */
const getArgumentObject = (object, context) => {
    let argument = {
        enum: getEnum(object.arg + object.description, context),
        longNames: getPropertyNames(object.arg, context.regexp.argument.long),
        shortNames: getPropertyNames(object.arg, context.regexp.argument.short),
        defaultValue: getDefaultValue(object.description, context),
        description: unifyDescription(object.description.trim()),
    };

    argument.usage = !util.getFirstValueByRegexp(
        argument.description, context.regexp.argument.usage);
    argument.flag = identifyIsFlag(object.arg, argument);
    argument.type = getPropertyType(object.arg, argument, context);
    return argument;
};

/**
 * Unify description to one standard
 * @param {string} description - argument description
 * @return {string} result - unified description
 */
const unifyDescription = (description) => {
    if (typeof description !== 'string' && description.length === 0) return '';
    const result = description.charAt(0).toUpperCase() + description.slice(1);
    return util.removeExtraSpaces(util.removeCharAtTheEnd(result, ['.']));
};

/**
 * Find default value in argument description by regexp
 * @param {string} description - string with argument description
 * @param {object} context - internal config
 * @return {string} - default value
 */
const getDefaultValue = (description, context) => {
    let match = util.getFirstValueByRegexp(
        description, context.regexp.argument.default);
    if (!match) return null;
    let result = util.removeExtraChars(match[1].trim());
    result = util.removeCharAtTheEnd(result.trim(), ['.']);
    switch (result.toLowerCase()) {
        case 'false':
            result = false;
            break;
        case 'true':
            result = true;
            break;
        case 'infinity':
            result = null;
            break;
        default:
            if (Number(result)) result = Number(result);
    }
    return result !== '' ? result : null;
};

/**
 * Searches for enum values of an argument
 * @param {string} string - argument with description from Options section
 * @param {object} context - internal config
 * @return {array} - enum values of argument
 */
const getEnum = (string, context) => {
    let match = util.getFirstValueByRegexp(
        string, context.regexp.argument.enum.values);
    if (!match) return null;
    let enums = match[2].split(context.regexp.argument.enum.split)
        .map((value) => util.removeExtraChars(value).trim());
    return removeExtraEnumValues(enums, context);
};

/**
 * Find property name in argument string by regexp
 * @param {string} string - argument string without description
 * @param {string} regexp - regexp for identity property
 * @return {Array} - array with property names
 */
const getPropertyNames = (string, regexp) => {
    let matches = util.getAllFirstCapturingGroupsByRegexp(string, regexp);
    return matches.length ? matches.map((match) =>
        util.removeCharAtTheEnd(match, [','])) : null;
};

/**
 * Get type of an argument (string, number, null (for flags), etc.)
 * @param {string} string - argument string without description
 * @param {object} argument - argument object with description, names, etc.
 * @param {object} context - internal parser config
 * @return {string} argumentType - type of argument
 */
const getPropertyType = (string, argument, context) => {
    const types = context.get.dictionary.types();
    const argumentAddition = removeExtraArgumentNames(string, argument);
    if (typeof argument.defaultValue === 'number') return 'number';
    if (typeof argument.defaultValue === 'boolean') return 'boolean';
    const result = Object.keys(types)
        .find((type) => types[type]
            .find((alias) => {
                return argumentAddition.toLowerCase().indexOf(alias) !== -1;
            }));
    return result ? result : context.get.template.argument().type;
};

/**
 * Identify if argument is flag
 * @param {string} string - argument string without description
 * @param {object} argument - argument object with description, names, etc.
 * @return {boolean} isFlag - is argument flag
 */
const identifyIsFlag = (string, argument) => {
    const argumentAddition =
        removeExtraArgumentNames(string, argument);
    return !(!util.isValueBoolean(argument.defaultValue) ||
            argument.enum !== null ||
            argumentAddition);
};

/**
 * Remove extra enum values (such as 'file', 'path', 'folder', etc.)
 * @param {array} enumArray - array with enum values
 * @param {object} context - internal config
 * @return {array} enumArray - enum without extra values or null if it empty
 */
const removeExtraEnumValues = (enumArray, context) => {
    const result = enumArray.filter((enumValue) => {
        return !context.pathAlias.find((alias) => {
            return enumValue.toLowerCase() === alias;
        });
    });
    return result.length !== 0 ? result : null;
};

/**
 * Set argument property isFlag by examples section
 * @param {string} section - examples section
 * @param {object} context - internal config
 */
const checkFlagsByExamples = (section, context) => {
    const matches = util.getAllFirstCapturingGroupsByRegexp(
        section, context.regexp.argument.examples);
    matches.forEach((match) => {
        let option = context.options.find((option) => {
            return _.indexOf(option.longNames, match) !== -1 ||
                _.indexOf(option.shortNames, match) !== -1;
        });
        if (option) option.flag = false;
    });
};

/**
 * Remove argument names from string
 * @param {string} string - any string
 * @param {object} argument - argument object with description, names, etc.
 * @return {string} - result string
 */
const removeExtraArgumentNames = (string, argument) => {
    let remove = _.union([','], argument.longNames, argument.shortNames);
    return util.removeChar(string, remove).trim();
};

// Export functions
exports = module.exports = {
    getArgumentObject,
    checkFlagsByExamples,
};
