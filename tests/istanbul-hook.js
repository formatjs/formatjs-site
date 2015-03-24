'use strict';

var istanbul  = require('istanbul');
var minimatch = require('minimatch');

// Set of files we want Istanbul to _really_ ignore.
var IGNORE_FILES = [
    '**/node_modules/**'
];

function isIgnoredFile(file) {
    return IGNORE_FILES.some(function (pattern) {
        return minimatch(file, pattern);
    });
}

// Override Istanbul's `require()` hook, so that certain modules, like
// polyfills, can be _really_ ignored from Istanbul coverage numbers.
var istanbulRequireHook = istanbul.hook.hookRequire;
istanbul.hook.hookRequire = function (matcher, transformer, options) {
    istanbulRequireHook(matcher, function (code, filename) {
        if (isIgnoredFile(filename)) {
            console.log('Ignoring from code coverage: %s', filename);
            return code;
        }

        return transformer(code, filename);
    }, options);
};

// Satisfy post-require-hook interface.
module.exports = function () {};
