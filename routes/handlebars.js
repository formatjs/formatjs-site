'use strict';

var getExamples    = require('../lib/examples').get;
var renderExamples = require('../lib/examples').render;
var pkgMeta        = require('../lib/package-meta')('handlebars-intl');

module.exports = function (route) {
    route.name = 'handlebars';

    route.get(function (req, res, next) {
        var isProduction = req.app.get('env') === 'production';

        getExamples('handlebars', {cache: isProduction})
            .then(function (examples) {
                res.expose(examples, 'examples');
                res.expose('integration', 'pageType');

                res.render('handlebars', {
                    activeMenuItem: route.name,
                    package       : pkgMeta,
                    examples      : renderExamples(examples, res.intl)
                });
            }).catch(next);
    });
};
