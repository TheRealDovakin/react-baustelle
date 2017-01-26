//js
import React from "react";
//own files
import Strings from '../values/strings_de';
/**
 * @author Kasper Nadrajkowski
 * container for Info
 */
export default class ProcessNotFoundPage extends React.Component{
	render(){
    const h1Margin = { marginTop: '60px' };
		return(
			<div style={h1Margin} class="jumbotron">
        <div class="container">
          <h1>{Strings.processNotFound}</h1>
          <p>{Strings.processNotFoundLong}</p>
          <p><a class="btn btn-primary btn-lg" href="/" role="button">{Strings.toHome}</a></p>
        </div>
      </div>
		);
	}
}
