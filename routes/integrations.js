'use strict';

module.exports = function (route) {
    route.name  = 'integrations';
    route.label = 'Integrations';

    route.get(function (req, res) {
        res.render('integrations');
    });
};
