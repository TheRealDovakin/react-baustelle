/**
 * @author Kasper Nadrajkowski
 *
 * language string-collection: german
 */

export default{
  //global strings
  closed: 'geschlossen',
  dueDate: 'Daedline',
  info: 'Info',
  name: 'Name',
  running: 'laufend',
  status: 'Status',
  type: 'Typ',
  //grouped strings
  footer:{
    contact: 'Kontakt',
    home: 'Home',
  },
  error:{
    restApi: 'Fehler beim Senden der Daten an die Datenbank. Für genauere Informationen schauen Sie bitte in den Response der API',
  },
  item:{
    setToDone: 'auf ERLEDIGT setzten',
    setToNotDone: 'aud NICHT ERLEDIGT setzten',
    responsablePerson: 'Verantwortlicher',
    responsablePersonSpare: 'Vertretung',
  },
  newProcess:{
    headline: "Neuer Prozess",
    error:{
      wrongInput: 'Bitte Namen eintragen und Datum auswählen',
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
}
