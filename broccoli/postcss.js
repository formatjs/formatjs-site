'use strict';

var Filter       = require('broccoli-filter'),
    objectAssign = require('object-assign'),
    postcss      = require('postcss'),
    util         = require('util');

module.exports = PostCSSFilter;

// -----------------------------------------------------------------------------

function PostCSSFilter(inputTree, options) {
    if (!(this instanceof PostCSSFilter)) {
        return new PostCSSFilter(inputTree, options);
    }

    this.inputTree = inputTree;
    this.options   = objectAssign({processors: []}, options);
}

util.inherits(PostCSSFilter, Filter);

PostCSSFilter.prototype.extensions      = ['css'];
PostCSSFilter.prototype.targetExtension = 'css';

PostCSSFilter.prototype.processString = function (css, relPath) {
    var processor = postcss();

    var options = objectAssign({
        from: relPath,
        to  : relPath
    }, this.options);

    options.processors.forEach(function (p) {
        processor.use(p);
    });

    return processor.process(css, options).css;
};
