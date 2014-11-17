var Component = React.createClass({
    mixins: [ReactIntl.Mixin],

    render: function () {
        var IntlRelative = ReactIntl.Relative;

        var postDate = Date.now() - (1000 * 60 * 60 * 22);
        var lastTrip = Date.now() - (1000 * 60 * 60 * 24 * 70);

        return (
            <div>
                <p>
                    <b><IntlRelative>{postDate}</IntlRelative></b>
                    <i>(best fit)</i><br/>

                    <b><IntlRelative units="minute">{postDate}</IntlRelative></b>
                    <i>(in minutes)</i>
                </p>
                <p>
                    <b><IntlRelative>{lastTrip}</IntlRelative></b>
                    <i>(best fit)</i><br/>

                    <b><IntlRelative units="day">{lastTrip}</IntlRelative></b>
                    <i>(in days)</i>
                </p>
            </div>
        );
    }
});
