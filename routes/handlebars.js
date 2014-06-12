'use strict';

var path = require('path');

var config = require('../config');

module.exports = function (req, res, next) {
    res.locals.intl.formats = {
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
    };

    res.render('handlebars', {
        user: {
            firstName: 'Tilo',
            lastName : 'Mitra',
            numBooks : 2000
        },

        now: new Date()
    });
};
