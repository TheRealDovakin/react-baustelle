//js
import alertify from 'alertify.js';
import Constants from '../values/constants';
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
		const btnStyle = { marginTop: 15, marginBottom: 15, width: '55%' }
		const searchBarStyle = { width: '55%' };
		const containerStyle = { minHeight: 700 }
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
					<div class="col-md-12">
						<h1 style={headlineStyle}>{Strings.processList.headline}</h1>
					</div>
					<div class="row">
						<div class="col-xs-12 col-md-4">
							<a class="btn btn-info" style={btnStyle} href="#/newProcess">{Strings.processList.createNewProcess}</a>
							<form>
							  <div class="form-group">
							    <label>{Strings.processList.search}</label>
							    <input class="form-control"  style={searchBarStyle} placeholder={Strings.processList.searchString} onChange={this.handleSearchChange}></input>
							  </div>
							</form>
						</div>
						<div class="col-xs-12 col-md-8 pre-scrollable" style={containerStyle}>
							<table class="table table-hover table-striped table-bordered">
							<tbody>
									<tr>
										<th>{Strings.name}</th>
										<th>{Strings.status}</th>
										<th>{Strings.dueDate}</th>
										<th>{Strings.type}</th>
									</tr>
								 	{ItemComponents}
								</tbody>
						 	</table>
						</div>
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
