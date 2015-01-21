'use strict';

var url  = require('url');

var Handlebars = require('handlebars');
var escape     = Handlebars.Utils.escapeExpression;
var sizes      = require('../config/sizes.json');

exports.isEqual = function (lhs, rhs) {
    return lhs === rhs;
};

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

    var highlight, lang, classes, open, close;

    // Determine if this helper is being used as an inline or block helper. When
    // `options.fn` is defined this helper was invoked as a block helper.
    if (options.fn) {
        highlight = options.hash.hasOwnProperty('highlight') ?
                options.hash.highlight : true;

        lang    = highlight ? (content || '') : 'nohighlight';
        classes = options.hash.wrap ? 'code code-wrap' : 'code';
        content = options.fn(this);

        open  = '<pre class="' + classes + '"><code class="' + lang + '">';
        close = '</code></pre>';
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
        pathname: [
            'yahoo', name, 'releases', 'download', 'v' + version,
            name + '-' + version + '.tgz'
        ].join('/')
    });
};

exports.size = function (filename) {
    var entry = sizes[filename];

    if (!entry) {
        throw new Error('No size info for: ' + filename);
    }

    if (entry.bytes < 1024) {
        return entry.bytes + ' bytes';
    }

    return entry.kbs + ' KB';
};

exports.cdnUrl = function (filename) {
    var pkg = filename.slice(0, filename.indexOf('/'));
    var version = require(pkg + '/package.json').version;
    filename = filename.slice(pkg.length);

    // TODO: Need a way to validate that these are good enough (maybe smoke test?)
    return url.format({
        protocol: 'https:',
        hostname: 'cdn.rawgit.com',
        pathname: ['yahoo', pkg, 'v' + version, filename].join('/')
    });
};
