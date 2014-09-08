/** @jsx React.DOM */
/* global React */

import ExampleMixin from '../mixins/example';
import Code from './code';
import LocaleSelect from './locale-select';

export default React.createClass({
    displayName: 'ReactExample',
    mixins     : [ExampleMixin],

    genderateRenderCode: function () {
        return [
            '/** @jsx React.DOM */',
            'React.renderComponent(',
            '    <Component locales={[\'' + this.state.currentLocale + '\']} ' +
                            'formats={…} messages={…} />',
            '    document.getElementById(\'example\')',
            ');'
        ].join('\n');
    },

    render: function () {
        var example       = this.props.example,
            currentLocale = this.state.currentLocale,
            messages      = this.props.intl.messages[currentLocale];

        var ExampleComponent = example.getComponent();

        return (
            <div id={example.id} className="example">
                <div className="example-source">
                    <h3 className="subheading">Component</h3>
                    <Code lang="js">{example.source.component}</Code>
                </div>

                <div className="example-render">
                    <h3 className="subheading">Rendering</h3>
                    <Code lang="javascript">{this.genderateRenderCode()}</Code>
                </div>

                <div className="example-output">
                    <ExampleComponent
                        locales={currentLocale}
                        formats={this.props.intl.formats}
                        messages={messages} />
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
