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
        enum: getEnum(object.arg, context),
        longName: getPropertyName(object.arg, context.regexp.argument.long),
        shortName: getPropertyName(object.arg, context.regexp.argument.short),
        defaultValue: getDefaultValue(
            object.description, context.regexp.defaultValue),
        description: object.description.trim(),
    };
    argument.isFlag = isDefaultBollean(argument.defaultValue)
        && !isPropertyTyped(object.arg);

    return argument;
};

/**
 * Find default value in argument description by regexp
 * @param {string} description - string with argument description
 * @param {string} regexp - regexp for identity default value
 * @return {string} - default value
 */
const getDefaultValue = (description, regexp) => {
    const result = getValueByRegexp(description, regexp);
    return result ? result[2].trim() : null;
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
 * Checks default values on bollean
 * @param {string} string - default value
 * @return {bollean} - result of check
 */
const isDefaultBollean = (string) => {
    return string && !(string === 'true' || string === 'false' ) ? false : true;
};

/**
 * Checks if argument string has any types by
 * additional chars after property name
 * @param {string} string - argument string without description
 * @return {bollean} - result of check
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

// Export functions
exports = module.exports = {
    getArgumentObject,
    getDelimiterValue,
    getValueByRegexp,
};
