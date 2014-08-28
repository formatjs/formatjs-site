'use strict';

var renderComponent = require('../lib/component').render;

module.exports = function (route) {
    route.name = 'home';

    route.get(function (req, res, next) {
        var splashExample = {
            name     : 'Eric',
            numPhotos: 1000,
            takenDate: Date.now()
        };

        res.expose(splashExample, 'splash.example');
        res.expose('home', 'pageType');

        res.render('home', {
            example: renderComponent('splash-example', {
                locales         : res.intl.locales[0],
                formats         : res.intl.formats,
                messages        : res.intl.messages,
                availableLocales: res.intl.availableLocales,

                name     : splashExample.name,
                numPhotos: splashExample.numPhotos,
                takenDate: splashExample.takenDate
            })
        });
    });
};
