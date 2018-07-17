'use strict';

const cfg = require('./config.json');

const amd = {
    eslint: require('gulp-eslint'),
    gulp: require('gulp'),
    hubRegistry: require('gulp-hub'),
};

exports = module.exports = {
    cfg: cfg,
    amd: amd,
};
