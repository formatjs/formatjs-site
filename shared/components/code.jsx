/** @jsx React.DOM */
/* global Rainbow, React */

export default React.createClass({
    displayName: 'Code',

    shouldComponentUpdate: function (nextProps) {
        return this.props.children !== nextProps.children;
    },

    componentDidUpdate: function () {
        this.refs.code.getDOMNode().classList.remove('rainbow');
        Rainbow.color(this.getDOMNode());
    },

    render: function () {
        return (
            <pre><code ref="code" data-language={this.props.lang}>
                {this.props.children}
            </code></pre>
        );
    }
});
