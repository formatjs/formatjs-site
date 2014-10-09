/** @jsx React.DOM */
/* global React */

import ExampleMixin from '../mixins/example';
import CodeBlock from './code-block';
import LocaleSelect from './locale-select';
import HandlebarsOutput from './handlebars-output';
import {Tabs, Tab} from './tabs';

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
        var example       = this.props.example;
        var intl          = this.props.intl;
        var currentLocale = this.state.currentLocale;
        var messages      = intl.messages[currentLocale];

        var tabs = [
            <Tab label="Template" key="template">
                <CodeBlock lang="html">
                    {example.source.template}
                </CodeBlock>
            </Tab>,

            <Tab label="Context" key="context">
                <CodeBlock lang="javascript">
                    {example.source.context}
                </CodeBlock>
            </Tab>,

            <Tab label="Render" key="render">
                <CodeBlock lang="javascript">
                    {this.genderateRenderCode()}
                </CodeBlock>
            </Tab>
        ];

        // Insert a "Message" tab if the example uses an i18n message.
        if (example.meta.messageId) {
            tabs.splice(1, 0,
                <Tab label="Message" key="message">
                    <CodeBlock>
                        {messages[example.meta.messageId]}
                    </CodeBlock>
                </Tab>
            );
        }

        return (
            <div id={example.id} className="example">
                <div className="example-source">
                    <Tabs>
                        {tabs}
                    </Tabs>
                </div>

                <div className="example-output">
                    <h4 className="example-output-heading">Rendered</h4>

                    <HandlebarsOutput
                        locales={currentLocale}
                        formats={example.meta.formats}
                        messages={messages}
                        source={example.source.template}
                        context={this.evalContext(example.source.context)} />

                    <div className="example-output-controls">
                        <label>
                            <span className="example-label">Locale:</span>
                            <LocaleSelect
                                availableLocales={intl.availableLocales}
                                value={currentLocale}
                                onChange={this.updateLocale} />
                        </label>
                    </div>
                </div>
            </div>
        );
    }
});
