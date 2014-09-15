'use strict';

var Handlebars  = require('handlebars'),
    escape      = Handlebars.Utils.escapeExpression;

exports.setTitle = function (title) {
    this.title = title;
};

exports.title = function () {
    var brand = this.brand,
        title = this.title;

    if (!title) {
        return brand;
    }

    title = escape(title) + ' &mdash; ' + escape(brand);
    return new Handlebars.SafeString(title);
};

exports.code = function (content, options) {
    if (typeof content !== 'string') {
        options = content;
        content = null;
    }

    var type, classes, open, close;

    // Determine if this helper is being used as an inline or block helper. When
    // `options.fn` is defined this helper was invoked as a block helper.
    if (options.fn) {
        type    = content || 'html';
        classes = options.hash.wrap ? 'code code-wrap' : 'code';
        content = options.fn(this);
        open    = '<pre class="' + classes + '" data-language="' + type + '"><code>';
        close   = '</code></pre>';
    } else {
        open  = '<code>';
        close = '</code>';
    }

    // Escape code contents.
    content = escape(content.trim());

    return new Handlebars.SafeString(open + content + close);
};

exports.npmLink = function (name, options) {
    return new Handlebars.SafeString('<a class="npmlink" href="https://www.npmjs.org/package/' + name + '">' + name + '</a>');
};
