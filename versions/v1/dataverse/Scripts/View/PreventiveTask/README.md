# Solar Preventive Task – View Maintenance Team Members Pane

Side pane για τη **λίστα (view)** **Solar Preventive Task** που εμφανίζει τα μέλη της Maintenance Team και τον αριθμό tasks ανά υπάλληλο για την επιλεγμένη ημερομηνία.

Βασίζεται στο template `Dataverse_Templates/Scripts/Views/EntityViewTeamMembersPane`.

---

## Αρχεία

| Αρχείο | Τύπος Web Resource | Περιγραφή |
|--------|--------------------|-----------|
| `preventive-task-view-team-members-pane.js` | Script (JScript) | Ανοίγει το side pane από το Command Bar της **λίστας (view)** |

> **HTML pane**: Το HTML αρχείο είναι **κοινό** με το Form script.  
> Χρησιμοποιείται το ίδιο web resource: `solar_preventivetask_team_members_pane.html`  
> (βρίσκεται στο `dataverse/Scripts/Forms/PreventiveTask/preventive-task-team-members-pane.html`)

---

## ⚠️ Προαπαιτούμενο – Πεδίο Maintenance Team

Ο πίνακας `solar_solarpreventivetask` πρέπει να έχει το Lookup πεδίο:

| Ιδιότητα | Τιμή |
|----------|------|
| Display Name | `Maintenance Team` |
| Logical Name | `solar_maintenanceteamid` |
| Target table | `Solar Maintenance Team` (`solar_maintenance_team`) |

---

## Placeholders που χρησιμοποιήθηκαν

| Placeholder | Τιμή |
|------------|------|
| `ENTITY_DISPLAY_NAME` | `Solar Preventive Task` |
| `ENTITY_NAME` | `solar_solarpreventivetask` |
| `OPEN_PANE_FUNCTION_NAME` | `SolarPrevTaskViewOpenTeamMembersPane` |
| `PANE_TITLE` | `Maintenance Team Members` |
| `PANE_ID` | `solarPrevTaskTeamMembersPane` |
| `TEAM_MEMBERS_WEBRESOURCE_NAME` | `solar_preventivetask_team_members_pane.html` |
| `FIELD_MAINTENANCE_TEAM` | `solar_maintenanceteamid` |
| `FIELD_SCHEDULE_DATE` | `solar_prev_scheduleddate` |
| `FORM_CONTEXT_GLOBAL` | `__solarPrevTaskFormContext` |
| `PANEDATA_STORAGE_KEY` | `solar_prev_task_team_members_pane_data` |

---

## Βήματα Deployment

### 1. Upload Web Resources στο Dataverse

1. Άνοιξε το **make.powerapps.com** → Solution σου → Web resources.
2. Αν δεν έχει ήδη ανέβει το HTML από το Form, πρόσθεσέ το:
   - **File**: `preventive-task-team-members-pane.html` (από `Forms/PreventiveTask/`)
   - **Name**: `solar_preventivetask_team_members_pane.html`
   - **Type**: Webpage (HTML)
3. Πρόσθεσε νέο Web Resource για το view script:
   - **File**: `preventive-task-view-team-members-pane.js`
   - **Name**: `solar_preventivetask_view_team_members_pane.js`
   - **Type**: Script (JScript)
4. **Publish all customizations**.

### 2. Command Bar Button (View)

1. Άνοιξε **Power Apps** → Tables → **Solar Preventive Task** → **Views** → επέλεξε το view που θες.
2. Επέλεξε **Edit command bar**.
3. Πρόσθεσε νέο κουμπί:
   - **Label**: `Team Members` (ή ό,τι επιθυμείς)
   - **Icon**: team-related icon
   - **Action**: `Run JavaScript`
   - **Library**: `solar_preventivetask_view_team_members_pane.js`
   - **Function name**: `SolarPrevTaskViewOpenTeamMembersPane`
   - **Parameters** (με τη σειρά): `SelectedControlSelectedItemIds`, `SelectedControl`
   - **Visibility formula**: `CountRows(Self.Selected.AllItems) = 1`
4. **Save and publish**.

---

## Πώς λειτουργεί

1. Ο χρήστης επιλέγει **ακριβώς μία γραμμή** στη λίστα Solar Preventive Task.
2. Πατά το κουμπί **Team Members** στο Command Bar.
3. Το script διαβάζει μέσω Web API το `solar_maintenanceteamid` και `solar_prev_scheduleddate` του επιλεγμένου record.
4. Ανοίγει side pane πλάτους 450px με λίστα των μελών της team.
5. Κάθε γραμμή δείχνει:
   - Όνομα υπαλλήλου
   - Αριθμό ενεργών Preventive Tasks για αυτήν την ημερομηνία (badge)
   - Κουμπί **Assign** για ανάθεση στο επιλεγμένο record
6. Το κουμπί **Assign** ενημερώνει το πεδίο `solar_prev_employee` μέσω Web API.

---

## Σχετικά Dataverse Metadata

| Στοιχείο | Τιμή |
|---------|------|
| Solar Preventive Task table | `solar_solarpreventivetask` |
| Primary key | `solar_solarpreventivetaskid` |
| Maintenance Team lookup | `solar_maintenanceteamid` |
| Scheduled Date | `solar_prev_scheduleddate` (DateTime) |
| Employee lookup | `solar_prev_employee` (→ `systemuser`) |
| Maintenance Team Member table | `solar_maintenanceteammember` |
| Team Member → Team lookup | `solar_maintenance_team` |
| Team Member → Employee lookup | `solar_member` |
