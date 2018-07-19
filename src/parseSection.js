const argumentsFill = require('./argumentsFill.js');

const options = (section, context, argumentTemplate) => {
    try {
        splitSection(section).forEach((option) => {
            if (option.indexOf('-') === 0) {
                let argument = Object.assign({}, argumentTemplate);

                option.trim().split(/\s\s+/, 2).map((section, index) => {
                    index === 0 ? argumentsFill.setArgument(section, argument)
                        : argumentsFill.setDescription(section, argument);
                });
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
    context.options.push(section.match(/file|path/i) ? argument : {});
};

const examples = (section, context) => {
    const delimitersTemplate = [' ', '='];
    delimitersTemplate.forEach((delimiter) => {
        const regularExp = new RegExp(`-[^ \t\n]+${delimiter}[^ \t\n-]`);
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
                result[j - 1] = result[j - 1] + str;
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
