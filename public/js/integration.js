/* global React */

import HandlebarsExample from '../components/handlebars-example';
import ReactExample from '../components/react-example';
import DustExample from '../components/dust-example';
import EmberExample from '../components/ember-example';

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

    var ExampleComponent = getExampleComponent(type);

    var component = React.render(
        React.createElement(ExampleComponent, props),
        exampleNode.parentNode
    );

    // exampleNode was re-created in the call to React.render() above,
    // so we have to look it up again using its id.
    exampleNode = document.getElementById(id);

    // Expose React component on its DOM node for testing.
    exampleNode.component = component;
}

function getExampleComponent(type) {
    switch (type) {
        case 'handlebars': return HandlebarsExample;
        case 'react':      return ReactExample;
        case 'dust':       return DustExample;
        case 'ember':      return EmberExample;

        default:
            throw new Error('No output component for type: ' + type);
    }
}
