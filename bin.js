#!/usr/bin/env node

const parser = require('./src/parser');
const configDefault = require('./src/template/configDefault.json');
const {execSync} = require('child_process');
const version = require('./package.json').version;
const program = require('commander');

program
    .version(version)
    .option(
        '-c, --config <config>',
        'Custom config in json format',
        configDefault)
    .option(
        '-d, --docs <docs>',
        'The help page content (pass without <binary> argument)',
        undefined)
    .arguments('<binary>')
    .action(function(binary) {
        program.docs = execSync(`${binary} --help`).toString();
    })
    .description('Parse help page specifying binary as argument or content as option')
    .parse(process.argv);

if (program.docs) {
    console.log(JSON.stringify(parser(program.docs, program.config), null, 2));
} else {
    program.help();
}
