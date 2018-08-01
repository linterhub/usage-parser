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
    regexp: {
        defaultValue: '(\\[|\\(|[\\s]+)default: (.*?)(\\]|\\)|([\\s]+|$))',
        findSection: {
            start: '\\s[\\s]+',
            end: '[\n]+\n?(?:[ \t].*?(?:\n|$))*',
        },
        filePath: 'file|path',
        delimiter: {
            start: '-[^ \t\n]+',
            end: '[^ \t\n-]',
        },
    },
    options: [],
    delimiter: '',
};

module.exports = context;
