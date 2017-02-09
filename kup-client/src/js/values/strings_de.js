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
  comments: 'Kommentare',
  commentText: 'Kommentar Text',
  companyCar: 'Firmenwagen',
  companyName: 'Kieback & Peter',
  completeProcess: 'Prozess erstellen',
  createdProcess: 'Angelegter Process',
  creatingProcess: 'Prozess wird erstellt ...',
  department: 'Abteilung/KST',
  dueDate: 'Einstellungsdatum',
  done: 'beendet',
  emailAdress: 'Email Adresse',
  emailBody: 'Es gibt einen neuen Eintrittsprozess an dem auch Sie beteiligt sind und der folgende Link führt Sie zur Bearbeitungsseite dieses Prozesses.\n Die Applikation ist noch in der Testphase und ist nur Auf die IT-Abteilung beschränkt.\n\n Zum einloggen beutzen Sie bitte vorerst folgende Daten: \n\n Name: Ihre K&P-Emailadresse\n Passwort: kup \n\nLink zum Prozess: ',
  entryProcess: 'Eintrittsprocess',
  equipment: 'Ausstattung',
  fillInputs: 'Felder ausfüllen',
  finish: 'Abschließen',
  info: 'Info',
  job: 'Tätigkeit',
  kupMail: '@kieback-peter.de',
  login: 'Anmelden',
  loginError: 'Internet Explorer bitte Vermeiden. Mozilla Firefox und Chrome sind ok',
  mailBody: 'Neuer Eintrittsprozess an dem Sie beteiligt sind. Link: ',
  name: 'Name',
  noAccessRights: 'Sie haben nicht die nötigen Rechte um die Aktion auszuführen',
  password: 'Passwort',
  personNr : 'Personal Nr.',
  pickPerson: 'Personenauswahl',
  place: 'Standort',
  processCreatedLogMessage: 'Prozess wurde erstellt. Gehe zurück zur Startseite',
  processNotFound: '404 - Process nicht gefunden',
  processNotFoundLong: 'Der gesuchte Prozess wurde gelöscht oder war nie vorhanden',
  processStatus: 'Porozess-Status',
  running: 'laufend',
  serverUnreachable: '503 - Server nicht erreichbar',
  serverUnreachableLong: 'Der Server ist zurzeit nicht erreichbar. Bitte versuchen Sie es an einem späteren Zeitpunkt nochmal oder wenden Sie sich an den Support',
  status: 'Status',
  type: 'Typ',
  toHome: 'zur Startseite',
  short: 'Kürzel',
  tablePhone: 'Tischtelefon',
  yearAndAuthor: ' 2017 Kasper Nadrajkowski',
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
    confirmDelete: 'Sie sind dabei diesen Prozess zu löschen. Wen Sie sicher sind, dass Sie ihn löschen wollen, dann klicken Sie auf OK',
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
