# Solar Preventive Task – Maintenance Team Members Pane

Side pane για τη φόρμα **Solar Preventive Task** που εμφανίζει τα μέλη της Maintenance Team και τον αριθμό tasks ανά υπάλληλο για την επιλεγμένη ημερομηνία.

Βασίζεται στο template `Dataverse_Templates/Scripts/Forms/EntityTeamMembersPane`.

---

## Αρχεία

| Αρχείο | Τύπος Web Resource | Περιγραφή |
|--------|--------------------|-----------|
| `preventive-task-team-members-pane.js` | Script (JScript) | Ανοίγει το side pane από το Command Bar |
| `preventive-task-team-members-pane.html` | Webpage (HTML) | Περιεχόμενο του side pane |

---

## ⚠️ Προαπαιτούμενο – Πεδίο Maintenance Team

Ο πίνακας `solar_solarpreventivetask` **δεν έχει** πεδίο Maintenance Team από προεπιλογή.  
Πρέπει να προσθέσεις ένα **Lookup** πεδίο:

| Ιδιότητα | Τιμή |
|----------|------|
| Display Name | `Maintenance Team` |
| Logical Name | `solar_maintenanceteamid` |
| Target table | `Solar Maintenance Team` (`solar_maintenance_team`) |

Αφού το προσθέσεις, πρόσθεσέ το και στη **φόρμα** του Solar Preventive Task ώστε το script να μπορεί να το διαβάσει.

---

## Placeholders που χρησιμοποιήθηκαν

| Placeholder | Τιμή |
|------------|------|
| `ENTITY_DISPLAY_NAME` | `PreventiveTask` |
| `OPEN_PANE_FUNCTION_NAME` | `SolarPrevTaskOpenTeamMembersPane` |
| `PANE_TITLE` | `Maintenance Team Members` |
| `PANE_ID` | `solarPrevTaskTeamMembersPane` |
| `TEAM_MEMBERS_WEBRESOURCE_NAME` | `solar_preventivetask_team_members_pane.html` |
| `FIELD_MAINTENANCE_TEAM` | `solar_maintenanceteam` |
| `FIELD_SCHEDULE_DATE` | `solar_prev_scheduleddate` |
| `FORM_CONTEXT_GLOBAL` | `__solarPrevTaskFormContext` |
| `PANEDATA_GLOBAL` | `__solarPrevTaskTeamMembersPaneData` |
| `PANEDATA_STORAGE_KEY` | `solar_prev_task_team_members_pane_data` |
| `BUTTON_ASSIGN_TITLE` | `Set this employee as the Employee on the Preventive Task` |
| `ENTITY_TEAM_MEMBER` | `solar_maintenanceteammember` |
| `FIELD_TEAM_LOOKUP` | `solar_maintenance_team` |
| `FIELD_EMPLOYEE_LOOKUP` | `solar_member` |
| `FIELD_EMPLOYEE_NAME` | `solar_maintenanceteammembername` |
| `ENTITY_WORK_ORDER` | `solar_solarpreventivetask` |
| `ENTITY_WORK_ORDER_PK` | `solar_solarpreventivetaskid` |
| `FIELD_WO_EMPLOYEE_LOOKUP` | `solar_prev_employee` |
| `FIELD_WO_SCHEDULE_DATE` | `solar_prev_scheduleddate` |
| `WO_EMPLOYEE_NAV_PROPERTY` | `solar_prev_Employee` |
| `WO_EMPLOYEE_TARGET_SET` | `systemusers` |
| `WO_EMPLOYEE_FIELD_VALUE` | `_solar_prev_employee_value` |
| `WO_TEAM_FIELD_VALUE` | `_solar_maintenanceteam_value` |

> ⚠️ **`WO_EMPLOYEE_NAV_PROPERTY`**: Το navigation property `solar_prev_Employee` είναι εκτίμηση βάσει της σύμβασης ονοματολογίας. Αν η Web API bind αποτύχει, επαλήθευσε το σωστό όνομα μέσω Postman/XrmToolBox στον πίνακα `solar_solarpreventivetask`.

---

## Βήματα Deployment

### 1. Upload Web Resources στο Dataverse

1. Άνοιξε το **make.powerapps.com** → Solution σου → Web resources.
2. Πρόσθεσε νέο Web Resource:
   - **File**: `preventive-task-team-members-pane.html`
   - **Name**: `solar_preventivetask_team_members_pane.html`  
     *(ακριβώς αυτό το όνομα – χρησιμοποιείται στο JS)*
   - **Type**: Webpage (HTML)
3. Πρόσθεσε νέο Web Resource:
   - **File**: `preventive-task-team-members-pane.js`
   - **Name**: `solar_preventivetask_team_members_pane.js`
   - **Type**: Script (JScript)
4. **Publish all customizations**.

### 2. Command Bar Button

1. Άνοιξε τη φόρμα **Solar Preventive Task** στον Power Apps designer.
2. Επέλεξε **Edit command bar** → φόρμα (Main Form).
3. Πρόσθεσε νέο κουμπί:
   - **Label**: `Team Members` (ή ό,τι επιθυμείς)
   - **Icon**: ένα team-related icon
   - **Action**: `Run JavaScript`
   - **Library**: `solar_preventivetask_team_members_pane.js`
   - **Function name**: `SolarPrevTaskOpenTeamMembersPane`
   - **Parameters**: `PrimaryControl`
4. **Save and publish**.

---

## Πώς λειτουργεί

1. Ο χρήστης επιλέγει **Maintenance Team** και (προαιρετικά) **Scheduled Date** στη φόρμα.
2. Πατά το κουμπί **Team Members** στο Command Bar.
3. Ανοίγει side pane πλάτους 450px με λίστα των μελών της team.
4. Κάθε γραμμή δείχνει:
   - Όνομα υπαλλήλου
   - Αριθμό ενεργών Preventive Tasks για αυτήν την ημερομηνία (`Tasks` badge)
   - Κουμπί **Assign** για ανάθεση στο τρέχον record
5. Το κουμπί **Assign** ενημερώνει το πεδίο `solar_prev_employee` μέσω Web API και ανανεώνει τη φόρμα.

---

## Σχετικά Dataverse Metadata

| Στοιχείο | Τιμή |
|---------|------|
| Solar Preventive Task table | `solar_solarpreventivetask` |
| Maintenance Team Member table | `solar_maintenanceteammember` |
| Team Member → Team lookup | `solar_maintenance_team` |
| Team Member → Employee lookup | `solar_member` |
| Preventive Task → Employee | `solar_prev_employee` (→ `systemuser`) |
| Preventive Task → Scheduled Date | `solar_prev_scheduleddate` (DateTime) |
