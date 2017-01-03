//js
import alertify from 'alertify.js';
import Constants from '../values/constants';
import flatpickr from "flatpickr";
import ItemValues from '../values/items.js'
import PhaseValues from '../values/phases';
import React from "react";
import _ from 'underscore';
import "whatwg-fetch";

//css
import "../../node_modules/flatpickr/dist/flatpickr.min.css";

//own files
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
	   this.setDatepicker = this.setDatepicker.bind(this);
	   this.postProcess = this.postProcess.bind(this);
	   this.postPhase = this.postPhase.bind(this);
	   this.postItem = this.postItem.bind(this);
	}

	componentDidMount(){
		this.setDatepicker();
	}

	createProcess(t, person_name, due_date, p_type){
		var json_data = JSON.stringify({
			status: 1,
			person_name: person_name,
			due_date: due_date,
			p_type: p_type
		});
		this.postProcess(json_data);
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

  	setDatepicker(){
  		var picker = document.getElementById('datepicker');
  		flatpickr(picker);
  	}

  	postProcess(json_data){
  		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		var myInit = { method: 'POST', mode: 'cors', body: json_data, headers: myHeaders }
		const self = this;
		fetch(Constants.restApiPath+'processes/', myInit).then(function(res){
			if(res.ok){
				dispatcher.dispatch({type: "PROCESS_CREATED"});
				res.json().then(function(res){
					self.postPhase(res, PhaseValues.itPhase1);
					self.postPhase(res, PhaseValues.itPhase2);
				})
			}
			else{
				console.log('error in create Process');
				console.log(res);
				// HACK: replace hardcoded String
				alertify.error('Bitte Namen eintragen und Datum auswählen.')
			}
		});
  	}

  	postPhase(res, phaseValue){
  		const json_data = JSON.stringify({
  			name: phaseValue.name,
  			process_id: res._id,
  			status: phaseValue.status,
  			r_nr:phaseValue.r_nr,
  		})
  		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
  		var myInit = { method: 'POST', mode: 'cors', body: json_data, headers: myHeaders }
  		var self = this;
  		fetch(Constants.restApiPath+'phases/', myInit).then(function(res){
			if(res.ok){
				dispatcher.dispatch({type: "PHASE_CREATED"});
				res.json().then(function(res){
					_.each(ItemValues, function(itemValue){
					 if(itemValue.phase==phaseValue.short){
						 self.postItem(res, itemValue);
					 }
					})
				})
			}
			else{
				console.log('error in create Phase');
				console.log(res);
			}
		});
  	}

  	postItem(res, itemValue){
  		const json_data = JSON.stringify({
			phase_id: res._id,
			status: 3,
			name: itemValue.name,
			person: itemValue.person,
			person_spare: itemValue.person_spare,
			spare: false
  		});
  		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
  		var myInit = { method: 'POST', mode: 'cors', body: json_data, headers: myHeaders }
  		var self = this;
  		fetch(Constants.restApiPath+'items/', myInit).then(function(res){
			if(res.ok){
				dispatcher.dispatch({type: "ITEM_CREATED"});
				document.location.href = '/';
			}
			else{
				console.log('error in create Phase');
				console.log(res);
			}
		});
  	}

	render(){

		return(
			<div class="col-md-12">
				{/* HACK: space for fixed-header-class */}
				<h1> .  </h1>
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
				    	<div class="input-group">
				    		<span class="input-group-addon" id="sizing-addon1">
				    			<a class="glyphicon glyphicon-calendar"></a>
				    		</span>
				      		<input  id="datepicker" aria-describedby="sizing-addon1" class="form-control" placeholder="Deadline" value={this.state.due_date} onChange={this.handleDueDateChange}></input>
				    	</div>
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
