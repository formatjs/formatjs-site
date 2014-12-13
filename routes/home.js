'use strict';

var renderComponent = require('../lib/component').render;

module.exports = function (route) {
    route.name  = 'home';
    route.label = 'Home';

    route.get(function (req, res) {
        var splashExample = {
            availableNumPhotos: [0, 1, 3, 1000],

            name     : 'Annie',
            numPhotos: 1000,
            takenDate: Date.now()
        };

        var now       = Date.now();
        var lastMonth = new Date(now - (30 * 24 * 60 * 60 * 1000));

        res.expose('home', 'pageType');
        res.expose(splashExample, 'examples.splash');

        res.render('home', {
            activeMenuItem: route.name,

            examples: {
                splash: renderComponent('splash-example',
                    Object.assign({}, res.intl, splashExample)
                )
            },

            now: now,

            // Had to do this since the Intl.js polyfill doesn't seem to work
            // correctly when you _just_ want the year or month. I should follow
            // a bug.
            lastMonth: [
                lastMonth.getFullYear(),
                lastMonth.getMonth() + 1,
                lastMonth.getDate()
            ].join('-')
        });
    });
};
