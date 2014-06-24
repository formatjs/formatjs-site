var STATUS_CODES = require('http');

var fs   = require('fs'),
    path = require('path');

exports.error      = error;
exports.requireDir = requireDir;
exports.extend     = extend;

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
            module     = require(path.join(dir, moduleName));

        if (typeof module === 'function' && module.name) {
            moduleName = module.name;
        }

        modules[moduleName] = module;
        return modules;
    }, {});
}

function extend(obj) {
    Array.prototype.slice.call(arguments, 1).forEach(function (source) {
        if (!source) { return; }

        for (var key in source) {
            obj[key] = source[key];
        }
    });

    return obj;
}
