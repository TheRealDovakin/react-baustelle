//js
import React from "react";

//own files
import Header from "./Header";
import Footer from "./Footer";
import PhaseList from "./PhaseList";

/**
 * @author Kasper Nadrajkowski
 * this class represents the overall layout of the application
 */
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
