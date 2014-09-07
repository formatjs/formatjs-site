/** @jsx React.DOM */
/* global React */

import ExampleMixin from '../mixins/example';
import Code from './code';
import LocaleSelect from './locale-select';
import HandlebarsOutput from './handlebars-output';

export default React.createClass({
    displayName: 'HandlebarsExample',
    mixins     : [ExampleMixin],

    statics: {
        renderCode: [
            'var html = template(context, {',
            '    data: {intl: intlData}',
            '});'
        ].join('\n')
    },

    genderateRenderCode: function () {
        return [
            this.generateIntlDataCode(),
            '',
            this.constructor.renderCode
        ].join('\n');
    },

    render: function () {
        var example       = this.props.example,
            currentLocale = this.state.currentLocale,
            messages      = this.props.intl.messages[currentLocale];

        return (
            <div id={example.id} className="example">
                <div className="example-source">
                    <h3 className="subheading">Template</h3>
                    <Code lang="html">{example.source.template}</Code>
                </div>

                <div className="example-context">
                    <h3 className="subheading">Context</h3>
                    <Code lang="javascript">{example.source.context}</Code>
                </div>

                <div className="example-render">
                    <h3 className="subheading">Rendering</h3>
                    <Code lang="javascript">{this.genderateRenderCode()}</Code>
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
