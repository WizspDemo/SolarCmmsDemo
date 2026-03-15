/**
 * PowerDashboard.data.js — Dataverse fetch logic, loadAllParks.
 * Απαιτεί: window.PowerDashboardConfig (φόρτωση PowerDashboard.config.js πριν)
 * Εκθέτει: window.PowerDashboardData.loadAllParks(webApi)
 */
(function () {
  'use strict';

  var Config = window.PowerDashboardConfig;
  if (!Config) {
    console.error('PowerDashboard.data: PowerDashboardConfig not found. Load PowerDashboard.config.js first.');
    window.PowerDashboardData = { loadAllParks: function () { return Promise.resolve([]); } };
    return;
  }

  var ENTITY_LOCATION = Config.ENTITY_LOCATION;
  var ENTITY_CORRECTIVE = Config.ENTITY_CORRECTIVE;
  var ENTITY_PREVENTIVE = Config.ENTITY_PREVENTIVE;
  var ENTITY_REMEDIAL = Config.ENTITY_REMEDIAL;
  var PREVENTIVE_STATUS_IN_PROGRESS = Config.PREVENTIVE_STATUS_IN_PROGRESS;
  var CORRECTIVE_STATUS_IN_PROGRESS = Config.CORRECTIVE_STATUS_IN_PROGRESS;
  var REMEDIAL_STATUS_IN_PROGRESS = Config.REMEDIAL_STATUS_IN_PROGRESS;

  function fetchPreventiveCount(webApi, locationId) {
    var guid = (locationId || '').replace(/[{}]/g, '');
    var fetchXml = '<fetch aggregate="true"><entity name="' + ENTITY_PREVENTIVE + '"><attribute name="solar_solarpreventivetaskid" aggregate="count" alias="cnt"/><filter type="and"><condition attribute="solar_park" operator="eq" value="{' + guid + '}"/><condition attribute="statecode" operator="ne" value="1"/></filter></entity></fetch>';
    return webApi.retrieveMultipleRecords(ENTITY_PREVENTIVE, '?fetchXml=' + encodeURIComponent(fetchXml))
      .then(function (r) { var e = (r && r.entities && r.entities[0]) ? r.entities[0] : {}; return parseInt(e.cnt || '0', 10); })
      .catch(function () { return 0; });
  }

  function fetchPreventiveCompletedCount(webApi, locationId) {
    var guid = (locationId || '').replace(/[{}]/g, '');
    var fetchXml = '<fetch aggregate="true"><entity name="' + ENTITY_PREVENTIVE + '"><attribute name="solar_solarpreventivetaskid" aggregate="count" alias="cnt"/><filter type="and"><condition attribute="solar_park" operator="eq" value="{' + guid + '}"/><condition attribute="statecode" operator="eq" value="1"/></filter></entity></fetch>';
    return webApi.retrieveMultipleRecords(ENTITY_PREVENTIVE, '?fetchXml=' + encodeURIComponent(fetchXml))
      .then(function (r) { var e = (r && r.entities && r.entities[0]) ? r.entities[0] : {}; return parseInt(e.cnt || '0', 10); })
      .catch(function () { return 0; });
  }

  function fetchPreventiveInProgressCount(webApi, locationId) {
    var guid = (locationId || '').replace(/[{}]/g, '');
    var fetchXml = '<fetch aggregate="true"><entity name="' + ENTITY_PREVENTIVE + '"><attribute name="solar_solarpreventivetaskid" aggregate="count" alias="cnt"/><filter type="and"><condition attribute="solar_park" operator="eq" value="{' + guid + '}"/><condition attribute="statecode" operator="ne" value="1"/><condition attribute="solar_prev_status" operator="eq" value="' + PREVENTIVE_STATUS_IN_PROGRESS + '"/></filter></entity></fetch>';
    return webApi.retrieveMultipleRecords(ENTITY_PREVENTIVE, '?fetchXml=' + encodeURIComponent(fetchXml))
      .then(function (r) { var e = (r && r.entities && r.entities[0]) ? r.entities[0] : {}; return parseInt(e.cnt || '0', 10); })
      .catch(function () { return 0; });
  }

  function fetchCorrectiveCounts(webApi, locationId) {
    var guid = (locationId || '').replace(/[{}]/g, '');
    var fetchXml = '<fetch><entity name="' + ENTITY_CORRECTIVE + '"><attribute name="solar_corrective_work_orderid"/><attribute name="solar_solar_priority"/><attribute name="statecode"/><attribute name="statuscode"/><filter type="and"><condition attribute="solar_locationid" operator="eq" value="{' + guid + '}"/></filter></entity></fetch>';
    return webApi.retrieveMultipleRecords(ENTITY_CORRECTIVE, '?fetchXml=' + encodeURIComponent(fetchXml))
      .then(function (r) {
        var entities = (r && r.entities) ? r.entities : [];
        var active = entities.filter(function (e) { return e.statecode !== 1; });
        var completed = entities.filter(function (e) { return e.statecode === 1; }).length;
        var inProgress = active.filter(function (e) { return e.statuscode === CORRECTIVE_STATUS_IN_PROGRESS; }).length;
        var open = Math.max(0, active.length - inProgress);
        var correctiveByPriority = { low: 0, medium: 0, high: 0, critical: 0 };
        active.forEach(function (e) {
          var p = e.solar_solar_priority;
          if (p === 1) correctiveByPriority.critical++;
          else if (p === 2) correctiveByPriority.high++;
          else if (p === 3) correctiveByPriority.medium++;
          else correctiveByPriority.low++;
        });
        return {
          corrective: active.length,
          correctiveOpen: open,
          correctiveInProgress: inProgress,
          correctiveCompleted: completed,
          critical: correctiveByPriority.critical,
          correctiveByPriority: correctiveByPriority
        };
      })
      .catch(function () {
        return { corrective: 0, correctiveOpen: 0, correctiveInProgress: 0, correctiveCompleted: 0, critical: 0, correctiveByPriority: { low: 0, medium: 0, high: 0, critical: 0 } };
      });
  }

  function fetchRemedialCounts(webApi, locationId) {
    var guid = (locationId || '').replace(/[{}]/g, '');
    var fetchXml = '<fetch><entity name="' + ENTITY_REMEDIAL + '"><attribute name="solar_remedialid"/><attribute name="statecode"/><attribute name="statuscode"/><filter type="and"><condition attribute="solar_rem_solarsite" operator="eq" value="{' + guid + '}"/></filter></entity></fetch>';
    return webApi.retrieveMultipleRecords(ENTITY_REMEDIAL, '?fetchXml=' + encodeURIComponent(fetchXml))
      .then(function (r) {
        var entities = (r && r.entities) ? r.entities : [];
        var active = entities.filter(function (e) { return e.statecode !== 1; }).length;
        var completed = entities.filter(function (e) { return e.statecode === 1; }).length;
        var inProgress = entities.filter(function (e) { return e.statecode !== 1 && e.statuscode === REMEDIAL_STATUS_IN_PROGRESS; }).length;
        var open = Math.max(0, active - inProgress);
        return {
          remedial: active,
          remedialOpen: open,
          remedialInProgress: inProgress,
          remedialCompleted: completed
        };
      })
      .catch(function () {
        return { remedial: 0, remedialOpen: 0, remedialInProgress: 0, remedialCompleted: 0 };
      });
  }

  function processInBatches(items, batchSize, fn) {
    var results = [];
    for (var i = 0; i < items.length; i += batchSize) {
      var batch = items.slice(i, i + batchSize);
      var batchResults = batch.map(fn);
      results.push.apply(results, batchResults);
    }
    return results;
  }

  function loadAllParks(webApi) {
    if (!webApi || !webApi.retrieveMultipleRecords) {
      return Promise.resolve([]);
    }

    var PAGE_SIZE = 5000;

    function fetchAllParks() {
      return (function fetchPage(page) {
        var fetchXml = '<fetch count="' + PAGE_SIZE + '" page="' + page + '">' +
          '<entity name="' + ENTITY_LOCATION + '">' +
          '<attribute name="solar_locationid"/><attribute name="solar_name"/><attribute name="solar_capacity_mw"/><attribute name="solar_portfolioid"/>' +
          '<link-entity name="solar_portfolio" from="solar_portfolioid" to="solar_portfolioid" link-type="outer" alias="p">' +
          '<attribute name="solar_name" alias="portfolio_name"/>' +
          '</link-entity>' +
          '<filter type="and"><condition attribute="statecode" operator="eq" value="0"/></filter>' +
          '<order attribute="solar_name"/><order attribute="solar_locationid"/>' +
          '</entity></fetch>';
        return webApi.retrieveMultipleRecords(ENTITY_LOCATION, '?fetchXml=' + encodeURIComponent(fetchXml))
          .then(function (r) {
            var entities = (r && r.entities) ? r.entities : [];
            if (entities.length < PAGE_SIZE) {
              return entities;
            }
            return fetchPage(page + 1).then(function (next) {
              return entities.concat(next);
            });
          });
      })(1);
    }

    return fetchAllParks().then(function (locations) {
      function processLoc(loc) {
        var id = (loc.solar_locationid || '').replace(/[{}]/g, '');
        return Promise.all([
          fetchPreventiveCount(webApi, id),
          fetchPreventiveInProgressCount(webApi, id),
          fetchPreventiveCompletedCount(webApi, id),
          fetchCorrectiveCounts(webApi, id),
          fetchRemedialCounts(webApi, id)
        ]).then(function (arr) {
          var prev = arr[0];
          var prevInProgress = arr[1];
          var prevCompleted = arr[2];
          var corr = arr[3];
          var rem = arr[4];
          return {
            id: loc.solar_locationid,
            name: loc.solar_name || '-',
            portfolioName: (loc['p.portfolio_name'] || loc.p_portfolio_name || loc.solar_portfolioname || loc['p_x002e_portfolio_name'] || '') || '-',
            capacityMW: loc.solar_capacity_mw != null ? Number(loc.solar_capacity_mw) : 0,
            preventiveCount: prev,
            preventiveInProgressCount: prevInProgress,
            preventiveCompletedCount: prevCompleted,
            correctiveCount: corr.corrective,
            correctiveOpenCount: corr.correctiveOpen,
            correctiveInProgressCount: corr.correctiveInProgress,
            correctiveCompletedCount: corr.correctiveCompleted,
            correctiveByPriority: corr.correctiveByPriority || { low: 0, medium: 0, high: 0, critical: 0 },
            remedialCount: rem.remedial,
            remedialOpenCount: rem.remedialOpen,
            remedialInProgressCount: rem.remedialInProgress,
            remedialCompletedCount: rem.remedialCompleted,
            criticalDefects: corr.critical
          };
        });
      }

      var batchSize = 5;
      var chunks = [];
      for (var i = 0; i < locations.length; i += batchSize) {
        var batch = locations.slice(i, i + batchSize).map(processLoc);
        chunks.push(Promise.all(batch));
      }
      return Promise.all(chunks).then(function (chunkResults) {
        return chunkResults.reduce(function (acc, c) { return acc.concat(c); }, []);
      });
    });
  }

  window.PowerDashboardData = {
    loadAllParks: loadAllParks
  };
})();
