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
    argument = {
        enum: getEnum(object.arg + object.description, context),
        longName: getPropertyName(object.arg, context.regexp.argument.long),
        shortName: getPropertyName(object.arg, context.regexp.argument.short),
        defaultValue: getDefaultValue(
            object.description, context.regexp.argument.default),
        description: unifyDescription(object.description.trim()),
    };

    argument.usage = !getValueByRegexp(
        argument.description, context.regexp.argument.usage);
    argument.isFlag = identifyIsFlag(object.arg, argument);
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
    return removeExtraSpaces(removeCharAtTheEnd(result, ['.']));
};

/**
 * Find default value in argument description by regexp
 * @param {string} description - string with argument description
 * @param {string} regexp - regexp for identity default value
 * @return {string} - default value
 */
const getDefaultValue = (description, regexp) => {
    let matches = getValueByRegexp(description, regexp);
    if (!matches) return null;
    let extraChars = ['\'', '\"', ',', '['];
    let result = removeChar(matches[5].trim(), extraChars);
    result = removeCharAtTheEnd(result.trim(), ['.']);
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
    let matches = getValueByRegexp(string, context.regexp.argument.enum.values);
    if (!matches) return null;
    let enums = matches[2].split(context.regexp.argument.enum.split)
        .map((value) => removeChar(value, ['<', '>', '\'', '\"']).trim());
    return removeExtraEnumValues(enums, context);
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
    return result ? removeCharAtTheEnd(result[2].trim(), [',']) : null;
};

/**
 * Checks is given property of argument boolean
 * @param {string} string - value of property
 * @return {boolean} - result of check
 */
const isValueBoolean = (string) => {
    return string !== null &&
    !(string === ('true'|'false') || typeof string === 'boolean') ?
        false : true;
};

/**
 * Get type of an argument (string, number, null (for flags), etc.)
 * @param {string} string - argument string without description
 * @param {object} argument - argument object with description, names, etc.
 * @param {object} context - internal parser config
 * @return {string} argumentType - type of argument
 */
const getPropertyType = (string, argument, context) => {
    const typesDictionary = context.get.template.typesDictionary();
    const argumentAddition = removeExtraArgumentNames(string, argument);
    if (typeof argument.defaultValue === 'number') return 'number';
    if (typeof argument.defaultValue === 'boolean') return 'boolean';
    const result = Object.keys(typesDictionary)
        .find((type) => typesDictionary[type]
            .find((alias) => {
                return argumentAddition.toLowerCase().indexOf(alias) !== -1;
            }));
    return result ? result : context.get.template.option().type;
};

/**
 * Identify if argument is flag
 * @param {string} string - argument string without description
 * @param {object} argument - argument object with description, names, etc.
 * @return {boolean} isFlag - is argument flag
 */
const identifyIsFlag = (string, argument) => {
    const argumentAddition = removeExtraArgumentNames(string, argument);
    isFlag = !isValueBoolean(argument.defaultValue) ||
            argument.enum !== null ||
            argumentAddition ? false : true;
    return isFlag;
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
    const regularExp = new RegExp(context.regexp.section.examples, 'gim');
    while (match = regularExp.exec(section)) {
        let option = context.options.find((option) => {
            return match[1] === (option.longName || option.shortName);
        });
        if (option) option.isFlag = false;
    }
};

/**
 * Remove argument names from string
 * @param {string} string - any string
 * @param {argument} argument - argument object with description, names, etc.
 * @return {string} - result string
 */
const removeExtraArgumentNames = (string, argument) => {
    return removeChar(string,
        [',', argument.longName, argument.shortName]).trim();
};

/**
 * Remove extra spaces and tabulation from string
 * @param {string} string - any string
 * @return {string} - result string
 */
const removeExtraSpaces = (string) => {
    return removeChar(string, [/\\t/g, /[\s]+/g]);
};

/**
 * Delete chars at the end of string
 * @param {string} string - source string
 * @param {array} array - char for remove
 * @return {*} - string without chars
 */
const removeCharAtTheEnd = (string, array) => {
    let result = string;
    array.map((char) => {
        result = result.charAt(result.length - 1) === char ?
            result.slice(0, result.length - 1) : result;
    });
    return result;
};

/**
* Remove all char from array in string
* @param {string} string - input string for removing
* @param {array} array - array of char which need to remove
* @return {string} - result string
*/
const removeChar = (string, array) => {
    let result = string;
    array.map((char) => {
        result = result.replace(char, ' ');
    });
    return result;
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

// Export functions
exports = module.exports = {
    getArgumentObject,
    getDelimiterValue,
    getValueByRegexp,
    checkFlagsByExamples,
};
