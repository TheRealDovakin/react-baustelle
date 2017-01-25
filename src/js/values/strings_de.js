/**
 * @author Kasper Nadrajkowski
 *
 * language string-collection: german
 */

module.exports = {
  //global strings
  additionalAccounts: 'Zusätzliche Konten',
  adito: 'Adito',
  basicInfo: 'Grundinformationen',
  baumanager: 'Baumanager',
  closed: 'geschlossen',
  companyCar: 'Firmenwagen',
  department: 'Abteilung/KST',
  dueDate: 'Deadline',
  done: 'beendet',
  emailBody: 'Es gibt einen neuen Eintrittsprozess an dem auch Sie beteiligt sind und der folgende Link führt Sie zur Bearbeitungsseite dieses Prozesses.\n Die Applikation ist noch in der Testphase und ist nur Auf die IT-Abteilung beschränkt.\n\n Zum einloggen beutzen Sie bitte vorerst folgende Daten: \n\n Name: Ihre K&P-Emailadresse\n Passwort: kup \n\nLink zum Prozess: ',
  entryProcess: 'Eintrittsprocess',
  equipment: 'Ausstattung',
  finish: 'Abschließen',
  info: 'Info',
  job: 'Tätigkeit',
  mailBody: 'Neuer Eintrittsprozess an dem Sie beteiligt sind. Link: ',
  name: 'Name',
  noAccessRights: 'Sie haben nicht die nötigen Rechte um die Aktion auszuführen',
  personNr : 'Personal Nr.',
  place: 'Standort',
  running: 'laufend',
  status: 'Status',
  type: 'Typ',
  short: 'Kürzel',
  tablePhone: 'Tischtelefon',
  //grouped strings
  footer:{
    contact: 'Kontakt',
    home: 'Home',
  },
  comment:{
    error: 'Der Kommentar kann nicht leer sein',
  },
  error:{
    restApi: 'Fehler beim Senden der Daten an die Datenbank. Für genauere Informationen schauen Sie bitte in den Response der API',
  },
  item:{
    setToDone: 'auf ERLEDIGT setzten',
    setToNotDone: 'auf NICHT ERLEDIGT setzten',
    responsablePerson: 'Verantwortlicher',
    responsablePersonSpare: 'Vertretung',
  },
  newProcess:{
    due: 'fällige Prozesse',
    headline: "Neuer Prozess",
    running: 'laufende Prozesse',
    soonDue: 'bald fällige Prozesse',
    success: 'Prozess wurde erstellt',
    error:{
      wrongInput: 'Bitte alle mit Felder mit die mit einem * Markiert sind ausfüllen',
    },
  },
  phase:{
    progress: 'Fortschritt',
  },
  process:{
    actions: 'Aktionen',
    confirmDelete: 'Klicken Sie Hier wenn Sie den Prozess wirklich löschen wollen',
    delete: 'Prozess löschen',
    error:{
      finishProcess: 'Prozess kann erst beendet werden wenn alle Aufgaben abgehackt sind',
      noAccessRights: 'Sie haben nicht die nötigen Rechte um diese Aufgabe als erledigt zu markieren',
    },
    finish: 'Prozess erfolgreich beenden',
    reDo: 'Prozess wiederaufnehmen',
    reDoLog: 'Prozess wiederaufgenommen',
  },
  processList:{
    createNewProcess: 'neuen Prozess anlegen',
    filter: 'Filter',
    headline: 'Prozess-Liste',
    search: 'Suche',
    searchString: 'Suchbegriff',
  },
  processTypes:{
    techniker: "Techniker",
    vertrieb: "Vertrieb",
    zentrale: "Zentrale",
  },
}
