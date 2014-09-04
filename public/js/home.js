/* global React */

import SplashExample from '../components/splash-example';

export default function init(state) {
    var splashProps = Object.assign({}, state.intl, state.examples.splash);

    React.renderComponent(
        new SplashExample(splashProps),
        document.querySelector('.splash-example-container')
    );
}
