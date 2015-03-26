/* global React */

import TableOfContents from './components/table-of-contents';

export default function init(maxDepth) {
    var tocNode = document.getElementById('toc');
    if (!tocNode) {
        return;
    }

    React.render(
        <TableOfContents
            contents={document.querySelector('.main')}
            maxDepth={maxDepth}
        />,
        tocNode
    );
}
