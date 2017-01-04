//js
import alertify from 'alertify.js';
import Constants from '../values/constants';
import React from "react";
import "whatwg-fetch";
import { withRouter } from "react-router"
import _ from "underscore";
//cs
import "../../css/spinner.css"
//own files
import dispatcher from "../dispatcher";
import ItemsStore from "../stores/ItemsStore"
import Phase from "./Phase";
import PhaseStore from "../stores/PhaseStore"


/**
 * @author Kasper Nadrajkowski
 * this class represents a list of Phases for a Process
 */
 export default class PhaseList extends React.Component{
	constructor(){
		super();
		dispatcher.register(this.handleActions.bind(this));
		// binded functions
		this.deleteItems = this.deleteItems.bind(this);
		this.deletePhases = this.deletePhases.bind(this);
		this.deleteProcess = this.deleteProcess.bind(this);
		this.finishProcess = this.finishProcess.bind(this);
		this.fetchItems = this.fetchItems.bind(this);
		this.fetchPhases = this.fetchPhases.bind(this);
		this.fetchProcess = this.fetchProcess.bind(this);
		this.getItems = this.getItems.bind(this);
		this.getPhases = this.getPhases.bind(this);
		this.processCanBeFinished = this.processCanBeFinished.bind(this);
		this.setPhaseStatus = this.setPhaseStatus.bind(this);
		this.setProcess = this.setProcess.bind(this);
		this.setProcessStatus = this.setProcessStatus.bind(this);
		this.reDoProcess = this.reDoProcess
		this.state = {
			items: undefined,
			phases: undefined,
			process: undefined,
		};
	}

	/**
	 * will be called before component will mount
	 * adds change listeners for stores
	 */
	componentWillMount(){
		ItemsStore.on("change", this.getItems);
		PhaseStore.on("change", this.getPhases);
	}

	/**
	 * will be called before component will unmount
	 * removes changelisteners for stores
	 */
	componentWillUnmount(){
		ItemsStore.removeListener("change", this.getItems);
		PhaseStore.removeListener("change", this.getPhases);
	}

	/**
	 * will be called after component mounted
	 * call methods for fetching data from DB
	 */
	componentDidMount(){
		this.fetchItems();
		this.fetchPhases();
		this.fetchProcess();
		this.setProcess();
	}

	/**
	 * this function deletes all Items of a given Phase
	 *  @param {int} phase_id			ID of the Phase that the Items will be deleted for
	 */
	deleteItems(phase_id){
		const self = this;
		_.each(self.state.items, function(item){
			if(item.phase_id==phase_id){
				var myInit = { method: 'DELETE' }
				fetch(Constants.restApiPath+'items/'+item._id, myInit).then(function(res){
					if(res.ok) {}
					else{
						// HACK: replace hardcoded String
						console.log('error in delete Process');
						console.log(res);
					}
				});
			}
		});
	}

	/**
	 * deletes all Phases of the current process
	 */
	deletePhases(){
		const self = this;
		_.each(self.state.phases, function(phase){
			if(phase.process_id==self.state.process._id){
				self.deleteItems(phase._id);
				var myInit = { method: 'DELETE' }
				fetch(Constants.restApiPath+'phases/'+phase._id, myInit).then(function(res){
					if(res.ok){

					}
					else{
						// HACK: replace hardcoded String
						console.log('error in delete Process');
						console.log(res);
					}
				});
			}
		});
	}

	/**
	 * deletes the current process
	 */
	deleteProcess(){
		const self = this;
		// HACK: replace hardcoded String
		alertify.error("Klicken Sie Hier wenn Sie den Prozess wirklich löschen wollen.",
		 function(ev){
			 ev.preventDefault();
				const processId = self.props.location.pathname.split("/")[2];
				self.deletePhases();
				var myInit = { method: 'DELETE' }
				fetch(Constants.restApiPath+'processes/'+processId, myInit).then(function(res){
					if(res.ok){
						document.location.href = '/';
					}else{
						// HACK: replace hardcoded String
						console.log('error in delete Process');
						console.log(res);
					}
				});
			});
	}

	/**
	 * fetches Items from DB and dispatches an action that updates the store
	 */
	fetchItems(){
		fetch(Constants.restApiPath+'items').then(function(res){
			if(res.ok){
				res.json().then(function(res){
					dispatcher.dispatch({
						type: 	"FETCH_ITEMS_FROM_API",
						res,
					});
				})
			}
			else{
				// HACK: replace hardcoded String
				console.log('error in fetch Items');
				console.log(res);
			}
		});
	}

	/**
	 * fetches Phases from DB and dispatches an action that updates the store
	 */
	fetchPhases(){
		fetch(Constants.restApiPath+'phases').then(function(res){
			if(res.ok){
				res.json().then(function(res){
					dispatcher.dispatch({
						type: 	"FETCH_PHASES_FROM_API",
						res,
					});
				})
			}
			else{
				// HACK: replace hardcoded String
				console.log('error in fetch Phases');
				console.log(res);
			}
		});
	}

	/**
	 * fetches the current Process and updates the state
	 */
	fetchProcess(){
		const processId = this.props.location.pathname.split("/")[2];
		var self = this;
		fetch(Constants.restApiPath+'processes/'+processId).then(function(res){
			if(res.ok){
				res.json().then(function(res){
					self.setProcess(res);
				})
			}
			else{
				// HACK: replace hardcoded String
				console.log('error in fetch Process');
				console.log(res);
			}
		});
	}

	/**
	 * updates the status of the current Process to done
	 */
	finishProcess(){
		if(this.processCanBeFinished()){
			this.setProcessStatus(2);
		}else{
			// HACK: replace hardcoded String
			alertify.error('Prozess kann erst beendet werden wenn alle Aufgaben abgehackt sind');
		}
	}

	/**
	 * updates the state with Items from its store
	 */
	getItems(){
		this.setState({
			items: ItemsStore.getAll(),
			phases: this.state.phases,
			process: this.state.process,
		});
	}

	/**
	 * updates the state with Phases from its store
	 */
	getPhases(){
		this.setState({
			items: this.state.items,
			phases: PhaseStore.getAll(),
			process: this.state.process,
		});
	}

	/**
	 * handles dispatches
	 */
	handleActions(action){
		switch(action.type){
			case "ITEM_STATUS_CHANGED": {
			};break;
			case "PHASE_DONE": {
				this.setPhaseStatus(action.phase_id);
			};break;
		}
	}

	/**
	* checks if all Items for the current Process are done and returns a boolean
	 * @return {bolean}			true if all Items of Process are marked done
	 */
	processCanBeFinished(){
		const self = this;
		var can = true;
		const processId = this.props.location.pathname.split("/")[2];
		_.each(self.state.phases, function(phase){
			if(phase.process_id==processId){
				_.each(self.state.items, function(item){
					if(item.phase_id==phase._id){
						if(item.status==3)	can = false;
					}
				});
			}
		});
		return can;
	}

	/**
	 *
	 */
	setPhaseStatus(phase_id){
		console.log(phase_id);
	}

	/**
	* updates the state with the current Process
	 * @param {object} res			current Process
	 */
	setProcess(res){
		this.setState({
			items: this.state.items,
			phases: this.state.phases,
			process: res,
		});
	}

	/**
	* updates the status of the current Process to the value of a given status
	 * @param {int} status			status the Process will be changed to
	 */
	setProcessStatus(status){
		const processId = this.props.location.pathname.split("/")[2];
		var self = this;
		var json_data = JSON.stringify({
			status: status
		});
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		var myInit = { method: 'PUT', headers: myHeaders, body: json_data }
		fetch(Constants.restApiPath+'processes/'+processId, myInit).then(function(res){
			if(res.ok){
				if(status==2){
					document.location.href = '/';
				}else{
					self.fetchProcess();
					self.forceUpdate();
				}
			}else{
				console.log(res);
			}
		});
	}

	/**
	 * updates the status of the current Process to not done
	 */
	reDoProcess(){
		this.setProcessStatus(1);
		// HACK: replace hardcoded String
		alertify.success('Prozess wiederaufgenommen');
	}

	/**
	 * react default render-method
	 */
	render(){
		const { phases } = this.state;
		// react renders faster that DB can deliver,
		// renders a loading-spinner in else case
		if(phases!=undefined){
			var process;
			// simular here
			if(this.state.process != undefined){
				process = this.state.process;
			}else{
				process = {
					person_name: "Babo",
				}
			}

			// sorts Phases by r_nr
			phases.sort(function(a, b){
			    var keyA = a.r_nr,
			        keyB = b.r_nr;
			    if(keyA < keyB) return -1;
			    if(keyA > keyB) return 1;
			    return 0;
			});

			const processId = this.props.location.pathname.split("/")[2];
			// fills ItemComponents with Phases from this Process only
			const ItemComponents = phases.map((item) => {
				if(item.process_id==processId){
					return <Phase key={item._id} {...item}/>;
				}

			});

			// inline styling
			const containerStyle = { minHeight: 720, }
			const btnStyle = { margin: 5, width: '90%', }

			// converts date to readeble String
			var date = new Date(process.due_date);
			var day = date.getDate();
			var month = date.getMonth()+1;
			var year = date.getFullYear();
			var formatted_date = day+"."+month+"."+year;

			//dynamic styles
			var disableBtnFinish = 'disabled';
			var disableBtnReDo = '';
			var statusAsString = 'beendet';
			if(process.status==1) {
				disableBtnFinish='';
				disableBtnReDo='disabled';
				statusAsString='laufend';
			}
			return(
				<div>
				{/* HACK: space for fixed header */}
				<h1> .  </h1>
				<h1>{process.person_name}</h1>
					<div class="col-md-3 col-xs-12 row">
						<div class="panel panel-default">
							<div class="panel-heading">
								<h4>Info</h4>
							</div>
							<ul class="list-group">
								<li class="list-group-item"><span>Name:	{process.person_name}</span></li>
								<li class="list-group-item"><span>Status:	{statusAsString}</span></li>
								<li class="list-group-item"><span>Typ: {process.p_type}</span></li>
								<li class="list-group-item"><span>Deadline: {formatted_date}</span></li>
							</ul>
							<div class="panel-heading">
								<h4>Aktionen</h4>
							</div>
							<ul class="list-group">
								<li><a class={"btn btn-success "+(disableBtnFinish)} style={btnStyle}
									onClick={() => this.finishProcess()}>Prozess erfolreich beenden</a></li>
								<li><a class={"btn btn-info "+(disableBtnReDo)} style={btnStyle}
									onClick={() => this.reDoProcess()}>Prozess wiederaufnehmen</a></li>
								<li><a class="btn btn-danger" style={btnStyle}
									onClick={() => this.deleteProcess()}>Prozess löschen</a></li>
							</ul>
						</div>
					</div>
					<div class="col-xs-12 col-md-9 pre-scrollable" style={containerStyle} >
					{ItemComponents}
					</div>

				</div>
			);
		}else{ // loading spinner
			return(
				<div class="cssload-container">
					<div class="cssload-speeding-wheel"></div>
				</div>
			)
		}
	}
}
