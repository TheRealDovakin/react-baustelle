import React from "react";

import * as ItemsActions from "../actions/ItemsActions";

export default class Item extends React.Component{

	changeItemStatus(p, b){
		ItemsActions.changeItemStatus(this.props.id, b);
	}

	render(){

		const { id, status, name, place, person, person_spare, spare } = this.props;

		const phoneBookLink = "http://edvweb.kiebackpeter.kup/telefon/index_html?sortorder=name&start:int=0&res_name=";

		if(status==1){//erledigt collapse
			return(
			<div class="panel panel-success">
				<div class="panel-heading">
					<h4>{name}   <a onClick={() => this.changeItemStatus(this, 2)}>
						<a class="glyphicon glyphicon-chevron-up">  </a>
					</a>
					</h4>
				</div>
				<ul class="list-group">
					<li class="list-group-item list-group-item-success"><span>Status: erledigt</span></li>
					<li class="list-group-item list-group-item-success"><a>Verantwortlicher: {person}</a></li>
					<li class="list-group-item list-group-item-success"><a>Vertretung: {person_spare}</a></li>
					<li class="list-group-item list-group-item-success"><a class="btn btn-default" onClick={
						() => this.changeItemStatus(this, 3)
					}>auf NICHT ERLEDIGT setzen</a></li>
				</ul>	
			</div>
			);
		}if(status==2){//erledigt
			return(
			<div class="panel panel-success">
				<div class="panel-heading">
					<h4>{name}   <a onClick={() => this.changeItemStatus(this, 1)}>
						<a class="glyphicon glyphicon-chevron-down">  </a>
					</a>
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
						<li class="list-group-item"><a href={phoneBookLink+person.split(" ").splice(-1)[0]}>Verantwortlicher: {person}</a></li>
						<li class="list-group-item disabled"><a>Vertretung: {person_spare}</a></li>
						<li class="list-group-item">
							<a class="btn btn-success" onClick={
								() => this.changeItemStatus(this, 2)
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
						<li class="list-group-item disabled"><a>Verantwortlicher: {person}</a></li>
						<li class="list-group-item"><a>Vertretung: {person_spare}</a></li>
						<li class="list-group-item">
							<a class="btn btn-success" onClick={
								() => this.changeItemStatus(this, 2)
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
	}
}