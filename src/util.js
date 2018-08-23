/**
 * Remove extra spaces and tabulation from string
 * @param {string} string - any string
 * @return {string} - result string
 */
const removeExtraSpaces = (string) => {
    return string.replace(/\\t/g, ' ').replace(/[\s]+/g, ' ');
};

/**
 * Remove extra chars such as quotes, brackets, etc.
 * @param {string} string - any string
 * @return {string} - result string
 */
const removeExtraChars = (string) => {
    return removeChar(string, ['\'', '\"', ',', '\\[', '<', '>']);
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
        let regularExp = new RegExp(char, 'g');
        result = result.replace(regularExp, '');
    });
    return result;
};

/**
 * General function for getting some value by regexp
 * @param {string} string - searching string
 * @param {string} regexp - regexp for finding
 * @return {Array} - Array of first match with capture groups
 */
const getFirstValueByRegexp = (string, regexp) => {
    const regularExp = new RegExp(regexp, 'im');
    const result = string.match(regularExp);
    return result ? result : null;
};

/**
 * General function for getting all values by regexp
 * @param {string} string - searching string
 * @param {string} regexp - regexp for finding
 * @return {Array} - Array of full matches
 */
const getValuesByRegexpGlobally = (string, regexp) => {
    const regularExp = new RegExp(regexp, 'gim');
    const result = string.match(regularExp);
    return result ? result : null;
};

/**
 * Function for getting array of first capture groups in every match
 * with global search by regexp
 * @param {string} string - searching string
 * @param {string} regexp - regexp for finding
 * @return {Array} - two-dimensional array of matches with capture groups
 */
const getAllFirstCapturingGroupsByRegexp = (string, regexp) => {
    const regularExp = new RegExp(regexp, 'gim');
    let result = [];
    let match;
    while (match = regularExp.exec(string)) {
        result.push(match[1]);
    }
    return result ? result : null;
};

/**
 * Checks is given property of argument boolean
 * @param {string} string - value of property
 * @return {boolean} - result of check
 */
const isValueBoolean = (string) => {
    return !(string !== null &&
    !(string === ('true'|'false') || typeof string === 'boolean'));
};

// Export functions
exports = module.exports = {
    removeExtraSpaces,
    removeExtraChars,
    removeCharAtTheEnd,
    removeChar,
    getFirstValueByRegexp,
    getValuesByRegexpGlobally,
    getAllFirstCapturingGroupsByRegexp,
    isValueBoolean,
};
