//js
import alertify from 'alertify.js';
import Constants from '../values/constants';
import flatpickr from "flatpickr";
import React from "react";
import _ from 'underscore';
import "whatwg-fetch";

//css
import "../../node_modules/flatpickr/dist/flatpickr.min.css";

//own files
import dispatcher from "../dispatcher";
import * as ItemsActions from "../actions/ItemsActions";
import ItemValues from '../values/items.js'
import * as PhaseActions from "../actions/PhaseActions";
import PhaseStore from '../stores/PhaseStore';
import PhaseValues from '../values/phases';
import * as ProcessActions from "../actions/ProcessActions";
import ProcessStore from '../stores/ProcessStore';
import ProcessValues from '../values/processes';
import Strings from '../values/strings_de';

/**
 * @author Kasper Nadrajkowski
 * this class represents a view for a form to create a new Process
 */
export default class NewProcessPage extends React.Component{
	constructor(props) {
	   super(props);
	   this.state = {
			 car: false,
	    	name: '',
	    	due_date:'',
	    	p_type:'Vertieb',
	   };
		 // binded functions
		 this.createProcess = this.createProcess.bind(this);
	   this.handleCarChange = this.handleCarChange.bind(this);
	   this.handleNameChange = this.handleNameChange.bind(this);
	   this.handleDueDateChange = this.handleDueDateChange.bind(this);
	   this.handleTypeChange = this.handleTypeChange.bind(this);
	   this.setDatepicker = this.setDatepicker.bind(this);
	   this.postProcess = this.postProcess.bind(this);
	   this.postPhase = this.postPhase.bind(this);
	   this.postItem = this.postItem.bind(this);
	}

	/**
	 * wil be called after the component mounted
	 */
	componentDidMount(){
		this.setDatepicker();
	}

	/**
	 * wrapes parameters to a JSON and call post-function with it
	 * @param {String} person_name			name from input
	 * @param {String} due_date			date from datepicker
	 * @param {String} p_type			process type from input
	 */
	createProcess(person_name, due_date, p_type, car){
		var json_data = JSON.stringify({
			status: 1,
			person_name: person_name,
			due_date: due_date,
			p_type: p_type,
			car: car,
		});
		this.postProcess(json_data);
	}

	/**
	 * handles car-input changes and upadates state with the value
	 * @param  {event} event 		input value
	 */
	handleCarChange() {
		var car;
		if(this.state.car==false) car = true;
		else car = false;
  	this.setState({
			car: car,
  		name: this.state.name,
  		due_date: this.state.due_date,
  		p_type: this.state.p_type,
  	});
	}

	/**
	 * handles name-input changes and upadates state with the value
	 * @param  {event} event 		input value
	 */
	handleNameChange(event) {
  	this.setState({
			car: this.state.car,
  		name: event.target.value,
  		due_date: this.state.due_date,
  		p_type: this.state.p_type,
  	});
	}

	/**
	 * handles date-input changes and upadates state with the value
	 * @param  {event} event			date value
	 */
	 handleDueDateChange(event) {
  	this.setState({
			car: this.state.car,
  		name: this.state.name,
  		due_date: event.target.value,
  		p_type: this.state.p_type,
  	});
	}

	/**
	 * handles pocess-type-input changes and upadates state with the value
	 * @param  {event} event 		process-type value
	 */
	handleTypeChange(event) {
  	this.setState({
			car: this.state.car,
  		name: this.state.name,
  		due_date: this.state.due_date,
  		p_type: event.target.value,
  	});
	}

	/**
	 * sets the datepicker for date-input
	 */
	setDatepicker(){
		var picker = document.getElementById('datepicker');
		flatpickr(picker);
	}

	/**
	 * creates a new Process in the DB and calls function to create child-Phases
	 * @param  {object} json_data JSON with data from inputs
	 */
	postProcess(json_data){
		var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	var myInit = { method: 'POST', mode: 'cors', body: json_data, headers: myHeaders }
	const self = this;
	fetch(Constants.restApiPath+'processes/', myInit).then(function(res){
		if(res.ok){
			dispatcher.dispatch({type: "PROCESS_CREATED"});
			res.json().then(function(res){
				self.postPhase(res, PhaseValues.basic);
				const options = JSON.parse(json_data);
				switch(options.p_type){
					case 'Vertrieb': {self.postPhase(res, PhaseValues.vertrieb)}; break;
					case 'Zentrale': {self.postPhase(res, PhaseValues.zentrale)}; break;
					case 'Techniker': {self.postPhase(res, PhaseValues.techniker)}; break;
				}
				if (options.car==true) self.postPhase(res, PhaseValues.auto);
			})
		}
		else{
			console.log(Strings.error.restApi);
			console.log(res);
			alertify.error(Strings.newProcess.error.wrongInput);
		}
	});
	}

	/**
	 * creates a Phase in the DB and calls functions that create child-Items
	 * @param  {object} res        parent Process
	 * @param  {object} phaseValue predifined JSON for specific Phase
	 */
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
			console.log(Strings.error.restApi);
			console.log(res);
		}
	});
	}

	/**
	 * creates an item in the DB
	 * @param  {object} res       parent Phase
	 * @param  {object} itemValue predifined JSON for specific Item
	 */
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
			//document.location.href = '/';
			alertify.success('Process wurde erstellt'); // TODO: replace hardcoded string
			self.setState({
				car: false,
 	    	name: '',
 	    	due_date:'',
 	    	p_type:'Vertieb',
			});
			document.getElementById('carCheckbox').checked = false;
		}
		else{
			console.log(String.error.restApi);
			console.log(res);
		}
	});
	}

	render(){
		const headlineStyle = { marginTop: 70 };
		return(
			<div class="col-md-12">
				<h1 style={headlineStyle}>{Strings.newProcess.headline}</h1>
				<form class="form-horizontal">
				  <div class="form-group">
				    <label class="col-sm-2 control-label">{Strings.name}</label>
				    <div class="col-sm-10">
				      <input class="form-control" placeholder={Strings.name} value={this.state.name} onChange={this.handleNameChange}></input>
				    </div>
				  </div>
				  <div class="form-group">
				    <label class="col-sm-2 control-label">{Strings.dueDate}</label>
				    <div class="col-sm-10">
				    	<div class="input-group">
				    		<span class="input-group-addon" id="sizing-addon1">
				    			<a class="glyphicon glyphicon-calendar"></a>
				    		</span>
				      		<input  id="datepicker" aria-describedby="sizing-addon1" class="form-control" placeholder={Strings.dueDate} value={this.state.due_date} onChange={this.handleDueDateChange}></input>
				    	</div>
				    </div>
				  </div>
				  <div class="form-group">
				    <label class="col-sm-2 control-label">{Strings.type}</label>
				    <div class="col-sm-10">
				      <select class="form-control" value={this.state.p_type} onChange={this.handleTypeChange}>
							/* TODO: will probable be replaced by list */
						  <option>Vertieb</option>
						  <option>Techniker</option>
						  <option>Zentrale</option>
						</select>
				    </div>
				  </div>
					<div class="form-group">
				    <label class="col-sm-2 control-label">Firmenwagen</label>
				    <div class="col-sm-10">
							<div class="checkbox">
				        <label>
			            <input id="carCheckbox" type='checkbox' value={this.state.car} onChange={this.handleCarChange}></input>
				        </label>
				      </div>
				    </div>
				  </div>
				  <div class="form-group">
				    <div class="col-sm-offset-2 col-sm-10">
				      <a 	class="btn btn-primary"
								onClick={() => this.createProcess(this.state.name, this.state.due_date, this.state.p_type, this.state.car)}>
								{Strings.processList.createNewProcess}
							</a>
				    </div>
				  </div>
				</form>
			</div>
		);
	}
}
