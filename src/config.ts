export const config  = {
    settings: {
        trimEnd: '.',
        blackList: {
            section: ['example'],
        },
        line: {
            breaker: /\n|\r/gim,
            join: '  ',
        }
    },
    reg: {
        arg: {
            start: '-',
            long: '(--(?:\\w|-|$)*)',
            short: '(?:\\s|^)(-[^-]*?)(?:\\s|=|$|,)',
        },
        enums: {
            values: '(?:[<(\["])(([\\S]+([|,]|\\sor\\s|,\\s))+[\\S]{1,})(?:[>)\\]"]|,\\s|$)',
            split: /\||<|>|\(|\)|\[|\]|\"|\'|,|\s|or/
        },
        section: '(?:\\s|^)(?:((?:\\w*\\s*){1,2})(?::| |$)|(?:\\w*\\s*){3,4}(?::|$))$',
        delimiter: '[\\s]*[-]+[^ \t(\n|\r\n)]+(\\s|=)[^ :\t(\n|\r\n)-]',
        tabulation: /\\s\\s|\\t|  /,
        deprecated: '(deprecated)',
        default: '(?:defaults*)(?:[:\'\"]|to|at|is|\\s){1,4}(.*?)(?:[[\\])\'\",]|\\s|$)',
        required: '(required)',
    },
    types: {
        string: [
            "string",
            "str",
            "dir",
            "directory",
            "path",
            "file"
        ],
        number: [
            "number",
            "integer",
            "int"
        ],
        array: [
            "array"
        ],
        object:  [
            "object"
        ],
        boolean: [
            "bool",
            "boolean"
        ],
    },
};
