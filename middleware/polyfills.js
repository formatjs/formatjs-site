'use strict';

var url = require('url');

module.exports = function (config) {
    return function (req, res, next) {
        var polyfillUrl = url.format({
            protocol: req.protocol,
            host    : config.host,
            pathname: config.pathname,

            query: {
                maybe: config.polyfills.join(','),
                ua   : req.get('User-Agent')
            }
        });

        res.locals.polyfillUrl = polyfillUrl;
        next();
    };
};
