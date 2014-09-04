'use strict';

module.exports = function (route) {
    route.name = 'guide';
    route.menu = 'Guide';

    route.get(function (req, res, next) {
        res.render('guide');
    });
};
