'use strict';

const config = require('./config.json');

const core = global.lhcore;
const gulp = core.amd.gulp;
const eslint = core.amd.eslint;

// Lint and auto-fix all js files
const js = () => gulp
    .src([
        config.src.js,
        config.src.exclude.node,
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

gulp.task('lint:js', js);
gulp.task('lint:all', gulp.parallel('lint:js'));
