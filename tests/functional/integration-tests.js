/*globals casper */

// Test the various integration pages.
//
// We limit ourselves to one test per integration page. This may seem low,
// but keep in mind that functional tests are not supposed to be as exhaustive
// as unit tests. Instead, their role is to look at the system as a whole.
// Nevertheless, we test a variety of features of FormatJS and multiple locales
// to try and get the highest possible coverage and confidence that the site is
// working properly.
//
// All the tests basically do the same thing. Load a page, modify the value
// of the locale selection combo box, and check the output of the corresponding
// example with a static value. Because these tests are all the same, they are
// parameterized below.

'use strict';

var testData = {
    'Test React integration example': {
        comment: 'Test React integration - Relative time formatting example using ja-JP',
        type: 'react',
        locale: 'ja-JP',
        id: 'ex-react-relative',
        output_selector: 'li:nth-child(2)',
        expected_output: '2 時間前'
    },
    'Test Ember integration example': {
        comment: 'Test Ember integration - Date formatting example using pt-BR',
        type: 'ember',
        locale: 'pt-BR',
        id: 'ex-ember-date',
        expected_output: '13 de fevereiro de 2015'
    },
    'Test Handlebars integration example': {
        comment: 'Test Handlebars integration - Number formatting example using es-AR',
        type: 'handlebars',
        locale: 'fr-FR',
        id: 'ex-handlebars-number',
        output_selector: 'li:nth-child(3)',
        expected_output: '100,95\xA0$US'
    },
    'Test Dust integration example': {
        comment: 'Test Dust integration - Time custom formatting example using cs-CZ',
        type: 'dust',
        locale: 'cs-CZ',
        id: 'ex-dust-custom',
        output_selector: 'li:nth-child(3)',
        expected_output: '10:37'
    }
};

Object.keys(testData).forEach(function (name) {
    var data = testData[name];

    casper.test.begin(name, function (test) {

        test.comment('Loading page...');
        casper.start(casper.host + '/' + data.type + '/', function () {
            test.pass('Page was loaded successfully!');
        });

        casper.then(function () {
            casper.test.comment(data.comment);

            casper.evaluate(function (id, locale) {
                // Change the value of the locale selection combo box...
                var el = document.querySelector('#' + id + ' .locale-select');
                el.value = locale;

                var evt = new Event('change', { bubbles: true });
                el.dispatchEvent(evt);
            }, data.id, data.locale);

            // Some tests (example: Ember) run asynchronously...
            casper.wait(100, function () {
                // Retrieve the example's output...
                var output = casper.evaluate(function (selector_output) {
                    var outputElement = document.querySelector(selector_output);
                    return outputElement.textContent.trim();
                }, '#' + data.id + ' .' + data.type + '-output ' + (data.output_selector || ''));

                test.assertEquals(output, data.expected_output);
            });
        });

        casper.run(function() {
            test.done();
        });
    });
});