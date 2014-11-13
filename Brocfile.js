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

var modules = [
    new Funnel(node_modules, {
        files: [
            'es6-shim/es6-shim.js',
            'es6-shim/es6-shim.min.js',
            'es6-shim/es6-shim.map',
            'intl/Intl.js',
            'intl/Intl.min.js'
        ],
        destDir: 'vendor'
    }),
    new Funnel(node_modules, {srcDir: 'dustjs-linkedin/dist', destDir: 'vendor/dust'}),
    new Funnel(node_modules, {srcDir: 'handlebars/dist',      destDir: 'vendor/handlebars'}),
    new Funnel(node_modules, {srcDir: 'react/dist',           destDir: 'vendor/react'}),
    new Funnel(node_modules, {srcDir: 'intl/locale-data',     destDir: 'vendor/intl/locale-data'}),
    new Funnel(node_modules, {srcDir: 'dust-intl/dist',       destDir: 'vendor/dust-intl'}),
    new Funnel(node_modules, {srcDir: 'handlebars-intl/dist', destDir: 'vendor/handlebars-intl'}),
    new Funnel(node_modules, {srcDir: 'react-intl/dist',      destDir: 'vendor/react-intl'}),
    new Funnel(node_modules, {srcDir: 'Rainbow/js',           destDir: 'vendor/rainbow'})
];

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

modules.push(client);

client = new Funnel(mergeTrees(modules), {
    srcDir: '/',
    destDir: 'client'
});

module.exports = mergeTrees([server, client]);
