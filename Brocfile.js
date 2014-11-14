'use strict';

var autoprefixer     = require('autoprefixer-core');
var compileJSX       = require('broccoli-react');
var compileModules   = require('broccoli-es6-module-transpiler');
var concatTrees      = require('broccoli-concat');
var customProperties = require('postcss-custom-properties');
var mergeTrees       = require('broccoli-merge-trees');
var postcss          = require('./broccoli/postcss');
var unwatchedTree    = require('broccoli-unwatched-tree');
var Funnel           = require('broccoli-funnel');

var FileResolver    = require('es6-module-transpiler').FileResolver;
var NPMFileResolver = require('es6-module-transpiler-npm-resolver');

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

var shared = compileJSX('shared/');

// -- Server -------------------------------------------------------------------

var server = compileModules(shared, {
    description: 'ServerModules',
    formatter  : 'commonjs',
    output     : 'server/'
});

// -- Client -------------------------------------------------------------------

var node_modules = unwatchedTree('node_modules/');

var vendor = copy(node_modules, {
    'es6-shim'            : 'vendor/es6-shim',
    'intl'                : 'vendor/intl',
    'dustjs-linkedin/dist': 'vendor/dust',
    'handlebars/dist'     : 'vendor/handlebars',
    'react/dist'          : 'vendor/react',
    'Rainbow/js'          : 'vendor/rainbow'
});

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

var intlIntegrations = compileModules('public/intl/', {
    description: 'VendorModules',
    formatter  : 'bundle',
    output     : '/intl/integrations.js',

    resolvers: [
        FileResolver,
        NPMFileResolver
    ]
});

var localeData = new Funnel(node_modules, {
    srcDir : 'react-intl/dist/locale-data',
    destDir: '/',

    files: config.availableLocales.map(function (locale) {
        return locale.split('-')[0] + '.js';
    })
});

localeData = concatTrees(localeData, {
    inputFiles: ['*.js'],
    outputFile: '/intl/locale-data.js'
});

var intl = mergeTrees([intlIntegrations, localeData]);

var js = new Funnel('public/js/', {
    srcDir : '/',
    destDir: '/js'
});

js = compileModules(mergeTrees([shared, js]), {
    description: 'ClientModules',
    formatter  : 'bundle',
    output     : '/js/app.js'
});

var client = new Funnel(mergeTrees([vendor, pubRoot, css, img, intl, js]), {
    srcDir : '/',
    destDir: 'client'
});

// -----------------------------------------------------------------------------

module.exports = mergeTrees([server, client]);
