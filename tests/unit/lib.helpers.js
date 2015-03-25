/*global describe, it, before, after*/
var helpers    = require('../../lib/helpers');
var chai       = require('chai');
var Handlebars = require('handlebars');

chai.use(require("chai-as-promised"));

var expect = chai.expect;

describe('Helpers', function () {
    describe('isEqual', function () {
        it('should work as triple equals', function () {
            var foo = {};
            var bar = {};
            expect(helpers.isEqual(foo, foo)).to.equal(true);
            expect(helpers.isEqual(foo, bar)).to.equal(false);
        });
    });

    describe('setTitle', function () {
        it('should update the `title` property', function () {
            var obj = {};
            helpers.setTitle.call(obj, 'hello');
            expect(obj).to.have.property('title')
                .that.equals('hello');
        });
    });

    describe('title', function () {
        it('returns either the title or the brand', function () {
            var obj = {
                brand: 'qwer'
            };
            expect(helpers.title.call(obj) + '').to.equal(obj.brand);
            helpers.setTitle.call(obj, 'hello');
            expect(helpers.title.call(obj) + '').to.equal('hello &mdash; qwer');
        });
    });

    describe('setDescription', function () {
        it('should update the `description` property', function () {
            var obj = {};
            helpers.setDescription.call(obj, 'hello', 'world', {});
            expect(obj).to.have.property('description')
                .that.equals('helloworld');
        });
    });

    describe('description', function () {
        it('returns either the tagline or the description', function () {
            var obj = {
                tagline: 'cachai'
            };
            expect(helpers.description.call(obj)).to.equal(obj.tagline);
            helpers.setDescription.call(obj, 'hello', {});
            expect(helpers.description.call(obj)).to.equal('hello');
        });
    });

    describe('code', function () {
        before(function () {
            Handlebars.registerHelper('code', helpers.code);
        });
        after(function () {
            Handlebars.unregisterHelper('code');
        });

        it('throws when a string is not passed', function () {
            expect(function () {
                return helpers.code();
            }).to.throw();
        });
        it('wraps inline clode', function () {
            expect(helpers.code('asdf', {}) + '').to.equal('<code>asdf</code>');
        });
        it('trims and wraps code blocks', function () {
            var template = Handlebars.compile('{{#code "js"}}\n\thello();\n{{/code}}');
            var result = template({});

            expect(result.string).to.equal('<pre class="code"><code class="js">hello();</code></pre>');
        });
        it('optionally disables highlight', function () {
            var template = Handlebars.compile('{{#code highlight=false}}\n\thello();\n{{/code}}');
            var result = template({});

            expect(result.string).to.equal('<pre class="code"><code class="nohighlight">hello();</code></pre>');
        });
        it('optionally adds a wrap class', function () {
            var template = Handlebars.compile('{{#code "js" wrap=true}}\n\thello();\n{{/code}}');
            var result = template({});

            expect(result.string).to.equal('<pre class="code code-wrap"><code class="js">hello();</code></pre>');
        });
    });

    describe('npmLink', function () {
        it('points to npm correctly', function () {
            expect(helpers.npmLink('asdf') + '').to.equal(
                '<a href="https://www.npmjs.org/package/asdf"><code>asdf</code></a>'
            );
        });
    });

    describe('releaseDownloadUrl', function () {
        it('points to github correctly', function () {
            expect(helpers.releaseDownloadUrl('dust-intl', '1.0.0'))
                .to.equal('https://github.com/yahoo/dust-intl/releases/download/v1.0.0/dust-intl-1.0.0.tgz');
        });
    });

    describe('size', function () {
        it('should throw for unrecognized modules', function () {
            expect(function () {
                return helpers.size(Math.random());
            }).to.throw();
        });

        it('should use the values config.libSizes', function () {
            var sizes = require('../../config').libSizes;
            sizes['fake-foo-bar'] = {
                "bytes": 999,
                "kbs": 0.98
            };
            Object.keys(sizes).forEach(function (module) {
                var size = helpers.size(module);

                if (sizes[module].bytes < 1024) {
                    expect(size).to.equal(sizes[module].bytes + ' bytes');
                } else {
                    expect(size).to.equal(sizes[module].kbs + ' KB');
                }
            });
        });
    });

    describe('cdnUrl', function () {
        it('returns a rawgit url', function () {
            var version = require('dust-intl/package.json').version;

            expect(helpers.cdnUrl('dust-intl/'))
                .to.equal('https://cdn.rawgit.com/yahoo/dust-intl/v' + version + '//');
        });
    });
});
