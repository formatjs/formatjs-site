'use strict';

var autoprefixer     = require('autoprefixer-core'),
    compileJSX       = require('broccoli-react'),
    compileModules   = require('broccoli-es6-module-transpiler'),
    customProperties = require('postcss-custom-properties'),
    mergeTrees       = require('broccoli-merge-trees'),
    Funnel           = require('broccoli-funnel'),
    postcss          = require('./broccoli/postcss'),
    unwatchedTree    = require('broccoli-unwatched-tree');

var node_modules = unwatchedTree('node_modules/'),
    shared       = 'shared/',
    pub          = 'public/';

function linkOrCopy(tree, mappings) {
    var trees = Object.keys(mappings).map(function (srcDir) {
        var destDir = mappings[srcDir];
        return new Funnel(tree, {srcDir: srcDir, destDir: destDir});
    });

    return mergeTrees(trees);
}

var vendor = linkOrCopy(node_modules, {
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

shared = compileJSX(shared);
pub    = compileJSX(pub);

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
