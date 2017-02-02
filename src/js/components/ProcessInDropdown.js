//js
import React from "react";
//own files
/**
 * @author Kasper Nadrajkowski
 */
export default class ProcessInDropown extends React.Component{

	constructor(props){
		super();
	}

	render(){
		const { person_nr } = this.props;
		return(
			<option>{person_nr}</option>
		);
	}
}
