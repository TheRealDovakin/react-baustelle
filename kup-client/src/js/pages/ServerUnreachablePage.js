//js
import React from "react";
//own files
import Strings from '../values/strings_de';
/**
 * @author Kasper Nadrajkowski
 * container for Info
 */
export default class ServerUnreachablePage extends React.Component{
	render(){
    const h1Margin = { marginTop: '60px' };
		return(
			<div style={h1Margin} class="jumbotron">
        <div class="container">
          <h1>{Strings.serverUnreachable}</h1>
          <p>{Strings.serverUnreachableLong}</p>
        </div>
      </div>
		);
	}
}
