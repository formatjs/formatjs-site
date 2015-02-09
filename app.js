'use strict';

// -- Configure JavaScript Runtime ---------------------------------------------

var hasNativeIntl    = !!global.Intl,
    hasNativePromise = !!global.Promise;

require('es6-shim');

hasNativeIntl    || (global.Intl = require('intl'));
hasNativePromise || (global.Promise = require('ypromise'));

global.React          = require('react/addons');
global.ReactIntl      = require('react-intl');
global.Handlebars     = require('handlebars');
global.HandlebarsIntl = require('handlebars-intl');
global.dust           = require('dustjs-linkedin');
global.DustIntl       = require('dust-intl');

// -----------------------------------------------------------------------------

var path     = require('path'),
    express  = require('express'),
    expstate = require('express-state'),
    reverend = require('reverend');

var config     = require('./config'),
    hbs        = require('./lib/hbs'),
    middleware = require('./middleware'),
    routes     = require('./routes');

DustIntl.registerWith(dust);

// -- Configure Express App ----------------------------------------------------

var app = module.exports = express();

expstate.extend(app);

app.set('name', 'FormatJS');
app.set('port', config.port);
app.set('available locales', config.availableLocales);
app.set('default locale', 'en-US');
app.set('state namespace', 'APP');

app.enable('strict routing');
app.enable('case sensitive routing');

app.engine(hbs.extname, hbs.engine);
app.set('view engine', hbs.extname);
app.set('views', config.dirs.views);

if (app.get('env') === 'development') {
    // This will watch files during development and automattically re-build.
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

routes.home(route('/'));
routes.about(route('/about/'));
routes.guide(route('/guide/'));
routes.integrations(route('/integrations/'));
routes.github(route('/github/'));

routes.handlebars(route('/handlebars/'));
routes.react(route('/react/'));
routes.dust(route('/dust/'));
routes.ember(route('/ember/'));

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

    menuItems    : ['guide', 'integrations', 'github'].map(app.getRoute),
    footMenuItems: ['home', 'about', 'guide', 'integrations', 'github'].map(app.getRoute),

    helpers: {
        pathTo: function (name, options) {
            return app.getPathTo(name, options.hash);
        }
    }
});

if (app.get('env') === 'production') {
    app.locals.analytics = config.ga;
}