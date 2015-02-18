/*globals casper */

'use strict';

var BASE_URL = 'http://' + casper.cli.options.host + '/';

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
            window.APP.examples.splash.takenDate = Date.now();
            updateSplashExample(window.APP);

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

        test.assertEquals(output, 'Le 13 février 2015, Annie a pris 3 photographies.');
    });

    casper.run(function () {
        test.done();
    });
});
