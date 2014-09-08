/* global Handlebars, HandlebarsIntl, APP */

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
