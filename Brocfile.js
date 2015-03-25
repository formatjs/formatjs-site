'use strict';

var autoprefixer     = require('autoprefixer-core');
var compileJSX       = require('broccoli-react');
var compileModules   = require('broccoli-es6-module-transpiler');
var concatTree       = require('broccoli-concat');
var customProperties = require('postcss-custom-properties');
var mergeTrees       = require('broccoli-merge-trees');
var postcss          = require('./broccoli/postcss');
var unwatchedTree    = require('broccoli-unwatched-tree');
var Funnel           = require('broccoli-funnel');

var config = require('./config');

// -----------------------------------------------------------------------------

function copy(tree, mappings) {
    var trees = Object.keys(mappings).map(function (srcDir) {
        var destDir = mappings[srcDir];
        return new Funnel(tree, {srcDir: srcDir, destDir: destDir});
    });

    return mergeTrees(trees);
}

// -- Shared -------------------------------------------------------------------

var shared = compileJSX('shared/', {
    transform: {
        es6module: true,
        harmony  : true
    }
});

// -- Server -------------------------------------------------------------------

var server = compileModules(shared, {
    description: 'ServerModules',
    formatter  : 'commonjs',
    output     : 'server/'
});

// -- Client -------------------------------------------------------------------

var node_modules = unwatchedTree('node_modules/');

var vendor = new Funnel('public/vendor/', {
    srcDir : '/',
    destDir: '/vendor'
});

function localeDataTree(srcDir, outputFile) {
    // Create list of locale data filenames for all of the locales the app
    // supports, which is a small subset of all the locales Format.js libs
    // support.
    var localeDataFiles = config.availableLocales.map(function (locale) {
        return locale.split('-')[0] + '.js';
    });

    return new Funnel(node_modules, {
        srcDir : srcDir,
        destDir: '/',
        files  : localeDataFiles
    });
}

var formatjsLocaleData = mergeTrees([
    'dust-intl',
    'ember-intl',
    'handlebars-intl',
    'react-intl'
].map(function (integration) {
    var srcDir;

    switch(integration) {
        case 'ember-intl':
            srcDir = integration + '/packaging/dist/locale-data/locales';
            break;
        default:
            srcDir = integration + '/dist/locale-data';
            break;
    }

    return concatTree(localeDataTree(srcDir), {
        inputFiles: ['*.js'],
        outputFile: '/vendor/formatjs/' + integration + '-locale-data.js'
    });
}));

vendor = mergeTrees([
    copy(node_modules, {
        'es6-shim': '/vendor/es6-shim',

        'dustjs-linkedin/dist': '/vendor/dust',
        'components-ember'    : '/vendor/ember',
        'handlebars/dist'     : '/vendor/handlebars',
        'jquery/dist'         : '/vendor/jquery',
        'react/dist'          : '/vendor/react',

        'dust-intl/dist'           : '/vendor/dust-intl',
        'ember-intl/packaging/dist': '/vendor/ember-intl',
        'handlebars-intl/dist'     : '/vendor/handlebars-intl',
        'react-intl/dist'          : '/vendor/react-intl'
    }),

    vendor,
    formatjsLocaleData
], {overwrite: true});

var pubRoot = new Funnel('public/', {
    srcDir : '/',
    destDir: '/',
    include: [/^[^/.]+\..+$/]
});

var css = new Funnel('public/css/', {
    srcDir : '/',
    destDir: '/css'
});

css = postcss(css, {
    processors: [
        customProperties(),
        autoprefixer()
    ]
});

var img = new Funnel('public/img/', {
    srcDir : '/',
    destDir: '/img'
});

var js = compileJSX('public/js/', {
    transform: {
        es6module: true,
        harmony  : true
    }
});

js = compileModules(mergeTrees([shared, js]), {
    description: 'ClientModules',
    formatter  : 'bundle',
    output     : '/js/app.js',
    sourceRoot : '/public/'
});

var client = new Funnel(mergeTrees([vendor, pubRoot, css, img, js]), {
    srcDir : '/',
    destDir: 'client'
});

// -----------------------------------------------------------------------------

module.exports = mergeTrees([server, client]);
