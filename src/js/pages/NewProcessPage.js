import React from "react";

import * as ProcessActions from "../actions/ProcessActions";
import * as PhaseActions from "../actions/PhaseActions";
import * as ItemsActions from "../actions/ItemsActions";
import ProcessStore from '../stores/ProcessStore';
import PhaseStore from '../stores/PhaseStore';


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
	   this.handlep_typeChange = this.handlep_typeChange.bind(this);
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

  	handlep_typeChange(event) {
    	this.setState({
    		name: this.state.name,
    		due_date: this.state.due_date,
    		p_type: event.target.value,
    	});
  	}

	createProcess(t, name, due_date, p_type){
		//only for prototype - needs to be replaced
		const pr_id = ProcessStore.getAll().length+1;
		const ph_id = PhaseStore.getAll().length+1;
		ProcessActions.createProcess(1, name, due_date, p_type);
		//only for prototype - needs to be replaced
		PhaseActions.createPhase(pr_id, 2, "Neue Phase 1", 7);
		PhaseActions.createPhase(pr_id, 2, "Neue Phase 2", 6);
		ItemsActions.createItem(ph_id, 3, "lul", "er", "jens", true);
		ItemsActions.createItem(ph_id, 3, "lu", "op", "ok", false);
		ItemsActions.createItem(ph_id+1, 3, "lul", "ko", "po", false);
		ItemsActions.createItem(ph_id+1, 3, "lul", "fg", "tz", true);

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
				      <input  class="form-control" placeholder="Deadline" value={this.state.due_date} onChange={this.handleDueDateChange}></input>
				    </div>
				  </div>
				  <div class="form-group">
				    <label class="col-sm-2 control-label">Typ</label>
				    <div class="col-sm-10">
				      <select class="form-control" value={this.state.p_type} onChange={this.handlep_typeChange}>
						  <option>Vertieb</option>
						  <option>Techniker</option>
						  <option>Zentrale</option>
						</select>
				    </div>
				  </div>
				  <div class="form-group">
				    <div class="col-sm-offset-2 col-sm-10">
				      <a 	class="btn btn-info" href="#/" 
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