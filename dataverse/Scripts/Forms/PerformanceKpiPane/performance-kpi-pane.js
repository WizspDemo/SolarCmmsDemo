/**
 * Performance – KPI Import pane
 *
 * Model-driven app (Dataverse).
 * Opens a side pane for pasting KPI data (PR, AV, LD, En, Irrad) with Month and Year selection.
 * Runs from the Solar Location (solar_location) form. KPIs are created linked to the current location.
 *
 * Usage:
 * - On the form Command Bar of Solar Location (solar_location), add a button with Action = Run JavaScript.
 * - Library: wiz_performance_kpi_pane_js
 * - Function name: WizPerformanceOpenKpiPane
 * - Parameter: PrimaryControl.
 */
(function () {
  'use strict';

  var KPI_PANE_WEBRESOURCE_NAME = 'wiz_performance_kpi_pane';
  var paneId = 'wizPerformanceKpiPane';
  var PANEDATA_STORAGE_KEY = 'solar_performance_kpi_pane_data';

  /**
   * Handler for the ribbon / command bar button (on Park Account / Solar Park form).
   */
  function WizPerformanceOpenKpiPane(primaryControl) {
    var formContext = primaryControl;
    if (!formContext || typeof formContext.getAttribute !== 'function') {
      console.warn('[KPI Pane] formContext is not available.');
      return;
    }

    var recordId = null;
    try {
      recordId = formContext.data.entity.getId();
    } catch (e) {}
    if (!recordId) {
      Xrm.Navigation.openAlertDialog({
        title: 'KPI Import',
        text: 'Please save the Solar Park record first before importing KPIs.',
      });
      return;
    }

    var parkId = (recordId + '').replace(/[{}]/g, '');
    var parkName = '';
    try {
      parkName = (formContext.getAttribute('solar_name') && formContext.getAttribute('solar_name').getValue()) ||
      (formContext.getAttribute('new_name') && formContext.getAttribute('new_name').getValue());
      parkName = parkName || '';
    } catch (e) {}

    var navigationData = {
      parkId: parkId,
      parkName: parkName,
    };
    var dataJson = JSON.stringify(navigationData);

    try {
      sessionStorage.setItem(PANEDATA_STORAGE_KEY, dataJson);
    } catch (ignore) {}

    function getOrCreatePane() {
      try {
        var existing = Xrm.App.sidePanes.getPane && Xrm.App.sidePanes.getPane(paneId);
        if (existing) {
          return Promise.resolve(existing);
        }
      } catch (e) {}
      return Xrm.App.sidePanes.createPane({
        title: 'KPI Import',
        paneId: paneId,
        canClose: true,
        width: 500,
      }).catch(function (err) {
        if (err && (err.code === 2415919128 || (err.message && err.message.indexOf('Duplicate paneId') >= 0))) {
          var p = Xrm.App.sidePanes.getPane && Xrm.App.sidePanes.getPane(paneId);
          if (p) return Promise.resolve(p);
        }
        throw err;
      });
    }

    getOrCreatePane()
      .then(function (pane) {
        return pane.navigate({
          pageType: 'webresource',
          webresourceName: KPI_PANE_WEBRESOURCE_NAME,
          data: dataJson,
        });
      })
      .catch(function (error) {
        console.error('[Performance KPI] Failed to create/navigate pane:', error);
        Xrm.Navigation.openAlertDialog({
          title: 'Error',
          text:
            'An error occurred while opening the KPI Import pane.\n\n' +
            (error && error.message ? error.message : String(error)),
        });
      });
  }

  window.WizPerformanceOpenKpiPane = WizPerformanceOpenKpiPane;
})();
