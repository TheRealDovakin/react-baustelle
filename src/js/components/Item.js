//js
import React from "react";

//css
import "../../css/spinner.css"

//own files
import Constants from '../values/constants';
import dispatcher from "../dispatcher";
import * as ItemsActions from "../actions/ItemsActions";
import PhaseStore from '../stores/PhaseStore';

/**
 * @author Kasper Nadrajkowski
 * this class represents a view for a single Items
 */
export default class Item extends React.Component{
	constructor(){
		super();
		//binded functions
		this.fetchItems = this.fetchItems.bind();
		this.changeItemStatus = this.changeItemStatus.bind();
	}

	/**
	* changes the status for a given Items to a given status and dispatches
	* an action thta updates the store
	 * @param {String} _id - ID of Item to be changed
	 * @param {int} status - status Item will be changed to
	 *
	 */
	changeItemStatus(_id, status){
		var json_data = JSON.stringify({
			status: status
		});
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		var myInit = { method: 'PUT', headers: myHeaders, body: json_data }
		var self = this;
		fetch(Constants.restApiPath+'items/'+_id, myInit).then(function(res){
			if(res.ok) res.json().then(function(res){
				self.fetchItems();
				dispatcher.dispatch({
					type: 'ITEM_STATUS_CHANGED',
					res,
				})
			});
			else{
				console.log('error in set Items.Status');
				console.log(res);
			}
		});
	}

	/**
	 * fetches Items from the DB and dispatches an action that updates its store
	 */
	fetchItems(){
		fetch(Constants.restApiPath+'items').then(function(res){
			if(res.ok){
				res.json().then(function(res){
					dispatcher.dispatch({
						type: "FETCH_ITEMS_FROM_API",
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
		const { _id, status, name, place, person, person_spare, spare } = this.props;
		const phoneBookLink = "http://edvweb.kiebackpeter.kup/telefon/index_html?sortorder=name&start:int=0&res_name=%25";
		// TODO: replace multiple views with dynamic styles
		if(true){ // TODO: should check if items not undefined
			if(status==1){//erledigt collapse
				return(
				<div class="panel panel-success">
					<div class="panel-heading">
						<h4>{name}
							<a onClick={() => this.changeItemStatus(_id, 2)} class="glyphicon glyphicon-chevron-up"></a>
						</h4>
					</div>
					<ul class="list-group">
						<li class="list-group-item list-group-item-success"><span>Status: erledigt</span></li>
						<li class="list-group-item list-group-item-success"><a href={phoneBookLink+person.split(" ")[1]+"%25&res_vorname=%25"+person.split(" ")[0]+"%25"}>Verantwortlicher: {person}</a></li>
						<li class="list-group-item list-group-item-success"><a href={phoneBookLink+person_spare.split(" ")[1]+"%25&res_vorname=%25"+person_spare.split(" ")[0]+"%25"}>Vertretung: {person_spare}</a></li>
						<li class="list-group-item list-group-item-success"><a class="btn btn-default" onClick={
							() => this.changeItemStatus(_id, 3)
						}>auf NICHT ERLEDIGT setzen</a></li>
					</ul>
				</div>
				);
			}if(status==2){//erledigt
				return(
				<div class="panel panel-success">
					<div class="panel-heading">
						<h4>{name}
							<a onClick={() => this.changeItemStatus(_id, 1)} class="glyphicon glyphicon-chevron-down">  </a>
						</h4>
					</div>
				</div>
				);
			}if(status==3){//nicht erledigt
				if(spare==false){
					return(
					<div class="panel panel-default">
						<div class="panel-heading"><h4>{name}</h4></div>
						<ul class="list-group">
							<li class="list-group-item"><span>Status: laufend</span></li>
							<li class="list-group-item"><a href={phoneBookLink+person.split(" ")[1]+"%25&res_vorname=%25"+person.split(" ")[0]+"%25"}>Verantwortlicher: {person}</a></li>
							<li class="list-group-item disabled"><span>Vertretung: {person_spare}</span></li>
							<li class="list-group-item">
								<a class="btn btn-success" onClick={
									() => this.changeItemStatus(_id, 2)
								}>auf ERLEDIGT setzen</a>
							</li>
						</ul>
					</div>
					);
				}else{
					return(
					<div class="panel panel-default">
						<div class="panel-heading"><h4>{name}</h4></div>
						<ul class="list-group">
							<li class="list-group-item"><span>Status: laufend</span></li>
							<li class="list-group-item disabled"><span>Verantwortlicher: {person}</span></li>
							<li class="list-group-item"><a href={phoneBookLink+person_spare.split(" ")[1]+"%25&res_vorname=%25"+person_spare.split(" ")[0]+"%25"}>Vertretung: {person_spare}</a></li>
							<li class="list-group-item">
								<a class="btn btn-success" onClick={
									() => this.changeItemStatus(_id, 2)
								}>auf ERLEDIGT setzen</a>
							</li>
						</ul>
					</div>
					);
				}
			}else{//noch nicht freigegeben
				return(
				<div class="panel panel-default">
					<div class="panel-heading"><h4>{name}</h4></div>
					<ul class="list-group">
						<li class="list-group-item disabled"><span>Status: in Warteschlage</span></li>
						<li class="list-group-item disabled"><a>Verantwortlicher: {person}</a></li>
						<li class="list-group-item disabled"><a>Vertretung: {person_spare}</a></li>
						<li class="list-group-item disabled"><a class="btn btn-success disabled">auf ERLEDIGT setzen</a></li>
					</ul>
				</div>
				);
			}
		}else{
			return(
				<div class="cssload-container">
					<div class="cssload-speeding-wheel"></div>
				</div>
			)
		}

	}
}
