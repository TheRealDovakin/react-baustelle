//js
import { Link } from "react-router";
import React from "react";

//own files
import Title from "./Header/Title";

/**
 * @author Kasper Nadrajkowski
 * this class represents a simple header
 */
export default class Header extends React.Component{
	render(){
		return(
			<div>
				<nav class="navbar navbar-default navbar-fixed-top">
				    <div>
				      <ul class="nav navbar-nav">
				      	<a class="navbar-brand" href="#">Kieback & Peter</a>
				      </ul>
				    </div>
				</nav>
			</div>
		);
	}
}
