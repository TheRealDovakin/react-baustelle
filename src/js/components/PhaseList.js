import React from "react";
import $ from "jquery";

import dispatcher from "../dispatcher";
import Phase from "./Phase";
import PhaseStore from "../stores/PhaseStore"
import { withRouter } from "react-router"

export default class PhaseList extends React.Component{

	constructor(){
		super();
		this.delete = this.delete.bind(this);
		this.getPhases = this.getPhases.bind(this);
		this.setProcess = this.setProcess.bind(this);
		this.fetchPhases = this.fetchPhases.bind(this);
		this.fetchProcess = this.fetchProcess.bind(this);
		this.initProcesses = this.initProcesses.bind(this);
		this.state = {
			items: [],
			process: undefined,
		};
	}

	componentWillMount(){
		PhaseStore.on("change", this.getPhases);
	}

	componentWillUnmount(){
		PhaseStore.removeListener("change", this.getPhases);
	}

	componentDidMount(){
		this.fetchPhases();
		this.fetchProcess();
		this.setProcess();
	}

	delete(){
		//TODO: replace confirm with custom dialog
		if(confirm("Wenn Sie auf OK drücken wird dieser Process aus der Datenbank gelöscht")){
			const processId = this.props.location.pathname.split("/")[2];
			$.ajax({
			url: 'http://172.22.23.6:3000/processes/'+processId,
			type: "DELETE",
			context: this,
			contentType: 'application/json',
			dataType: "json",
			success: function(res){
				document.location.href = '/';
			}
		});
		}
	}

	fetchPhases(){
		$.ajax({
			url: 'http://172.22.23.6:3000/phases',
			type: "GET",
			contentType: 'application/json',
			dataType: "json",
			success: function(res){
				dispatcher.dispatch({
					type: 	"FETCH_PHASES_FROM_API",
					res,
				});
			}
		});
	}

	getPhases(){
		const process = this.state.process;
		this.setState({
			items: PhaseStore.getAll(),
			process: process,
		});
	}

	fetchProcess(){
		const processId = this.props.location.pathname.split("/")[2];
		$.ajax({
			url: 'http://172.22.23.6:3000/processes/'+processId,
			type: "GET",
			context: this,
			contentType: 'application/json',
			dataType: "json",
			success: function(res){
				this.setProcess(res);
			}
		});
	}

	initProcesses(){
		const processId = this.props.location.pathname.split("/")[2];
		console.log(processId);

		var json_data = JSON.stringify({
			name: "Neue Phase",
			process_id: processId, 
			status: 1,
			r_nr: 1,
		});
		$.ajax({
			url: 'http://172.22.23.6:3000/phases/',
			type: "POST",
			contentType: "application/json",
			data: json_data,
			success: function(res){
				console.log("phase created");
				dispatcher.dispatch({
					type: 	"PHASE_CREATED",
					res,
				})
			},
			error: function(res){
				console.log(res);
				//needs to be reaplaced
				alert("Die Eingabe war nicht vollständig oder korrekt");
			}
		});

	}

	setProcess(res){
		const items = this.state.items;
		this.setState({
			items: items,
			process: res,
		});
	}

	render(){

		const { items } = this.state;
		var process;

		if(this.state.process != undefined){
			process = this.state.process;
		}else{
			process = {
				person_name: "Babo",
			}
		}

		items.sort(function(a, b){
		    var keyA = a.r_nr,
		        keyB = b.r_nr;
		    if(keyA < keyB) return -1;
		    if(keyA > keyB) return 1;
		    return 0;
		});
		
		const processId = this.props.location.pathname.split("/")[2];
		const ItemComponents = items.map((item) => {
			if(item.process_id==processId){
				return <Phase key={item._id} {...item}/>;
			}
			
		});

		return(
			
			<div>
				<div class="col-md-12">
					<h2>{process.person_name}</h2>
					<a class="btn btn-default" 
					onClick={() => this.initProcesses()}>Initialise</a>
				</div>
				<div> {ItemComponents} </div>
				<div class="col-md-12">
					<a class="btn btn-danger" onClick={() => this.delete()}>Prozess löschen</a>
				</div>
			</div>
		);
	}
}