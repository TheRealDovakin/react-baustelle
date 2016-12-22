import React from "react";
import "whatwg-fetch";

import dispatcher from "../dispatcher";
import Process from "./Process";
import ProcessStore from "../stores/ProcessStore";
import ProcessActions from "../actions/ProcessActions";

export default class ProcessList extends React.Component{

	constructor(){
		super();
		this.fetchProcesses = this.fetchProcesses.bind(this);
		this.getProcesses = this.getProcesses.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.state = {
			items: undefined,
			search_filter: "",
		};
	}

	componentWillMount(){
		ProcessStore.on("change", this.getProcesses);
	}

	componentWillUnmount(){
		ProcessStore.removeListener("change", this.getProcesses);
	}

	componentDidMount(){
		this.fetchProcesses();
	}

	fetchProcesses(){
		fetch('http://172.22.23.6:3000/processes').then(function(res){
			if(res.ok){
				res.json().then(function(res){	
					dispatcher.dispatch({
						type: 	"FETCH_PROCESSES_FROM_API",
						res,
					});
				})
			}
			else{
				console.log('error');
			}
		});
	}

	getProcesses(){
		this.setState({
			items: ProcessStore.getAll(),
		});
	}

	handleSearchChange(event){
		this.setState({
    		search_filter: event.target.value,
    		items: this.state.items,
    	});
    	this.forceUpdate();
	}

	render(){

		const btnStyle={
			margin: 15,
		}

		const { items } = this.state;

		if(items!=undefined){
	
			items.sort(function(a, b){
			    var keyA = a.due_date,
			        keyB = b.due_date;
			    if(keyA < keyB) return -1;
			    if(keyA > keyB) return 1;
			    return 0;
			});

			items.sort(function(a, b){
			    var keyA = a.status,
			        keyB = b.status;
			    if(keyA < keyB) return -1;
			    if(keyA > keyB) return 1;
			    return 0;
			});
			
			
			const ItemComponents = items.map((item) => {
				if(item.person_name.toUpperCase().indexOf(this.state.search_filter.toUpperCase())!==-1){
					return <Process key={item._id} {...item}/>;
				}
			});

			return(
				<div>
					<div class="col-md-12">
						<h2>Liste aller laufenden und abgeschlossenen Eintritts- und Austrittsprozesse</h2>
					</div>
					<div class="" >
						<a class="btn btn-info btn-lg" style={btnStyle} href="#/newProcess">neuen Prozess anlegen</a>
					</div>
					<form>
					  <div class="form-group">
					    <label>Suche</label>
					    <input class="form-control"  placeholder="Suchbegriff" onChange={this.handleSearchChange}></input>
					  </div>
					</form>
					<div class="col-md-12"> {ItemComponents} </div>
				</div>
			);
		}else{
			return(
				<div class="cssload-container">
					<div class="cssload-speeding-wheel"></div>
				</div>
			)
		}
	}
}