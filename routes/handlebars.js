'use strict';

var getExamples = require('../lib/examples');

var fileSizes = require('../config/sizes.json');

module.exports = function (req, res, next) {

    getExamples('handlebars', {cache: true}).then(function (examples) {
        var hbsExamples = examples,
            helperSize  = fileSizes['handlebars-helper-intl/dist/helpers.min.js'];

        Object.keys(hbsExamples).forEach(function(key) {
            var example = examples[key];
            example.rendered = example.compiled({
                intl: res.locals.intl,
                user: {
                    firstName: 'Tilo',
                    lastName: 'Mitra',
                    numBooks: 20,
                    daysLeft: 8,
                    travelDate: new Date(),
                    price: 465
                },

                amount: 15000,
                now: new Date()
            });

            //expose just the source file for each example here.
            res.expose(example.source, 'examples.hbs.' + example.name);
        });

        res.render('handlebars', {
            examples: hbsExamples,
            helperSize: helperSize.bytes < 1024 ? (helperSize.bytes + ' bytes') : (helperSize.kbs + ' KBs')
        });
    }).catch(next);
};
