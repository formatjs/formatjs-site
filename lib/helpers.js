'use strict';

var Handlebars  = require('handlebars'),
    escape      = Handlebars.Utils.escapeExpression;

//Typography
exports.code     = code;
exports.setTitle = setTitle;

//Sections
exports.sectionHeading = sectionHeading;
exports.sectionList    = sectionList;
exports.hasSections    = hasSections;

//CSS
exports.addLocalCSS  = addLocalCSS;
exports.addRemoteCSS = addRemoteCSS;
exports.localCSS     = localCSS;
exports.remoteCSS    = remoteCSS;

//JS
exports.addLocalJS  = addLocalJS;
exports.localJS     = localJS;
exports.addRemoteJS = addRemoteJS;
exports.remoteJS    = remoteJS;


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


function addLocalCSS(path, options) {
    var css   = this.localCSS || (this.localCSS = []),
        entry = {};

    if (this.relativePath) {
        path = libpath.relative(this.relativePath, path);
    }

    entry.path = path;

    if (options.hash.hasOldIE) {
        entry.oldIE = libpath.join(
            libpath.dirname(path),
            libpath.basename(path, '.css') + '-old-ie.css'
        );
    }

    css[options.hash.prepend ? 'unshift' : 'push'](entry);
}

function addRemoteCSS(path, options) {
    var css = this.remoteCSS || (this.remoteCSS = []);
    css[options.hash.prepend ? 'unshift' : 'push'](path);
}

function addLocalJS(path, options) {
    var js = this.localJS || (this.localJS = []);

    if (this.relativePath) {
        path = libpath.relative(this.relativePath, path);
    }

    js[options.hash.prepend ? 'unshift' : 'push'](path);
}

function addRemoteJS(path, options) {
    var js = this.remoteJS || (this.remoteJS = []);
    js[options.hash.prepend ? 'unshift' : 'push'](path);
}


function localCSS(options) {
    var entries   = this.localCSS,
        output    = '',
        comboPath = '/combo/' + this.version + '?';

    if (!(entries && entries.length)) { return output; }

    if (this.isProduction) {
        entries = entries.reduce(function (combo, entry) {
            if (entry.oldIE || combo.oldIEPaths) {
                combo.oldIEPaths || (combo.oldIEPaths = combo.paths.concat());
                combo.oldIEPaths.push(entry.oldIE || entry.path);
            }

            combo.paths.push(entry.path);
            return combo;
        }, {paths: []});

        entries = [{
            path : comboPath + entries.paths.join('&'),
            oldIE: entries.oldIEPaths && comboPath + entries.oldIEPaths.join('&')
        }];
    }

    entries.forEach(function (entry) {
        output += options.fn(entry);
    });

    return output;
}

function remoteCSS(options) {
    var urls   = this.remoteCSS,
        output = '';

    if (!(urls && urls.length)) { return output; }

    urls.forEach(function (url) {
        output += options.fn(url);
    });

    return output;
}

function localJS(options) {
    var urls   = this.localJS,
        output = '';

    if (!(urls && urls.length)) { return output; }

    if (this.isProduction) {
        urls = ['/combo/' + this.version + '?' + urls.join('&')];
    }

    urls.forEach(function (url) {
        output += options.fn(url);
    });

    return output;
}

function remoteJS(options) {
    var urls   = this.remoteJS,
        output = '';

    if (!(urls && urls.length)) { return output; }

    urls.forEach(function (url) {
        output += options.fn(url);
    });

    return output;
}
