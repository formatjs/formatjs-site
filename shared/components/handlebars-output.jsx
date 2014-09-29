/** @jsx React.DOM */
/* global React, ReactIntlMixin, Handlebars */

export default React.createClass({
    displayName: 'HandlebarsOutput',
    mixins     : [ReactIntlMixin],

    propTypes: {
        source : React.PropTypes.string.isRequired,
        context: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return {
            template: Handlebars.compile(this.props.source)
        };
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.source !== this.props.source) {
            this.setState({
                template: Handlebars.compile(nextProps.source)
            });
        }
    },

    render: function () {
        var html = this.state.template(this.props.context, {
            data: {
                intl: {
                    locales : this.props.locales,
                    formats : this.props.formats,
                    messages: this.props.messages
                }
            }
        });

        return (
            <div className="handlebars-output"
                // Cool cuz Handlebars will have already escaped the context.
                dangerouslySetInnerHTML={{__html: html}}/>
        );
    }
});
