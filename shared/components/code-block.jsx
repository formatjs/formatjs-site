/* global hljs, React */

export default React.createClass({
    displayName: 'CodeBlock',

    propTypes: {
        highlight: React.PropTypes.bool,
        lang     : React.PropTypes.string,
        wrap     : React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {highlight: true};
    },

    shouldComponentUpdate: function (nextProps) {
        // This prevents double syntax highlighting of unchanged content.
        return this.props.children !== nextProps.children;
    },

    componentDidUpdate: function () {
        if (this.props.highlight) {
            hljs.highlightBlock(this.refs.code.getDOMNode());
        }
    },

    render: function () {
        var classNames = this.props.wrap ? 'code code-wrap': 'code';
        var lang       = this.props.highlight ? this.props.lang : 'nohighlight';

        return (
            <pre className={classNames}>
                <code ref="code" className={lang}>
                    {this.props.children}
                </code>
            </pre>
        );
    }
});
