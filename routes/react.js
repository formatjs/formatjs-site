'use strict';

var getExamples    = require('../lib/examples').get,
    renderExamples = require('../lib/examples').render;

module.exports = function (route) {
    route.name = 'react';

    route.get(function (req, res, next) {
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
