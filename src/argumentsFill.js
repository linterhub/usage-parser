/**
 * Set argument names and determine whether argument is flag
 * @param {string} section - one argument from Options without description
 * @param {object} argument - template of argument
 */
const setArgument = (section, argument) => {
    const argumentPrefix = /^-*/i;

    section = removeExtraCharacters(section);
    section.split(/\s+/).map((arg) => {
        switch (argumentPrefix.exec(arg).toString()) {
            case '--':
                argument.longName = arg;
                break;
            case '-':
                argument.shortName = arg;
                break;
            default:
                argument.isFlag = false;
                break;
        }
    });
};

/**
 * Set argument description and default value
 * @param {string} section - one argument from Options with only description
 * @param {object} argument - template of argument
 * @param {object} context - internal config
 */
const setDescription = (section, argument, context) => {
    argument.description = section;
    const regularExp = new RegExp(context.regexp.defaultValue, 'gim');
    const defaultValues = regularExp.exec(section);
    if (defaultValues) {
        argument.defaultValue = defaultValues[2];
        argument.isFlag = false;
    }
};

/**
 * Remove extra characters from argument name
 * @param {string} args - one argument without description
 * @return {string} args - argument without extra characters
 */
const removeExtraCharacters = (args) => {
    args = args.replace(/=/g, ' ');
    args = args.replace(/,/g, ' ');
    return args;
};

// Export functions
exports = module.exports = {
    setArgument, setDescription,
};
