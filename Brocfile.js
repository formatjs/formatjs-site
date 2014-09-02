'use strict';

var autoprefixer     = require('autoprefixer-core'),
    compileJSX       = require('broccoli-react'),
    compileModules   = require('broccoli-es6-module-transpiler'),
    customProperties = require('postcss-custom-properties'),
    mergeTrees       = require('broccoli-merge-trees'),
    moveFiles        = require('broccoli-file-mover'),
    postcss          = require('./broccoli/postcss'),
    unwatchedTree    = require('broccoli-unwatched-tree');

var bower_components = unwatchedTree('bower_components/'),
    node_modules     = unwatchedTree('node_modules/'),
    shared           = 'shared/',
    pub              = 'public/';

bower_components = moveFiles(bower_components, {
    files: {
        'rainbow/js'    : 'vendor/rainbow',
        'rainbow/themes': 'vendor/rainbow/themes'
    }
});

node_modules = moveFiles(node_modules, {
    files: {
        'dustjs-linkedin/dist': 'vendor/dust',
        'handlebars/dist'     : 'vendor/handlebars',
        'react/dist'          : 'vendor/react',

        'intl/Intl.js'    : 'vendor/intl/Intl.js',
        'intl/Intl.min.js': 'vendor/intl/Intl.min.js',
        'intl/locale-data': 'vendor/intl/locale-data',

        'intl-messageformat/dist'    : 'vendor/intl-messageformat',
        'dust-helper-intl/dist'      : 'vendor/dust-helper-intl',
        'handlebars-helper-intl/dist': 'vendor/handlebars-helper-intl',
        'react-intl/dist'            : 'vendor/react-intl'
    }
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

client = moveFiles(mergeTrees([bower_components, node_modules, client]), {
    files: {'/': 'client'}
});

module.exports = mergeTrees([server, client]);
