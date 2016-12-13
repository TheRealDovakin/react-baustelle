import React from "react";

import PhaseList from "../components/PhaseList";

export default class ProcessView extends React.Component{

	constructor(props){
		super(props);
	}
	
	render(){
		return(
			<PhaseList/>
		);
	}
}