/**
 * Solar Preventive Task – Maintenance Team Members pane
 *
 * Model-driven app (Dataverse).
 * Opens a side pane with an HTML web resource that shows
 * Maintenance Team members and their job counts.
 *
 * Usage:
 * - Upload this JS as a web resource (type JavaScript).
 * - On the Solar Preventive Task form Command Bar,
 *   add a button with Action = Run JavaScript.
 * - Library: the web resource containing this script.
 * - Function name: SolarPrevTaskOpenTeamMembersPane
 * - Parameter: PrimaryControl.
 *
 * The HTML web resource loaded in the pane is set in
 * TEAM_MEMBERS_WEBRESOURCE_NAME. It receives teamId and
 * scheduleDate (YYYY-MM-DD) via the data parameter.
 *
 * ⚠️ PREREQUISITE: The Solar Preventive Task table must have a
 * Lookup field named "solar_maintenanceteamid" pointing to the
 * "Solar Maintenance Team" table (solar_maintenance_team).
 * This field is not present in the table by default and must be added.
 */
(function () {
  'use strict';

  // HTML web resource name as uploaded to Dataverse.
  const TEAM_MEMBERS_WEBRESOURCE_NAME = 'solar_preventivetask_team_members_pane.html';

  // Logical names of form fields on Solar Preventive Task (Dataverse).
  const FIELD_MAINTENANCE_TEAM = 'solar_maintenanceteam';
  const FIELD_SCHEDULE_DATE = 'solar_prev_scheduleddate';

  /**
   * Handler for the ribbon / command bar button.
   * Signature: function (primaryControl)
   */
  function SolarPrevTaskOpenTeamMembersPane(primaryControl) {
    var formContext = primaryControl;
    if (!formContext || typeof formContext.getAttribute !== 'function') {
      console.warn('[PreventiveTask] formContext is not available.');
      return;
    }

    var teamAttr = formContext.getAttribute(FIELD_MAINTENANCE_TEAM);
    if (!teamAttr || !teamAttr.getValue()) {
      Xrm.Navigation.openAlertDialog({
        title: 'Maintenance Team',
        text: 'Please select a Maintenance Team before opening the employee list.',
      });
      return;
    }

    var teamValue = teamAttr.getValue()[0];
    var teamId = (teamValue.id || '').replace(/[{}]/g, '');

    var scheduleAttr = formContext.getAttribute(FIELD_SCHEDULE_DATE);
    var scheduleDate = scheduleAttr && scheduleAttr.getValue ? scheduleAttr.getValue() : null;

    // Normalize to YYYY-MM-DD.
    // Use duck-typing instead of instanceof Date: Dataverse returns Date objects from within
    // the UCI framework that may fail instanceof checks due to cross-realm prototype differences.
    // Use LOCAL date methods (getFullYear/getMonth/getDate): the field is DateTime/UserLocal,
    // so getValue() returns the date in the user's local timezone.
    var scheduleDateString = null;
    if (scheduleDate && typeof scheduleDate.getFullYear === 'function') {
      var y = scheduleDate.getFullYear();
      var mo = scheduleDate.getMonth() + 1;
      var d = scheduleDate.getDate();
      scheduleDateString = y + '-' + (mo < 10 ? '0' + mo : mo) + '-' + (d < 10 ? '0' + d : d);
    } else if (typeof scheduleDate === 'string' && scheduleDate.length >= 10) {
      var parsed = scheduleDate.substring(0, 10);
      if (/^\d{4}-\d{2}-\d{2}$/.test(parsed)) {
        scheduleDateString = parsed;
      }
    }

    var paneId = 'solarPrevTaskTeamMembersPane';

    function getOrCreatePane() {
      try {
        var existing = Xrm.App.sidePanes.getPane && Xrm.App.sidePanes.getPane(paneId);
        if (existing) {
          return Promise.resolve(existing);
        }
      } catch (e) {}
      return Xrm.App.sidePanes.createPane({
        title: 'Maintenance Team Members',
        paneId: paneId,
        canClose: true,
        width: 450,
      }).catch(function (err) {
        // Duplicate paneId: pane exists but getPane didn't find it – try getPane again
        if (err && (err.code === 2415919128 || (err.message && err.message.indexOf('Duplicate paneId') >= 0))) {
          var p = Xrm.App.sidePanes.getPane && Xrm.App.sidePanes.getPane(paneId);
          if (p) return Promise.resolve(p);
        }
        throw err;
      });
    }

    var panePromise = getOrCreatePane();

    // Store formContext so pane can set solar_prev_employee when user clicks Assign.
    try {
      (window.top || window).__solarPrevTaskFormContext = formContext;
    } catch (e) {}

    var recordId = null;
    try {
      recordId = formContext.data.entity.getId();
    } catch (e) {}

    var navigationData = {
      teamId: teamId,
      teamName: teamValue.name || '',
      scheduleDate: scheduleDateString,
      recordId: recordId,
    };
    var dataJson = JSON.stringify(navigationData);

    // Share data via window.top (primary – accessible from pane iframe, same origin).
    try {
      (window.top || window).__solarPrevTaskTeamMembersPaneData = navigationData;
    } catch (ignore) {}

    // Keep sessionStorage as secondary fallback.
    try {
      sessionStorage.setItem('solar_prev_task_team_members_pane_data', dataJson);
    } catch (ignore) {}

    panePromise
      .then(function (pane) {
        return pane.navigate({
          pageType: 'webresource',
          webresourceName: TEAM_MEMBERS_WEBRESOURCE_NAME,
          data: dataJson,
        });
      })
      .catch(function (error) {
        console.error('[PreventiveTask] Failed to create/navigate pane:', error);
        Xrm.Navigation.openAlertDialog({
          title: 'Error',
          text:
            'An error occurred while opening the employee list.\n\n' +
            (error && error.message ? error.message : String(error)),
        });
      });
  }

  // Expose function on global scope for ribbon.
  window.SolarPrevTaskOpenTeamMembersPane = SolarPrevTaskOpenTeamMembersPane;
})();
