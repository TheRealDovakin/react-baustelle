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
		const { person_nr, person_name } = this.props;
		return(
			<option>{person_nr+' - '+person_name}</option>
		);
	}
}
