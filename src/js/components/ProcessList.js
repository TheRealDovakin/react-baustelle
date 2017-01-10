//js
import alertify from 'alertify.js';
import Constants from '../values/constants';
import ES6Promise from 'es6-promise';
import React from "react";
import "whatwg-fetch";

//css
import "../../css/spinner.css"

//own files
import dispatcher from "../dispatcher";
import Process from "./Process";
import ProcessStore from "../stores/ProcessStore";
import ProcessActions from "../actions/ProcessActions";
import Strings from '../values/strings_de';

/**
 * @author Kasper Nadrajkowski
 * this class represents a searchable List of all Processes
 */
export default class ProcessList extends React.Component{

	constructor(){
		//IE promise-support
		ES6Promise.polyfill();
		super();
		//binded functions
		this.fetchProcesses = this.fetchProcesses.bind(this);
		this.getProcesses = this.getProcesses.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.state = {
			items: undefined,
			search_filter: "",
		};
	}

	/**
	 * will be called before the component mounted,
	 * adds changelisteners for stores
	 */
	componentWillMount(){
		ProcessStore.on("change", this.getProcesses);
	}

	/**
	 * will be called before the component will unmount,
	 * removes changelisteners for stores
	 */
	componentWillUnmount(){
		ProcessStore.removeListener("change", this.getProcesses);
	}

	/**
	 * will be called after the component mounted
	 */
	componentDidMount(){
		this.fetchProcesses();
	}

	/**
	 * fetches all Processes from the DB and dispatches an action that updates
	 * its store
	 */
	fetchProcesses(){
		fetch(Constants.restApiPath+'processes').then(function(res){
			if(res.ok){
				res.json().then(function(res){
					dispatcher.dispatch({
						type: 	"FETCH_PROCESSES_FROM_API",
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
	 * updates the state with Processes from its Store
	 */
	getProcesses(){
		this.setState({
			search_filter: this.state.search_filter,
			items: ProcessStore.getAll(),
		});
	}

	/**
	 * handles changes of the search-bar and updates the state
	 */
	handleSearchChange(event){
		this.setState({
  		search_filter: event.target.value,
  		items: this.state.items,
  	});
  	this.forceUpdate();
	}

	render(){
		const panelElementStyle = { margin: '0%', width: '100%', };
		const searchBarStyle = { width: '100%' };
		const containerStyle = { overflow: 'auto' }
		const headlineStyle = { marginTop: 70 };
		const { items } = this.state;
		// makes sure data from DB is loaded, else render a loading spinner
		if(items!=undefined){
			//sorts Proesses by due_date
			items.sort(function(a, b){
			    var keyA = new Date(a.due_date).getTime(),
			        keyB = new Date(b.due_date).getTime();
			    if(keyA < keyB) return -1;
			    if(keyA > keyB) return 1;
			    return 0;
			});
			//sorts Processes by status
			items.sort(function(a, b){
			    var keyA = a.status,
			        keyB = b.status;
			    if(keyA < keyB) return -1;
			    if(keyA > keyB) return 1;
			    return 0;
			});
			// fills ItemComponents with Processes that match the search only
			const ItemComponents = items.map((item) => {
				var a = 0;
				if(item.person_name.toUpperCase().indexOf(this.state.search_filter.toUpperCase())!==-1){
					return <Process key={item._id} {...item}/>;
				}
			});
			return(
				<div>
					<h1 style={headlineStyle}>{Strings.processList.headline}</h1>
					<div class="col-xs-12 col-md-3 row">
						<div class="panel panel-default">
							<div class="panel-heading"><h4>{Strings.info}</h4></div>
							<ul class="list-group">
								<li class="list-group-item"><span>Some Info</span></li>
							</ul>
							<div class="panel-heading"><h4>{Strings.process.actions}</h4></div>
							<ul class="list-group">
								<li><a class="btn btn-primary" style={panelElementStyle} href="#/newProcess">{Strings.processList.createNewProcess}</a></li>
							</ul>
							<div class="panel-heading"><h4>{Strings.processList.filter}</h4></div>
							<ul class="list-group">
								<li>
									<form>
									  <div class="form-group">
									    <label>{Strings.processList.search}</label>
									    <input class="form-control"  style={panelElementStyle} placeholder={Strings.processList.searchString} onChange={this.handleSearchChange}></input>
									  </div>
									</form>
									<div class="checkbox">
										<label>
											<input type="checkbox"></input> Some Filter 1
										</label>
									</div>
									<div class="checkbox">
										<label>
											<input type="checkbox"></input> Some Filter 2
										</label>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="col-xs-12 col-md-9" style={containerStyle}>
						<table class="table table-hover table-striped table-bordered">
						<tbody>
								<tr>
									<th><h4>{Strings.name}</h4></th>
									<th><h4>{Strings.status}</h4></th>
									<th><h4>{Strings.dueDate}</h4></th>
									<th><h4>{Strings.type}</h4></th>
								</tr>
							 	{ItemComponents}
							</tbody>
					 	</table>
					</div>
				</div>
			);
		}else{// spinner
			return(
				<div class="cssload-container">
					<div class="cssload-speeding-wheel"></div>
				</div>
			)
		}
	}
}
