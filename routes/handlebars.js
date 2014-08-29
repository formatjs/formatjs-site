'use strict';

var renderExamples = require('../lib/examples').render;

module.exports = function (route) {
    route.name = 'handlebars';

    route.get(function (req, res, next) {
        renderExamples('handlebars', res.intl, {
            cache: req.app.get('view cache')
        }).then(function (examples) {
            res.locals.examples = examples;
            res.expose(examples, 'examples');
            res.expose('integration', 'pageType');
            res.render('handlebars');
        }).catch(next);
    });
};
