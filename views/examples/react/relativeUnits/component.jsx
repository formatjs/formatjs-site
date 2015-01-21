var IntlMixin         = ReactIntl.IntlMixin;
var FormattedRelative = ReactIntl.FormattedRelative;

var Component = React.createClass({
    mixins: [IntlMixin],

    render: function () {
        var postDate = Date.now() - (1000 * 60 * 60 * 22);
        var lastTrip = Date.now() - (1000 * 60 * 60 * 24 * 70);

        return (
            <div>
                <p>
                    <b><FormattedRelative value={postDate} /></b>
                    <i>(best fit)</i><br/>

                    <b><FormattedRelative value={postDate} units="minute" /></b>
                    <i>(in minutes)</i>
                </p>
                <p>
                    <b><FormattedRelative value={lastTrip} /></b>
                    <i>(best fit)</i><br/>

                    <b><FormattedRelative value={lastTrip} units="day" /></b>
                    <i>(in days)</i>
                </p>
            </div>
        );
    }
});
