//js
import alertify from 'alertify.js';
import React from "react";

//own files
import Constants from '../values/constants';

/**
 * @author Kasper Nadrajkowski
 * this class represents a simple footer
 */
export default class Footer extends React.Component{
	render(){
		// inline styling
		const spanStyle = { margin: 5 }
		const footerStyle = {
			backgroundColor: '#dddddd',
			bottom: 0,
			position: 'fixed',
			width: '100%'
		}
		// react default render function
		return(
			<footer class="footer" style={footerStyle}>
				<div class="col-md-4">
					<a target="_blank" href={Constants.githubPath}>{'\u00A9'} 2017 Kasper Nadrajkowski</a>
				</div>
				<div class="col-md-8">
					{/* TODO: replace hardcoded strings */}
					<h4 class="pull-right" style={spanStyle}><a href='#' >Home</a></h4>
					<h4 class="pull-right" style={spanStyle}><a href="#/info">Info</a></h4>
					<h4 class="pull-right" style={spanStyle}><a href={"mailto:"+Constants.myMail}>Contact</a></h4>
				</div>
			</footer>
		);
	}
}
