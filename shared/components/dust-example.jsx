/** @jsx React.DOM */
/* global React */

import ExampleMixin from '../mixins/example';
import CodeBlock from './code-block';
import LocaleSelect from './locale-select';
import DustOutput from './dust-output';
import {Tabs, Tab} from './tabs';

export default React.createClass({
    displayName: 'DustExample',
    mixins     : [ExampleMixin],

    statics: {
        renderCode: [
            'context.intl = intlData;',
            'dust.render(template, context, function(err, html) {',
            '    ...put `html` into the DOM or use it otherwise...',
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
                    <Tabs>
                        <Tab label="Template">
                            <CodeBlock lang="html">
                                {example.source.template}
                            </CodeBlock>
                        </Tab>

                        <Tab label="Context">
                            <CodeBlock lang="javascript">
                                {example.source.context}
                            </CodeBlock>
                        </Tab>

                        <Tab label="Render">
                            <CodeBlock lang="javascript">
                                {this.genderateRenderCode()}
                            </CodeBlock>
                        </Tab>
                    </Tabs>
                </div>

                <div className="example-output">
                    <h4 className="example-output-heading">Rendered</h4>

                    <DustOutput
                        exampleId={this.props.example.id}
                        locales={currentLocale}
                        formats={this.props.intl.formats}
                        messages={messages}
                        source={example.source.template}
                        context={example.context} />

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
