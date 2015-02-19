// Highjack the Date object so that our tests don't suddenly start failing...

var __Date__ = Date;

// February 13, 2015
var STATIC_DATE_MS = 1423852666565;

Date = function (value) {
    return new __Date__(value !== undefined ? value : STATIC_DATE_MS);
};

Date.now = function () {
    return STATIC_DATE_MS;
};
