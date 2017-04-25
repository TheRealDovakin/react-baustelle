//js
import React from "react";
//own files
import DateUtils from '../utils/DateUtils';
import Strings from '../values/strings_de';
/**
 * @author Kasper Nadrajkowski
 * this class represents a simple view for a single Process
 */
export default class Process extends React.Component{

	constructor(props){
		super();
		this.goToProcess = this.goToProcess.bind(this);
	}

	/**
	 * opens a processView for a given id
	 * @param {string} id			process id
	 */
	goToProcess(id){
		document.location.href = "#/processPage/"+id;
 	}

	render(){
		const { _id, status, person_name, due_date, p_type, department, place } = this.props;
		var formatted_date = DateUtils.getDateAsString(due_date);
		// dynamic styling
		var rowStyle = 'default';
		var statusAsString = Strings.running;
		var date = new Date(Date.now());
		var datePlus5 = new Date(date);
		datePlus5.setDate(date.getDate()+5);
		if(new Date(due_date).getTime()<=datePlus5) rowStyle = 'warning';
		if(new Date(due_date).getTime()<=date) rowStyle = 'danger';
		if(status==2){
			rowStyle = 'success';
			statusAsString = Strings.closed;
		}
		return(
			<tr class={rowStyle} onClick={() => this.goToProcess(_id)}>
				<td>{person_name}</td>
				<td>{statusAsString}</td>
				<td>{formatted_date}</td>
				<td>{department}</td>
				<td>{place}</td>
			</tr>
		);
	}
}
