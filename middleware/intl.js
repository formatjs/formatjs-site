'use strict';

var getMessages = require('../lib/messages');

module.exports = function (req, res, next) {
    var app           = req.app;
    var cache         = app.enabled('view cache');
    var defaultLocale = app.get('default locale');

    getMessages({cache: cache}).then(function (messages) {
        // Messages is a collection keyed by language tag, so the collection's
        // keys can be used to create the set of locales the app supports.
        var availableLocales = Object.keys(messages);

        // Use content negotiation to find the best locale.
        var locale = req.acceptsLanguages(availableLocales) || defaultLocale;

        // Make the negotiated locale available on the request object.
        req.locale = locale;

        // Populate response locals with info for use when rendering the page.
        res.locals.locale           = locale;
        res.locals.availableLocales = availableLocales;

        var intlData = res.intl || (res.intl = {});

        Object.assign(intlData, {
            availableLocales: availableLocales,

            locales : [locale],
            messages: messages
        });

        res.expose(intlData, 'intl');
        setImmediate(next);
    }, next);
};
