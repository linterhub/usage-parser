#!/usr/bin/env node

import fs from 'fs';
import commander from 'commander';
import UsageParser from './index';
import {execSync} from 'child_process';

const runParser = (doc: string) => {
    const usage = new UsageParser(doc);
    console.log(JSON.stringify(usage.parse(), null, 4));
};

commander
    .version('2.0.0')
    .usage('[options] <binary>')
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
    .action((binary) => {
        commander.docs = execSync(`npx ${binary} --help`).toString();
    })
    .description(
        'Parse help page specifying binary as argument or content as option')
    .on('--help', () => {
        console.log('');
        console.log('Examples:');
        console.log('  $ usage-parser mocha');
        console.log('  $ usage-parser eslint');
        console.log('  $ usage-parser --file "usage-file.txt"');
        console.log('  $ usage-parser --docs "usage text"');
    })
    .parse(process.argv);


if (commander.docs || commander.file) {
    runParser(commander.docs ? commander.docs :
         fs.readFileSync(commander.file).toString());
} else if (process.stdin && !process.stdin.isTTY) {
    let doc = '';

    process.stdin.setEncoding('utf-8');
    process.stdin.on('readable', () => {
        let chunk = process.stdin.read();
        while(chunk !== null) {
            doc += chunk;
            chunk = process.stdin.read();
        }
    });

    process.stdin.on('end', () => runParser(doc));
} else {
    commander.help();
}
