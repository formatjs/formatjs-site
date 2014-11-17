var Component = React.createClass({
    mixins: [ReactIntl.Mixin],

    render: function () {
        var IntlRelative = ReactIntl.Relative;

        var postDate = Date.now() - (1000 * 60 * 60 * 24);
        var lastTrip = Date.now() - (1000 * 60 * 60 * 24 * 380);

        return (
            <div>
                <p>
                    <b><IntlRelative>{postDate}</IntlRelative></b>
                    <i>(best fit)</i><br/>

                    <b><IntlRelative style="numeric">{postDate}</IntlRelative></b>
                    <i>(numeric)</i>
                </p>
                <p>
                    <b><IntlRelative>{lastTrip}</IntlRelative></b>
                    <i>(best fit)</i><br/>

                    <b><IntlRelative style="numeric">{lastTrip}</IntlRelative></b>
                    <i>(numeric)</i>
                </p>
            </div>
        );
    }
});
