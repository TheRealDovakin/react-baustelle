import React from "react";
import "whatwg-fetch";

import dispatcher from "../dispatcher";
import * as ItemsActions from "../actions/ItemsActions";
import * as PhaseActions from "../actions/PhaseActions";
import PhaseStore from '../stores/PhaseStore';
import * as ProcessActions from "../actions/ProcessActions";
import ProcessStore from '../stores/ProcessStore';


export default class NewProcessPage extends React.Component{

	constructor(props) {
	   super(props);
	   this.state = {
	    	name: '',
	    	due_date:'',
	    	p_type:'Vertieb',
	   };

	   this.handleNameChange = this.handleNameChange.bind(this);
	   this.handleDueDateChange = this.handleDueDateChange.bind(this);
	   this.handleTypeChange = this.handleTypeChange.bind(this);
	}

	handleNameChange(event) {
    	this.setState({
    		name: event.target.value,
    		due_date: this.state.due_date,
    		p_type: this.state.p_type,
    	});
  	}

  	handleDueDateChange(event) {
    	this.setState({
    		name: this.state.name,
    		due_date: event.target.value,
    		p_type: this.state.p_type,
    	});
  	}

  	handleTypeChange(event) {
    	this.setState({
    		name: this.state.name,
    		due_date: this.state.due_date,
    		p_type: event.target.value,
    	});
  	}

	createProcess(t, person_name, due_date, p_type){
		var json_data = JSON.stringify({
			status: 1,
			person_name: person_name, 
			due_date: due_date, 
			p_type: p_type
		});
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		var myInit = { method: 'POST', mode: 'cors', body: json_data, headers: myHeaders }
		fetch('http://172.22.23.6:3000/processes/', myInit).then(function(res){
			if(res.ok){ 
				dispatcher.dispatch({type: "PROCESS_CREATED"});
				document.location.href = '/';
			}
			else{
				console.log('error in create Process');
				console.log(res);
			}
		});
	}	

	componentDidMount(){
		console.log("mount");
	}

	render(){

		return(
			<div class="col-md-12">
				<h1>New Process Page</h1>
				<form class="form-horizontal">
				  <div class="form-group">
				    <label class="col-sm-2 control-label">Name</label>
				    <div class="col-sm-10">
				      <input class="form-control" placeholder="Name" value={this.state.name} onChange={this.handleNameChange}></input>
				    </div>
				  </div>
				  <div class="form-group">
				    <label class="col-sm-2 control-label">Deadline</label>
				    <div class="col-sm-10">
				      <input  id="datepicker" class="datepicker form-control" placeholder="Deadline" value={this.state.due_date} onChange={this.handleDueDateChange}></input>
				    </div>
				  </div>
				  <div class="form-group">
				    <label class="col-sm-2 control-label">Typ</label>
				    <div class="col-sm-10">
				      <select class="form-control" value={this.state.p_type} onChange={this.handleTypeChange}>
						  <option>Vertieb</option>
						  <option>Techniker</option>
						  <option>Zentrale</option>
						</select>
				    </div>
				  </div>
				  <div class="form-group">
				    <div class="col-sm-offset-2 col-sm-10">
				      <a 	class="btn btn-info" 
								onClick={() => this.createProcess(this, this.state.name, this.state.due_date, this.state.p_type)}>
								neuen Prozess erstellen
							</a>
				    </div>
				  </div>
				</form>
			</div>
		);
	}
}