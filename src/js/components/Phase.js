//js
import Constants from '../values/constants';
import React from "react";
import "whatwg-fetch";

//css
import "../../css/spinner.css"

//own files
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
			items: undefined,
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
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		var myInit = { method: 'GET', headers: myHeaders }
		fetch(Constants.restApiPath+'items').then(function(res){
			if(res.ok){
				res.json().then(function(res){
					dispatcher.dispatch({
						type: 	"FETCH_ITEMS_FROM_API",
						res,
					});
				})
			}
			else{
				console.log('error in fetch Items');
				console.log(res);
			}
		});
	}

	render(){
		const { _id, status, name, r_nr } = this.props;
		const { items } = this.state;
		if(items!=undefined){
			var progress = this.getProgress();
			const ItemComponents = items.map((item) => {
				if(item.phase_id==_id){
					return <Item key={item._id} {...item}/>;
				}
			});

			const progressStyle = {
				width: progress+'%',
			};

			var phaseColor = {
				backgroundColor: '#ddffdd',
			};
			if(this.props.status==1){
				phaseColor ={
					backgroundColor: '#eeeeee',
				};
			}
			if(this.props.status==2){
				phaseColor ={
					backgroundColor: '#ddddff',
				};
			}
			return(
				<div class="col-md-12 panel panel-default" style={phaseColor}>
					<Title title={this.props.title} />
					<div><h3>{name}</h3></div>
					<div> {ItemComponents} </div>
					<h3>Fortschitt</h3>
					<div class="progress">
					  <div class="progress-bar progress-bar-success" role="progressbar" style={progressStyle}>
					    {progress} %
					  </div>
					</div>
				</div>
			);
		}else{
			return(
				<div class="cssload-container">
					<div class="cssload-speeding-wheel"></div>
				</div>
			)
		}
	}
}
