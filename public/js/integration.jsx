/* global React */

import HandlebarsExample from './components/handlebars-example';
import ReactExample from './components/react-example';
import DustExample from './components/dust-example';
import EmberExample from './components/ember-example';

var COMPONENTS = {
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

    var ExampleComponent = COMPONENTS[type];
    if (!ExampleComponent) {
        throw new Error('No output component for type: ' + type);
    }

    exampleNode.parentNode.component = React.render(
        <ExampleComponent {...props} />,
        exampleNode.parentNode
    );
}
