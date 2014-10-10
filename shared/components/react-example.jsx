/** @jsx React.DOM */
/* global React */

import ExampleMixin from '../mixins/example';
import CodeBlock from './code-block';
import LocaleSelect from './locale-select';
import {Tabs, Tab} from './tabs';

export default React.createClass({
    displayName: 'ReactExample',
    mixins     : [ExampleMixin],

    genderateRenderCode: function () {
        var intlData = this.generateIntlData();

        var renderCode = [
            '/** @jsx React.DOM */',
            'var intlData = ' + JSON.stringify(intlData, null, 4) + ';',
            '',
            'React.renderComponent(',
            '    <Component',
            '        locales={intlData.locales}'
        ];

        if (intlData.messages) {
            renderCode.push('        messages={intlData.messages}');
        }
        if (intlData.formats) {
            renderCode.push('        formats={intlData.formats}');
        }

        var lastPropLine = renderCode.length - 1;
        renderCode[lastPropLine] = renderCode[lastPropLine] + ' />,';

        renderCode.push('    document.getElementById("example")');
        renderCode.push(');');

        return renderCode.join('\n');
    },

    render: function () {
        var example       = this.props.example,
            currentLocale = this.state.currentLocale,
            messages      = this.props.intl.messages[currentLocale];

        var ExampleComponent = example.getComponent();

        var tabs = [
            <Tab label="Component" key="component">
                <CodeBlock lang="js">
                    {example.source.component}
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

                    <div className="react-output">
                        <ExampleComponent
                            locales={currentLocale}
                            formats={example.meta.formats}
                            messages={messages} />
                    </div>

                    <div className="example-output-controls">
                        <label>
                            <span className="example-label">Locale:</span>
                            <LocaleSelect
                                availableLocales={this.props.intl.availableLocales}
                                value={currentLocale}
                                onChange={this.updateLocale} />
                        </label>
                    </div>
                </div>
            </div>
        );
    }
});
