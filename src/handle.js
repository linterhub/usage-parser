const argumentTemplate = {
    shortName: null,
    longName: null,
    isFlag: true,
    default: false,
    description: null
};

const handle = (help) => {
    const context = {
        section: [
            {
                name: "Options:",
                data: [],
                required: true,
                func: parseOptions
            },
            {
                name: "Usage:",
                data: [],
                required: false,
                func: parseUsage
            },
            {
                name: "Examples:",
                data: [],
                required: false,
                func: parseExamples
            },
        ],
        options: [],
        delimiter: ""
    };

    try {
        context.section.forEach(section => {
            section.data = parseSection(section.name, help);
            if (section.data) {
                section.data.forEach(data => section.func(data, context));
            } else if (section.required) {
                throw `Required section ${section.name} not found`;
            }
        });
        return context;
    } catch (error) {
        throw error;
    }
};

const parseOptions = (section, context) => {
    try {
        splitSection(section).forEach(option => {
            if (option.indexOf("-") === 0) {
                let argument = Object.assign({}, argumentTemplate);

                option.trim().split(/\s\s+/, 2).map((section, index) => {
                    index === 0 ? setArgument(section, argument) : setDescription(section, argument);
                });
                context.options.push(argument);
            }
        });
    } catch (error) {
        throw error;
    }
};

const parseUsage = (section, context) => {
    let argument = Object.assign({}, argumentTemplate);
    argument.longName = "";
    context.options.push(section.match(/file|path/i) ? argument : {});
};

const parseExamples = (section, context) => {
    const delimiterDefault = "=";
    const delimitersTemplate = [" ", "="];
    delimitersTemplate.forEach(delimiter => {
        const regularExp = new RegExp(`-[^ \t\n]+${delimiter}[^ \t\n-]`);
        section.match(regularExp) ? context.delimiter = delimiter : "";
    });
    context.delimiter = context.delimiter ? context.delimiter : delimiterDefault;
};

const parseSection = (sectionName, help) => {
    try {
        const regularExp = new RegExp(`[^\n]*${sectionName}[^\n]*\n?(?:[ \t].*?(?:\n|$))*`);
        const matches = help.match(regularExp);
        return matches ? matches.map(match => match.trim()) : [];
    } catch (error) {
        throw error;
    }
};

const splitSection = (section) => {
    try {
        let result = [];
        const strings = section.split("\n").slice(1);

        let j = 0;

        strings.forEach(str => {
            str = str.trim();

            if (str.indexOf("-") === 0) {
                result.push(str);
                j++;
            } else if (j > 0) {
                result[j - 1] = result[j - 1] + str;
            }
        });

        return result;
    } catch (error) {
        throw error;
    }
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
