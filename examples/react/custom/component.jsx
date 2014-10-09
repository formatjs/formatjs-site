/** @jsx React.DOM */
var Component = React.createClass({
    mixins: [ReactIntlMixin],

    render: function () {
        var A = 1390518044403;
        var B = new Date();
        var C = 1400.34;
        var D = Date.now() - (1000 * 60 * 60 * 24);

        return (
            <div>
                <p>A: {this.formatDate(A,     'short')}</p>
                <p>B: {this.formatTime(B,     'hhmm')}</p>
                <p>C: {this.formatNumber(C,   'USD')}</p>
                <p>D: {this.formatRelative(D, 'exact')}</p>
            </div>
        );
    }
});
