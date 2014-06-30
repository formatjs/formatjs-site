'use strict';

var Handlebars  = require('handlebars'),
    escape      = Handlebars.Utils.escapeExpression;

exports.code     = code;
exports.setTitle = setTitle;
exports.sectionHeading = sectionHeading;
exports.sectionList    = sectionList;
exports.hasSections    = hasSections;
function setTitle(title) {
    this.title = title;
}

function sectionHeading(heading, options) {
    options = (options && options.hash) || {};

    var tagname    = options.tagname || 'h2',
        classnames = options.classnames || 'content-subhead',
        list       = this.sectionList || (this.sectionList = []),
        ignore     = options.ignoreSection || false,
        id, html;

    // Remove HTML entities, and all chars except whitespace, word chars, and -
    // from the `heading`.
    // Jacked from: https://github.com/yui/selleck/blob/master/lib/higgins.js
    id = options.id ? options.id : heading.toLowerCase()
            .replace(/&[^\s;]+;?/g, '')
            .replace(/[^\s\w\-]+/g, '')
            .replace(/\s+/g, '-');

    html = '<' + tagname + ' id="' + id + '" class="' + classnames + '">' +
               heading + '<a href="#' + id + '" class="content-link" title="Heading anchor"></a>' +
           '</' + tagname + '>';

    if (!ignore) {
        list.push({
            heading: heading,
            id: id
        });
    }

    return new Handlebars.SafeString(html);
}

function code(content, options) {
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
}

function sectionList(options) {
    var list   = this.sectionList,
        output = '';

    if (!(list && list.length)) { return output; }

    list.forEach(function (item) {
        output += options.fn(item);
    });

    return output;
}

function hasSections(options) {
    var list   = this.sectionList;
    if (list && !!list.length) {
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
}
