// Import templates
const configSchema = require('./template/configSchema.json');
const configDefault = require('./template/configDefault.json');

// Import npm package
const validate = require('jsonschema').validate;

/**
 * Validate and fill with defaults configuration
 * @param {object} config - user configuration
 * @return {object} - validated configuration
 */
const configValidation = (config) => {
    schemaValidating(config);
    fillingWithDefaults(configDefault, config);
    return config;
};

/**
 * Validate configuration by JSON-Schema
 * @param {object} config - user configuration
 * @throws {error} - if config doesn't match schema
 */
const schemaValidating = (config) => {
    const validatingResult = validate(config, configSchema).errors;

    if (validatingResult.length) {
        throw new TypeError(`Validation of config.json passed with errors: 
        ${validatingResult}`);
    }
};

/**
 * Fill missing configuration fields with defaults
 * @param {object} defaults - default configuration
 * @param {object} config - user configuration
 */
const fillingWithDefaults = (defaults, config) => {
    Object.keys(defaults).forEach((key) => {
        config[key] =
            typeof(config[key]) !== 'undefined' ? config[key] : defaults[key];
         Object.keys(defaults[key])[0] !== '0'
             ? fillingWithDefaults(defaults[key], config[key]) : '';
    });
};

// Export function
module.exports = configValidation;
