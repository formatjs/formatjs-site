'use strict';

module.exports = function (route) {
    route.name = 'dust';

    route.get(function (req, res, next) {
        res.render('dust');
    });
};
