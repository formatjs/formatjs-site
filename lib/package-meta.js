'use strict';

var path = require('path');

module.exports = function (pkgName) {
    var pkg = require(path.join(pkgName, 'package.json'));

    return {
        name       : pkg.name,
        version    : pkg.version,
        description: pkg.description,

        dist: {
            main       : path.join(pkg.name, 'dist', pkg.name + '.min.js'),
            withLocales: path.join(pkg.name, 'dist', pkg.name + '-with-locales.min.js')
        }
    };
};
