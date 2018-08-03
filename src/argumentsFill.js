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

const setDescription = (section, argument, context) => {
    argument.description = section;
    const regularExp = new RegExp(context.regexp.defaultValue, 'gim');
    const defaultValues = regularExp.exec(section);
    if (defaultValues) {
        argument.defaultValue = defaultValues[2];
        argument.isFlag = false;
    }
};

const removeExtraCharacters = (args) => {
    args = args.replace(/=/g, ' ');
    args = args.replace(/,/g, ' ');
    return args;
};

exports = module.exports = {
    setArgument, setDescription,
};
