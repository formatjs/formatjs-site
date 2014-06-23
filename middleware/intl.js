'use strict';

var path = require('path');

var config = require('../config');

module.exports = function (req, res, next) {
    var app      = req.app,
        locales  = app.get('locales'),
        locale   = req.acceptsLanguage(locales) || app.get('default locale'),
        messages = require(path.join(config.dirs.i18n, locale)),
        allMessages = locales.reduce(function (translations, locale) {
            translations[locale] = require(path.join(config.dirs.i18n, locale));
            return translations;
        }, {});

    req.locale = locale;

    res.locals.intl || (res.locals.intl = {});
    res.locals.intl.locale   = locale;
    res.locals.intl.messages = messages;

    // TODO: Handle/merge and Expose the common formats.
    res.expose(res.locals.intl, 'intl')
    res.expose(allMessages, 'translations');

    next();
};
