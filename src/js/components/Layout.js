import React from "react";

import Content from "./Content";
import Header from "./Header";
import Footer from "./Footer";

export default class Layout extends React.Component{
	constructor(){
		super();
		this.state = {
			title: "Welcome"
		}
	}

	changeTitle(title){
		this.setState({title});
	}

	render(){
		const title = "Welcome Kasper"
		return(
			<div>
				<Header></Header>
				{this.props.children}
				<Content
					changeTitle={this.changeTitle.bind(this)}
				 	title={this.state.title}/>
				<Footer />			
			</div>
		);
	}
}