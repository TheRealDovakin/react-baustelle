//js
import React from "react";
/**
 * @author Kasper Nadrajkowski
 * simple info component
 */
export default class Info extends React.Component{
	render(){
		const margin = { marginLeft: '30px', marginTop: '70px', marginBottom: '50px' };
		return(
      <div style={margin}>
        <h1>EPM Doku</h1>
				<h3>Dukumentation des Eintritts-Prozess-Management-Tools</h3>
				<h2>1. Beschreibung</h2>
				<p>Das EPM dient zu erleichterten Koordinierung der Eintrittsprozesse vom Personal. Gestartet und konfiguriert von der Personalabteilung wird eine Liste aus Aufgaben unterteilt in Phasen ertellt anhand derer übersichtlich zu erkennen ist, welche Aufgaben von wem und bis zu welchem zeitpunkt zu erledigen sind.</p>
				<h2>2. Getestet für folgende Browser</h2>
				<h3>Chrome (Empfolen)</h3>
				<p>Voll funktionsfähig ohne bekannte Einschränkungen</p>
				<h3>Mozilla Firefox</h3>
				<p>Anmeldung muss im manchen Fällen doppelt ausgeführt werden, Füllen der der Felder beim Erstellen eines neuen Prozesseslädt die Seite beim ersten Mal neu.</p>
				<h3>Microsoft Internet Explorer</h3>
				<p>Anmeldung nicht möglich und somit nicht zum Gebrauch geeignet.</p>

      </div>
    );
  }
}
