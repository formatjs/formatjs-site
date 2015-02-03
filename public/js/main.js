/* global APP */

import homePage from './home';
import integrationPage from './integration';
import tableOfContents from './toc';

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
