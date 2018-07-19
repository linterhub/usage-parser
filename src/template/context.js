const parseSection = require('./../parseSection.js');

const context = {
    section: {
        options: {
            data: [],
            required: true,
            func: parseSection.options,
        },
        usage: {
            data: [],
            required: false,
            func: parseSection.usage,
        },
        examples: {
            data: [],
            required: false,
            func: parseSection.examples,
        },
    },
    options: [],
    delimiter: '',
};

module.exports = context;
