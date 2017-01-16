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
		const aStyle = {
			marginRight: '15px',
			fontSize: '15pt',
			color: 'white',
		}

		const linkStyle = {
			color: 'white',
		}

		const footerStyle = {
			width: '100%',
			bottom: 0,
			position: 'fixed',
			backgroundColor: 'black',
			opacity: '0.5',
		}
		// react default render function
		return(
			<footer style={footerStyle}>
				<div class="pull-left">
					<a style={linkStyle} target="_blank" href={Constants.githubPath}>{'\u00A9'} 2017 Kasper Nadrajkowski</a>
				</div>
				<div class="pull-right">
					<a style={aStyle} href='/' >
					<span class="glyphicon glyphicon-home"></span>
					_{Strings.footer.home}</a>
					<a style={aStyle} href="#/info">
					<span class="glyphicon glyphicon-info-sign"></span>
					_{Strings.info}</a>
					<a style={aStyle} href={"mailto:"+Constants.myMail}>
					<span class="glyphicon glyphicon-envelope"></span>
					_{Strings.footer.contact}</a>
				</div>
			</footer>
		);
	}
}
