//js
import alertify from 'alertify.js';
import Constants from '../values/constants';
import ES6Promise from 'es6-promise';
import React from "react";
import { withRouter } from "react-router"
import _ from "underscore";
import "whatwg-fetch";
//cs
import "../../css/spinner.css"
//own files
import CommentStore from '../stores/CommentStore';
import DateUtils from '../utils/DateUtils';
import dispatcher from "../dispatcher";
import ItemsStore from "../stores/ItemsStore"
import Phase from "../components/Phase";
import PhaseStore from "../stores/PhaseStore"
import Strings from '../values/strings_de';


/**
 * @author Kasper Nadrajkowski
 * this class represents a list of Phases for a Process
 */
 export default class ProcessPage extends React.Component{
	constructor(){
    //IE promise-support
    ES6Promise.polyfill();
		super();
		dispatcher.register(this.handleActions.bind(this));
		// binded functions
		this.deleteComments = this.deleteComments.bind(this);
		this.deleteItems = this.deleteItems.bind(this);
		this.deletePhases = this.deletePhases.bind(this);
		this.deleteProcess = this.deleteProcess.bind(this);
		this.finishProcess = this.finishProcess.bind(this);
		this.fetchComments = this.fetchComments.bind(this);
		this.fetchItems = this.fetchItems.bind(this);
		this.fetchPhases = this.fetchPhases.bind(this);
		this.fetchProcess = this.fetchProcess.bind(this);
		this.getComments = this.getComments.bind(this);
		this.getItems = this.getItems.bind(this);
		this.getPhases = this.getPhases.bind(this);
		this.processCanBeFinished = this.processCanBeFinished.bind(this);
		this.setPhaseStatus = this.setPhaseStatus.bind(this);
		this.setProcess = this.setProcess.bind(this);
		this.setProcessStatus = this.setProcessStatus.bind(this);
		this.reDoProcess = this.reDoProcess
    //variables
    this.fetchCommentsInterval = undefined;
    this.fetchItemsInterval = undefined;
    this.fetchProcessesInterval = undefined;
		this.state = {
      comments: undefined,
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
    CommentStore.on("change", this.getComments);
		ItemsStore.on("change", this.getItems);
    PhaseStore.on("change", this.getPhases);
	}

	/**
	 * will be called before component will unmount
	 * removes changelisteners for stores
	 */
	componentWillUnmount(){
    CommentStore.removeListener("change", this.getComments);
		ItemsStore.removeListener("change", this.getItems);
    PhaseStore.removeListener("change", this.getPhases);
    clearInterval(this.fetchCommentsInterval);
    clearInterval(this.fetchItemsInterval);
    clearInterval(this.fetchProcessInterval);
	}

	/**
	 * will be called after component mounted
	 * call methods for fetching data from DB
	 */
	componentDidMount(){
    this.fetchComments();
		this.fetchItems();
		this.fetchPhases();
		this.fetchProcess();
		this.setProcess();
    this.fetchCommentsInterval = setInterval(this.fetchComments, 10000);
    this.fetchItemsInterval = setInterval(this.fetchItems, 30000);
    this.fetchProcessInterval = setInterval(this.fetchProcess, 60000);
	}

	/**
	 * this function deletes all Comments of an given Item
	 *  @param {String} phase_id			ID of the Item that the Comments will be deleted for
	 */
	deleteComments(item_id){
		const self = this;
		_.each(self.state.comments, function(comment){
			if(comment.item_id==item_id){
        console.log(comment.commentor);
				var myInit = { method: 'DELETE' }
				fetch(Constants.restApiPath+'comments/'+comment._id, myInit).then(function(res){
					if(res.ok) {}
					else{
						console.log(Strings.error.restApi);
						console.log(res.json());
					}
				});
			}
		});
	}
	/**
	 * this function deletes all Items of a given Phase
	 *  @param {String} phase_id			ID of the Phase that the Items will be deleted for
	 */
	deleteItems(phase_id){
		const self = this;
		_.each(self.state.items, function(item){
			if(item.phase_id==phase_id){
				var myInit = { method: 'DELETE' }
				fetch(Constants.restApiPath+'items/'+item._id, myInit).then(function(res){
					if(res.ok) { self.deleteComments(item._id); }
					else{
						console.log(Strings.error.restApi);
						console.log(res.json());
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
						console.log(Strings.error.restApi);
						console.log(res.json());
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
		alertify.error(Strings.process.confirmDelete,
		 function(ev){
			 ev.preventDefault();
				const processId = self.props.location.pathname.split("/")[2];
				self.deletePhases();
				var myInit = { method: 'DELETE' }
				fetch(Constants.restApiPath+'processes/'+processId, myInit).then(function(res){
					if(res.ok){
						document.location.href = '/';
					}else{
						console.log(Strings.error.restApi);
						console.log(res.json());
					}
				});
			});
	}

  fetchComments(){
		fetch(Constants.restApiPath+'comments').then(function(res){
			if(res.ok){
				res.json().then(function(res){
					dispatcher.dispatch({
						type: 	"FETCH_COMMENTS_FROM_API",
						res,
					});
				})
			}
			else{
				console.log(res);
				console.log(Strings.error.restApi);
			}
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
				console.log(Strings.error.restApi);
				console.log(res.json());
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
				console.log(Strings.error.restApi);
				console.log(res.json());
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
				console.log(Strings.error.restApi);
				console.log(res.json());
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
			alertify.error(Strings.process.error.finishProcess);
		}
	}

	/**
	 * updates the state with items from its store
	 */
  getComments(){ this.setState({ comments: CommentStore.getAll() }); }
	getItems(){ this.setState({	items: ItemsStore.getAll() }); }
	getPhases(){ this.setState({	phases: PhaseStore.getAll() }); }

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
        console.log(Strings.error.restApi);
				console.log(res.json());
			}
		});
	}

	/**
	 * updates the status of the current Process to not done
	 */
	reDoProcess(){
		this.setProcessStatus(1);
		alertify.success(Strings.process.reDoLog);
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

			var formatted_date = DateUtils.getDateAsString(process.due_date);
			// inline styling
			const btnStyle = { margin: '0%', width: '100%', };
      const headlineStyle = { marginTop: 70 };
      const leftNavStyle = { top: '120px', left: '0px', position: 'fixed' }
			//dynamic styles
			var disableBtnFinish = 'disabled';
			var disableBtnReDo = '';
			var statusAsString = Strings.done;
			if(process.status==1) {
				disableBtnFinish = '';
				disableBtnReDo = 'disabled';
				statusAsString = Strings.running;
			}
			return(
				<div>
				<h1 style={headlineStyle}>{process.person_name}</h1>
					<div class="col-md-3 col-xs-3" style={leftNavStyle}>
						<div class="panel panel-default">
							<div class="panel-heading">
								<h4>
                  <span class="glyphicon glyphicon-info-sign pull-right"></span>
                  {Strings.info}
                </h4>
							</div>
							<ul class="list-group">
                <li class="list-group-item"><span>{Strings.status}:	{statusAsString}</span></li>
								<li class="list-group-item"><span>{Strings.name}:	{process.person_name}</span></li>
                <li class="list-group-item"><span>{Strings.personNr}: {process.person_nr}</span></li>
                <li class="list-group-item"><span>{Strings.short}: {process.short}</span></li>
                <li class="list-group-item"><span>{Strings.place}: {process.place}</span></li>
                <li class="list-group-item"><span>{Strings.department}: {process.department}</span></li>
                <li class="list-group-item"><span>{Strings.type}: {process.p_type}</span></li>
                <li class="list-group-item"><span>{Strings.job}: {process.job}</span></li>
							</ul>
							<div class="panel-heading">
								<h4>
                  <span class="glyphicon glyphicon-flash pull-right"></span>
                  {Strings.process.actions}
                </h4>
							</div>
							<ul class="list-group">
          			<a class={"btn btn-success "+(disableBtnFinish)} style={btnStyle}
          									onClick={() => this.finishProcess()}>
                            <span class="glyphicon glyphicon-ok pull-left"></span>
                            {Strings.process.finish}</a>
          			<a class={"btn btn-primary "+(disableBtnReDo)} style={btnStyle}
          									onClick={() => this.reDoProcess()}>
                            <span class="glyphicon glyphicon-retweet pull-left"></span>
                            {Strings.process.reDo}</a>
          			<a class="btn btn-danger" style={btnStyle}
          									onClick={() => this.deleteProcess()}>
                            <span class="glyphicon glyphicon-remove pull-left"></span>
                            {Strings.process.delete}</a>
							</ul>
						</div>
					</div>
					<div class="col-md-9 col-xs-9 pull-right">
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
