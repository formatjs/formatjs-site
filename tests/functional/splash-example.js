/*globals casper */

'use strict';

casper.test.begin('Test FormatJS home page splash example', function (test) {

    test.comment('Load home page');
    casper.start(casper.host + '/', function () {
        test.pass('Page was loaded');
    });

    casper.then(function () {
        test.comment('Test splash example');

        test.assertExists('.splash-example-container', 'Found splash example container');
        test.assertExists('.num-photos-select', 'Found number select');
        test.assertExists('.locale-select', 'Found locale select');
        test.assertExists('.splash-example-output', 'Found splash example output');

        casper.evaluate(function (numPhotos, locale) {
            // Start by setting the takenDate prop to a known value so that we
            // can compare the example's output to a static value.
            var container = document.querySelector('.splash-example-container');
            var component = container.component;
            component.setProps({ takenDate: 1423852666565 });

            // Change the value of the # photos combo box...
            var numPhotosSelect = document.querySelector('.num-photos-select');
            numPhotosSelect.value = numPhotos;

            var chgEvt1 = new Event('change', { bubbles: true });
            numPhotosSelect.dispatchEvent(chgEvt1);

            // Change the value of the locale selection combo box...
            var localeSelect = document.querySelector('.locale-select');
            localeSelect.value = locale;

            var chgEvt2 = new Event('change', { bubbles: true });
            localeSelect.dispatchEvent(chgEvt2);
        }, 3, 'fr-FR');

        this.wait(1000, function () {
            var output = this.evaluate(function () {
                // Retrieve the example's output...
                var outputElement = document.querySelector('.splash-example-output');
                return outputElement.textContent.trim();
            });

            test.assertEquals(output, 'Le 13 février 2015, Annie a pris 3 photographies.');
        });
    });

    casper.run(function () {
        test.done();
    });
});
