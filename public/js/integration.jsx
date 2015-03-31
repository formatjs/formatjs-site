/* global React */

import ExampleContainer from './components/example-container';
import HandlebarsExample from './components/handlebars-example';
import ReactExample from './components/react-example';
import DustExample from './components/dust-example';
import EmberExample from './components/ember-example';

var INTEGRATION_COMPONENTS = {
    handlebars: HandlebarsExample,
    react     : ReactExample,
    dust      : DustExample,
    ember     : EmberExample
};

export default function init(state) {
    state.examples.forEach(function (example) {
        hydrateExample(example.id, example.type, {
            example: example,
            intl   : state.intl
        });
    });
}

function hydrateExample(id, type, props) {
    var exampleNode = document.getElementById(id);
    if (!exampleNode) { return; }

    var ExampleComponent = INTEGRATION_COMPONENTS[type];
    var containerNode    = exampleNode.parentNode;

    containerNode.component = React.render(
        <ExampleContainer {...props} component={ExampleComponent} />,
        containerNode
    );
}
