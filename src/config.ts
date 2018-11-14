export const config  = {
    settings: {
        line: {
            breaker: /\n|\r/gim,
            join: '  ',
        }
    },
    reg: {
        arg: {
            start: '-',
        },
        section: '^(?:((?:\\w*\\s*){1,2})(?::|)|(?:\\w*\\s*){3,4}(?::))$',
        delimiter: '[\\s]*[-]+[^ \t(\n|\r\n)]+(\\s|=)[^ :\t(\n|\r\n)-]',
    },
};
