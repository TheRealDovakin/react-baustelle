//js
import React from "react";
/**
 * @author Kasper Nadrajkowski
 * this class represents a simple view for a single Process
 */
export default class Process extends React.Component{

	constructor(props){
		super();

		this.goToProcess = this.goToProcess.bind(this);
	}

	goToProcess(link){
		document.location.href = link;
	}

	render(){
		const { _id, status, person_name, due_date, p_type } = this.props;
		// converts the date to a readeble String
		var date = new Date(due_date);
		var day = date.getDate();
		var month = date.getMonth()+1;
		var year = date.getFullYear();
		var formatted_date = day+"."+month+"."+year;
		// dynamic styling
		var rowStyle = '';
		var statusAsString = 'laufend';
		var date = new Date(Date.now());
		var datePlus5 = new Date(Date.now());
		datePlus5.setDate(date.getDate()+5);
		if(new Date(due_date).getTime()<=datePlus5) rowStyle = 'warning';
		if(new Date(due_date).getTime()<=date) rowStyle = 'danger';
		if(status==2){
			rowStyle = 'success';
			statusAsString = 'geschlossen';
		}
		return(
			<tr class={rowStyle} onClick={() => this.goToProcess("#/processView/"+_id)}>
				<td>{person_name}</td>
				<td>{statusAsString}</td>
				<td>{formatted_date}</td>
				<td>{p_type}</td>
			</tr>
		);
	}
}
