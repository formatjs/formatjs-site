/** @jsx React.DOM */
var Component = React.createClass({
    mixins: [ReactIntlMixin],

    render: function () {
        var postDate    = Date.now() - (1000 * 60 * 60 * 24);
        var commentDate = Date.now() - (1000 * 60 * 60 * 2);
        var meetingDate = Date.now() + (1000 * 60 * 51);

        return (
            <div>
                <b>{this.formatRelative(postDate)}</b><br/>
                <b>{this.formatRelative(commentDate)}</b><br/>
                <b>{this.formatRelative(meetingDate)}</b>
            </div>
        );
    }
});
