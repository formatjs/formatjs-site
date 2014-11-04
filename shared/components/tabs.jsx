/* global React */

export {Tabs, Tab};

var tabId = 0;

var Tabs = React.createClass({
    displayName: 'Tabs',

    getInitialState: function () {
        var tabIds   = [];
        var panelIds = [];
        var selectedIndex;

        React.Children.forEach(this.props.children, function (tab, index) {
            var id = tabId += 1;
            tabIds.push('tab-' + id);
            panelIds.push('tabpanel-' + id);

            if (tab.props.selected) {
                selectedIndex = index;
            }
        });

        return {
            tabIds       : tabIds,
            panelIds     : panelIds,
            selectedIndex: selectedIndex || 0
        };
    },

    getTabPanels: function (tabs) {
        return React.Children.map(tabs, function (tab, index) {
            return React.addons.cloneWithProps(tab, {
                id      : this.state.panelIds[index],
                tabId   : this.state.tabIds[index],
                selected: index === this.state.selectedIndex
            });
        }, this);
    },

    getTabListItems: function (tabs) {
        return React.Children.map(tabs, function (tab, index) {
            var isSelected = index === this.state.selectedIndex;
            var className  = 'tabs-tab' + (isSelected ? ' is-selected' : '');

            return (
                <li role="tab"
                    className={className}
                    id={this.state.tabIds[index]}
                    aria-controls={this.state.panelIds[index]}
                    aria-selected={isSelected}>

                    {tab.props.label}
                </li>
            );
        }, this);
    },

    handleTabClick: function (e) {
        if (e.target.getAttribute('role') === 'tab') {
            var index = this.state.tabIds.indexOf(e.target.id);
            if (index !== this.state.selectedIndex) {
                this.setState({
                    selectedIndex: index
                });
            }
        }
    },

    render: function () {
        return (
            <div className="tabs">
                <menu role="tablist"
                    className="tabs-tablist"
                    onClick={this.handleTabClick}>

                    {this.getTabListItems(this.props.children)}
                </menu>

                {this.getTabPanels(this.props.children)}
            </div>
        );
    }
});

var Tab = React.createClass({
    displayName: 'Tab',

    propTypes: {
        id      : React.PropTypes.string.isRequired,
        tabId   : React.PropTypes.string.isRequired,
        label   : React.PropTypes.string.isRequired,
        selected: React.PropTypes.bool.isRequired
    },

    getDefaultProps: function () {
        return {
            selected: false
        };
    },

    render: function () {
        return (
            <div role="tabpanel"
                className="tabs-tabpanel"
                id={this.props.id}
                aria-labeledby={this.props.tabId}
                hidden={!this.props.selected}>

                {this.props.children}
            </div>
        );
    }
});
