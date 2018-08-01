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
            if (Array.isArray(configSection.names)) {
                for (let name of configSection.names) {
                    data = setSectionByNames(
                        name,
                        data,
                        help,
                        context,
                        configSection);
                }
            } else {
                data = setSectionByNames(
                    configSection.names,
                    data,
                    help,
                    context,
                    configSection);
            }
            if (data.length > 0) {
                data.forEach((object) =>
                    contextSection.func(object, context, argumentTemplate));
            } else if (configSection.parseWhole) {
                contextSection.func(help, context, argumentTemplate);
            } else if (contextSection.required) {
                throw new Error(`Required section ${sectionName} not found`);
            }
        });
        return context;
    } catch (error) {
        throw error;
    }
};

const findSection = (sectionName, help, context) => {
    try {
        const regularExp = new RegExp(context.regexp.findSection.start +
            sectionName + context.regexp.findSection.end, 'gmi');
        const matches = help.match(regularExp);
        return matches ? matches.map((match) => match.trim()) : [];
    } catch (error) {
        throw error;
    }
};

const setSectionByNames = (name, data, help, context, configSection) => {
    let section = findSection(name, help, context);
    return validateSection(section) ? data.concat(section) :
            Array.isArray(configSection.postfix) ?
                setSectionWithPostfixArray(
                    name, help, context, configSection, data) :
                setSectionWithPostfixSingle(
                    name, help, context, configSection.postfix, data);
};

const validateSection = (section) => {
        return section.length > 0;
};

const setSectionWithPostfixArray =
    (name, help, context, configSection, data) => {
    for (let postfix of configSection.postfix) {
        let section = findSection(name + postfix, help, context);
        if (validateSection(section)) {
            data = data.concat(section);
        }
    }
    return data;
};

const setSectionWithPostfixSingle = (name, help, context, postfix, data) => {
    let section = findSection(name + postfix, help, context);
    return validateSection(section) ? data.concat(section) : data;
};

module.exports = handle;
