/**
 * Get object with array of argument property and description, then convert
 * it to arguments template
 * @param {Object} object - object with include array of argument description
 * and properties string
 * @param {Object} context - internal config
 * @return {Object} - argument template
 */
const getArgumentObject = (object, context) => {
    let argument = context.get.template.argument();
    object.arg = removeExtraCharacters(object.arg);
    argument = {
        enum: getEnum(object.arg + object.description, context),
        longName: getPropertyName(object.arg, context.regexp.argument.long),
        shortName: getPropertyName(object.arg, context.regexp.argument.short),
        defaultValue: getDefaultValue(
            object.description, context.regexp.defaultValue),
        description: unifyDescription(object.description),
    };
    argument.isFlag = !isPropertyTyped(object.arg)
        && isValueBoolean(argument.defaultValue)
        && (argument.enum === null);
    return argument;
};

/**
 * Unify description to one standard
 * @param {string} description - argument description
 * @return {string} result - unified description
 */
const unifyDescription = (description) => {
    if (typeof description !== 'string' && description.length === 0) return '';
    let result = description.trim();
    result = result.charAt(0).toUpperCase() + result.slice(1);
    return deleteDotAtTheEnd(result);
};

/**
 * Find default value in argument description by regexp
 * @param {string} description - string with argument description
 * @param {string} regexp - regexp for identity default value
 * @return {string} - default value
 */
const getDefaultValue = (description, regexp) => {
    const result = getValueByRegexp(description, regexp);
    return result ? deleteDotAtTheEnd(result[5].trim()) : null;
};

/**
 * Searches for enum values of an argument
 * @param {string} string - argument with description from Options section
 * @param {object} context - internal config
 * @return {array} - enum values of argument
 */
const getEnum = (string, context) => {
    const result = getValueByRegexp(string, context.regexp.enumValues.enum);
    return result ? result[1].split(context.regexp.enumValues.split) : null;
};

/**
 * Find delimiter char in string by regexp
 * @param {string} string - string for search delimiter
 * @param {string} regexp - regexp for identity delimiter
 * @return {string} - delimiter
 */
const getDelimiterValue = (string, regexp) => {
    const result = getValueByRegexp(string, regexp);
    return result ? result[1] : null;
};

/**
 * Find property name in argument string by regexp
 * @param {string} string - argument string without description
 * @param {string} regexp - regexp for identity property
 * @return {string} - property name
 */
const getPropertyName = (string, regexp) => {
    const result = getValueByRegexp(string, regexp);
    return result ? result[0].trim() : null;
};

/**
 * Checks is given property of argument boolean
 * @param {string} string - value of property
 * @return {boolean} - result of check
 */
const isValueBoolean = (string) => {
    return string && !(string === 'true' || string === 'false' ) ? false : true;
};

/**
 * Checks if argument string has any types by
 * additional chars after property name
 * @param {string} string - argument string without description
 * @return {bool} - result of check
 */
const isPropertyTyped = (string) => {
    let isType = false;
    string.split(/\s+/).map((argumentSubstring) => {
        argumentSubstring.trim();
        isType = argumentSubstring.indexOf('-') !== 0 ? true : isType;
    });
    return isType;
};

/**
 * General function for getting some values by regexp
 * @param {string} string - searching string
 * @param {string} regexp - regexp for finding
 * @return {Array} - Array of result
 */
const getValueByRegexp = (string, regexp) => {
    const regularExp = new RegExp(regexp, 'gim');
    const result = regularExp.exec(string);
    return result ? result : null;
};

/**
 * Remove coma and sing from string
 * @param {string} string - any string
 * @return {string} - result string
 */
const removeExtraCharacters = (string) => {
    string = string.replace(/=/g, ' ');
    string = string.replace(/,/g, ' ');
    return string;
};

/**
 * Delete dot at the end of string
 * @param {string} string - source string
 * @return {*} - string without dot at the end
 */
const deleteDotAtTheEnd = (string) => {
    return string.charAt(string.length - 1) === '.' ?
        string.slice(0, string.length - 1) : string;
};

// Export functions
exports = module.exports = {
    getArgumentObject,
    getDelimiterValue,
    getValueByRegexp,
};
