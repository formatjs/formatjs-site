'use strict';

module.exports = function (route) {
    route.name  = 'github';
    route.label = 'GitHub';

    route.get(function (req, res) {
        res.locals.activeMenuItem = route.name;
        res.render('github');
    });
};
