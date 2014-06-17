//Client-side JS goes here.
(function () {
    var locale    = APP.intl.locale,
        // TODO: expose these URLs through Express State instead
        baseUrl   = 'http://yui.yahooapis.com/combo?platform/intl/0.1.2/Intl.min.js&platform/intl/0.1.2/locale-data/jsonp/',
        comboUrl  = baseUrl + locale + '.js',
        intlMessageFormatUrl = '/node_modules/intl-messageformat/build/intl-messageformat.complete.min.js';

    yepnope([{
        test : !!window.Intl,
        nope : comboUrl
    }, intlMessageFormatUrl, {
        complete: init
    }]);

    function init () {
        // Initialize application here
    }
})();
