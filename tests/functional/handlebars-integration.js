/*globals casper */

'use strict';

var BASE_URL = 'http://' + casper.cli.options.host + '/handlebars/';

casper.test.begin('Test Handlebars integration example', function (test) {

    test.comment('Load Handlebars integration page');
    casper.start(BASE_URL, function () {
        test.pass('Page was loaded');
    });

    casper.then(function() {
        test.comment('Test Handlebars integration - Number formatting example using es-AR');

        test.assertExists('#ex-handlebars-number .locale-select', 'Found locale select');
        test.assertExists('#ex-handlebars-number .handlebars-output', 'Found Handlebars output');

        var output = casper.evaluate(function (locale) {
            var localeSelect = document.querySelector('#ex-handlebars-number .locale-select');
            localeSelect.value = locale;

            var evt = new Event('change', { bubbles: true });
            localeSelect.dispatchEvent(evt);

            var elements = document.querySelectorAll('#ex-handlebars-number .handlebars-output li');
            if (elements.length > 0) {
                return elements[2].textContent.trim();
            }
        }, 'es-AR');

        test.assertEquals(output,
            'US$100,95',
            'Check that Handlebars output is in Spanish (Argentina)');
    });

    casper.run();
});
