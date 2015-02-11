'use strict';

var path = require('path');

var getExamples    = require('../lib/examples').get;
var renderExamples = require('../lib/examples').render;

var pkgMeta = require('../lib/package-meta')('ember-intl', {
    distPath:    path.join('ember-intl', 'packaging', 'dist'),
    hasDownload: false
});

module.exports = function (route) {
    route.name = 'ember';

    route.get(function (req, res, next) {
        var isProduction = req.app.get('env') === 'production';

        getExamples('ember', {cache: isProduction})
            .then(function (examples) {
                res.expose(examples, 'examples');
                res.expose('integration', 'pageType');

                res.render('ember', {
                    activeMenuItem: route.name,
                    usesEmberIntl : true,
                    package       : pkgMeta,
                    examples      : renderExamples(examples, res.intl)
                });
            }).catch(next);
    });
};
