//js
import React from "react";
import { withRouter } from "react-router"
import "whatwg-fetch";

//cs
import "../../css/spinner.css"

//own files
import dispatcher from "../dispatcher";
import Phase from "./Phase";
import PhaseStore from "../stores/PhaseStore"

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
			items: undefined,
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
			var myInit = { method: 'DELETE' }
			fetch('http://172.22.23.6:3000/processes/'+processId, myInit).then(function(res){
				if(res.ok) document.location.href = '/';
				else{
					console.log('error in delete Process');
					console.log(res);
				}
			});
		}
	}

	fetchPhases(){
		fetch('http://172.22.23.6:3000/phases').then(function(res){
			if(res.ok){
				res.json().then(function(res){	
					dispatcher.dispatch({
						type: 	"FETCH_PHASES_FROM_API",
						res,
					});
				})
			}
			else{
				console.log('error in fetch Phases');
				console.log(res);
			}
		});
	}

	fetchProcess(){
		const processId = this.props.location.pathname.split("/")[2];
		var self = this;
		fetch('http://172.22.23.6:3000/processes/'+processId).then(function(res){
			if(res.ok){
				res.json().then(function(res){	
					self.setProcess(res);
				})
			}
			else{
				console.log('error in fetch Process');
				console.log(res);
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

	initProcesses(){
		console.log('init')
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
		if(items!=undefined){
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
		}else{
			return(
				<div class="cssload-container">
					<div class="cssload-speeding-wheel"></div>
				</div>
			)
		}
	}
}