'use strict';

const argumentTemplate = require('./template/argument.json');
const context = require('./template/context.js');

const handle = (help, config) => {
    try {
        context.options = [];
        Object.keys(context.section).forEach((sectionName) => {
            let section = context.section[sectionName];
            let sectionTitle = config.section[sectionName].name;
            const data = findSection(sectionTitle, help);
            if (data.length > 0) {
                data.forEach((object) =>
                    section.func(object, context, argumentTemplate));
            } else if (section.required) {
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
            RegExp(`[^\n]*${sectionName}[^\n]*\n?(?:[ \t].*?(?:\n|$))*`, 'gi');
        const matches = help.match(regularExp);
        return matches ? matches.map((match) => match.trim()) : [];
    } catch (error) {
        throw error;
    }
};

module.exports = handle;
