var Component = React.createClass({
    mixins: [ReactIntlMixin],

    render: function () {
        var postDate = Date.now() - (1000 * 60 * 60 * 24);
        var lastTrip = Date.now() - (1000 * 60 * 60 * 24 * 2);

        return (
            <div>
                <p>
                    <b>{this.formatRelative(postDate)}</b> <i>(best fit)</i><br/>
                    <b>{this.formatRelative(postDate, 'hours')}</b> <i>(hours, numeric)</i>
                </p>
                <p>
                    <b>{this.formatRelative(lastTrip)}</b> <i>(best fit)</i><br/>
                    <b>{this.formatRelative(lastTrip, 'hours')}</b> <i>(hours, numeric)</i>
                </p>
            </div>
        );
    }
});
