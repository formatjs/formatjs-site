/* global dust, DustIntl, Handlebars, HandlebarsIntl, APP */

import homePage from './home';
import integrationPage from './integration';
import tableOfContents from './toc';

DustIntl.registerWith(dust);
HandlebarsIntl.registerWith(Handlebars);

switch (APP.pageType) {
    case 'home':
        homePage(APP);
        break;

    case 'guide':
        tableOfContents(2);
        break;

    case 'integration':
        integrationPage(APP);
        break;
}
