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
    let split = [];
    const regularExp = "\n[ \t]*";
    let splitTmp = section.split(regularExp).slice(1);
    let j = 0;
    splitTmp.forEach(splitTmp => {
        if (splitTmp.indexOf("-") === 0 && j > 0) {
            split.push(splitTmp);
            j++;
        } else {
            split[j - 1] = split[j - 1] + splitTmp;
        }
    });
    return split;
};

const parseOption = (option) => {
    //TODO: create implementation
    return [];
};

module.exports = handle;
