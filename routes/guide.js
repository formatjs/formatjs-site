'use strict';

module.exports = function (route) {
    route.name  = 'guide';
    route.label = 'Guide';

    route.get(function (req, res) {
        res.locals.activeMenuItem = route.name;
        res.render('guide');
    });
};
