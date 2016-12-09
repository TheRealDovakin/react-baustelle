import React from "react";

import Phase from "./Phase";
import PhaseStore from "../stores/PhaseStore"

export default class Footer extends React.Component{

	constructor(){
		super();
		this.state = {
			items: PhaseStore.getAll(),
		};
	}

	render(){

		const { items } = this.state;

		items.sort(function(a, b){
		    var keyA = a.r_nr,
		        keyB = b.r_nr;
		    // Compare the 2 dates
		    if(keyA < keyB) return -1;
		    if(keyA > keyB) return 1;
		    return 0;
		});
		
		const ItemComponents = items.map((item) => {
			return <Phase key={item.id} {...item}/>;
		});



		return(
			<div> {ItemComponents} </div>
		);
	}
}