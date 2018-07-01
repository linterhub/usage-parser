const handle = (help) => {
    const sectionName = "Options:";
    let options = [];

    parseSection(sectionName, help).forEach(section => {
        splitSection(section).forEach(option => {
            if (option.indexOf("-") === 0) {
                options.push(parseOption(option));
            }
        });
    });
    return options;
};

const parseSection = (sectionName, help) => {
    //TODO: create implementation
    let section = [];
    return section;
};

const splitSection = (section) => {
    //TODO: create implementation
    let split = [];
    return split;
};

const parseOption = (option) => {
    //TODO: create implementation
    return [];
};

module.exports = handle;
