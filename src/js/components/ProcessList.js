import React from "react";

import Process from "./Process";
import ProcessStore from "../stores/ProcessStore"

export default class ProcessList extends React.Component{

	constructor(){
		super();
		this.state = {
			items: ProcessStore.getAll(),
		};
	}

	render(){

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
				<div> {ItemComponents} </div>
			</div>
		);
	}
}