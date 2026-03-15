# Park Specs – Πεδία & σύνδεση Dataverse

## Αρχείο `PARK_SPECS_FIELDS.json`

Περιέχει **όλα τα tabs/sections** και **όλα τα πεδία** του Park Specs accordion, ώστε να τα συνδέσετε με το Dataverse table και να φέρνετε τις Online τιμές.

### Δομή

- **entity**: `solar_location` – κύριο entity· τα Site πεδία έρχονται από εδώ.
- **sections**: 6 sections (Site Information, Inverter Specs, PV Modules Specs, Comms Specs, HV Specs, Security Specs).
- **sourceEntity** ανά section: πίνακας Dataverse από τον οποίο έρχονται τα δεδομένα (`solar_location`, `solar_inverterspecs`, `solar_pvmodulespecs`, `solar_commsspecs`, `solar_hvspecs`, `solar_securityspecs`). Βλ. **PARK_SPECS_DATAVERSE_MAPPING.md** για πλήρες mapping.
- **fields** ανά section: `key` = σταθερό key για UI/API, `label` = ετικέτα για UI, `dataverseLogicalName` = πραγματικό logical name στο Dataverse (αν διαφέρει από `key`).
- **allFieldKeys**: flat λίστα με όλα τα `key` για εύκολο fetch.

### Χρήση για Dataverse

1. **Form context**: Το accordion διαβάζει ήδη από `Xrm.Page.getAttribute(key)` όταν τρέχει μέσα στη φόρμα `solar_location` – οι τιμές είναι Online από το ανοιχτό record.
2. **REST/Web API**: Για να φέρετε τιμές με API (π.χ. από άλλο context), χρησιμοποιήστε τα `allFieldKeys` στο `$select`:
   ```
   GET /api/data/v9.2/solar_locations({id})?$select=solar_name,solar_address,...,solar_landownerfarmerdetails
   ```
3. **Έλεγχος schema**: Βεβαιωθείτε ότι το table `solar_location` στο Dataverse έχει columns με ακριβώς αυτά τα logical names (`key`). Αν κάποιο διαφέρει, ενημερώστε το JSON και το `PARK_SPECS_SECTIONS` στα HTML/JS.

### Tabs ↔ sections

| Tab (UI)           | Section id |
|--------------------|------------|
| Site Information   | site       |
| Inverter Specs     | inverter   |
| PV Modules Specs   | modules    |
| Comms Specs        | comms      |
| HV Specs           | hv         |
| Security Specs     | security   |
