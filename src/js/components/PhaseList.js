import React from "react";

import Phase from "./Phase";
import PhaseStore from "../stores/PhaseStore"

export default class PhaseList extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			items: PhaseStore.getAll(),
		};
	}

	render(){

		const { items } = this.state;

		const processId = 1;

		const phaseListStyle = {
			backgroundColor: '#6A98AA',
		};

		items.sort(function(a, b){
		    var keyA = a.r_nr,
		        keyB = b.r_nr;
		    if(keyA < keyB) return -1;
		    if(keyA > keyB) return 1;
		    return 0;
		});
		
		const ItemComponents = items.map((item) => {
			if(item.process_id==processId){
				return <Phase key={item.id} {...item}/>;
			}
			
		});

		return(
			
			<div>
				<div class="col-md-12">
					<h2>Liste aller Phasen eines Eintritts-/ Austrittsprozesses</h2>
				</div>
				<div> {ItemComponents} </div>
			</div>
		);
	}
}