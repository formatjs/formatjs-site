'use strict';

var getExamples = require('../lib/examples');

module.exports = function (req, res, next) {
    getExamples('handlebars', {cache: true}).then(function (examples) {
        var hbsExamples = examples;
        Object.keys(hbsExamples).forEach(function(key) {
            var example = examples[key];

            console.log(example);
            example.rendered = example.compiled({
                intl: res.locals.intl,
                user: {
                    firstName: 'Tilo',
                    lastName: 'Mitra',
                    travelDate: new Date(),
                    price: 465,
                    daysLeft: 8,
                    numBooks: 20
                },
                now: new Date()
            });

            //expose just the source file for each example here.
            res.expose(example.source, 'examples.hbs.' + example.name);
        });

        //Expose this string so the necessary client-side JS file gets loaded
        res.expose('travel', 'example');
        res.expose([
            '/bower_components/intl-messageformat/build/intl-messageformat.complete.min.js',
            '/bower_components/handlebars-helper-intl/dist/helpers.js'
        ], 'scripts');

        res.render('quickstart/handlebars', {
            examples: hbsExamples
        });
    }).catch(next);
};
