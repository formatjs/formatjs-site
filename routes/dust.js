'use strict';

var Dust   = require('dustjs-linkedin');

var getExamples = require('../lib/examples'),
    Utils       = require('../lib/utils');

require('dust-helper-intl').register(Dust);

module.exports = function (req, res, next) {
    getExamples('dust', {cache: false}).then(function (examples) {
        var dustExamples = examples;

        Object.keys(dustExamples).forEach(function(key) {
            var example = dustExamples[key],
                context = {
                    intl: res.locals.intl,
                    user: {
                        firstName: 'Tilo',
                        lastName: 'Mitra',
                        numBooks: '20'
                    },
                    dateBooks: 'Fri Jun 27 2014 13:08:19 GMT-0400'
            };

            Dust.loadSource(example.compiled);
            Dust.render(example.identifier, context, function (err, html) {
                if (err) {
                    Utils.error(500, err);
                }

                example.rendered = html;

                //expose just the source file for each example here.
                res.expose(example.source, 'examples.dust.' + example.name);
            });
        });

        res.render('dust', {
            examples: dustExamples
        });
    }).catch(next);
};
