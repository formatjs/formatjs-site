/** @jsx React.DOM */
var Component = React.createClass({
    mixins: [ReactIntlMixin],

    render: function () {
        var postDate = Date.now() - (1000 * 60 * 60 * 22);
        var lastTrip = Date.now() - (1000 * 60 * 60 * 24 * 70);

        return (
            <div>
                <p>
                    <b>{this.formatRelative(postDate)}</b> <i>(best fit)</i><br/>
                    <b>{this.formatRelative(postDate, {
                        units: 'minute'
                    })}</b> <i>(in minutes)</i>
                </p>
                <p>
                    <b>{this.formatRelative(lastTrip)}</b> <i>(best fit)</i><br/>
                    <b>{this.formatRelative(lastTrip, {
                        units: 'day'
                    })}</b> <i>(in days)</i>
                </p>
            </div>
        );
    }
});
