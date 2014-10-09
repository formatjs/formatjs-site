'use strict';

var getExamples    = require('../lib/examples').get;
var renderExamples = require('../lib/examples').render;
var pkgMeta        = require('../lib/package-meta')('react-intl');

module.exports = function (route) {
    route.name = 'react';

    route.get(function (req, res, next) {
        res.locals.package = pkgMeta;

        getExamples('react', {
            cache: req.app.get('view cache')
        }).then(function (examples) {
            res.locals.examples = renderExamples(examples, res.intl);
            res.expose(examples, 'examples');
            res.expose('integration', 'pageType');
            res.render('react');
        }).catch(next);
    });
};
