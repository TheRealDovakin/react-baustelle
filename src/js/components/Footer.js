import React from "react";

export default class Footer extends React.Component{
	render(){

		const footerStyle = {
			backgroundColor: '#dddddd',
		}

		return(
			<footer class="footer" style={footerStyle}>
				<div class="container">
					<h4>Footer</h4>
				</div>
			</footer>
		);
	}
}
