// Import npm packages
const _ = require('lodash');

// Import function
const sections = require('./../sections.js');

// Import templates
const argument = require('./argument.json');
const types = require('./types.dictionary.json');
const usage = require('./usage.dictionary.json');


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
        delimiter: '[\\s][-]+[^ \t(\n|\r\n)]+(\\s|=)[^ :\t(\n|\r\n)-]',
        section: {
            search: {
                start: '(?:^[\\s]*|(?:\n|\r\n)+[\\s]+)',
                end: '[\n|\r\n]*(?:[ \t].*?(?:(\n|\r\n)|$))+',
            },
            examples: '\\s+(-[\\S]+)(\\s|=)[^-\\s]+',
        },
        argument: {
            short: '(\\s|^)(-[^-]*?)(\\s|=|$)',
            long: '()(--.+?)(\\s|=|$)',
            default: '(\\[|\\(|[\\s]+)default(s|)' +
            '(:|[\\s](to|at|is))[\\s]+(.*?)(\\]|\\)|([\\s]+|$))',
            enum: {
                values: '(<|\\(|\\")(([\\S]+(\\||\\",\\s\\"|\\"\\sor\\s\\"|' +
                ',\\s))+[\\S]+[^\\+<\\)\\"])(>|\\)|\\"|,\\s)',
                split: /[\|]|\",\s\"|\"\sor\s\"|,\s/,
            },
            usage: '(\\[|\\()deprecated.*(\\]|\\))',
        },
    },
    pathAlias: [
        'file',
        'path',
        'folder',
        'dir',
        'directory',
        'files',
    ],
    options: [],
    delimiter: '',
    get: {
        template: {
            argument: () => _.cloneDeep(argument),
        },
        dictionary: {
            types: () => _.cloneDeep(types),
            usage: () => _.cloneDeep(usage),
        },
    },
};

module.exports = context;
