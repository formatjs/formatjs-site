/*globals casper */

'use strict';

var BASE_URL = 'http://' + casper.cli.options.host + '/';

casper.on('page.initialized', function () {
    casper.page.injectJs('tests/functional/includes/date.mock.js');
});

casper.test.begin('Test FormatJS home page splash example', function (test) {

    test.comment('Load home page');
    casper.start(BASE_URL, function () {
        test.pass('Page was loaded');
    });

    casper.then(function() {
        test.comment('Test splash example');

        test.assertExists('.num-photos-select', 'Found number select');
        test.assertExists('.locale-select', 'Found locale select');
        test.assertExists('.splash-example-output', 'Found splash example output');

        var output = casper.evaluate(function (numPhotos, locale) {
            var numPhotosSelect = document.querySelector('.num-photos-select');
            numPhotosSelect.value = numPhotos;

            var chgEvt1 = new Event('change', { bubbles: true });
            numPhotosSelect.dispatchEvent(chgEvt1);

            var localeSelect = document.querySelector('.locale-select');
            localeSelect.value = locale;

            var chgEvt2 = new Event('change', { bubbles: true });
            localeSelect.dispatchEvent(chgEvt2);

            var outputElement = document.querySelector('.splash-example-output');
            return outputElement.textContent.trim();
        }, 3, 'fr-FR');

        test.assertEquals(output,
            'Le 13 février 2015, Annie a pris 3 photographies.',
            'Check that splash output is in French');
    });

    casper.run();
});
