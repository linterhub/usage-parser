const templatizer = (options) => {
    const argumentsTemplate = require('./template/args.json');
    const optionTemplate = require('./template/option.json');

    let result = argumentsTemplate;
    options.map(option => {
        let optionSchema = Object.assign({}, optionTemplate);
        const argumentName = option.longName;
        switch (argumentName){
            //TODO: arguments with prefix linterhub:
            default:
                optionSchema.id = option.longName;
                //TODO: argument types
                optionSchema.type = "string";
                optionSchema.description = option.description;
                optionSchema.default = option.defaultValue;
        }
        result.definitions.arguments.properties[argumentName] = optionSchema;
    });

    return result;
};

module.exports = templatizer;
