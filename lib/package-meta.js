'use strict';

var path = require('path');

module.exports = function (pkgName, options) {
    var pkg = require(path.join(pkgName, 'package.json'));

    options || (options = {});
    var distPath = options.distPath || path.join(pkg.name, 'dist');

    return Object.assign({
        name       : pkg.name,
        version    : pkg.version,
        description: pkg.description,
        hasDownload: true,

        dist: {
            main       : path.join(distPath, pkg.name + '.min.js'),
            withLocales: path.join(distPath, pkg.name + '-with-locales.min.js'),
            localeData : path.join(distPath, 'locale-data')
        }
    }, options);
};
