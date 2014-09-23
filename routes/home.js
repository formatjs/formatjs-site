'use strict';

var renderComponent = require('../lib/component').render;

module.exports = function (route) {
    route.name = 'home';

    route.get(function (req, res) {
        var splashExample = {
            name     : 'Annie',
            numPhotos: 1000,
            takenDate: Date.now()
        };

        var now       = Date.now();
        var lastMonth = new Date(now - (30 * 24 * 60 * 60 * 1000));

        res.expose('home', 'pageType');
        res.expose(splashExample, 'examples.splash');

        res.render('home', {
            examples: {
                splash: renderComponent('splash-example',
                    Object.assign({}, res.intl, splashExample)
                )
            },

            now: now,

            lastMonth: [
                lastMonth.getFullYear(),
                lastMonth.getMonth() + 1,
                lastMonth.getDate()
            ].join('-'),

            data: {intl: res.intl}
        });
    });
};
