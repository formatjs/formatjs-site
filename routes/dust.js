'use strict';

var getExamples    = require('../lib/examples').get;
var renderExamples = require('../lib/examples').render;
var pkgMeta        = require('../lib/package-meta')('dust-intl');

module.exports = function (route) {
    route.name = 'dust';

    route.get(function (req, res, next) {
        var isProduction = req.app.get('env') === 'production';

        getExamples('dust', {cache: isProduction}).then(function (examples) {
            res.expose(examples, 'examples');
            res.expose('integration', 'pageType');

            res.render('dust', {
                activeMenuItem: route.name,
                usesDustIntl  : true,
                package       : pkgMeta,
                examples      : renderExamples(examples, res.intl)
            });
        }).catch(next);
    });
};
