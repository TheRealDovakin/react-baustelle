import React from "react";
import $ from "jquery";
import dispatcher from "../dispatcher";

import Title from "./Header/Title";
import Item from "./Item";
import ItemsStore from "../stores/ItemsStore";
import * as ItemsActions from "../actions/ItemsActions";
import * as PhaseActions from "../actions/PhaseActions";


export default class Phase extends React.Component{
	
	constructor(props){
		super(props);
		this.fetchItems = this.fetchItems.bind(this);
		this.getItems = this.getItems.bind(this);
		this.state = {
			items: [],
			progress: 0.0,
		};
	}
	componentWillMount(){
		ItemsStore.on("change", this.getItems);
	}

	componentWillUnmount(){
		ItemsStore.removeListener("change", this.getItems);
	}

	componentDidMount(){
		this.fetchItems();
		this.getItems();
	}
	handleChange(e){
		const title = e.target.value;
		this.props.changeTitle(title);
	}

	getProgress(){
		var max = 0;
		var sumDone = 0;
		const items =ItemsStore.getAll();
		const { _id } = this.props;
		for (var index = 0; index < items.length; index++) {
			var item = items[index];
    		if(item.phase_id==_id){
    			max += 1;
    			if(item.status==1||item.status==2){
    				sumDone += 1;
    			}	
			}
		}
		return Math.round((100/max)*sumDone);
	}

	getItems(){
		this.setState({
			items: ItemsStore.getAll(),
			progess: this.getProgress(),
		});
	}

	fetchItems(){
		$.ajax({
			url: 'http://172.22.23.6:3000/items',
			type: "GET",
			contentType: 'application/json',
			dataType: "json",
			success: function(res){
				dispatcher.dispatch({
					type: 	"FETCH_ITEMS_FROM_API",
					res,
				});
			}
		});
	}
	createItem(){
		
	}

	render(){

		const { _id, status, name, r_nr } = this.props;
		const { items } = this.state;
		var progress = this.getProgress();
		const ItemComponents = items.map((item) => {
			if(item.phase_id==_id){
				return <Item key={item._id} {...item}/>;
			}
		});

		const progressStyle = {
			width: progress+'%',
		};

		const phaseListStyle = {
			backgroundColor: '#eeeecc',
		};

		return(
			<div class="col-md-12 panel panel-default disabled" style={phaseListStyle}>
				<Title title={this.props.title} />
				<div><h3>{name}</h3></div>	
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