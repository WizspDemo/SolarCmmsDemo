// JavaScript για solar_CommsSpecs: ενημέρωση του name από το lookup Solar

// Λογικά ονόματα από πίνακα solar_commsspecs (Solardev – από Dataverse schema)
// Lookup προς Park/Solar (solar_park) στο solar_commsspecs
const FIELD_SOLAR_LOOKUP = "solar_park";
// Primary name πεδίο στο solar_commsspecs
const FIELD_NAME = "solar_commsspecsname";

/**
 * Καλείται στο OnChange του lookup Solar και (προαιρετικά) στο OnLoad.
 * Αντιγράφει το εμφανιζόμενο όνομα του Solar στο πεδίο name.
 * Απαιτείται "Pass execution context as first parameter" στο event.
 * @param {Xrm.Events.EventContext} executionContext
 */
function setNameFromSolar(executionContext) {
    var formContext = (executionContext && typeof executionContext.getFormContext === 'function')
        ? executionContext.getFormContext()
        : null;
    if (!formContext) {
        return;
    }

    var solarLookupAttr = formContext.getAttribute(FIELD_SOLAR_LOOKUP);
    if (!solarLookupAttr) {
        return;
    }

    var solarValue = solarLookupAttr.getValue();
    var nameAttr = formContext.getAttribute(FIELD_NAME);
    if (!nameAttr) {
        return;
    }

    if (solarValue && solarValue.length > 0) {
        var solarName = solarValue[0].name;
        nameAttr.setValue(solarName);
        nameAttr.setSubmitMode("always");
    } else {
        // Αν καθαριστεί το lookup, καθάρισε και το name (προαιρετικό – μπορείς να το αφαιρέσεις)
        nameAttr.setValue(null);
        nameAttr.setSubmitMode("always");
    }
}

/**
 * Καλείται στο OnLoad της φόρμας για να ευθυγραμμίσει
 * το name με το Solar lookup όταν ανοίγει η φόρμα.
 * @param {Xrm.Events.EventContext} executionContext
 */
function onLoad_SetNameFromSolar(executionContext) {
    setNameFromSolar(executionContext);
}

/**
 * Καλείται στο OnSave της φόρμας για να σιγουρευτεί
 * ότι το name είναι ευθυγραμμισμένο με το Solar lookup.
 * @param {Xrm.Events.SaveEventContext} executionContext
 */
function onSave_SetNameFromSolar(executionContext) {
    setNameFromSolar(executionContext);
}

