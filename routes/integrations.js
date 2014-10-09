'use strict';

module.exports = function (route) {
    route.name  = 'integrations';
    route.label = 'Integrations';

    route.get(function (req, res) {
        res.locals.activeMenuItem = route.name;
        res.render('integrations');
    });
};
