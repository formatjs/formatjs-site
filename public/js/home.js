/* global React */

import SplashExample from '../components/splash-example';

export default function init(state) {
    var splashExample = state.splash.example;

    React.renderComponent(
        new SplashExample({
            locales         : state.intl.locales[0],
            formats         : state.intl.formats,
            messages        : state.intl.messages,
            availableLocales: state.intl.availableLocales,

            name     : splashExample.name,
            numPhotos: splashExample.numPhotos,
            takenDate: splashExample.takenDate
        }),

        document.querySelector('.splash-example-container')
    );
}
