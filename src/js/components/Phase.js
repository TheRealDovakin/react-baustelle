//js
import Constants from '../values/constants';
import React from "react";
import ES6Promise from 'es6-promise';
import "isomorphic-fetch";

//css
import "../../css/spinner.css"

//own files
import dispatcher from "../dispatcher";
import Item from "./Item";
import ItemsStore from "../stores/ItemsStore";
import * as ItemsActions from "../actions/ItemsActions";
import * as PhaseActions from "../actions/PhaseActions";
import Strings from '../values/strings_de';
import Title from "./Header/Title";

/**
 * @author Kasper Nadrajkowski
 * this class represents a view for a single Phase with a list of Items
 */
export default class Phase extends React.Component{
	constructor(props){
		super(props);
		// binded functions
		this.fetchItems = this.fetchItems.bind(this);
		this.getItems = this.getItems.bind(this);
		this.state = {
			items: undefined,
			progress: 0.0,
		};
	}
	/**
	 * will be called before the component mounts,
	 * adds changelisteners for stores
	 */
	componentWillMount(){
		ItemsStore.on("change", this.getItems);
	}

	/**
	 * will be called before the component unmounts,
	 * adds changelisteners for stores
	 */
	componentWillUnmount(){
		ItemsStore.removeListener("change", this.getItems);
	}

	/**
	 * will be called after the component mounted
	 */
	componentDidMount(){
		this.getItems();
	}

	/**
	 * fetches Items from the DB an dispatches an action that updates the ItemsStore
	 */
	fetchItems(){
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
				console.log(Strings.error.restApi);
				console.log(res);
			}
		});
	}

	/**
	 * updates the state with items from its store
	 */
	getItems(){
		this.setState({
			items: ItemsStore.getAll(),
			progess: this.getProgress(),
		});
	}

	/**
	 *
	 * loops throught all Items counting how much Items of this Phase are done
	 * and returns a percent value
	 * @return {int}			percent-value of how much Items of this Phase aere done
	 */
	getProgress(){
		var max = 0;
		var sumDone = 0;
		// TODO: use state.items here
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

	render(){
		const { _id, status, name, r_nr } = this.props;
		const { items } = this.state;
		// makes sure data from DB is loaded, else render loading spinner
		if(items!=undefined){
			var progress = this.getProgress();
			const ItemComponents = items.map((item) => {
				if(item.phase_id==_id){
					return <Item key={item._id} {...item}/>;
				}
			});

			// inline styling
			const progressStyle = { width: progress+'%', };
			const hStyle = {fontWeight: 'bold'};
			// dynamic styling
			var phaseColor = { backgroundColor: '#ddffdd', };
			if(this.props.status==1) phaseColor ={ backgroundColor: '#eeeeee', };
			if(this.props.status==2) phaseColor ={ backgroundColor: '#ddddff', };
			// react default render function
			return(
				<div class="col-md-12 panel panel-default" style={phaseColor}>
					<Title title={this.props.title} />
					<div><h2 style={hStyle}>{name}</h2></div>
					<div> {ItemComponents} </div>
					<h3>{Strings.phase.progress}: {progress} %</h3>
					<div class="progress">
					  <div class="progress-bar progress-bar-success" role="progressbar" style={progressStyle}></div>
					</div>
				</div>
			);
		}else{ //loading spinner
			return(
				<div class="cssload-container">
					<div class="cssload-speeding-wheel"></div>
				</div>
			)
		}
	}
}
