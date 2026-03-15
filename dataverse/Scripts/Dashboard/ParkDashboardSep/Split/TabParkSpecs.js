/**
 * Park Specs tab – delegates to ParkSpecsAccordion from main script.
 * Registers: window.PlantDashboardTabs.parkspecs
 */
(function () {
    var React = window.React;
    if (!React) return;

    window.PlantDashboardTabs = window.PlantDashboardTabs || {};

    window.PlantDashboardTabs.parkspecs = function (props) {
        var parkSpecsData = props.parkSpecsData;
        var ParkSpecsAccordion = props.ParkSpecsAccordion;
        if (!ParkSpecsAccordion) return React.createElement('div', { className: 'h-full min-h-[200px]' }, null);
        return React.createElement(
            'div',
            { className: 'h-full min-h-[200px]' },
            React.createElement(ParkSpecsAccordion, { parkSpecsData: parkSpecsData })
        );
    };
})();
