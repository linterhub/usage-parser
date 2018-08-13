// Import npm packages
const _ = require('lodash');

// Import function
const sections = require('./../sections.js');

// +// Import templates
const argument = require('./argument.json');
const option = require('./option.json');
const args = require('./args.json');

// Internal configuration with parsed arguments
const context = {
    section: {
        options: {
            required: true,
            func: sections.options,
        },
        usage: {
            required: false,
            func: sections.usage,
        },
        examples: {
            required: false,
            func: sections.examples,
        },
    },
    regexp: {
        defaultValue: '(\\[|\\(|[\\s]+)default: (.*?)(\\]|\\)|([\\s]+|$))',
        findSection: {
            start: '\\s[\\s]+',
            end: '[(\n|\r\n)]+(\n|\r\n)?(?:[ \t].*?(?:(\n|\r\n)|$))*',
        },
        filePath: 'file|path',
        delimiter: '-[^ \t(\n|\r\n)]+(\\s|=)[^ \t(\n|\r\n)-]',
        enumValues: {
            enum: '<(([\\S]+\\|)+[\\S]+)>',
            split: '|',
        },
        argument: {
            short: '(\\s|^)-[^-]*?(\\s|=|$)',
            long: '--.+?(\\s|=|$)',
        },
    },
    options: [],
    delimiter: '',
    get: {
        template: {
            args: () => _.cloneDeep(args),
            option: () => _.cloneDeep(option),
            argument: () => _.cloneDeep(argument),
        },
    },
};

module.exports = context;
