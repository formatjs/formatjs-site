/*globals casper */

'use strict';

var BASE_URL = 'http://' + casper.cli.options.host + '/ember/';

casper.test.begin('Test Ember integration example', function (test) {

    test.comment('Load Ember integration page');
    casper.start(BASE_URL, function () {
        test.pass('Page was loaded');
    });

    casper.then(function() {
        test.comment('Test Ember integration - date formatting example using pt-BR');

        test.assertExists('#ex-ember-date .locale-select', 'Found locale select');
        test.assertExists('#ex-ember-date .ember-view', 'Found Ember output');

        casper.evaluate(function (locale) {
            var localeSelect = document.querySelector('#ex-ember-date .locale-select');
            localeSelect.value = locale;

            var evt = new Event('change', { bubbles: true });
            localeSelect.dispatchEvent(evt);
        }, 'pt-BR');

        // This is required because of the Ember run loop, which runs asynchronously...
        casper.wait(100, function () {
            var output = casper.evaluate(function () {
                var outputElement = document.querySelector('#ex-ember-date .ember-view');
                return outputElement.textContent.trim();
            });

            test.assertEquals(output,
                '13 de fevereiro de 2015',
                'Check that Ember output is in Portuguese (Brazilian)');
        });
    });

    casper.run();
});
