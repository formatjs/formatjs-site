/** @jsx React.DOM */
var Component = React.createClass({
    mixins: [ReactIntlMixin],

    render: function () {
        var yesterday = Date.now() - (1000 * 60 * 60 * 24);

        return (
            <ul>
                <li>{this.formatNumber(1400.34,     'USD')}</li>
                <li>{this.formatDate(1390518044403, 'short')}</li>
                <li>{this.formatTime(new Date(),    'hhmm')}</li>
                <li>{this.formatRelative(yesterday, 'hours')}</li>
            </ul>
        );
    }
});
