/* global React */

import TableOfContents from '../components/table-of-contents';

export default function init(maxDepth) {
    var main = document.querySelector('.main');

    React.render(
        React.createElement(TableOfContents, {
            contents: main,
            maxDepth: maxDepth
        }),
        document.getElementById('toc')
    );
}
