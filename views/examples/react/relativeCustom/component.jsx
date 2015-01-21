var IntlMixin         = ReactIntl.IntlMixin;
var FormattedRelative = ReactIntl.FormattedRelative;

var Component = React.createClass({
    mixins: [IntlMixin],

    render: function () {
        var postDate = Date.now() - (1000 * 60 * 60 * 24);
        var lastTrip = Date.now() - (1000 * 60 * 60 * 24 * 2);

        return (
            <div>
                <p>
                    <b><FormattedRelative value={postDate} /></b>
                    <i>(best fit)</i><br/>

                    <b><FormattedRelative value={postDate} format="hours" /></b>
                    <i>(hours, numeric)</i>
                </p>
                <p>
                    <b><FormattedRelative value={lastTrip} /></b>
                    <i>(best fit)</i><br/>

                    <b><FormattedRelative value={lastTrip} format="hours" /></b>
                    <i>(hours, numeric)</i>
                </p>
            </div>
        );
    }
});
