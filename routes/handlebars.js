'use strict';

var path = require('path');

var config = require('../config');

module.exports = function (req, res, next) {
    var app     = req.app,
        locale  = app.get('default locale');

    res.render('handlebars', {
        intl: {
            locale  : locale,
            messages: require(path.join(config.dirs.i18n, locale)),

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
            numBooks : 2000
        },

        now: new Date()
    });
};
