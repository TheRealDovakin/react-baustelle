import React from "react";

export default class Item extends React.Component{

	render(){
		const { name, place } = this.props;
		return(
			<div class="col-md-2">
				<h4>{name}</h4>
				<p>{place}</p>
				<a class="btn btn-info" href="#">More Info</a>
			</div>
		);
	}
}