import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import PhaseList from "./PhaseList";

export default class Layout extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			title: "Welcome"
		}
	}

	changeTitle(title){
		this.setState({title});
	}

	render(){
		return(
			<div>
				<Header></Header>
				{this.props.children}
				<Footer />			
			</div>
		);
	}
}