/* global React, dust */

export default React.createClass({
    displayName: 'DustOutput',

    propTypes: {
        id: React.PropTypes.string.isRequired,
        source : React.PropTypes.string.isRequired,
        context: React.PropTypes.object.isRequired,

        locales : React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.array,
        ]).isRequired,

        formats : React.PropTypes.object,
        messages: React.PropTypes.object
    },

    getInitialState: function () {
        var tmpl = dust.compile(this.props.source, this.props.id);
        dust.loadSource(tmpl);
        // The state that we have is the compiled template, but alas this is
        // passed through in a side channel (registered inside of dust).
        return {};
    },

    componentWillReceiveProps: function (nextProps) {
        var tmpl;
        if (nextProps.source !== this.props.source) {
            tmpl = dust.compile(nextProps.source, this.props.id);
            dust.loadSource(tmpl);
            // The state that we have is the compiled template, but alas this is
            // passed through in a side channel (registered inside of dust).
            this.setState({});
        }
    },

    render: function () {
        var context = {},
            html,
            nextTick;

        Object.assign(context, this.props.context, {
            intl: {
                locales : this.props.locales,
                formats : this.props.formats,
                messages: this.props.messages
            }
        });

        // This de-async is hacky, and only works because our example templates
        // are simple (don't reference external resources such as partials).
        nextTick = dust.nextTick;
        dust.nextTick = function(cb) { cb(); };
        dust.render(this.props.id, context, function(err, out) {
            dust.nextTick = nextTick;
            if (!err && out) {
                html = out;
            }
        });

        if (html) {
            return (
                <div className="dust-output"
                    // Cool cuz dust will have already escaped the context.
                    dangerouslySetInnerHTML={{__html: html}}/>
            );
        }
    }
});
