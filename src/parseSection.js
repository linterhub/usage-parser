const argumentsFill = require('./argumentsFill.js');

const options = (section, context, argumentTemplate) => {
    try {
        splitSection(section).forEach((option) => {
            if (option.indexOf('-') === 0) {
                let argument = Object.assign({}, argumentTemplate);
                let argumentNames = '';
                let argumentDescription = '';

                option.trim().split(/\s\s+/).map((section, index) => {
                    if (index === 0) {
                        argumentNames = section;
                    } else {
                        argumentDescription += argumentDescription ?
                            ' ' + section : section;
                    }
                });
                argumentsFill.setArgument(argumentNames, argument);
                argumentsFill.setDescription(argumentDescription, argument);
                context.options.push(argument);
            }
        });
    } catch (error) {
        throw error;
    }
};

const usage = (section, context, argumentTemplate) => {
    let argument = Object.assign({}, argumentTemplate);
    argument.longName = '';
    if (section.match(/file|path/gi)) {
        context.options.push(argument);
    }
};

const examples = (section, context) => {
    const delimitersTemplate = [' ', '='];
    delimitersTemplate.forEach((delimiter) => {
        const regularExp = new RegExp(`-[^ \t\n]+${delimiter}[^ \t\n-]`, 'gi');
        section.match(regularExp) ? context.delimiter = delimiter : '';
    });
};

const splitSection = (section) => {
    try {
        let result = [];
        const strings = section.split('\n').slice(1);

        let j = 0;

        strings.forEach((str) => {
            str = str.trim();

            if (str.indexOf('-') === 0) {
                result.push(str);
                j++;
            } else if (j > 0) {
                result[j - 1] = result[j - 1] + ' ' + str;
            }
        });
        return result;
    } catch (error) {
        throw error;
    }
};

exports = module.exports = {
    options: options,
    usage: usage,
    examples: examples,
};
