'use strict';

var getExamples     = require('../lib/examples'),
    renderComponent = require('../lib/component').render,
    utils           = require('../lib/utils');

module.exports = function (route) {
    route.name = 'handlebars';

    route.get(function (req, res, next) {
        var cache = req.app.get('view cache');

        getExamples('handlebars', {cache: cache}).then(function (examples) {
            res.expose(examples, 'examples');
            res.expose('integration', 'pageType');

            res.locals.examples = examples.reduce(function (hash, example) {
                hash[example.name] = utils.extend({}, example, {
                    rendered: renderComponent('handlebars-example', {
                        source : example.source.template,
                        context: example.context,
                        intl   : res.intl
                    })
                });

                return hash;
            }, {});

            res.render('handlebars');
        }, next);
    });
};
