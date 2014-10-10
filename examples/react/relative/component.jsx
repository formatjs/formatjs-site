/** @jsx React.DOM */
var Component = React.createClass({
    mixins: [ReactIntlMixin],

    render: function () {
        var postDate    = Date.now() - (1000 * 60 * 60 * 24);
        var commentDate = Date.now() - (1000 * 60 * 60 * 2);
        var meetingDate = Date.now() + (1000 * 60 * 51);

        return (
            <ul>
                <li>{this.formatRelative(postDate)}</li>
                <li>{this.formatRelative(commentDate)}</li>
                <li>{this.formatRelative(meetingDate)}</li>
            </ul>
        );
    }
});
