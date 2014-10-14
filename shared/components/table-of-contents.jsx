/** @jsx React.DOM */

export default React.createClass({
    displayName: 'TableOfContents',

    selectors: [
        '.secs > h2',
        '.secs > h3',
        '.secs > h4'
    ],

    getLists: function (target, selectorIndex, maxDepth) {
        var data = [];
        var headers = target.querySelectorAll(this.selectors[selectorIndex]);
        var header;
        var anchor;
        var section;
        var childHeaders;
        var nextSelector = selectorIndex + 1;

        for (var i = 0, l = headers.length; i < l; i++) {
            header = headers[i];
            anchor = <a href={'#' + header.id}>{header.textContent}</a>;
            section = header.parentNode;
            childHeaders = section.querySelectorAll(this.selectors[nextSelector]);
            if (childHeaders.length > 0 && nextSelector < maxDepth) {
                data.push(
                    <li>
                        {anchor}
                        <ol>
                            {this.getLists(section, nextSelector, maxDepth)}
                        </ol>
                    </li>
                );
            } else {
                data.push(
                    <li>
                        {anchor}
                    </li>
                );
            }
        }

        return data;
    },

    render: function () {
        var lists = this.getLists(this.props.contents, 0, this.props.maxDepth);
        return (
            <ol role="directory">{lists}</ol>
        );
    }
});
