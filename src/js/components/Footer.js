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
		const footerStyle = { backgroundColor: '#dddddd',	}
		const spanStyle = { margin: 5, }
		// react default render function
		return(
			<footer class="footer" style={footerStyle}>
				<div class="col-md-4" style={footerStyle}>
					<a target="_blank" href={Constants.githubPath}>{'\u00A9'} 2017 Kasper Nadrajkowski</a>
				</div>
				<div class="col-md-8" style={footerStyle}>
					<a href='#' style={spanStyle}>Home</a>
					<a onClick={ () => function(){ alertify.log('Info')}} style={spanStyle}>Info</a>
					<a href={'mailto:'+Constants.myMail} style={spanStyle}>Contact</a>
				</div>
			</footer>
		);
	}
}
