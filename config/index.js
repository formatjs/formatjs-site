'use strict';

var path = require('path');

exports = module.exports = {
    port: process.env.PORT || 5000,

    dirs: {
        build   : path.resolve('build/'),
        i18n    : path.resolve('i18n/'),
        examples: path.resolve('examples/'),
        views   : path.resolve('views/pages/'),
        layouts : path.resolve('views/layouts/'),
        partials: path.resolve('views/partials/')
    }
};
