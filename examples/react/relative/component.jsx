/** @jsx React.DOM */
var Component = React.createClass({
    mixins: [ReactIntlMixin],

    render: function () {
        var postDate    = Date.now() - (1000 * 60 * 60 * 24);
        var commentDate = Date.now() - (1000 * 60 * 60 * 2);
        var meetingDate = Date.now() + (1000 * 60 * 51);

        return (
            <div>
                <p>
                    <b>{this.formatRelative(postDate)}</b> <i>(best fit)</i><br/>
                    <b>{this.formatRelative(postDate, {style: 'numeric'})}</b> <i>(numeric)</i>
                </p>
                <p>
                    <b>{this.formatRelative(commentDate)}</b> <i>(default)</i><br/>
                    <b>{this.formatRelative(commentDate, {units: 'minute'})}</b> <i>(in minutes)</i>
                </p>
                <p>
                    <b>{this.formatRelative(meetingDate)}</b> <i>(rounded)</i><br/>
                    <b>{this.formatRelative(meetingDate, {units: 'minute'})}</b> <i>(in minutes)</i>
                </p>
            </div>
        );
    }
});
