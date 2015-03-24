'use strict';

var path     = require('path');
var istanbul = require('istanbul');

// Set of files we want Istanbul to _really_ ignore.
var IGNORE_FILES = [
    './node_modules/es6-shim/es6-shim.js'
];

// Override Istanbul's `require()` hook, so that certain modules, like
// polyfills, can be _really_ ignored from Istanbul coverage numbers.
var istanbulRequireHook = istanbul.hook.hookRequire;
istanbul.hook.hookRequire = function (matcher, transformer, options) {
    var ignoreFiles = IGNORE_FILES.reduce(function (hash, filename) {
        hash[path.resolve(filename)] = true;
        return hash;
    }, {});

    istanbulRequireHook(matcher, function (code, filename) {
        if (ignoreFiles[filename]) {
            console.log('Ignoring from code coverage: %s', filename);
            return code;
        }

        return transformer(code, filename);
    }, options);
};

// Satisfy post-require-hook interface.
module.exports = function () {};
