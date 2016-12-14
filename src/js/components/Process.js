import React from "react";

import * as ItemsActions from "../actions/ItemsActions";

export default class Process extends React.Component{

	render(){

		const { id, status, person_name, due_date, p_type } = this.props;

		if(status==1){//nicht erledigt
			return(
				<div class="panel panel-default">
					<div class="panel-heading"><a href={"#/processView/"+id}>{person_name}</a></div>
					<ul class="list-group">
						<a class="list-group-item">Status: in progress</a>
						<a class="list-group-item">Deadline: {due_date}</a>
						<a class="list-group-item">Typ: {p_type}</a>
					</ul>	
				</div>
			);
		}else{//erledigt
			return(
				<div class="panel panel-success">
					<div class="panel-heading"><a href={"#/processView/"+id}>{person_name}</a></div>
					<ul class="list-group">
						<a class="list-group-item">Status: fertig</a>
						<a class="list-group-item">Deadline: {due_date}</a>
						<a class="list-group-item">Typ: {p_type}</a>
					</ul>	
				</div>
			);
		}
	}
}