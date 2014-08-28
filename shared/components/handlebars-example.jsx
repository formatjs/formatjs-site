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
        return (
            <div>
                <HandlebarsOutput
                    locales={this.state.currentLocale}
                    formats={this.props.intl.formats}
                    messages={this.props.intl.messages}

                    source={this.props.source}
                    context={this.props.context} />

                <LocaleSelect
                    currentLocale={this.state.currentLocale}
                    availableLocales={this.props.intl.availableLocales}
                    onLocaleChange={this.updateLocale} />
            </div>
        );
    }
});
