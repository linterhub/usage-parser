const configSchema = require('./template/configSchema.json');
const configDefault = require('./template/configDefault.json');
const validate = require('jsonschema').validate;

const configValidation = (config) => {
    schemaValidating(config);
    fillingWithDefaults(configDefault, config);
    return config;
};

const schemaValidating = (config) => {
    const validatingResult = validate(config, configSchema).errors;

    if (validatingResult.length) {
        throw new TypeError(`Validation of config.json passed with errors: 
        ${validatingResult}`);
    }
};

const fillingWithDefaults = (defaults, config) => {
    Object.keys(defaults).forEach((key) => {
        !config[key] ? config[key] = defaults[key] : '';
         Object.keys(defaults[key])[0] !== '0'
             ? fillingWithDefaults(defaults[key], config[key]) : '';
    });
};

module.exports = configValidation;
