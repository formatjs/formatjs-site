'use strict';

var fs   = require('fs'),
    path = require('path');

exports = module.exports = {
    port: process.env.PORT || 5000,

    dirs: {
        i18n    : path.resolve('i18n/'),
        pub     : path.resolve('public/'),
        bower   : path.resolve('bower_components/'),
        intl    : path.resolve('node_modules/intl-messageformat/build/'),
        views   : path.resolve('views/pages/'),
        layouts : path.resolve('views/layouts/'),
        partials: path.resolve('views/partials/'),
        examples: path.resolve('views/examples/')
    }
};

// Get list of the app's supported locales by looking for files in its i18n dir.
exports.locales = fs.readdirSync(exports.dirs.i18n).filter(function (file) {
    return path.extname(file) === '.json';
}).map(function (file) {
    return path.basename(file, '.json');
});
