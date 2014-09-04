'use strict';

module.exports = function (route) {
    route.name = 'integrations';
    route.menu = 'Integrations';

    route.get(function (req, res, next) {
        res.render('integrations');
    });
};
