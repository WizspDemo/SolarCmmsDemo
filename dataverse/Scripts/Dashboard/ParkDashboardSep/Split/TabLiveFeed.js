/**
 * Live Feed tab. Registers: window.PlantDashboardTabs.livefeed
 */
(function () {
    var React = window.React;
    var FluentUI = window.FluentUIReact || window.FluentUI;
    if (!React || !FluentUI) return;
    var Icon = FluentUI.Icon;
    var Text = FluentUI.Text;

    window.PlantDashboardTabs = window.PlantDashboardTabs || {};

    window.PlantDashboardTabs.livefeed = function () {
        return React.createElement(
            'div',
            { className: 'h-full flex flex-col items-center justify-center text-gray-400 min-h-[300px]' },
            React.createElement(Icon, { iconName: 'LineChart', className: 'text-6xl mb-4 text-gray-300' }),
            React.createElement(Text, { variant: 'large' }, 'Real-time SCADA Telemetry Stream'),
            React.createElement(Text, { variant: 'small' }, 'Connecting to WebSocket...')
        );
    };
})();
