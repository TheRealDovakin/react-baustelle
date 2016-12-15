import React from "react";

import Process from "./Process";
import ProcessStore from "../stores/ProcessStore"

export default class ProcessList extends React.Component{

	constructor(){
		super();
		this.getProcesses = this.getProcesses.bind(this);
		this.state = {
			items: ProcessStore.getAll(),
		};
	}

	componentWillMount(){
		ProcessStore.on("change", this.getProcesses);
	}

	componentWillUnmount(){
		ProcessStore.removeListener("change", this.getProcesses);
	}

	getProcesses(){
		this.setState({
			items: ProcessStore.getAll(),
		});
	}

	render(){

		const btnStyle={
			margin: 15,
		}

		const { items } = this.state;

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
			return <Process key={item.id} {...item}/>;
		});



		return(
			<div>
				<div class="col-md-12">
					<h2>Liste aller laufenden und abgeschlossenen Eintritts- und Austrittsprozesse</h2>
				</div>
				<div class="" >
					<a class="btn btn-info btn-lg" style={btnStyle} href="#/newProcess">neuen Prozess anlegen</a>
				</div>
				<div class="col-md-12"> {ItemComponents} </div>
			</div>
		);
	}
}