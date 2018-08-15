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
            object.description, context.regexp.defaultValue),
        description: unifyDescription(object.description.trim()),
    };

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
    return removeExtraSpaces(removeDotAtTheEnd(result));
};

/**
 * Find default value in argument description by regexp
 * @param {string} description - string with argument description
 * @param {string} regexp - regexp for identity default value
 * @return {string} - default value
 */
const getDefaultValue = (description, regexp) => {
    const result = getValueByRegexp(description, regexp);
    return result ? removeDotAtTheEnd(result[5].trim()) : null;
};

/**
 * Searches for enum values of an argument
 * @param {string} string - argument with description from Options section
 * @param {object} context - internal config
 * @return {array} - enum values of argument
 */
const getEnum = (string, context) => {
    const result = getValueByRegexp(string, context.regexp.enumValues.enum);
    return result ? removeExtraEnumValues(
        result[2].split(context.regexp.enumValues.split), context.regexp.path)
        : null;
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
    return result ? removeComaAtTheEnd(result[0].trim()) : null;
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
 * Get type of an argument (string, number, null (for flags), etc.)
 * @param {string} string - argument string without description
 * @param {object} argument - argument object with description, names, etc.
 * @param {object} context - internal parser config
 * @return {string} argumentType - type of argument
 */
const getPropertyType = (string, argument, context) => {
    if (argument.isFlag) return null;
    const typesDictionary = context.get.template.typesDictionary();
    const argumentAddition = removeExtraArgumentNames(string, argument);
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
 * @param {string} regexp -  regexp for remove
 * @return {array} enumArray - enum without extra values or null if it empty
 */
const removeExtraEnumValues = (enumArray, regexp) => {
    const result = enumArray.filter((value) => {
        return value.toLowerCase().match(regexp) === null;
    });
    return result.length !== 0 ? result : null;
};

/**
 * Remove extra coma from string
 * @param {string} string - any string
 * @return {string} - result string
 */
const removeExtraComa = (string) => {
    return removeChar(string, [',']).trim();
};
/**
 * Remove argument names from string
 * @param {string} string - any string
 * @param {argument} argument - argument object with description, names, etc.
 * @return {string} - result string
 */
const removeExtraArgumentNames = (string, argument) => {
    return removeChar(
        removeExtraComa(string),
        [argument.longName, argument.shortName]).trim();
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
* Remove extra coma from the end of line
* @param {string} string - any string
* @return {string} - result string
*/
const removeComaAtTheEnd = (string) => {
    return removeCharAtTheEnd(string, ',');
};

/**
* Remove extra dot from the end of line
* @param {string} string - any string
* @return {string} - result string
*/
const removeDotAtTheEnd = (string) => {
    return removeCharAtTheEnd(string, '.');
};


/**
* Delete char at the end of string
* @param {string} string - source string
* @param {char} char - char for remove
* @return {*} - string without dot at the end
*/
const removeCharAtTheEnd = (string, char) => {
    return string.charAt(string.length - 1) === char ?
        string.slice(0, string.length - 1) : string;
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
};
