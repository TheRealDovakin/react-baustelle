import React from "react";

export default class Process extends React.Component{

	constructor(props){
		super();
	}

	render(){

		const { _id, status, person_name, due_date, p_type } = this.props;

		var date = new Date(due_date);
		var day = date.getDate();
		var month = date.getMonth()+1;
		var year = date.getFullYear();
		var formatted_date = day+"."+month+"."+year;

		var panelStyle = 'panel-default';
		if(status==2) panelStyle = 'panel-success';

		return(
			<div class={"panel "+(panelStyle)}>
				<div class="panel-heading"><a href={"#/processView/"+_id}>{person_name}</a></div>
				<ul class="list-group">
					<a class="list-group-item">Status: in progress</a>
					<a class="list-group-item">Deadline: {formatted_date}</a>
					<a class="list-group-item">Typ: {p_type}</a>
				</ul>
			</div>
		);
	}
}
