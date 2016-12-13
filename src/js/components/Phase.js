import React from "react";

import Title from "./Header/Title";
import Item from "./Item";
import ItemsStore from "../stores/ItemsStore";
import * as ItemsActions from "../actions/ItemsActions";
import * as PhaseActions from "../actions/PhaseActions";


export default class Phase extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			items: ItemsStore.getAll(),
			progress: 0.0,
		};
	}

	handleChange(e){
		const title = e.target.value;
		this.props.changeTitle(title);
	}

	getProgress(){
		var max = 0;
		var sumDone = 0;
		const items =ItemsStore.getAll();
		const { id } = this.props;
		for (var index = 0; index < items.length; index++) {
			var item = items[index];
    		if(item.phase_id==id){
    			max += 1;
    			if(item.status==1||item.status==2){
    				sumDone += 1;
    			}	
			}
		}
		return Math.round((100/max)*sumDone);
	}

	componentWillMount(){
		ItemsStore.on("change", () => {
			this.setState({
				items: ItemsStore.getAll(),
				progess: this.getProgress(),
			});
		});
	}

	createItem(){
		ItemsActions.createItem(2, 3, "Neue Aufgabe", "Flo H", "Emil S", false);
	}

	render(){

		const { id, status, name, r_nr } = this.props;
		const { items } = this.state;
		var progress = this.getProgress();
		const ItemComponents = items.map((item) => {
			if(item.phase_id==id){
				return <Item key={item.id} {...item}/>;
			}
		});

		const progressStyle = {
			width: progress+'%',
		};

		return(
			<div class="col-md-12 panel panel-info">
				<Title title={this.props.title} />
				<div class="panel-heading"><h2>{name}</h2></div>	
				<div> {ItemComponents} </div>
				<h3><span class="">Fortschitt</span></h3>
				<div class="progress">
				  <div class="progress-bar progress-bar-success" role="progressbar" style={progressStyle}>
				    {progress} %
				  </div>
				</div>
			</div>
		);
	}
}