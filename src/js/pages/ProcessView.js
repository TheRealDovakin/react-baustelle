//js
import React from "react";
//own files
import PhaseList from "../components/PhaseList";

/**
 * @author Kasper Nadrajkowski
 * this class represents a page that contains a PhaseList-component
 */
export default class ProcessView extends React.Component{

	constructor(props){
		super(props);
	}
	render(){
		return(
			<PhaseList/>
		);
	}
}
