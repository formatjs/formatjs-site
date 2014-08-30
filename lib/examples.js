'use strict';

var fs   = require('fs'),
    path = require('path');

var config          = require('../config'),
    utils           = require('./utils'),
    renderComponent = require('../lib/component').render;

exports.get    = getExamples;
exports.render = renderExamples;

// -----------------------------------------------------------------------------

var readDir  = utils.promisify(fs.readdir),
    readFile = utils.promisify(fs.readFile),
    stat     = utils.promisify(fs.stat);

var cache = {};

function getExamples(type, options) {
    if (!type) {
        throw new Error('An example type must be provided');
    }

    options || (options = {});

    var examples = options.cache && cache[type];
    if (examples) { return examples; }

    var examplesDir = path.join(config.dirs.examples, type);

    examples = cache[type] = readDir(examplesDir)
        .then(getSubdirs.bind(null, examplesDir))
        .then(processExamples.bind(null, type));

    return examples.catch(function (e) {
        // Remove from cache if there's an error.
        delete cache[type];
        throw e;
    });
}

function renderExamples(type, intl, options) {
    if (!type) {
        throw new Error('An example type must be provided');
    }

    if (!intl || typeof intl !== 'object') {
        throw new Error('An intl object must be provided to render examples');
    }

    return getExamples(type, options).then(function (examples) {
        return examples.reduce(function (hash, example) {
            hash[example.name] = utils.extend({}, example, {
                rendered: renderComponent(example.type + '-example', {
                    source : example.source.template,
                    context: example.context,
                    intl   : intl
                })
            });

            return hash;
        }, {});
    });
}

function getSubdirs(dir, entries) {
    return Promise.all(entries.map(function (entry) {
        return stat(path.join(dir, entry));
    })).then(function (stats) {
        return entries.filter(function (entry, i) {
            return stats[i].isDirectory();
        });
    });
}

function processExamples(type, names) {
    var examplesDir = path.join(config.dirs.examples, type),
        extname     = getTypeExtname(type);

    return Promise.all(names.map(function (name) {
        var sourceFiles = [
            readFile(path.join(examplesDir, name, 'template' + extname), 'utf8'),
            readFile(path.join(examplesDir, name, 'context.js'), 'utf8')
        ];

        return Promise.all(sourceFiles).then(function (sourceFiles) {
            var template = sourceFiles[0],
                context  = sourceFiles[1];

            return {
                id     : 'ex-' + type + '-' + name,
                name   : name,
                type   : type,
                context: evalContext(context),

                source: {
                    template: template,
                    context: context
                }
            };
        });
    }));
}

function getTypeExtname(type) {
    switch (type) {
        case 'dust'      : return '.dust';
        case 'handlebars': return '.hbs';
        case 'react'     : return '.js';

        default:
            throw new Error('Unsupported template type: ' + type);
    }
}

function evalContext(source) {
    return (new Function(source + '\nreturn context;'))();
}
