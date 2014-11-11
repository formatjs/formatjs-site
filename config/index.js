'use strict';

var path = require('path');

exports = module.exports = {
    port: process.env.PORT || 5000,

    dirs: {
        build   : path.resolve('build/'),
        i18n    : path.resolve('i18n/'),
        views   : path.resolve('views/pages/'),
        layouts : path.resolve('views/layouts/'),
        partials: path.resolve('views/partials/'),
        examples: path.resolve('views/examples/')
    },

    ga: 'UA-55722103-1'
};
