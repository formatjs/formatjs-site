'use strict';

var exphbs         = require('express-handlebars'),
    Handlebars     = require('handlebars'),
    HandlebarsIntl = require('handlebars-helper-intl');

var config  = require('../config'),
    helpers = require('./helpers');

HandlebarsIntl.registerWith(Handlebars);

module.exports = exphbs.create({
    defaultLayout: 'main',
    handlebars   : Handlebars,
    helpers      : helpers,
    layoutsDir   : config.dirs.layouts,
    partialsDir  : config.dirs.partials,
    extname      : '.hbs'
});
