/**
 * @author Kasper Nadrajkowski
 * a collection of diffrent predifined Items
 */
export default{
  //additional accounts phase
  baumanagerKonto1: {
    phase: "bm",
    name: "AD-Konto ist vorhanden",
    person: "00480",
    person_spare: "Keine Angabe",
    mail: "motschmann@kieback-peter.de",
  },
  baumanagerKonto2: {
    phase: "bm",
    name: "Baumanager-Konto erstellen",
    person: "00480",
    person_spare: "Keine Angabe",
    mail: "motschmann@kieback-peter.de",
  },
  baumanagerDongle: {
    phase: "bmd",
    name: "Baumanager Dongle",
    person: "Detlef Elert",
    person_spare: "Gerd Dreyer",
  },
  adito1: {
    phase: "itk",
    name: "AD-Konto ist vorhanden",
    person: "01202",
    person_spare: "Rene Fürtenau",
    mail: "kraemer@kieback-peter.de",
  },
  adito2: {
    phase: "itk",
    name: "Adito-Konto erstellen",
    person: "01202",
    person_spare: "Rene Fürtenau",
    mail: "kraemer@kieback-peter.de",
  },
  pps: {
    phase: "pps",
    name: "PPS",
    person: "Andreas Lein",
    person_spare: "Keine Angabe",
  },
  //basic phase
  adAccount: {
    phase: "b",
    name: "AD-Konto erstellen",
    person: "01809",
    person_spare: "Ulf Röckert",
    mail: "atef@kieback-peter.de",
  },
  mobile: {
    phase: "-b",//not included for test in IT
    name: "Mobiltelefon",
    person: "Ines Zimmermann",
    person_spare: "Keine Angabe",
  },
  //laptop phases
  laptopVertriebAuftrag: {
    phase: "v",
    name: "Werstattauftrag drucken",
    person: "10782",
    person_spare: "Christopher Kuhn",
    mail: "hohmann@kieback-peter.de",
  },
  laptopZentraleAuftrag: {
    phase: "c",
    name: "Werstattauftrag drucken",
    person: "10782",
    person_spare: "Christopher Kuhn",
    mail: "hohmann@kieback-peter.de",
  },
  laptopTechnikerAuftrag: {
    phase: "t",
    name: "Werstattauftrag drucken",
    person: "10782",
    person_spare: "Christopher Kuhn",
    mail: "hohmann@kieback-peter.de",
  },
  laptopVertrieb: {
    phase: "v",
    name: "Laptop (Vertrieb) vorbereiten und versenden",
    person: "10263",
    person_spare: "Dominik Hohmann",
    mail: "kuhn@kieback-peter.de",
  },
  laptopZentrale: {
    phase: "c",
    name: "Laptop (Zentrale) vorbereiten und versenden",
    person: "10263",
    person_spare: "Dominik Hohmann",
    mail: "kuhn@kieback-peter.de",
  },
  laptopTechniker: {
    phase: "t",
    name: "Laptop (Techniker) vorbereiten und versenden",
    person: "10263",
    person_spare: "Dominik Hohmann",
    mail: "kuhn@kieback-peter.de",
  },
  //car phase
  auto: {
    phase: "car",
    name: "dauerhaften Firmenwagen bereitstellen",
    person: "10083",
    person_spare: "Keine Angabe",
  },
  tempAuto: {
    phase: "car",
    name: "temporären Firmenwagen bereitstellen",
    person: "10083",
    person_spare: "Keine Angabe",
  },
  //table phone phase
  tablePhone: {
    phase: "tp",
    name: "Tischtelefon vorbereiten und versenden",
    person: "02236",
    person_spare: "Ali Atef",
    mail: "dorn@kieback-peter.de",
  }
}
