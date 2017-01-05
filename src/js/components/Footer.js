//js
import alertify from 'alertify.js';
import React from "react";

//own files
import Constants from '../values/constants';
import Strings from '../values/strings_de';

/**
 * @author Kasper Nadrajkowski
 * this class represents a simple footer
 */
export default class Footer extends React.Component{
	render(){
		// inline styling
		// react default render function
		return(
			//TODO: footer overlaps alertify-alerts
			<nav class="navbar navbar-default navbar-fixed-bottom">
				<ul class="nav navbar-nav">
					<li>
						<a target="_blank" href={Constants.githubPath}>{'\u00A9'} 2017 Kasper Nadrajkowski</a>
					</li>
				</ul>
				<ul class="nav navbar-nav pull-right">
					<li><a class="navbar-brand" href='#' >{Strings.footer.home}</a></li>
					<li><a class="navbar-brand" href="#/info">{Strings.info}</a></li>
					<li><a class="navbar-brand" href={"mailto:"+Constants.myMail}>{Strings.footer.contact}</a></li>
				</ul>
			</nav>
		);
	}
}
