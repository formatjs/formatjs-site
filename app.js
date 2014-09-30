'use strict';

// -- Configure JavaScript Runtime ---------------------------------------------

var hasNativeIntl    = !!global.Intl,
    hasNativePromise = !!global.Promise;

require('es6-shim');

hasNativeIntl    || (global.Intl = require('intl'));
hasNativePromise || (global.Promise = require('ypromise'));

global.React          = require('react/addons');
global.ReactIntlMixin = require('react-intl');
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
app.use(middleware.static(path.join(config.dirs.build, 'client')));
app.use(router);
app.use(middleware.slash());

// -- Routes -------------------------------------------------------------------

var route = router.route.bind(router);

router.use(middleware.intl);

routes.home(route('/'));
routes.about(route('/about/'));
routes.guide(route('/guide/'));
routes.integrations(route('/integrations/'));
routes.github(route('/github/'));

routes.handlebars(route('/handlebars/'));
routes.react(route('/react/'));
routes.dust(route('/dust/'));

app.getPathTo = function (routeName, context) {
    var path;

    router.stack.some(function (layer) {
        if (layer.route && layer.route.name === routeName) {
            path = layer.route.path;
        }
    });

    if (!path) {
        throw new ReferenceError('No route named: ' + routeName);
    }

    return reverend(path, context);
};

// -- Locals -------------------------------------------------------------------

Object.assign(app.locals, {
    brand      : app.get('name'),
    description: 'Internationalize your web apps on the client and server in JavaScript.',

    min: app.get('env') === 'production' ? '.min' : '',

    menuItems: router.stack
        .filter(function (layer) {
            return layer.route && layer.route.menu;
        })
        .map(function (layer) {
            return {
                name : layer.route.name,
                label: layer.route.menu
            };
        }),

    helpers: {
        pathTo: function (name, options) {
            return app.getPathTo(name, options.hash);
        }
    }
});
