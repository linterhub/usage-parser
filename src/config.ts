export const config  = {
    settings: {
        trimEnd: '.',
        example: ['example', 'usage'],
        blackList: {
            section: ['example'],
        },
        line: {
            breaker: /\r\n|\r|\n/gim,
            join: '  ',
        }
    },
    reg: {
        arg: {
            start: '(?:^|^ *)((-[^-]|--).*?)(?:\\s|=|$|,)',
            long: '(--(?:\\w|-|$)*)',
            short: '(?:\\s|^)(-[^-]*?)(?:\\s|=|$|,)',
        },
        enums: {
            values: '(?:[<(\["])(([\\S]+([|,]|\\sor\\s|,\\s))+[\\S]{1,})(?:[>)\\]"]|,\\s|$)',
            split: /\||<|>|\(|\)|\[|\]|\"|\'|,|\s|or/
        },
        command: '(?:^)(?:((?:\\w*\\s*){1,1})(?: |$))$',
        section: '(?:^)(?:((?:\\w*\\s*){1,2})(?::| |$)|(?:\\w*\\s*){3,4}(?::|$))$',
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
