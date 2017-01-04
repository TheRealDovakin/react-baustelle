//js
import { Link } from "react-router";
import React from "react";

//own files
import Title from "./Header/Title";


export default
/**
 * @author Kasper Nadrajkowski
 * this class represents a simple header
 */
class Header extends React.Component{
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
