//js
import React from "react";
//own files
import ProcessList from "../components/ProcessList"

/**
 * @author Kasper Nadrajkowski
 * this class represents a page that contains a ProcessList-component
 */
export default class ProcessListPage extends React.Component{
	render(){
		return(
			<ProcessList/>
		);
	}
}
