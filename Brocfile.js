'use strict';

var autoprefixer     = require('autoprefixer-core');
var compileJSX       = require('broccoli-react');
var compileModules   = require('broccoli-es6-module-transpiler');
var customProperties = require('postcss-custom-properties');
var mergeTrees       = require('broccoli-merge-trees');
var Funnel           = require('broccoli-funnel');
var postcss          = require('./broccoli/postcss');
var unwatchedTree    = require('broccoli-unwatched-tree');

function linkOrCopy(tree, mappings) {
    var trees = Object.keys(mappings).map(function (srcDir) {
        var destDir = mappings[srcDir];
        return new Funnel(tree, {srcDir: srcDir, destDir: destDir});
    });

    return mergeTrees(trees);
}

var vendor = linkOrCopy(unwatchedTree('node_modules/'), {
    'es6-shim'            : 'vendor/es6-shim',
    'intl'                : 'vendor/intl',
    'dustjs-linkedin/dist': 'vendor/dust',
    'handlebars/dist'     : 'vendor/handlebars',
    'react/dist'          : 'vendor/react',
    'dust-intl/dist'      : 'vendor/dust-intl',
    'handlebars-intl/dist': 'vendor/handlebars-intl',
    'react-intl/dist'     : 'vendor/react-intl',
    'Rainbow/js'          : 'vendor/rainbow'
});

var shared = compileJSX('shared/');
var pub    = compileJSX('public/');

pub = postcss(pub, {
    processors: [
        customProperties(),
        autoprefixer()
    ]
});

var server = compileModules(shared, {
    description: 'ServerModules',
    formatter  : 'commonjs',
    output     : 'server/'
});

var client = compileModules(mergeTrees([shared, pub]), {
    description: 'ClientModules',
    formatter  : 'bundle',
    output     : 'js/app.js'
});

client = new Funnel(mergeTrees([vendor, client]), {
    srcDir : '/',
    destDir: 'client'
});

module.exports = mergeTrees([server, client]);
