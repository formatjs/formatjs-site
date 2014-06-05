'use strict';

var Intl = global.Intl || require('intl');

// TODO: This should be required by `handlebars-helper-intl`.
require('intl-messageformat');

var express      = require('express'),
    hbsIntl      = require('handlebars-helper-intl'),
    compress     = require('compression'),
    errorhandler = require('errorhandler'),

    config       = require('./config'),
    hbs          = require('./lib/hbs'),
    routes       = require('./routes');

var app     = module.exports = express(),
    router  = express.Router();

hbsIntl.registerWith(hbs.handlebars);

app.set('name', 'JS Intl Docs');
app.set('env', config.env);
app.set('port', config.port);

app.set('locales', ['en-US']);

//You can change this to change the language that the examples are rendered in by default.
app.set('default locale', 'en-US');

app.enable('strict routing');
app.enable('case sensitive routing');

app.engine(hbs.extname, hbs.engine);
app.set('view engine', hbs.extname);
app.set('views', config.dirs.views);

app.use(express.static(config.dirs.pub));
app.use('/bower_components',  express.static(config.dirs.bower));
app.use(compress());

//When we get a favicon, we can uncomment this line
//app.use(express.favicon(path.join(config.dirs.pub, 'favicon.ico')));


///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

router.route('/').get(routes.home);
router.route('/handlebars/').get(routes.handlebars);


app.use('/', router);
