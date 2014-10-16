'use strict';

var STATUS_CODES = require('http');

var fs   = require('fs'),
    path = require('path');

exports.error      = error;
exports.requireDir = requireDir;
exports.promisify  = promisify;

// -----------------------------------------------------------------------------

function error(statusCode, message) {
    var err;

    if (message instanceof Error) {
        err = message;
    } else {
        err = new Error(message || STATUS_CODES[statusCode]);
    }

    err.status = statusCode;
    return err;
}

function requireDir(dir) {
    return fs.readdirSync(dir).reduce(function (modules, filename) {
        if (filename === 'index.js' || path.extname(filename) !== '.js') {
            return modules;
        }

        var moduleName = path.basename(filename, '.js'),
            module     = dir + '/' + moduleName;

        if (typeof module === 'function' && module.name) {
            moduleName = module.name;
        }

        modules[moduleName] = module;
        return modules;
    }, {});
}

function promisify(fn) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return new Promise(function (resolve, reject) {
            args.push(function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
            fn.apply(null, args);
        });
    };
}
