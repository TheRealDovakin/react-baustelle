import React from "react";

import PhaseList from "../components/PhaseList";

export default class ProcessView extends React.Component{

	constructor(props){
		super(props);
		console.log(this.props.location.pathname);
	}
	
	render(){
	
		return(
			<PhaseList/>
		);
	}
}