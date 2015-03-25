'use strict';

var glob = require('glob');
var path = require('path');

exports.port = process.env.PORT || 5000;

exports.dirs = {
    build   : path.resolve('build/'),
    i18n    : path.resolve('i18n/'),
    views   : path.resolve('views/pages/'),
    layouts : path.resolve('views/layouts/'),
    partials: path.resolve('views/partials/'),
    examples: path.resolve('views/examples/')
};

exports.availableLocales = glob.sync('*.yaml', {
    cwd: exports.dirs.i18n
}).map(function (file) {
    return path.basename(file, '.yaml');
});

exports.ga = 'UA-55722103-1';

exports.libSizes = require('./lib-sizes.json');

exports.polyfillService = {
    hostname: 'polyfills.yahooapis.com',
    version : require('./polyfill-service.json').version
};
