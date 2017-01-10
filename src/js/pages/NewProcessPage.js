//js
import alertify from 'alertify.js';
import Constants from '../values/constants';
import ES6Promise from 'es6-promise';
import flatpickr from "flatpickr";
import flatpickr_de from '../../node_modules/flatpickr/src/l10n/de';
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
		//IE promise-support
		ES6Promise.polyfill();
	   super(props);
	   this.state = {
			 	car: false,
				addAccounts: false,
	    	name: '',
				person_nr: '',
				short: '',
				job: '',
				place: '',
				department: '',
	    	due_date:'',
	    	p_type: 'Vertrieb',
	   };
		 // binded functions
		 this.createProcess = this.createProcess.bind(this);
	   this.handleAddAccountsChange = this.handleAddAccountsChange.bind(this);
	   this.handleCarChange = this.handleCarChange.bind(this);
		 this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
		 this.handleDueDateChange = this.handleDueDateChange.bind(this);
	   this.handleJobChange = this.handleJobChange.bind(this);
		 this.handleNameChange = this.handleNameChange.bind(this);
		 this.handlePersonNrChange = this.handlePersonNrChange.bind(this);
		 this.handlePlaceChange = this.handlePlaceChange.bind(this);
		 this.handleShortChange = this.handleShortChange.bind(this);
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
	createProcess(person_name, person_nr, short, job, place, department, due_date, p_type, car, addAccounts){
		var json_data = JSON.stringify({
			addAccounts: addAccounts,
			car: car,
			department: department,
			due_date: due_date,
			job: job,
			person_name: person_name,
			person_nr: person_nr,
			place: place,
			p_type: p_type,
			short: short,
			status: 1,
		});
		console.log(json_data);
		this.postProcess(json_data);
	}


	/**
	* eventhandler for car-input, toggles true and false
	* @param  {event} event 		input value
	*/
	 handleAddAccountsChange() {
		 var addAccounts;
		 if(this.state.addAccounts==false) addAccounts = true;
		 else addAccounts = false;
		 this.setState({ addAccounts: addAccounts });
	 }
	 handleCarChange() {
		 var car;
		 if(this.state.car==false) car = true;
		 else car = false;
		 this.setState({ car: car });
	 }
	 /**
	 * eventhandlers for remaining inputs
	 * @param  {event} event 		input value
	 */
	handleDepartmentChange(event) {	this.setState({ department: event.target.value }); }
	handleDueDateChange(event) { this.setState({ due_date: event.target.value }); }
	handleJobChange(event) { this.setState({ job: event.target.value	});	}
	handleNameChange(event) {	this.setState({	name: event.target.value });}
	handlePersonNrChange(event) {	this.setState({	person_nr: event.target.value	});	}
	handlePlaceChange(event) { this.setState({ place: event.target.value	});	}
	handleShortChange(event) { this.setState({ short: event.target.value	});	}
	handleTypeChange(event) {	this.setState({	p_type: event.target.value }); }
	/**
	 * sets the datepicker for date-input
	 */
	setDatepicker(){
		flatpickr.localize(flatpickr_de.de);
		var picker = document.getElementById('datepicker');
		var datepicker = flatpickr(picker, {
			locale: flatpickr_de.de
		});
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
					case Strings.processTypes.vertrieb: {self.postPhase(res, PhaseValues.vertrieb)}; break;
					case Strings.processTypes.zentrale: {self.postPhase(res, PhaseValues.zentrale)}; break;
					case Strings.processTypes.techniker: {self.postPhase(res, PhaseValues.techniker)}; break;
				}
				if (options.addAccounts==true) self.postPhase(res, PhaseValues.itKonten);
				if (options.car==true) self.postPhase(res, PhaseValues.auto);
				alertify.success(Strings.newProcess.success);
				self.setState({
					car: false,
					addAccounts: false,
	 	    	name: '',
					person_nr: '',
					short: '',
					job: '',
					place: '',
					department:'',
	 	    	due_date:'',
	 	    	p_type: Strings.processTypes.vertrieb,
				});
				document.getElementById('carCheckbox').checked = false;
				document.getElementById('addAccountsCheckbox').checked = false;
			})
		}
		else{
			console.log(Strings.error.restApi);
			console.log(res.json());
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
			console.log(res.json());
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
			if(res.ok){dispatcher.dispatch({type: "ITEM_CREATED"});}
			else{
				console.log(Strings.error.restApi);
				console.log(res.json());
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
				    <label class="col-sm-2 control-label">{Strings.name}*</label>
				    <div class="col-sm-10">
				      <input class="form-control" placeholder={Strings.name} value={this.state.name} onChange={this.handleNameChange}></input>
				    </div>
				  </div>
				  <div class="form-group">
				    <label class="col-sm-2 control-label">{Strings.personNr}*</label>
				    <div class="col-sm-10">
				      <input class="form-control" type="number" placeholder={Strings.personNr} value={this.state.person_nr} onChange={this.handlePersonNrChange}></input>
				    </div>
				  </div>
				  <div class="form-group">
				    <label class="col-sm-2 control-label">{Strings.short}*</label>
				    <div class="col-sm-10">
				      <input class="form-control" placeholder={Strings.short} value={this.state.short} onChange={this.handleShortChange}></input>
				    </div>
				  </div>
				  <div class="form-group">
				    <label class="col-sm-2 control-label">{Strings.job}*</label>
				    <div class="col-sm-10">
				      <input class="form-control" placeholder={Strings.job} value={this.state.job} onChange={this.handleJobChange}></input>
				    </div>
				  </div>
				  <div class="form-group">
				    <label class="col-sm-2 control-label">{Strings.place}*</label>
				    <div class="col-sm-10">
				      <input class="form-control" placeholder={Strings.place} value={this.state.place} onChange={this.handlePlaceChange}></input>
				    </div>
				  </div>
				  <div class="form-group">
				    <label class="col-sm-2 control-label">{Strings.department}*</label>
				    <div class="col-sm-10">
				      <input class="form-control" placeholder={Strings.department} value={this.state.department} onChange={this.handleDepartmentChange}></input>
				    </div>
				  </div>
				  <div class="form-group">
				    <label class="col-sm-2 control-label">{Strings.dueDate}*</label>
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
				    <label class="col-sm-2 control-label">{Strings.type}*</label>
				    <div class="col-sm-10">
				      <select class="form-control" value={this.state.p_type} onChange={this.handleTypeChange}>
							/* TODO: will probable be replaced by list */
						  <option>{Strings.processTypes.vertrieb}</option>
						  <option>{Strings.processTypes.techniker}</option>
						  <option>{Strings.processTypes.zentrale}</option>
						</select>
				    </div>
				  </div>
					<div class="form-group">
				    <label class="col-sm-2 control-label">{Strings.additionalAccounts}</label>
				    <div class="col-sm-10">
							<div class="checkbox">
				        <label>
			            <input id="carCheckbox" type='checkbox' value={this.state.addAccounts} onChange={this.handleAddAccountsChange}></input>
				        </label>
				      </div>
				    </div>
				  </div>
					<div class="form-group">
				    <label class="col-sm-2 control-label">{Strings.companyCar}</label>
				    <div class="col-sm-10">
							<div class="checkbox">
				        <label>
			            <input id="addAccountsCheckbox" type='checkbox' value={this.state.car} onChange={this.handleCarChange}></input>
				        </label>
				      </div>
				    </div>
				  </div>
				  <div class="form-group">
				    <div class="col-sm-offset-2 col-sm-10">
				      <a 	class="btn btn-primary"
								onClick={() => this.createProcess(
									this.state.name,
									this.state.person_nr,
									this.state.short,
									this.state.job,
									this.state.place,
									this.state.department,
									this.state.due_date,
									this.state.p_type,
									this.state.car,
									this.state.addAccounts)}>
								{Strings.processList.createNewProcess}
							</a>
				    </div>
				  </div>
				</form>
			</div>
		);
	}
}
