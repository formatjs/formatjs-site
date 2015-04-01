/* global React */

import ExampleContainer from './components/example-container';

export default function init(state) {
    state.examples.forEach(function (example) {
        hydrateExample(example.id, {
            example: example,
            intl   : state.intl
        });
    });
}

function hydrateExample(id, props) {
    var exampleNode = document.getElementById(id);
    if (!exampleNode) { return; }

    var containerNode = exampleNode.parentNode;

    containerNode.component = React.render(
        <ExampleContainer {...props} />,
        containerNode
    );
}
