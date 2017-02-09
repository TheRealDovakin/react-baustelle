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

		const btnStyle = { width: '100%', borderStyle: 'solid', borderWidth: '2px 0px 0px 0px', borderColor: '#cccccc' };
    const { _id, status, name, r_nr } = this.props;
		var phaseStatus = (status==2) ? 'btn-success' : 'btn-warning';
    return(
			<div>
				<button style={btnStyle} class={"btn "+phaseStatus} onClick={() => this.scrollTo(_id)}>{name}</button>
				<br/>
			</div>
    );
  }
}
