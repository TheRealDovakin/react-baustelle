//js
import React from "react";

//own files
import Header from "./Header";
import Footer from "./Footer";

/**
 * @author Kasper Nadrajkowski
 * this class represents the overall layout of the application
 */
export default class Layout extends React.Component{
	render(){
		return(
			<div>
				<Header/>
				{this.props.children}
				<Footer/>
			</div>
		);
	}
}
