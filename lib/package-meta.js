'use strict';

var path = require('path');

module.exports = function (pkgName, optionalPath) {
    var pkg      = require(path.join(pkgName, 'package.json'));
    var rootPath = optionalPath || path.join(pkg.name, 'dist');
    
    return {
        name       : pkg.name,
        version    : pkg.version,
        description: pkg.description,
        
        dist: {
            main       : path.join(rootPath, pkg.name + '.min.js'),
            withLocales: path.join(rootPath, pkg.name + '-with-locales.min.js'),
            localeData : path.join(rootPath, 'locale-data')
        }
    };
};
