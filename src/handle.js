'use strict';

const argumentTemplate = require('./template/argument.json');
const context = require('./template/context.js');

const handle = (help, config) => {
    try {
        context.options = [];
        context.delimiter = config.delimiter;
        Object.keys(context.section).forEach((sectionName) => {
            let contextSection = context.section[sectionName];
            let configSection = config.section[sectionName];
            let data = [];
            configSection.names.some((name) => {
                let section = findSection(name, help);
                if (section.length > 0) {
                    data = data.concat(section);
                } else {
                    configSection.postfix.some((postfix) => {
                        section = findSection(name + postfix, help);
                        if (section.length > 0) {
                            data = data.concat(section);
                            return false;
                        }
                    });
                }
            });
            if (data.length > 0) {
                data.forEach((object) =>
                    contextSection.func(object, context, argumentTemplate));
            } else if (contextSection.required) {
                throw new Error(`Required section ${sectionName} not found`);
            }
        });
        return context;
    } catch (error) {
        throw error;
    }
};

const findSection = (sectionName, help) => {
    try {
        const regularExp = new
            RegExp(`[\\s]+${sectionName}[\n]+\n?(?:[ \t].*?(?:\n|$))*`, 'gmi');
        const matches = help.match(regularExp);
        return matches ? matches.map((match) => match.trim()) : [];
    } catch (error) {
        throw error;
    }
};

module.exports = handle;
