'use strict';

var path = require('path');
var url  = require('url');

var Handlebars = require('handlebars');
var escape     = Handlebars.Utils.escapeExpression;
var size       = require('./size.js');

exports.setTitle = function (title) {
    this.title = title;
};

exports.title = function () {
    var brand = this.brand;
    var title = this.title;

    if (!title) {
        return brand;
    }

    title = escape(title) + ' &mdash; ' + escape(brand);
    return new Handlebars.SafeString(title);
};

exports.setDescription = function () {
    var args    = [].slice.call(arguments);
    var options = args.pop();

    this.description = args.join('');
};

exports.description = function () {
    var tagline     = this.tagline;
    var description = this.description;

    if (!description) {
        return tagline;
    }

    return description;
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
    return new Handlebars.SafeString(
        '<a href="https://www.npmjs.org/package/' + name + '">' +
            '<code>' + name + '</code>' +
        '</a>'
    );
};

exports.releaseDownloadUrl = function (name, version) {
    return url.format({
        protocol: 'https:',
        hostname: 'github.com',
        pathname: path.join(
            'yahoo', name, 'releases', 'download', 'v' + version,
            name + '-' + version + '.tgz'
        )
    });
};

exports.size = function (filename) {
    return size(filename);
};

exports.cdnUrl = function (filename) {
    var pkg = filename.slice(0, filename.indexOf('/'));
    var version = require(pkg + '/package.json').version;
    filename = filename.slice(pkg.length);

    // TODO: Need a way to validate that these are good enough (maybe smoke test?)
    return url.format({
        protocol: 'https:',
        hostname: 'cdn.rawgit.com',
        pathname: path.join('yahoo', pkg, 'v' + version, filename)
    });
};
