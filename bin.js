#!/usr/bin/env node

const parser = require('./src/parser');
const configDefault = require('./src/template/configDefault.json');
const {execSync} = require('child_process');
const version = require('./package.json').version;
const program = require('commander');
const fs = require('fs');

const runParser = (doc, config) => {
    console.log(JSON.stringify(parser(doc, config), null, 4));
};

program
    .version(version)
    .option(
        '-c, --config <config>',
        'Custom config in json format',
        configDefault
    )
    .option(
        '-d, --docs <docs>',
        'The help page content (pass without <binary> argument)',
        undefined
    )
    .option(
        '-f, --file <file>',
        'Path to a file with CLI docs',
        undefined
    )
    .arguments('<binary>')
    .action(function(binary) {
        program.docs = execSync(`${binary} --help`).toString();
    })
    .description(
        'Parse help page specifying binary as argument or content as option')
    .parse(process.argv);


if (program.docs || program.file) {
    runParser(program.docs ? program.docs :
        fs.readFileSync(program.file, 'utf8'), program.config);
} else if (process.stdin && !process.stdin.isTTY) {
    let doc = '';
    process.stdin.setEncoding('utf-8');

    process.stdin.on('readable', () => {
        let chunk;
        while (chunk = process.stdin.read()) {
            doc += chunk;
        }
    });

    process.stdin.on('end', () => runParser(doc, program.config));
} else {
    program.help();
}
