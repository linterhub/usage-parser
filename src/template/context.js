const parseSection = require('./../parseSection.js');

const context = {
    section: {
        options: {
            required: true,
            func: parseSection.options,
        },
        usage: {
            required: false,
            func: parseSection.usage,
        },
        examples: {
            required: false,
            func: parseSection.examples,
        },
    },
    options: [],
    delimiter: '',
};

module.exports = context;
