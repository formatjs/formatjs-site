'use strict';

var path = require('path');

module.exports = function (route) {
    route.name  = 'guides';
    route.label = 'Guides';

    route.get(function (req, res) {
        var guide = req.params.guide || 'index';

        res.expose('guide', 'pageType');
        res.render(path.join('guides', guide), {
            activeMenuItem: route.name
        });
    });
};
