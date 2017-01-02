import React from "react";
import { Link } from "react-router";

import Title from "./Header/Title";

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
