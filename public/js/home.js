/* global React */

import SplashExample from '../components/splash-example';

export default function init(state) {
    var splashProps = Object.assign({}, state.intl, state.examples.splash);
    var node        = document.querySelector('.splash-example-container');

    // Expose React component on its DOM node for testing.
    node.component = React.render(
        React.createElement(SplashExample, splashProps),
        node
    );
}

// Added this hook to facilitate writing functional tests for the home page splash example.
// A cleaner, more generic approach would be to expose references to top-level components:
//   http://facebook.github.io/react/tips/references-to-components.html
window.updateSplashExample = init;
