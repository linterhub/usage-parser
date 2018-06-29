const templatizer = (options) => {
    const argumentsTemplate = require('./template/args.json');
    const optionTemplate = require('.template/option.json');

    let result = argumentsTemplate;
    options.forEach((option) => {
        let optionSchema = optionTemplate.slice();
        const argumentName = option[1];
        switch (argumentName){
            //TODO: arguments with prefix linterhub:
            default:
                optionSchema.id = (option[2] === 1 ? "args:" : "") + option[1];
                //TODO: argument types
                optionSchema.type = "string";
                optionSchema.description = option[4];
                optionSchema.default = option[3] ? option[3] : "";
        }
        result.definitions.arguments.properties[argumentName] = optionSchema;
    });

    return result;
};

module.exports = templatizer;
