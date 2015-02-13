// Highjack the Date object so that our tests don't suddenly start failing...

var __Date__ = Date;
var STATIC_DATE_MS = 1423852666565;

Date = function () {
    return new __Date__(STATIC_DATE_MS);
};

Date.now = function () {
    return STATIC_DATE_MS;
};
