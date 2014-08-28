/* global React */

import HandlebarsExample from '../components/handlebars-example';

export default function init(state) {
    state.examples.forEach(function (example) {
        hydrateExampleOutput(example.id, example.type, {
            source : example.source.template,
            context: example.context,
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
        exampleNode.querySelector('.example-output')
    );
}

function getOutputComponent(type) {
    switch (type) {
        case 'handlebars': return HandlebarsExample;
        default:
            throw new Error('No output component for type: ' + type);
    }
}
