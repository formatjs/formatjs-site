/* global React */

import HandlebarsExample from '../components/handlebars-example';
import ReactExample from '../components/react-example';
import DustExample from '../components/dust-example';

export default function init(state) {
    state.examples.forEach(function (example) {
        hydrateExampleOutput(example.id, example.type, {
            example: example,
            intl   : state.intl
        });
    });
}

function hydrateExampleOutput(id, type, props) {
    var exampleNode = document.getElementById(id);
    if (!exampleNode) { return; }

    var OutputComponent = getOutputComponent(type);

    React.renderComponent(
        new OutputComponent(props),
        exampleNode.parentNode
    );
}

function getOutputComponent(type) {
    switch (type) {
        case 'handlebars': return HandlebarsExample;
        case 'react':      return ReactExample;
        case 'dust':       return DustExample;
        
        default:
            throw new Error('No output component for type: ' + type);
    }
}
