import React from "react";
import { Link } from "react-router";

import Title from "./Header/Title";

export default class Header extends React.Component{
	render(){
		return(
			<div>
				<nav class="navbar navbar-default navbar-static-top">
				    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				      <ul class="nav navbar-nav">
				      	<a class="navbar-brand" href="#">Brand</a>
				        <li><Link to="items" activeClassName=" active">Items</Link></li>
						<li><Link to="places" activeClassName="active">Places</Link></li>
				      </ul>
				    </div>
				</nav>
			</div>
		);
	}
}