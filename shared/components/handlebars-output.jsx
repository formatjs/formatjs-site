/** @jsx React.DOM */
/* global React, Handlebars */

export default React.createClass({
    displayName: 'HandlebarsOutput',

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

    getIntlData: function () {
        return {
            locales : this.props.locales,
            formats : this.props.formats,
            messages: this.props.messages
        };
    },

    render: function () {
        var html = this.state.template(this.props.context, {
            data: {intl: this.getIntlData()}
        });

        return (
            <div className="handlebars-output"
                // Cool cuz Handlebars will have already escaped the context.
                dangerouslySetInnerHTML={{__html: html}}/>
        );
    }
});
