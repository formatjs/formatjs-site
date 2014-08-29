var exphbs     = require('express-handlebars'),
    Handlebars = require('handlebars');

var config  = require('../config'),
    helpers = require('./helpers');

module.exports = exphbs.create({
    defaultLayout: 'main',
    handlebars   : Handlebars,
    helpers      : helpers,
    layoutsDir   : config.dirs.layouts,
    partialsDir  : config.dirs.partials,
    extname      : '.hbs'
});
