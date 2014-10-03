'use strict';

var autoprefixer     = require('autoprefixer-core'),
    compileJSX       = require('broccoli-react'),
    compileModules   = require('broccoli-es6-module-transpiler'),
    customProperties = require('postcss-custom-properties'),
    mergeTrees       = require('broccoli-merge-trees'),
    moveFiles        = require('broccoli-file-mover'),
    postcss          = require('./broccoli/postcss'),
    unwatchedTree    = require('broccoli-unwatched-tree');

var node_modules     = unwatchedTree('node_modules/'),
    shared           = 'shared/',
    pub              = 'public/';

node_modules = moveFiles(node_modules, {
    files: {
        'es6-shim/es6-shim.js'    : 'vendor/es6-shim/es6-shim.js',
        'es6-shim/es6-shim.min.js': 'vendor/es6-shim/es6-shim.min.js',
        'es6-shim/es6-shim.map'   : 'vendor/es6-shim/es6-shim.map',

        'dustjs-linkedin/dist': 'vendor/dust',
        'handlebars/dist'     : 'vendor/handlebars',
        'react/dist'          : 'vendor/react',

        'intl/Intl.js'    : 'vendor/intl/Intl.js',
        'intl/Intl.min.js': 'vendor/intl/Intl.min.js',
        'intl/locale-data': 'vendor/intl/locale-data',

        'dust-intl/dist'      : 'vendor/dust-intl',
        'handlebars-intl/dist': 'vendor/handlebars-intl',
        'react-intl/dist'     : 'vendor/react-intl',

        'Rainbow/js/rainbow.js'    : 'vendor/rainbow/rainbow.js',
        'Rainbow/js/rainbow.min.js': 'vendor/rainbow/rainbow.min.js',
        'Rainbow/js/language'      : 'vendor/rainbow/language'
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

client = moveFiles(mergeTrees([node_modules, client]), {
    files: {'/': 'client'}
});

module.exports = mergeTrees([server, client]);
