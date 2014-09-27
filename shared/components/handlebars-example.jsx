/** @jsx React.DOM */
/* global React */

import ExampleMixin from '../mixins/example';
import CodeBlock from './code-block';
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
                    <CodeBlock lang="html">
                        {example.source.template}
                    </CodeBlock>
                </div>

                <div className="example-context">
                    <h3 className="subheading">Context</h3>
                    <CodeBlock lang="javascript">
                        {example.source.context}
                    </CodeBlock>
                </div>

                <div className="example-render">
                    <h3 className="subheading">Rendering</h3>
                    <CodeBlock lang="javascript">
                        {this.genderateRenderCode()}
                    </CodeBlock>
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
                        availableLocales={this.props.intl.availableLocales}
                        value={currentLocale}
                        onChange={this.updateLocale} />
                </div>
            </div>
        );
    }
});
