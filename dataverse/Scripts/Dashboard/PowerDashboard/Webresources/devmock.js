/**
 * DevMock — Generic local development mock provider
 *
 * Usage:
 *   1. Include this script BEFORE your companion [name].mock.js in the HTML <head>.
 *   2. In [name].mock.js call: DevMock.register('myKey', [...data...])
 *   3. In your useEffect: if (DevMock.isActive()) { setData(DevMock.get('myKey')); }
 *
 * Modes:
 *   - Local file / dev server (no Xrm) → isActive() = true  → uses mock data automatically
 *   - Inside Dataverse (Xrm present)   → isActive() = false → real data
 *   - Force mock anywhere              → DevMock.forceEnabled = true (set in .mock.js)
 */
(function () {
  window.DevMock = {
    _store: {},

    /** Set to true in .mock.js to force mock mode even inside Dataverse */
    forceEnabled: false,

    /** Simulated network delay in ms */
    delayMs: 600,

    /** Register mock data for a named key */
    register: function (key, data) {
      this._store[key] = data;
      console.log('[DevMock] Registered key "' + key + '" (' + (Array.isArray(data) ? data.length + ' items' : typeof data) + ')');
    },

    /** Retrieve mock data by key */
    get: function (key) {
      return this._store[key] !== undefined ? this._store[key] : null;
    },

    /**
     * Returns true when mock data should be used instead of real Xrm calls.
     * Auto-detects: if Xrm is not available on window/parent/top → local mode → true.
     * A cross-origin security error when accessing parent means we are inside a
     * Dataverse iframe → returns false (use real data).
     */
    isActive: function () {
      if (this.forceEnabled) return true;
      try {
        if (window.Xrm) return false;
        if (window.parent && window.parent !== window && window.parent.Xrm) return false;
        if (window.top && window.top !== window && window.top.Xrm) return false;
        if (window.parent && typeof window.parent.GetGlobalContext === 'function') return false;
      } catch (e) {
        // Cross-origin block → we are inside a Dataverse iframe → real data
        return false;
      }
      return true;
    }
  };

  console.log('[DevMock] Loaded. Mode: ' + (window.DevMock.isActive() ? 'MOCK (local)' : 'LIVE (Dataverse)'));
})();
