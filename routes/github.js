'use strict';

module.exports = function (route) {
    route.name  = 'github';
    route.label = 'GitHub';

    route.get(function (req, res) {
        res.render('github', {
            activeMenuItem: route.name
        });
    });
};
