'use strict';

var getMessages = require('../lib/messages');

module.exports = function (req, res, next) {
    var app           = req.app,
        cache         = app.enabled('view cache'),
        defaultLocale = app.get('default locale');

    getMessages({cache: cache}).then(function (messages) {
        var availableLocales = Object.keys(messages);

        // Make sure the default locale is first in the list of avilable locales,
        // Use content negotiation to find the best locale.
        var locale = req.acceptsLanguages(availableLocales) || defaultLocale;

        req.locale = locale;

        res.locals.locale           = locale;
        res.locals.availableLocales = availableLocales;

        var intlData = res.intl || (res.intl = {});

        Object.assign(intlData, {
            availableLocales: availableLocales,

            locales : [locale],
            messages: messages
            // TODO: Handle/merge and Expose the common formats.
        });

        res.expose(intlData, 'intl');
        setImmediate(next);
    }, next);
};
