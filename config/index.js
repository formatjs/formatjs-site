'use strict';

var env  = process.env,
    path = require('path');

module.exports = {

    env          : env.NODE_ENV,
    isDevelopment: env.NODE_ENV !== 'production',
    isProduction : env.NODE_ENV === 'production',

    port: env.PORT || 5000,

    dirs: {
        pub     : path.resolve('public/'),
        bower   : path.resolve('bower_components/'),
        views   : path.resolve('views/pages/'),
        layouts : path.resolve('views/layouts/'),
        partials: path.resolve('views/partials/')
    }
};
