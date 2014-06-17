//Client-side JS goes here.
(function () {
    var locale    = APP.intl.locale,
    baseUrl   = 'http://yui.yahooapis.com/combo?platform/intl/0.1.2/Intl.min.js&platform/intl/0.1.2/locale-data/jsonp/',
    comboUrl  = baseUrl + locale + '.js';

    yepnope({
        test : !!window.Intl,
        nope : comboUrl
        callback: init
    });

    function init () {
        // Initialize application here
    }
})();
