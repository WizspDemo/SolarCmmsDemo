/**
 * Live Cloud Map (Windy) tab – delegates to WindyMapWidget from main script.
 * Registers: window.PlantDashboardTabs.windy
 */
(function () {
    var React = window.React;
    if (!React) return;

    window.PlantDashboardTabs = window.PlantDashboardTabs || {};

    window.PlantDashboardTabs.windy = function (props) {
        var locationDetails = props.locationDetails;
        var WindyMapWidget = props.WindyMapWidget;
        if (!WindyMapWidget) return React.createElement('div', { className: 'h-full p-1' }, null);
        return React.createElement(
            'div',
            { className: 'h-full p-1' },
            React.createElement(WindyMapWidget, { locationDetails: locationDetails })
        );
    };
})();
