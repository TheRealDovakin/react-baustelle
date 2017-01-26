//js
import React from "react";
//own files
/**
 * @author Kasper Nadrajkowski
 *
 */
export default class PhaseSmall extends React.Component{

	constructor(){
		super();
		this.scrollTo = this.scrollTo.bind(this);
	}

	scrollTo(id){
		document.getElementById(id).scrollIntoView();
	}
	render(){

		const btnStyle = { width: '100%', borderStyle: 'solid', borderWidth: '1px 1px 0px 1px', borderColor: '#ffffff' };
    const { _id, status, name, r_nr } = this.props;
		var phaseStatus = 'btn-warning';
		if (status==2) phaseStatus = 'btn-success';
    return(
			<div>
				<button style={btnStyle} class={"btn "+phaseStatus} onClick={() => this.scrollTo(_id)}>{name}</button>
				<br/>
			</div>
    );
  }
}
