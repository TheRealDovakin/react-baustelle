import React from "react";
import $ from "jquery";

import dispatcher from "../dispatcher";
import Phase from "./Phase";
import PhaseStore from "../stores/PhaseStore"
import { withRouter } from "react-router"

export default class PhaseList extends React.Component{

	constructor(){
		super();
		this.getPhases = this.getPhases.bind(this);
		this.state = {
			items: PhaseStore.getAll(),
		};
	}

	componentWillMount(){
		PhaseStore.on("change", this.getPhases);
	}

	componentWillUnmount(){
		PhaseStore.removeListener("change", this.getPhases);
	}

	componentDidMount(){
		$.ajax({
			url: 'http://172.22.23.6:3000/phases',
			type: "GET",
			contentType: 'application/json',
			dataType: "json",
			success: function(res){
				dispatcher.dispatch({
					type: 	"FETCH_PHASES_FROM_API",
					res,
				});
			}
		});
	}

	getPhases(){
		this.setState({
			items: PhaseStore.getAll(),
		});
	}

	render(){

		const { items } = this.state;

		const processId = this.props.location.pathname.split("/")[2];

		items.sort(function(a, b){
			console.log("sort");
		    var keyA = a.r_nr,
		        keyB = b.r_nr;
		    if(keyA < keyB) return -1;
		    if(keyA > keyB) return 1;
		    return 0;
		});
		
		const ItemComponents = items.map((item) => {
			if(item.process_id==processId){
				return <Phase key={item._id} {...item}/>;
			}
			
		});

		return(
			
			<div>
				<div class="col-md-12">
					<h2>Liste aller Phasen eines Eintritts-/ Austrittsprozesses</h2>
				</div>
				<div> {ItemComponents} </div>
			</div>
		);
	}
}