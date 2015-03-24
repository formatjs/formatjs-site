/* global Intl, IntlPolyfill */
'use strict';

var config = require('./config');

// -- Configure JavaScript Runtime ---------------------------------------------

var hasNativeIntl    = !!global.Intl;
var hasNativePromise = !!global.Promise;

require('es6-shim');

// es6-shim provides a Promise implementation, but it's not very good.
hasNativePromise || (global.Promise = require('promise'));

// Determine if the native `Intl` has the locale data we need.
var hasNativeLocaleData = hasNativeIntl &&
    config.availableLocales.every(function (locale) {
        return Intl.NumberFormat.supportedLocalesOf(locale)[0] === locale;
    });

if (!hasNativeIntl) {
    // No `Intl`, so use and load the polyfill.
    global.Intl = require('intl');
} else if (!hasNativeLocaleData) {
    // `Intl` exists, but it doesn't have the data we need, so load the polyfill
    // and replace the constructors with need with the polyfill's.
    require('intl');
    Intl.NumberFormat   = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
}

// -- FormatJS Libs ------------------------------------------------------------

global.React          = require('react/addons');
global.ReactIntl      = require('react-intl');
global.Handlebars     = require('handlebars');
global.HandlebarsIntl = require('handlebars-intl');
global.dust           = require('dustjs-linkedin');
global.DustIntl       = require('dust-intl');

global.DustIntl.registerWith(global.dust);

// -----------------------------------------------------------------------------

var path     = require('path');
var express  = require('express');
var expstate = require('express-state');
var reverend = require('reverend');

var hbs        = require('./lib/hbs');
var middleware = require('./middleware');
var routes     = require('./routes');

// -- Configure Express App ----------------------------------------------------

var app = module.exports = express();

expstate.extend(app);

app.set('name', 'FormatJS');
app.set('port', config.port);
app.set('polyfill service', config.polyfillService);
app.set('available locales', config.availableLocales);
app.set('default locale', 'en-US');
app.set('state namespace', 'APP');

app.enable('strict routing');
app.enable('case sensitive routing');

app.engine(hbs.extname, hbs.engine);
app.set('view engine', hbs.extname);
app.set('views', config.dirs.views);

if (app.get('env') === 'development') {
    // This will watch files during development and automatically re-build.
    app.watcher = require('./lib/watcher');
}

// -- Middleware ---------------------------------------------------------------

var router = express.Router({
    caseSensitive: app.get('case sensitive routing'),
    strict       : app.get('strict routing')
});

if (app.get('env') === 'development') {
    app.use(middleware.logger('tiny'));
}

app.use(middleware.compress());
app.use(middleware.favicon(path.join('./public/favicon.ico')));
app.use(middleware.static(path.join(config.dirs.build, 'client'), {maxage: '1m'}));
app.use(router);
app.use(middleware.slash());

// -- Routes -------------------------------------------------------------------

var route = router.route.bind(router);

router.use(middleware.fixBadSafari);
router.use(middleware.intl);
router.use(middleware.polyfills);

routes.home(route('/'));
routes.about(route('/about/'));
routes.guides(route('/guides/:guide?/'));
routes.integrations(route('/integrations/'));
routes.github(route('/github/'));

routes.react(route('/react/'));
routes.ember(route('/ember/'));
routes.handlebars(route('/handlebars/'));
routes.dust(route('/dust/'));

route('/guide/').get(routes.redirect('/guides/'));

app.getRoute = function (routeName) {
    var layer = router.stack.find(function (layer) {
        return layer.route && layer.route.name === routeName;
    });

    if (!layer) {
        throw new Error('No route name: ' + routeName);
    }

    return layer.route;
};

app.getPathTo = function (routeName, context) {
    return reverend(app.getRoute(routeName).path, context);
};

// -- Locals -------------------------------------------------------------------

Object.assign(app.locals, {
    brand  : app.get('name'),
    tagline: 'Internationalize your web apps on the client & server.',

    min: app.get('env') === 'production' ? '.min' : '',

    menuItems    : ['guides', 'integrations', 'github'].map(app.getRoute),
    footMenuItems: ['home', 'about', 'guides', 'integrations', 'github'].map(app.getRoute),

    helpers: {
        pathTo: function (name, options) {
            return app.getPathTo(name, options.hash);
        }
    }
});

if (app.get('env') === 'production') {
    app.locals.analytics = config.ga;
}
