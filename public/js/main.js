/* global Handlebars, HandlebarsIntl, APP */
/* jshint browser: true, esnext: true */

import homePage from './home';
import integrationPage from './integration';

HandlebarsIntl.registerWith(Handlebars);

switch (APP.pageType) {
    case 'home':
        homePage(APP);
        break;

    case 'integration':
        integrationPage(APP);
        break;
}
