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

		const btnStyle = {
			marginTop: 15,
			marginBottom: 15,
		}

		const containerStyle = {
			minHeight: 600,
		}

		const { items } = this.state;

		if(items!=undefined){

			items.sort(function(a, b){
			    var keyA = new Date(a.due_date).getTime(),
			        keyB = new Date(b.due_date).getTime();
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
				var a = 0;
				if(item.person_name.toUpperCase().indexOf(this.state.search_filter.toUpperCase())!==-1){
					return <Process key={item._id} {...item}/>;
				}
			});

			console.log(ItemComponents.length);

			return(
				<div>
					<div class="col-md-12">
						{/* HACK: space for fixed-header-class */}
						<h1> .  </h1>
						<h2>Liste aller laufenden und abgeschlossenen Eintritts- und Austrittsprozesse</h2>
					</div>
					<div class="row">
						<div class="col-xs-12 col-md-4">
							<a class="btn btn-info btn-lg" style={btnStyle} href="#/newProcess">neuen Prozess anlegen</a>
							<form>
							  <div class="form-group">
							    <label>Suche</label>
							    <input class="form-control"  placeholder="Suchbegriff" onChange={this.handleSearchChange}></input>
							  </div>
							</form>
						</div>
						<div class="col-xs-12 col-md-8 pre-scrollable" style={containerStyle}> {ItemComponents} </div>
					</div>
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
