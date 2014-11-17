var Component = React.createClass({
    mixins: [ReactIntl.Mixin],

    render: function () {
        var IntlRelative = ReactIntl.Relative;

        var postDate    = Date.now() - (1000 * 60 * 60 * 24);
        var commentDate = Date.now() - (1000 * 60 * 60 * 2);
        var meetingDate = Date.now() + (1000 * 60 * 51);

        return (
            <ul>
                <li><IntlRelative>{postDate}</IntlRelative></li>
                <li><IntlRelative>{commentDate}</IntlRelative></li>
                <li><IntlRelative>{meetingDate}</IntlRelative></li>
            </ul>
        );
    }
});
