var IntlMixin         = ReactIntl.IntlMixin;
var FormattedRelative = ReactIntl.FormattedRelative;

var Component = React.createClass({
    mixins: [IntlMixin],

    render: function () {
        var postDate    = Date.now() - (1000 * 60 * 60 * 24);
        var commentDate = Date.now() - (1000 * 60 * 60 * 2);
        var meetingDate = Date.now() + (1000 * 60 * 51);

        return (
            <ul>
                <li><FormattedRelative value={postDate} /></li>
                <li><FormattedRelative value={commentDate} /></li>
                <li><FormattedRelative value={meetingDate} /></li>
            </ul>
        );
    }
});
