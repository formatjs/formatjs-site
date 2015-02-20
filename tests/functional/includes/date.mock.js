(function () {
    'use strict';

    // Create a date object for a specific instant in time (my 36th birthday...)

    var d = new Date();
    d.setUTCFullYear(2014, 11, 8);
    d.setUTCHours(12, 34, 0, 0);

    // Adjust it based on the time zone offset, so that formatted date/time
    // will be what we expect, independent of the time zone (minus the time
    // zone name, which is a different story)

    d.setUTCMinutes(d.getUTCMinutes() + d.getTimezoneOffset());

    // Highjack the Date object, and make sure that `new Date()` (without param)
    // and `Date.now()` return the time computed above. This will guarantee that
    // date/time formatted absolutely does not keep changing, and we can test it
    // against a static value.

    var __Date__ = Date;

    Date = function (value) {
        return new __Date__(value !== undefined ? value : d.getTime());
    };

    Date.now = function () {
        return d.getTime();
    };
}());
