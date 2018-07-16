const argumentTemplate = {
    shortName: null,
    longName: null,
    isFlag: true,
    default: false,
    description: null
};

const handle = (help) => {
    const sectionName = {
        options: "Options:",
        usage: "Usage:"
    };
    let options = [];

    parseSection(sectionName.options, help).forEach(section => {
        splitSection(section).forEach(option => {
            if (option.indexOf("-") === 0) {
                options.push(parseOption(option));
            }
        });
    });

    parseSection(sectionName.usage, help).forEach(section => {
        let argument = Object.assign({}, argumentTemplate);
        argument.longName = "";
        section.match(/file|path/i) ? options.push(argument) : "";
    });
    return options;
};

const parseSection = (sectionName, help) => {
    let regularExp = new RegExp(`[^\n]*${sectionName}[^\n]*\n?(?:[ \t].*?(?:\n|$))*`);
    let matches = help.match(regularExp);

    return matches.map(match => match.trim());
};

const splitSection = (section) => {
    let split = [];
    let splitTmp = section.split("\n").slice(1);

    let j = 0;

    splitTmp.forEach(splitTmp => {
        splitTmp = splitTmp.trim();

        if (splitTmp.indexOf("-") === 0) {
            split.push(splitTmp);
            j++;
        } else if (j > 0) {
            split[j - 1] = split[j - 1] + splitTmp;
        }
    });

    return split;
};

const parseOption = (option) => {
    let argument = Object.assign({}, argumentTemplate);

    option.trim().split(/\s\s+/, 2).map((section, index) => {
        index === 0 ? setArgument(section, argument) : setDescription(section, argument);
    });

    return argument;
};

const setArgument = (section, argument) => {
    const argumentPrefix = /^-*/i;

    section = RemoveExtraCharacters(section);
    section.split(/\s+/).map(arg => {
        switch(argumentPrefix.exec(arg).toString()) {
            case "--":
                argument.longName = arg;
                break;
            case "-":
                argument.shortName = arg;
                break;
            default:
                argument.isFlag = false;
                break;
        }
    });
};

const setDescription = (section, argument) => {
    argument.description = section;
    //TODO: add other patterns for default value parsing
    const defaultValues = section.match(/\[default: (.*?)\]/i);
    if (defaultValues) {
        argument.defaultValue = defaultValues[1];
        argument.isFlag = false;
    }
};

const RemoveExtraCharacters = (args) => {
    args = args.replace(/=/g, " ");
    args = args.replace(/,/g, " ");
    return args;
};

module.exports = handle;
