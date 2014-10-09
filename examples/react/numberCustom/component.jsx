/** @jsx React.DOM */
var Component = React.createClass({
    mixins: [ReactIntlMixin],

    render: function () {
        return (
            <ul>
                <li>{this.formatNumber(42000)}</li>
                <li>{this.formatNumber(0.9,    'percentage')}</li>
                <li>{this.formatNumber(100.95, 'coinage')}</li>
            </ul>
        );
    }
});
