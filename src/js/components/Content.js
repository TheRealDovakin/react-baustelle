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
		const ItemComponents = items.map((item) => {
			return <Phase key={item.id} {...item}/>;
		});

		return(
			<div> {ItemComponents} </div>
		);
	}
}