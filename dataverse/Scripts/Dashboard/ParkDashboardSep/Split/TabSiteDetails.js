/**
 * Site Details tab – delegates to SiteDetailsContent from main script.
 * Registers: window.PlantDashboardTabs.sitedetails
 */
(function () {
    var React = window.React;
    if (!React) return;

    window.PlantDashboardTabs = window.PlantDashboardTabs || {};

    window.PlantDashboardTabs.sitedetails = function (props) {
        var locationDetails = props.locationDetails;
        var SiteDetailsContent = props.SiteDetailsContent;
        if (!SiteDetailsContent) return React.createElement('div', { className: 'h-full' }, null);
        return React.createElement(SiteDetailsContent, { locationDetails: locationDetails });
    };
})();
