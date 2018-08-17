// Import npm packages
const _ = require('lodash');

// Import function
const sections = require('./../sections.js');

// Import templates
const argument = require('./argument.json');
const option = require('./option.json');
const types = require('./types.dictionary.json');
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
        defaultValue: '(\\[|\\(|[\\s]+)default(s|)' +
        '(:|[\\s](to|at|is))[\\s]+(.*?)(\\]|\\)|([\\s]+|$))',
        findSection: {
            start: '\\s[\\s]+',
            end: '[(\n|\r\n)]+(\n|\r\n)?(?:[ \t].*?(?:(\n|\r\n)|$))*',
        },
        path: 'file|path|folder|dir|directory',
        delimiter: '-[^ \t(\n|\r\n)]+(\\s|=)[^ \t(\n|\r\n)-]',
        enumValues: {
            enum: '(<|\\(|\\")(([\\S]+(\\||\\",\\s\\"|\\"\\sor\\s\\"|,\\s))' +
            '+[\\S]+[^<\\)\\"])(>|\\)|\\"|,\\s)',
            split: /[\|]|\",\s\"|\"\sor\s\"|,\s/,
        },
        usage: '(\\[|\\()deprecated(\\]|\\))',
        argument: {
            short: '(\\s|^)(-[^-]*?)(\\s|=|$)',
            long: '()(--.+?)(\\s|=|$)',
        },
        examplesArgument: '\\s+(-[\\S]+)(\\s|=)[^-\\s]+',
    },
    options: [],
    delimiter: '',
    get: {
        template: {
            args: () => _.cloneDeep(args),
            option: () => _.cloneDeep(option),
            argument: () => _.cloneDeep(argument),
            typesDictionary: () => _.cloneDeep(types),
        },
    },
};

module.exports = context;
