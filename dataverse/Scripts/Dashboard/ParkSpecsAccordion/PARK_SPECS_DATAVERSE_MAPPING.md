# Park Specs – Dataverse mapping (Specs tables ↔ PARK_SPECS_FIELDS.json)

Συλλογή πεδίων από τα exported schema των entities που σχετίζονται με **solar_location** (relationships: solar_inverterspecs_solar_location, solar_pvmodulespecs_solar_location, κ.λπ.) και mapping με τα `key` του `PARK_SPECS_FIELDS.json`.

---

## 1. solar_inverterspecs (Inverter Specs)

**Table:** `solar_inverterspecs`  
**Relationship to location:** Lookup `solar_park` → `solar_location` (N:1).

| PARK_SPECS_FIELDS.json key       | Dataverse logicalName (solar_inverterspecs) | Σημείωση |
|-----------------------------------|---------------------------------------------|----------|
| solar_inverter_manufacturer       | solar_invmanufacturer                       | Inv Manufacturer |
| solar_inverter_type               | solar_invtype                               | Inv Type |
| solar_inverter_model             | solar_invmodel                              | Inv Model |
| solar_inverter_quantity          | solar_invquantity                           | Inv Quantity |
| solar_inverter_lv_voltage        | solar_invlvvoltage                          | Inv LV Voltage |
| solar_inverter_power             | solar_inverterpowerkw                       | Inverter Power (KW) |
| solar_assumed_warranty_period    | solar_assumedwarrantyperiod                 | Assumed Warranty Period |
| solar_warranty_expiry            | solar_warrantyexpiry                        | Warranty Expiry |

**Όλα τα πεδία του πίνακα (από schema):**
- solar_inverterspecsid, solar_inverterspecsname
- solar_assumedwarrantyperiod, solar_inverterpowerkw, solar_invlvvoltage
- solar_invmanufacturer, solar_invmodel, solar_invquantity, solar_invtype
- solar_park, solar_parkname
- solar_warrantyexpiry

---

## 2. solar_pvmodulespecs (PV Modules Specs)

**Table:** `solar_pvmodulespecs`  
**Relationship to location:** Lookup `solar_park` → `solar_location` (N:1).

| PARK_SPECS_FIELDS.json key | Dataverse logicalName (solar_pvmodulespecs) | Σημείωση |
|-----------------------------|----------------------------------------------|----------|
| solar_modulemanufacturer    | solar_modulemanufacturer                     | ίδιο |
| solar_modulemodel           | solar_modulemodel                            | ίδιο |
| solar_modulequantity        | solar_modulequantity                         | ίδιο |
| solar_modulepower           | solar_modulepower                            | Module Power (W) |
| solar_modulevoc             | solar_modulevoc                              | ίδιο |
| solar_moduleisc             | solar_moduleisc                              | ίδιο |
| solar_modulelength          | solar_length                                 | Length (mm) |
| solar_modulewidth           | solar_width                                  | Width (mm) |
| solar_moduledepth           | solar_depth                                  | Depth (mm) |

**Όλα τα πεδία του πίνακα (από schema):**
- solar_pvmodulespecsid, solar_pvmodulespecsname
- solar_depth, solar_length, solar_width
- solar_moduleisc, solar_modulemanufacturer, solar_modulemodel, solar_modulepower, solar_modulequantity, solar_modulevoc
- solar_park, solar_parkname

---

## 3. solar_commsspecs (Comms Specs)

**Table:** `solar_commsspecs`  
**Relationship to location:** Lookup `solar_park` → `solar_location` (N:1).

| PARK_SPECS_FIELDS.json key | Dataverse logicalName (solar_commsspecs) | Σημείωση |
|-----------------------------|-------------------------------------------|----------|
| solar_satellite3g4g        | solar_satellite3g4g                        | Satellite/3G/4G |
| solar_lannetwork           | solar_lannetwork                           | ίδιο |
| solar_scadaprovider        | solar_scadaprovider                        | ίδιο |
| solar_dataloggers          | solar_dataloggers                          | ίδιο |

**Όλα τα πεδία του πίνακα (από schema):**
- solar_commsspecsid, solar_commsspecsname
- solar_dataloggers, solar_lannetwork, solar_satellite3g4g, solar_scadaprovider
- solar_park, solar_parkname

---

## 4. solar_hvspecs (HV Specs)

**Table:** `solar_hvspecs`  
**Relationship to location:** Lookup `solar_park` → `solar_location` (N:1).

| PARK_SPECS_FIELDS.json key | Dataverse logicalName (solar_hvspecs) | Σημείωση |
|-----------------------------|----------------------------------------|----------|
| solar_dnosizekv             | solar_sizekv                           | Size (KV) |
| solar_dnocontact            | solar_dno / solar_contactinformation   | DNO ή Contact – δύο πεδία στο schema |
| solar_sitereferencenumber   | solar_siterefnumber                    | Site Ref Number |
| solar_transformerquantity   | solar_transformerquantity               | ίδιο |
| solar_transformermake       | solar_transformermake                   | ίδιο |
| solar_transformermodel      | solar_transformermodel                  | ίδιο |

**Όλα τα πεδία του πίνακα (από schema):**
- solar_hvspecsid, solar_hvspecsname
- solar_contactinformation, solar_dno, solar_hvcontractor
- solar_siterefnumber, solar_sizekv, solar_tbootsub
- solar_transformermake, solar_transformermodel, solar_transformerquantity, solar_transformerratingkva
- solar_park, solar_parkname

---

## 5. solar_securityspecs (Security Specs)

**Table:** `solar_securityspecs`  
**Relationship to location:** Lookup `solar_park` → `solar_location` (N:1).

| PARK_SPECS_FIELDS.json key   | Dataverse logicalName (solar_securityspecs) | Σημείωση |
|------------------------------|---------------------------------------------|----------|
| solar_security               | solar_security                              | ίδιο |
| solar_securitycodes          | solar_securitycodesorpasswords              | Security Codes or Passwords |
| solar_accessgatecodes        | solar_accessgatecodes                       | ίδιο |
| solar_exportmeterlocation     | solar_exportmeterlocation                   | ίδιο |
| solar_exportmeteraccessdetails| solar_exportmeteraccessdetails              | ίδιο |
| solar_otherinformation       | solar_otherinformation                      | ίδιο |
| solar_landownerfarmerdetails | solar_landownerfarmerdetails                | ίδιο |

**Όλα τα πεδία του πίνακα (από schema):**
- solar_securityspecsid, solar_securityspecsname
- solar_accessgatecodes, solar_exportmeteraccessdetails, solar_exportmeterlocation
- solar_landownerfarmerdetails, solar_otherinformation
- solar_security, solar_securitycodesorpasswords
- solar_park, solar_parkname

---

## 6. solar_location (Site Information)

Τα πεδία Site έρχονται απευθείας από το **solar_location**.

| PARK_SPECS_FIELDS.json key | Dataverse logicalName (solar_location) |
|-----------------------------|----------------------------------------|
| solar_name                  | solar_name |
| solar_address               | solar_address |
| solar_postalcode            | solar_postalcode |
| solar_account               | solar_account (lookup) |
| solar_landsizekm            | solar_landsizekm |
| solar_opendate              | solar_opendate |

---

## Σύνοψη – πηγές δεδομένων

| Section id | Πηγή entity           | Σχέση με solar_location |
|------------|-----------------------|--------------------------|
| site       | solar_location        | —                        |
| inverter   | solar_inverterspecs   | N:1 via solar_park       |
| modules    | solar_pvmodulespecs   | N:1 via solar_park       |
| comms      | solar_commsspecs      | N:1 via solar_park       |
| hv         | solar_hvspecs         | N:1 via solar_park       |
| security   | solar_securityspecs   | N:1 via solar_park       |

Για **form context** στη φόρμα `solar_location`: αν τα specs εμφανίζονται ως subgrids ή linked records, τα δεδομένα έρχονται από τα αντίστοιχα tables. Για **single-record fetch** μέσω Web API, αντλήστε Site από `solar_locations`, και τα υπόλοιπα από τα related specs tables φιλτραρισμένα με `solar_park eq {locationId}` (ή αντίστοιχο navigation).
