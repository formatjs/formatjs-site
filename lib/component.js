'use strict';

var fs    = require('fs'),
    path  = require('path'),
    React = require('react');

var config = require('../config');

exports.render  = renderComponent;
exports.require = requireComponent;

// -----------------------------------------------------------------------------

function requireComponent(componentPath) {
    // Make sure the symlink is followed for the build/ dir during dev.
    var buildDir = fs.realpathSync(config.dirs.build);

    // Assume server-side comonent.
    componentPath = path.join(buildDir, 'server/components', componentPath);

    // Retun the default export.
    return require(componentPath).default;
}

function renderComponent(componentPath, props) {
    var Component = requireComponent(componentPath);
    return React.renderToString(React.createElement(Component, props));
}
