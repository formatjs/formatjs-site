'use strict';

module.exports = function (route) {
    route.name = 'react';

    route.get(function (req, res, next) {
        res.render('react');
    });
};
