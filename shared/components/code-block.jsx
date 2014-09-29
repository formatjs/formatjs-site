/** @jsx React.DOM */
/* global Rainbow, React */

export default React.createClass({
    displayName: 'CodeBlock',

    propTypes: {
        lang: React.PropTypes.string,
        wrap: React.PropTypes.bool
    },

    shouldComponentUpdate: function (nextProps) {
        // This prevents double syntax highlighting of unchanged content.
        return this.props.children !== nextProps.children;
    },

    componentDidUpdate: function () {
        this.refs.code.getDOMNode().classList.remove('rainbow');
        Rainbow.color(this.getDOMNode());
    },

    render: function () {
        var classNames = this.props.wrap ? 'code code-wrap': 'code',
            lang       = this.props.lang;

        return (
            <pre className={classNames}><code ref="code" data-language={lang}>
                {this.props.children}
            </code></pre>
        );
    }
});
