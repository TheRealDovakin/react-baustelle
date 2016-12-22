//js
import React from "react";
import _ from "underscore";
import { withRouter } from "react-router"
import "whatwg-fetch";

//cs
import "../../css/spinner.css"

//own files
import dispatcher from "../dispatcher";
import ItemsStore from "../stores/ItemsStore"
import Phase from "./Phase";
import PhaseStore from "../stores/PhaseStore"

export default class PhaseList extends React.Component{

	constructor(){
		super();
		this.deleteItems = this.deleteItems.bind(this);
		this.deletePhases = this.deletePhases.bind(this);
		this.deleteProcess = this.deleteProcess.bind(this);
		this.fetchItems = this.fetchItems.bind(this);
		this.fetchPhases = this.fetchPhases.bind(this);
		this.fetchProcess = this.fetchProcess.bind(this);
		this.getItems = this.getItems.bind(this);
		this.getPhases = this.getPhases.bind(this);
		this.setProcess = this.setProcess.bind(this);
		this.state = {
			items: undefined,
			phases: undefined,
			process: undefined,
		};
	}

	componentWillMount(){
		ItemsStore.on("change", this.getItems);
		PhaseStore.on("change", this.getPhases);
	}

	componentWillUnmount(){
		ItemsStore.removeListener("change", this.getItems);
		PhaseStore.removeListener("change", this.getPhases);
	}

	componentDidMount(){
		this.fetchItems();
		this.fetchPhases();
		this.fetchProcess();
		this.setProcess();
	}

	deleteProcess(){
		//TODO: replace confirm with custom dialog
		if(confirm("Wenn Sie auf OK drücken wird dieser Process aus der Datenbank gelöscht")){
			const processId = this.props.location.pathname.split("/")[2];
			this.deletePhases();
			var myInit = { method: 'DELETE' }
			fetch('http://172.22.23.6:3000/processes/'+processId, myInit).then(function(res){
				if(res.ok){
					document.location.href = '/';
					
				}else{
					console.log('error in delete Process');
					console.log(res);
				}
			});
		}
	}

	deleteItems(phase_id){
		const self = this;
		_.each(self.state.items, function(item){
			if(item.phase_id==phase_id){
				var myInit = { method: 'DELETE' }
				fetch('http://172.22.23.6:3000/items/'+item._id, myInit).then(function(res){
					if(res.ok) {}
					else{
						console.log('error in delete Process');
						console.log(res);
					}
				});
			}
		});
	}

	deletePhases(){
		const self = this;
		_.each(self.state.phases, function(phase){
			if(phase.process_id==self.state.process._id){
				self.deleteItems(phase._id);
				var myInit = { method: 'DELETE' }
				fetch('http://172.22.23.6:3000/phases/'+phase._id, myInit).then(function(res){
					if(res.ok){
						
					}
					else{
						console.log('error in delete Process');
						console.log(res);
					}
				});
			}
		});
	}

	fetchItems(){
		fetch('http://172.22.23.6:3000/items').then(function(res){
			if(res.ok){
				res.json().then(function(res){	
					dispatcher.dispatch({
						type: 	"FETCH_ITEMS_FROM_API",
						res,
					});
				})
			}
			else{
				console.log('error in fetch Items');
				console.log(res);
			}
		});
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

	getItems(){
		this.setState({
			items: ItemsStore.getAll(),
			phases: this.state.phases,
			process: this.state.process,
		});
	}

	getPhases(){
		this.setState({
			items: this.state.items,
			phases: PhaseStore.getAll(),
			process: this.state.process,
		});
	}

	setProcess(res){
		this.setState({
			items: this.state.items,
			phases: this.state.phases,
			process: res,
		});
	}

	render(){
		const { phases } = this.state;
		if(phases!=undefined){
			var process;
			if(this.state.process != undefined){
				process = this.state.process;
			}else{
				process = {
					person_name: "Babo",
				}
			}

			phases.sort(function(a, b){
			    var keyA = a.r_nr,
			        keyB = b.r_nr;
			    if(keyA < keyB) return -1;
			    if(keyA > keyB) return 1;
			    return 0;
			});

			const processId = this.props.location.pathname.split("/")[2];
			const ItemComponents = phases.map((item) => {
				if(item.process_id==processId){
					return <Phase key={item._id} {...item}/>;
				}
				
			});

			return(
				
				<div>
					<div class="col-md-12">
						<h2>{process.person_name}</h2>
						<button onClick={this.deletePhases}>JO</button>
					</div>
					<div> {ItemComponents} </div>
					<div class="col-md-12">
						<a class="btn btn-danger" onClick={() => this.deleteProcess()}>Prozess löschen</a>
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