//js
import alertify from 'alertify.js';
import Constants from '../values/constants';
import ES6Promise from 'es6-promise';
import Pikaday from 'pikaday-react';
import React from "react";
import _ from 'underscore';
import "whatwg-fetch";

//css
import '!!style-loader!css-loader!pikaday/css/pikaday.css';

//own files
import dispatcher from "../dispatcher";
import * as ItemsActions from "../actions/ItemsActions";
import ItemValues from '../values/items.js'
import LogaStore from '../stores/LogaStore';
import * as PhaseActions from "../actions/PhaseActions";
import PhaseStore from '../stores/PhaseStore';
import PhaseValues from '../values/phases';
import * as ProcessActions from "../actions/ProcessActions";
import ProcessInDropdown from '../components/ProcessInDropdown';
import ProcessStore from '../stores/ProcessStore';
import ProcessValues from '../values/processes';
import Strings from '../values/strings_de';

/**
 * @author Kasper Nadrajkowski
 * this class represents a view for a form to create a new Process
 */
export default class CreatedProcessPage extends React.Component{
	constructor(props) {
		//IE promise-support
		ES6Promise.polyfill();
	  super(props);
		this.mailList = [];
	  this.state = {
		 	addAccounts: false,
			baumanager: false,
		 	car: false,
			department: '',
			due_date:'',
			loga: [],
	  	name: '',
			job: '',
			p_type: 'Vertrieb',
			person_nr: '',
			person_nrToFill: '',
			place: '',
			processes: [],
			short: '',
			tablePhone: false,
	  };
		// binded functions
		this.createProcess = this.createProcess.bind(this);
		this.fetchLoga = this.fetchLoga.bind(this);
		this.fetchProcesses = this.fetchProcesses.bind(this);
		this.fillInputs = this.fillInputs.bind(this);
		this.getLoga = this.getLoga.bind(this);
		this.getProcesses = this.getProcesses.bind(this);
	  this.handleAddAccountsChange = this.handleAddAccountsChange.bind(this);
	  this.handleBaumanagerChange = this.handleBaumanagerChange.bind(this);
	  this.handleCarChange = this.handleCarChange.bind(this);
		this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
		this.handleDueDateChange = this.handleDueDateChange.bind(this);
	  this.handleJobChange = this.handleJobChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePersonNrChange = this.handlePersonNrChange.bind(this);
		this.handlePersonNrToFillChange = this.handlePersonNrToFillChange.bind(this);
		this.handlePlaceChange = this.handlePlaceChange.bind(this);
		this.handleShortChange = this.handleShortChange.bind(this);
	  this.handleTablePhoneChange = this.handleTablePhoneChange.bind(this);
	  this.handleTypeChange = this.handleTypeChange.bind(this);
	  this.setProcess = this.setProcess.bind(this);
	  this.postProcess = this.postProcess.bind(this);
	  this.postPhase = this.postPhase.bind(this);
	  this.postItem = this.postItem.bind(this);
	}

	/**
	 * will be called before the component mounted,
	 * adds changelisteners for stores
	 */
	componentWillMount(){
		LogaStore.on("change", this.getLoga);
		ProcessStore.on("change", this.getProcesses);
	}

	/**
	 * will be called before the component will unmount,
	 * removes changelisteners for stores
	 */
	componentWillUnmount(){
		LogaStore.removeListener("change", this.getLoga);
		ProcessStore.removeListener("change", this.getProcesses);
	}

	/**
	 * wil be called after the component mounted
	 */
	componentDidMount(){
		this.fetchLoga();
		this.fetchProcesses();
	}
	/**
	 * wrapes parameters to a JSON and call post-function with it
	 * @param {String} person_name			name from input
	 * @param {String} due_date			date from datepicker
	 * @param {String} p_type			process type from input
	 */
	createProcess(person_name, person_nr, short, job, place, department, due_date, p_type, car, addAccounts, tablePhone, baumanager){

		if(short==''||person_nr==''){
			alertify.error('Biite geben Sie eine Personla Nr. und ein Kürzel an');
			return;
		}
		var json_data = JSON.stringify({
			addAccounts: addAccounts,
			baumanager: baumanager,
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
			tablePhone: tablePhone,
		});
		this.postProcess(json_data);
	}


	/**
	 * fetches all Processes from the DB and dispatches an action that updates
	 * its store
	 */
	fetchLoga(){
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+window.sessionStorage.accessToken);
		var myInit = { headers: myHeaders };
		var self = this;
		fetch(Constants.restApiPath+'loga', myInit).then(function(res){
			if(res.ok){
				res.json().then(function(res){
					dispatcher.dispatch({
						type: 	"FETCH_LOGA_FROM_API",
						res,
					});
				});
			}
			else{
			}
		});
	}
	/**
	 * fetches all Processes from the DB and dispatches an action that updates
	 * its store
	 */
	fetchProcesses(){
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+window.sessionStorage.accessToken);
		var myInit = { headers: myHeaders };
		var self = this;
		fetch(Constants.restApiPath+'processes', myInit).then(function(res){
			if(res.ok){
				res.json().then(function(res){
					dispatcher.dispatch({
						type: 	"FETCH_PROCESSES_FROM_API",
						res,
					});
				});
			}
			else{
			}
		});
	}

	fillInputs(){
		//BUG: refreshes the site on first use
		var self = this;
		var rightProcess = _.find(self.state.loga, function(process){
			return process.person_nr == self.state.person_nrToFill;
		});
		self.setState({
			department: rightProcess.department,
			due_date: rightProcess.due_date,
	  	name: rightProcess.person_name,
			job: rightProcess.job,
			place: rightProcess.place,
			person_nr: rightProcess.person_nr,
			short: rightProcess.short,
			p_type: rightProcess.p_type
		});
	}

	/**
	 * updates the state with Processes from its Store
	 */
	getLoga(){
		this.setState({
			loga: LogaStore.getAll(),
		});
	}

	/**
	 * updates the state with Processes from its Store
	 */
	getProcesses(){
		this.setState({
			processes: ProcessStore.getAll(),
		});
	}

	setProcess(res){
		this.setState({
			department: res.department,
			due_date: res.due_date,
	  	name: res.person_name,
			job: res.job,
			place: res.place,
	  });
	}

	/**
	* eventhandler for car-input, toggles true and false
	* @param  {event} event 		input value
	*/
	 handleBaumanagerChange() {
		 var baumanager = (this.state.baumanager) ? false : true;
		 this.setState({ baumanager: baumanager });
	 }
	 handleAddAccountsChange() {
		 var addAccounts = (this.state.addAccounts) ? false : true;
		 this.setState({ addAccounts: addAccounts });
	 }
	 handleCarChange() {
		 var car = (this.state.car) ? false : true;
		 this.setState({ car: car });
	 }
	 handleTablePhoneChange() {
		 var tablePhone = (this.state.tablePhone) ? false : true;
		 this.setState({ tablePhone: tablePhone });
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
	handlePersonNrToFillChange(event) {	this.setState({	person_nrToFill: event.target.value	});	}
	handlePlaceChange(event) { this.setState({ place: event.target.value	});	}
	handleShortChange(event) { this.setState({ short: event.target.value	});	}
	handleTypeChange(event) {	this.setState({	p_type: event.target.value }); }

	/**
	 * creates a new Process in the DB and calls function to create child-Phases
	 * @param  {object} json_data JSON with data from inputs
	 */
	postProcess(json_data){
		var myHeaders = new Headers();
		const processId = this.props.location.pathname.split("/")[2];
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+window.sessionStorage.accessToken);
		var myInit = { method: 'POST', mode: 'cors', body: json_data, headers: myHeaders }
		const self = this;
		fetch(Constants.restApiPath+'processes/', myInit).then(function(res){
			if(res.ok){
				dispatcher.dispatch({type: "PROCESS_CREATED"});
				res.json().then(function(res){
					const options = JSON.parse(json_data);
					//checks for all options that can be selected and creates the chosen phases
					switch(options.p_type){
						case Strings.processTypes.vertrieb: {self.postPhase(res, PhaseValues.vertrieb)}; break;
						case Strings.processTypes.zentrale: {self.postPhase(res, PhaseValues.zentrale)}; break;
						case Strings.processTypes.techniker: {self.postPhase(res, PhaseValues.techniker)}; break;
					}
					if (options.addAccounts) self.postPhase(res, PhaseValues.itKonten);
					if (options.car) self.postPhase(res, PhaseValues.auto);
					if (options.tablePhone) self.postPhase(res, PhaseValues.tablePhone);
					if (options.baumanager) self.postPhase(res, PhaseValues.baumanager);
					// HACK:
					self.postPhase(res, PhaseValues.basic, true); //default phase that is created for all processess
					alertify.success(Strings.newProcess.success);
				});
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
	 * @param  {boolean} last 		 if true, POST to /api/sendMail for all adresses in maillist
	 */
	postPhase(res, phaseValue, last){
		const json_data = JSON.stringify({
			name: phaseValue.name,
			process_id: res._id,
			status: phaseValue.status,
			r_nr:phaseValue.r_nr,
		})
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+window.sessionStorage.accessToken);
		var myInit = { method: 'POST', mode: 'cors', body: json_data, headers: myHeaders }
		var self = this;
		var p_id = res._id;
		var p_name = res.person_name
		fetch(Constants.restApiPath+'phases/', myInit).then(function(res){
		if(res.ok){
			dispatcher.dispatch({type: "PHASE_CREATED"});
			res.json().then(function(res){
				_.each(ItemValues, function(itemValue){
				 if(itemValue.phase==phaseValue.short){
					 self.mailList.push(itemValue.mail);
					 self.postItem(res, itemValue);
				 }
				})
				if (last) {
					_.each(_.uniq(self.mailList), function(mail){
						const json_data = JSON.stringify({
							adress: mail,
							subject: Strings.entryProcess+": "+p_name,
							body: Strings.emailBody+Strings.appPath+"/#/processPage/"+p_id
						});
						var myHeaders = new Headers();
						myHeaders.append("Content-Type", "application/json");
						myHeaders.append("Authorization", 'Bearer '+window.sessionStorage.accessToken);
						var myInit = { method: 'POST', headers: myHeaders, body: json_data }
						fetch(Constants.restApiPath+'sendMail', myInit).then(function(res){
							if(res.ok){
							}else{
								console.log(Strings.error.restApi);
								console.log(res);
							}
						});
					})
				}
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
		myHeaders.append("Authorization", 'Bearer '+window.sessionStorage.accessToken);
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
		const btnStyle = { width: '30%', marginBottom: "50px" };
		const dueDateStyle = { backgroundColor: '#ffffff' };
		const marginRight5Style = { marginRight: '5px', paddingBottom: '30px' }
		const marginRight15Style = { marginRight: '50px', paddingBottom: '30px' }
		const paddingLeft50Style = { paddingLeft: '17%' }

		const { loga } = this.state;

		const ProcessesInDropdown = loga.map((item) => {
			if(true){
				return <ProcessInDropdown key={item.person_nr} {...item}/>;
			}
		});
		return(
			<div class="col-md-12">

				<h1 style={headlineStyle}>{Strings.newProcess.headline}</h1>

				<h2>{Strings.processList.search}</h2>
				<form class="form-horizontal">
				  <div class="form-group">
						<label class="col-sm-2 control-label">{Strings.personNr}</label>
						<div class="col-sm-4">
							<select class="form-control" value={this.state.person_nrToFill} onChange={this.handlePersonNrToFillChange}>
							{ProcessesInDropdown}
							</select>
						</div>

						<div class="col-sm-2">
							<button class="btn btn-default form-control" onClick={this.fillInputs}>Füllen</button>
						</div>
					</div>

				</form>

				<h2>{Strings.basicInfo}</h2>
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
			      		<Pikaday class="form-control" placeholder={Strings.dueDate} date={this.state.due_date} onDateChange ={this.handleDueDateChange}/>
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

				</form>

				<h2>{Strings.equipment}</h2>
				<form style={paddingLeft50Style} class="form-inline">

					<div class="form-group">
						<div class="checkbox">
			        <label style={marginRight5Style}>
		            <input id="carCheckbox" type='checkbox' value={this.state.addAccounts} onChange={this.handleAddAccountsChange}></input>
			        </label>
			      </div>
						<label style={marginRight15Style} class="control-label">{Strings.adito}</label>
				  </div>

					<div class="form-group">
						<div class="checkbox">
			        <label style={marginRight5Style}>
		            <input id="addAccountsCheckbox" type='checkbox' value={this.state.car} onChange={this.handleCarChange}></input>
			        </label>
			    	</div>
						<label style={marginRight15Style} class="control-label">{Strings.companyCar}</label>
				  </div>

					<div class="form-group">
						<div class="checkbox">
			        <label style={marginRight5Style}>
		            <input id="addAccountsCheckbox" type='checkbox' value={this.state.tablePhone} onChange={this.handleTablePhoneChange}></input>
			        </label>
			      </div>
						<label style={marginRight15Style} class="control-label">{Strings.tablePhone}</label>
				  </div>

					<div class="form-group">
						<div class="checkbox">
			        <label style={marginRight5Style}>
		            <input id="addAccountsCheckbox" type='checkbox' value={this.state.baumanager} onChange={this.handleBaumanagerChange}></input>
			        </label>
			      </div>
						<label style={marginRight15Style} class="control-label">{Strings.baumanager}</label>
				  </div>

				</form>

				<h2>{Strings.finish}</h2>
				<form class="form-horizontal">

				  <div class="form-group">
				    <div class="col-sm-offset-2 col-sm-10">
				      <a 	style={btnStyle} class="btn btn-primary"
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
									this.state.addAccounts,
									this.state.tablePhone,
									this.state.baumanager)}>
									<span class="glyphicon glyphicon-plus pull-left"></span>
									{Strings.completeProcess}
							</a>
				    </div>
				  </div>

				</form>
			</div>
		);
	}
}
