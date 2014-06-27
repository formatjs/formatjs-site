'use strict';

var getExamples = require('../lib/examples');

module.exports = function (req, res, next) {

    getExamples('handlebars', {cache: true}).then(function (examples) {
        var hbsExamples = examples;
        Object.keys(hbsExamples).forEach(function(key) {
            var example = examples[key];
            example.rendered = example.compiled({
                intl: res.locals.intl,
                user: {
                    firstName: 'Tilo',
                    lastName: 'Mitra',
                    numBooks: 20
                },
                now: new Date()
            });

            //expose just the source file for each example here.
            res.expose(example.source, 'examples.hbs.' + example.name);
        });

        res.render('handlebars', {
            examples: hbsExamples
        });
    }).catch(next);
};
