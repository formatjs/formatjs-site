'use strict';

var React = require('react');

var getExamples = require('../lib/examples');

module.exports = function (req, res, next) {

    getExamples('react', {cache: true}).then(function (examples) {
        var reactExamples = examples;
        Object.keys(reactExamples).forEach(function(key) {
            var example = reactExamples[key];

            example.rendered = React.renderComponentToString(example.compiled({locales: ['en-US']}));

            //For React, we want to expose the Component here as a function,
            //so we send down the `compiled` value.
            res.expose(example.compiled, 'examples.react.' + example.name);
        });

        res.render('react', {
            examples: reactExamples
        });
    }).catch(next);
};
