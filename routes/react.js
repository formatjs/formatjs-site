'use strict';

var getExamples    = require('../lib/examples').get;
var renderExamples = require('../lib/examples').render;
var pkgMeta        = require('../lib/package-meta')('react-intl');

module.exports = function (route) {
    route.name = 'react';

    route.get(function (req, res, next) {
        var isProduction = req.app.get('env') === 'production';

        getExamples('react', {cache: isProduction}).then(function (examples) {
            res.expose(examples, 'examples');
            res.expose('integration', 'pageType');

            res.render('react', {
                activeMenuItem: route.name,
                package       : pkgMeta,
                examples      : renderExamples(examples, res.intl)
            });
        }).catch(next);
    });
};
