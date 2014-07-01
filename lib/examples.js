'use strict';
/*
This module is responsible for returning an object of example data from the
`views/examples` directory. It accepts two arguments:

* type    {string}: Either 'dust', 'react', or 'hbs'
* options {object}: Right now, just supports the `cache` option.

Usage:

    var getExamples = require('path/to/this/file');
    getExamples('dust', {cache: true}).then(function (examples) {
        ...
    });

The returned `examples` object contains the following properties:

* `source` {string}: Source code (read directly from the file)

* `compiled` {function}: The compiled version of the source code, that you can
pass into Dust or Handlebars. In the case of React, this is the evaluated
JavaScript.

* `identifier` {string}: The name of the file. This is there to help with
rendering out Dust templates.

* `name` {string}: The name of the file, without the file extension. This is
there to help with exposing the templates client-side via express-state.

*/


var Promise        = require('ypromise'),
    fs             = require('pfs'),
    path           = require('path'),
    Dust           = require('dustjs-linkedin'),
    Hbs            = require('handlebars'),
    React          = require('react'),
    ReactIntlMixin = require('react-intl');

var config = require('../config');

// ----------------------------------------------

module.exports = getExamples;

//Cache
var examples = {};

function getExamples (type, opts) {
    opts = opts || {};
    type = type.toLowerCase();

    var examplesDir;

    function readAndCompile (filePath) {
        var dir      = path.join(examplesDir, filePath),
            fileName = path.basename(dir);

        return fs.readFile(dir, 'utf8').then(function (contents) {
            return compile(type, {
                identifier: fileName,
                name      : path.basename(fileName, path.extname(fileName)),
                source    : contents,
                dir       : dir
            });
        });
    }

    //Resolve from cache if it exists.
    if (!opts.cache || !examples[type]) {
        examplesDir = path.join(config.dirs.examples, type);

        examples[type] = fs.readdir(examplesDir)
            .then(function (allFiles) {
                return Promise.all(
                    allFiles.filter(isTemplateFile).map(readAndCompile)
                );
            });
    }

    return examples[type].then(function (results) {
        if (!results) {
            throw new Error('No examples found for template engine of type:' + type);
        }

        var exp = {};
        results.forEach(function (elem) {
            exp[elem.name] = {
                identifier: elem.identifier,
                name      : elem.name,
                source    : elem.source,
                compiled  : elem.compiled
            };
        });

        //Add to cache.
        return exp;
    });
}

function isTemplateFile (fileName) {
    var ext = path.extname(fileName);
    return ext === '.hbs' || ext === '.dust' || ext === '.js';
}

function compile (type, fileData) {
    switch (type) {
        case 'dust':
            fileData.compiled = Dust.compile(fileData.source, fileData.identifier);
            break;

        case 'handlebars':
            fileData.compiled = Hbs.compile(fileData.source);
            break;

        case 'react':
            //Send back the evaluated JS for React.
            fileData.compiled = eval(fileData.source);
            break;

        default:
            throw new Error('Cannot compile a template for the specified template type.');
    }

    return fileData;
}
