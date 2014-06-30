'use strict';

var React = require('react'),
    ReactIntlMixin = require('react-intl');

var getExamples = require('../lib/examples');

module.exports = function (req, res, next) {

    getExamples('react', {cache: true}).then(function (examples) {
        var reactExamples = examples;
        Object.keys(reactExamples).forEach(function(key) {
            var example = reactExamples[key];

            example.rendered = React.renderComponentToString(example.compiled({locales: ['en-US']}));

            //For React, we want to expose the source code so we can eval() on the client
            res.expose(example.source, 'examples.react.' + example.name);
        });

        res.expose('react', 'example');
        res.expose([
            'http://fb.me/react-0.10.0.min.js',
            '/bower_components/react-intl/dist/react-intl.min.js'
        ], 'scripts');

        res.render('react', {
            examples: reactExamples
        });
    }).catch(next);
};
