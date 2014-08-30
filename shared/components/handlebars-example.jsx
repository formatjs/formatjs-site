/** @jsx React.DOM */
/* global React */

import ExampleMixin from '../mixins/example';
import Code from './code';
import LocaleSelect from './locale-select';
import HandlebarsOutput from './handlebars-output';

export default React.createClass({
    displayName: 'HandlebarsExample',
    mixins     : [ExampleMixin],

    render: function () {
        var example       = this.props.example,
            currentLocale = this.state.currentLocale,
            messages      = this.props.intl.messages[currentLocale];

        return (
            <div id={example.id} className="example">
                <div className="example-source">
                    <Code lang="html">{example.source.template}</Code>
                </div>

                <div className="example-context">
                    <Code lang="javascript">{example.source.context}</Code>
                </div>

                <div className="example-intl">
                    <Code lang="javascript">{this.generateIntlDataCode()}</Code>
                </div>

                <div className="example-output">
                    <HandlebarsOutput
                        locales={currentLocale}
                        formats={this.props.intl.formats}
                        messages={messages}

                        source={example.source.template}
                        context={example.context} />
                </div>

                <div className="example-controls">
                    <LocaleSelect
                        currentLocale={currentLocale}
                        availableLocales={this.props.intl.availableLocales}
                        onLocaleChange={this.updateLocale} />
                </div>
            </div>
        );
    }
});
