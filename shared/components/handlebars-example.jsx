/** @jsx React.DOM */
/* global React */

import LocaleSelect from './locale-select';
import HandlebarsOutput from './handlebars-output';

export default React.createClass({
    displayName: 'HandlebarsExample',

    getInitialState: function () {
        return {
            currentLocale: this.props.intl.locales[0]
        };
    },

    updateLocale: function (newLocale) {
        this.setState({currentLocale: newLocale});
    },

    render: function () {
        var currentLocale = this.state.currentLocale,
            messages      = this.props.intl.messages[currentLocale];

        return (
            <div>
                <HandlebarsOutput
                    locales={currentLocale}
                    formats={this.props.intl.formats}
                    messages={messages}

                    source={this.props.source}
                    context={this.props.context} />

                <LocaleSelect
                    currentLocale={currentLocale}
                    availableLocales={this.props.intl.availableLocales}
                    onLocaleChange={this.updateLocale} />
            </div>
        );
    }
});
