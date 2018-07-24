'use strict';

const argumentTemplate = require('./template/argument.json');
const context = require('./template/context.js');

const handle = (help, config) => {
    try {
        Object.keys(context.section).forEach((sectionName) => {
            let section = context.section[sectionName];
            let sectionTitle = config.section[sectionName].name;
            section.data = findSection(sectionTitle, help);
            if (section.data.length > 0) {
                section.data.forEach((data) =>
                    section.func(data, context, argumentTemplate));
            } else if (section.required) {
                const sectionNotFound =
                    new TypeError(`Required section ${sectionName} not found`);
                throw sectionNotFound;
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
