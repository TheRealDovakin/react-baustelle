//js
import alertify from 'alertify.js'
import React from "react";
//css
import "../../css/spinner.css"

//own files
import Comment from './Comment';
import CommentStore from '../stores/CommentStore';
import Constants from '../values/constants';
import dispatcher from "../dispatcher";
import * as ItemsActions from "../actions/ItemsActions";
import PhaseStore from '../stores/PhaseStore';
import Strings from '../values/strings_de';

/**
 * @author Kasper Nadrajkowski
 * this class represents a view for a single Items
 */
export default class Item extends React.Component{
	constructor(){
		super();
		//binded functions
		this.changeCollapsed = this.changeCollapsed.bind(this);
		this.fetchItems = this.fetchItems.bind(this);
		this.fetchComments = this.fetchComments.bind(this);
		this.getComments = this.getComments.bind(this);
		this.handleCommentChange = this.handleCommentChange.bind(this);
		this.handleEnter = this.handleEnter.bind(this);
		//this.postComment = postComment.bind(this);
		this.state = {
			items: [],
			comment: '',
			collapsed: true,
		}
	}

	/**
	 * will be called before the component mounted,
	 * adds changelisteners for stores
	 */
	componentWillMount(){
		CommentStore.on("change", this.getComments);
	}

	/**
	 * will be called before the component will unmount,
	 * removes changelisteners for stores
	 */
	componentWillUnmount(){
		CommentStore.removeListener("change", this.getComments);
	}

	/**
	 * will be called after the component mounted
	 */
	componentDidMount(){
		this.getComments();
	}

	/**
	 * fetches all Processes from the DB and dispatches an action that updates
	 * its store
	 */
	fetchComments(){
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+window.sessionStorage.accessToken);
		var myInit = { headers: myHeaders }
		fetch(Constants.restApiPath+'comments', myInit).then(function(res){
			if(res.ok){
				res.json().then(function(res){
					dispatcher.dispatch({
						type: 	"FETCH_COMMENTS_FROM_API",
						res,
					});
				})
			}
			else{
				console.log(res);
				console.log(Strings.error.restApi);
			}
		});
	}

	/**
	 * updates the state with Processes from its Store
	 */
	getComments(){
		this.setState({
			items: CommentStore.getAll(),
		});
	}

	/**
	* changes the collapsed-state of an Item
	* @param {boolean} collapse			true: collapsed, false: not collapsed
	*/
	changeCollapsed(collapse){
		this.setState({
			collapsed: collapse,
		})
	}

	/**
	* changes the status for a given Items to a given status and dispatches
	* an action thta updates the store
	* @param {object} t			this from caller
	* @param {String} _id			ID of Item to be changed
	* @param {int} status			status Item will be changed to
	*
	*/
	changeItemStatus(t, _id, status){
		var json_data = JSON.stringify({
			status: status
		});
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+window.sessionStorage.accessToken);
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
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+window.sessionStorage.accessToken);
		var myInit = { headers: myHeaders }
		fetch(Constants.restApiPath+'items', myInit).then(function(res){
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

	/**
	 * handles changeEvnet on comment-input
	 * @param {event} envent
	 */
	handleCommentChange(event){
		this.setState({
			comment: event.target.value
		});
	}

	handleEnter(event){
		//cross browser
		if (event.keyCode == 13 || event.which == 13 ){
			this.postComment(this.props._id, this.state.comment);
		}
	}

	postComment(_id, body){
		//TODO: commentor will be replaced as soon as app gets auth
		const commentor = window.sessionStorage.displayName;
		const json_data = JSON.stringify({
			item_id: _id,
			commentor: commentor,
			body: body,
		});
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", 'Bearer '+window.sessionStorage.accessToken);
		var myInit = { method: 'POST', mode: 'cors', body: json_data, headers: myHeaders }
		var self = this;
		fetch(Constants.restApiPath+'comments/', myInit).then(function(res){
			if(res.ok){
				self.fetchComments();
				self.setState({ comment: '' });
				dispatcher.dispatch({type: "COMMENT_CREATED"});
			}else{
				alertify.logPosition("top right");
				alertify.error(Strings.comment.error);
				alertify.reset();
				console.log(Strings.error.restApi);
				console.log(res.json());
			}
		});
	}



	render(){
		const { _id, status, name, place, person, person_spare, spare } = this.props;
		//constant styling
		const btnStyle = { margin: '0%', minWidth: '220px', maxWidth: '35%' }
		const btnSendStyle = { margin: '0%', minWidth: '60px', maxWidth: '8%' }
		const headlineStyle = { marginLeft: '10px'	};
		const inputStyle = { width: '600px', height: '100%' }
		//dynamic styling
		var responsablePerson = ' disabled';
		var sparePerson = '';
		if(spare == false){
			responsablePerson = '';
			sparePerson = ' disabled';
		}
		const phoneBookLink = "http://edvweb.kiebackpeter.kup/telefon/index_html?sortorder=name&start:int=0&res_name=%25";
		// TODO: replace multiple views with dynamic styles
		const { items } = this.state;
		const ItemComponents = items.map((item) => {
			var a = 0;
			if(item.item_id==_id){
				return <Comment key={item._id} {...item}/>;
			}
		});
		if(true){ // TODO: should check if items not undefined
			if(status==3){//nicht erledigt
				return(
				<div class="panel panel-default">
					<div class="panel-heading"><h4>{name}</h4></div>
					<ul class="list-group">
						<li class="list-group-item"><span>{Strings.status}: laufend</span></li>
						<li class={"list-group-item"+responsablePerson}><a  target="_blank_" href={phoneBookLink+person.split(" ")[1]+"%25&res_vorname=%25"+person.split(" ")[0]+"%25"}>{Strings.item.responsablePerson}: {person}</a></li>
						<li class={"list-group-item"+sparePerson}><span>{Strings.item.responsablePersonSpare}: {person_spare}</span></li>
						<a class="btn btn-success" style={btnStyle} onClick={
							() => this.changeItemStatus(this, _id, 2)}>
						<span class="glyphicon glyphicon-ok pull-left"></span>
						{Strings.item.setToDone}</a>
						<li class="list-group-item">
							<h4>Kommentare</h4>
							<div class="panel panel-default">
								<ul class="list-group">
									{ItemComponents}
									<li class="list-group-item">
										<div class="row">
											<div class="col-xs-12">
												<div class="input-group input-group-sm">
													<input class="form-control" type="text" placeholder="Kommentar Text" value={this.state.comment} onChange={this.handleCommentChange}
												  onKeyPress={this.handleEnter}></input>
													<div class="input-group-btn">
														<span class="btn btn-default" style={btnSendStyle} onClick={() => this.postComment(_id, this.state.comment)}>
															<span class="glyphicon glyphicon-send"></span>
														</span>
													</div>
												</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
				);
			}
			else if (status==2) {
				if(this.state.collapsed==false){//erledigt
					return(
					<div class="panel panel-success">
						<div class="panel-heading">
							<h4>{name}
								<span style={headlineStyle} onClick={() => this.changeCollapsed(true)} class="glyphicon glyphicon-triangle-top pull-right"></span>
							</h4>
						</div>
						<ul class="list-group">
							<li class="list-group-item"><span>{Strings.status}: erledigt</span></li>
							<li class="list-group-item"><a target="_blank_" href={phoneBookLink+person.split(" ")[1]+"%25&res_vorname=%25"+person.split(" ")[0]+"%25"}>{Strings.item.responsablePerson}: {person}</a></li>
							<li class="list-group-item"><a target="_blank_" href={phoneBookLink+person_spare.split(" ")[1]+"%25&res_vorname=%25"+person_spare.split(" ")[0]+"%25"}>{Strings.item.responsablePersonSpare}: {person_spare}</a></li>
							<a class="btn btn-default" style={btnStyle} onClick={
								() => this.changeItemStatus(this, _id, 3)
							}>{Strings.item.setToNotDone}</a>
						</ul>
					</div>
					);
				}else{//erledigt collapsed
					return(
					<div class="panel panel-success">
						<div class="panel-heading">
							<h4 >{name}
								<span style={headlineStyle} onClick={() => this.changeCollapsed(false)} class="glyphicon glyphicon-menu-hamburger pull-right">  </span>
							</h4>
						</div>
					</div>
					);
				}
			}else{//noch nicht freigegeben
				return(
				<div class="panel panel-default">
					<div class="panel-heading"><h4>{name}</h4></div>
					<ul class="list-group">
						<li class="list-group-item disabled"><span>{Strings.status}: in Warteschlage</span></li>
						<li class="list-group-item disabled"><a>{Strings.item.responsablePerson}: {person}</a></li>
						<li class="list-group-item disabled"><a>{Strings.item.responsablePersonSpare}: {person_spare}</a></li>
						<li class="list-group-item disabled"><a class="btn btn-success disabled">{Strings.item.setToDone}</a></li>
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
