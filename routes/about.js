'use strict';

module.exports = function (route) {
    route.name = 'about';
    route.menu = 'About';

    route.get(function (req, res) {
        res.render('about');
    });
};
