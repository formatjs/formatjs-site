/*globals casper */

'use strict';

var BASE_URL = 'http://' + casper.cli.options.host;

/*
 * Format:
 *
 *   - route: What page should we load?
 *   - selector_locale_select: CSS selector for desired locale selection combo box
 *   - selector_output: CSS selector for desired output element
 *   - locale: Which locale to use?
 *   - expected_output: Self-explanatory...
 */
var testData = {
    'Test React integration example': {
        comment: 'Test React integration - Relative time formatting example using ja-JP',
        route: '/react/',
        selector_locale_select: '#ex-react-relative .locale-select',
        selector_output: '#ex-react-relative .react-output li:nth-child(2)',
        locale: 'ja-JP',
        expected_output: '2 時間前'
    },
    'Test Ember integration example': {
        comment: 'Test Ember integration - Date formatting example using pt-BR',
        route: '/ember/',
        selector_locale_select: '#ex-ember-date .locale-select',
        selector_output: '#ex-ember-date .ember-view',
        locale: 'pt-BR',
        expected_output: '13 de fevereiro de 2015'
    },
    'Test Handlebars integration example': {
        comment: 'Test Handlebars integration - Number formatting example using es-AR',
        route: '/handlebars/',
        selector_locale_select: '#ex-handlebars-number .locale-select',
        selector_output: '#ex-handlebars-number .handlebars-output li:nth-child(3)',
        locale: 'fr-FR',
        expected_output: '100,95\xA0$US'
    }/*,
    'Test Dust integration example': {
        comment: 'Test Dust integration - Number formatting example using cs-CZ',
        route: '/dust/',
        selector_locale_select: '#ex-dust-custom .locale-select',
        selector_output: '#ex-dust-custom .dust-output li:nth-child(2)',
        locale: 'cs-CZ',
        expected_output: '13. února. 2015'
    }*/
};

Object.keys(testData).forEach(function (name) {
    var data = testData[name];

    casper.test.begin(name, function (test) {

        test.comment('Loading page...');
        casper.start(BASE_URL + data.route, function () {
            test.pass('Page was loaded successfully!');
        });

        casper.then(function() {
            casper.test.comment(data.comment);

            test.assertExists(data.selector_locale_select, 'Found locale select element');
            test.assertExists(data.selector_output, 'Found output element');

            casper.evaluate(function (selector_locale_select, locale) {
                var localeSelect = document.querySelector(selector_locale_select);
                localeSelect.value = locale;

                var evt = new Event('change', { bubbles: true });
                localeSelect.dispatchEvent(evt);
            }, data.selector_locale_select, data.locale);

            // Some tests (example: Ember) run asynchronously...
            casper.wait(100, function () {
                var output = casper.evaluate(function (selector_output) {
                    var outputElement = document.querySelector(selector_output);
                    return outputElement.textContent.trim();
                }, data.selector_output);

                test.assertEquals(output, data.expected_output);
            });
        });

        casper.run(function() {
            test.done();
        });
    });
});