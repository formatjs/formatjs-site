'use strict';

module.exports = function (route) {
    route.name  = 'about';
    route.label = 'About';

    route.get(function (req, res) {
        res.locals.activeMenuItem = route.name;
        res.render('about');
    });
};
