'use strict';

var Intl = global.Intl || require('intl');

// TODO: This should be required by `handlebars-helper-intl`.
require('intl-messageformat');

var fs           = require('fs'),
    path         = require('path'),
    express      = require('express'),
    expstate     = require('express-state'),
    hbsIntl      = require('handlebars-helper-intl'),
    compress     = require('compression'),
    errorhandler = require('errorhandler');

var config     = require('./config'),
    hbs        = require('./lib/hbs'),
    middleware = require('./middleware'),
    routes     = require('./routes');

// -----------------------------------------------------------------------------

var app = module.exports = express();

hbsIntl.registerWith(hbs.handlebars);
expstate.extend(app);

app.set('name', 'JS Intl Docs');
app.set('port', config.port);
app.set('locales', config.locales);
app.set('default locale', 'en-US');
app.set('state namespace', 'APP');

app.enable('strict routing');
app.enable('case sensitive routing');

app.engine(hbs.extname, hbs.engine);
app.set('view engine', hbs.extname);
app.set('views', config.dirs.views);

var allTranslations = config.locales.reduce(function (translations, locale) {
    translations[locale] = require(path.join(config.dirs.i18n, locale));
    return translations;
}, {});

app.expose(allTranslations, 'translations', { cache: true });

// -- Middleware ---------------------------------------------------------------

var router = express.Router({
    caseSensitive: app.get('case sensitive routing'),
    strict       : app.get('strict routing')
});

if (app.get('env') === 'development') {
    app.use(middleware.logger('tiny'));
}

app.use(compress());
app.use(middleware.intl);
app.use(router);
app.use(middleware.slash());
app.use('/bower_components/',  express.static(config.dirs.bower));
app.use(express.static(config.dirs.pub));

// When we get a favicon, we can uncomment this line
// app.use(express.favicon(path.join(config.dirs.pub, 'favicon.ico')));

// -- Routes -------------------------------------------------------------------

router.get('/', routes.render('home', 'home'));

router.get('/quickstart/',        routes.render('quickstart'));
router.get('/quickstart/browser', routes.render('quickstart/browser'));
router.get('/quickstart/node',    routes.render('quickstart/node'));

router.get('/handlebars', routes.handlebars);
router.get('/dust', routes.dust);
router.get('/react', routes.react);
router.get('/overview', routes.render('overview'));
router.get('/faq', routes.render('faq'));
router.get('/javascript', routes.render('javascript'));
router.get('/github', routes.render('github'));
