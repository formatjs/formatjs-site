'use strict';

var path = require('path');

module.exports = function (req, res, next) {
    var app     = req.app,
        locales = app.get('locales'),
        locale  = app.get('default locale');

    res.render('handlebars', {
        intl: {
            locale  : locale,
            messages: require('../' + path.join('i18n', 'handlebars', locale)),

            formats: {
                number: {
                    USD: {
                        style   : 'currency',
                        currency: 'USD'
                    },
                    EUR: {
                        style   : 'currency',
                        currency: 'EUR'
                    }
                }
            }
        },

        user: {
            firstName: 'Tilo',
            lastName : 'Mitra',
            numBooks : '2000'
        },

        now: new Date()
    });
};
