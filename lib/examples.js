'use strict';

var fs           = require('fs');
var path         = require('path');
var transformJSX = require('react-tools').transform;
var yaml         = require('js-yaml');

var config          = require('../config');
var utils           = require('./utils');
var renderComponent = require('../lib/component').render;

exports.get    = getExamples;
exports.render = renderExamples;

// -----------------------------------------------------------------------------

var readDir  = utils.promisify(fs.readdir);
var readFile = utils.promisify(fs.readFile);
var stat     = utils.promisify(fs.stat);

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

function renderExamples(examples, intl) {
    if (!Array.isArray(examples)) {
        throw new Error('An array of examples must be provided to render');
    }

    if (!intl || typeof intl !== 'object') {
        throw new Error('An intl object must be provided to render examples');
    }

    return examples.reduce(function (hash, example) {
        hash[example.name] = renderComponent(example.type + '-example', {
            example: example,
            intl   : intl
        });

        return hash;
    }, {});
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
    return Promise.all(names.map(function (name) {
        return Promise.all([
            getMetadata(type, name),
            getSourceFiles(type, name)
        ]).then(function (files) {
            var metadata    = files[0];
            var sourceFiles = files[1];

            var example = {
                id    : 'ex-' + type + '-' + name,
                name  : name,
                type  : type,
                source: sourceFiles
            };

            if (metadata && metadata.messageId) {
                example.messageId = metadata.messageId;
            }

            if (sourceFiles.context) {
                example.context = evalContext(sourceFiles.context);
            }

            if (sourceFiles.component) {
                example.getComponent = wrapComponent(sourceFiles.component);
            }

            return example;
        });
    }));
}

function getMetadata(type, name) {
    var exampleDir = path.join(config.dirs.examples, type, name);

    return readFile(path.join(exampleDir, 'meta.yaml'), 'utf8')
        .then(function (contents) {
            return yaml.safeLoad(contents);
        }, function (err) {
            // Surpress error, okay if an example doesn't have a meta.yaml file.
            return null;
        });
}

function getSourceFiles(type, name) {
    var exampleDir = path.join(config.dirs.examples, type, name);

    switch (type) {
        case 'dust':
            return Promise.all([
                readFile(path.join(exampleDir, 'template.dust'), 'utf8'),
                readFile(path.join(exampleDir, 'context.js'), 'utf8')
            ]).then(function (sourceFiles) {
                return {
                    template: sourceFiles[0],
                    context : sourceFiles[1]
                };
            });

        case 'handlebars':
            return Promise.all([
                readFile(path.join(exampleDir, 'template.hbs'), 'utf8'),
                readFile(path.join(exampleDir, 'context.js'), 'utf8')
            ]).then(function (sourceFiles) {
                return {
                    template: sourceFiles[0],
                    context : sourceFiles[1]
                };
            });

        case 'react':
            return Promise.all([
                readFile(path.join(exampleDir, 'component.jsx'), 'utf8')
            ]).then(function (sourceFiles) {
                return {component: sourceFiles[0]};
            });

        default:
            throw new Error('Unsupported example type: ' + type);
    }
}

function evalContext(source) {
    // Why? Oh! Why!?
    // Ah yes, because we're normalizing template engines
    /*jslint evil: true*/
    return (new Function(source + '\nreturn context;'))();
    /*jslint evil: false*/
}

function wrapComponent(jsxSource) {
    // And in this case we're reusing the compiled source in the server
    /*jslint evil: true*/
    return new Function(transformJSX(jsxSource) + '\nreturn Component;');
    /*jslint evil: false*/
}
