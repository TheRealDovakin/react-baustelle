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
	constructor(){
		super();
		this.logout = this.logout.bind(this);
	}

	logout(){
		window.sessionStorage.accessToken = undefined;
		window.sessionStorage.displayName = '';
		document.location.href = '/';
	}
	render(){
		const margin={marginRight: 10}
		var loginString = 'nicht angemeldet';
		if(window.sessionStorage.displayName  !== undefined && window.sessionStorage.displayName != ''){
			loginString = 'Angemeldet als: '+window.sessionStorage.displayName;
		}
		return(
			<div>
				<nav class="navbar navbar-default navbar-fixed-top">
				    <div>
				      <ul class="nav navbar-nav">
				      	<a style={margin} class="navbar-brand" href="#">Kieback & Peter</a>
				      </ul>
							<button style={margin} onClick={this.logout} class="btn btn-default navbar-btn navbar-right">Logout</button>
							<button class="btn btn-default navbar-btn navbar-right">{loginString}</button>
				    </div>
				</nav>
			</div>
		);
	}
}
