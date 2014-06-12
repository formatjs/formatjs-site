'use strict';

var path = require('path');

var config = require('../config');

module.exports = function (req, res, next) {
    var app      = req.app,
        locales  = app.get('locales'),
        locale   = req.acceptsLanguage(locales) || app.get('default locale'),
        messages = require(path.join(config.dirs.i18n, locale));

    req.locale = locale;

    res.locals.intl || (res.locals.intl = {});
    res.locals.intl.locale   = locale;
    res.locals.intl.messages = messages;

    // TODO: Handle/merge and Expose the common formats.

    next();
};
