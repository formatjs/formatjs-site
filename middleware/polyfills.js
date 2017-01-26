'use strict';

var url = require('url');

module.exports = function (req, res, next) {
    var app              = req.app;
    var polyfillService  = app.get('polyfill service');
    var availableLocales = app.get('available locales');
    var isProduction     = app.get('env') === 'production';

    var features = [
        'Intl'
    ].concat(availableLocales.map(function (locale) {
        return 'locale-data-' + locale;
    }));

    var polyfillUrl = url.format({
        protocol: 'https:',
        host    : polyfillService.hostname,
        pathname: 'polyfill' + (isProduction ? '.min.js' : '.js'),

        query: {
            version : polyfillService.version,
            features: features.join(','),
        }
    });

    res.locals.polyfillUrl = polyfillUrl;
    next();
};
