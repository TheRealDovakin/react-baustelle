//js
import React from "react";
//own files
/**
 * @author Kasper Nadrajkowski
 * container for Info
 */
export default class ProcessNotFoundPage extends React.Component{
	render(){
    // TODO: replace hardcoded strings
    const h1Margin = { marginTop: '60px' };
		return(
			<div style={h1Margin} class="jumbotron">
        <div class="container">
          <h1>404 - Prozess nicht gefunden</h1>
          <p>Der gesuchte Prozess wurde gelöscht oder war nie vorhanden.</p>
          <p><a class="btn btn-primary btn-lg" href="/" role="button">zur Startseite</a></p>
        </div>
      </div>
		);
	}
}
