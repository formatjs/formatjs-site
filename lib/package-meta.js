'use strict';

var path = require('path');

module.exports = function (pkgName, distPath) {
    var pkg = require(path.join(pkgName, 'package.json'));
    distPath || (distPath = path.join(pkg.name, 'dist'));

    return {
        name       : pkg.name,
        version    : pkg.version,
        description: pkg.description,

        dist: {
            main       : path.join(distPath, pkg.name + '.min.js'),
            withLocales: path.join(distPath, pkg.name + '-with-locales.min.js'),
            localeData : path.join(distPath, 'locale-data')
        }
    };
};
