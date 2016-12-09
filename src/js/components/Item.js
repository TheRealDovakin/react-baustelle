import React from "react";

import * as ItemsActions from "../actions/ItemsActions";

export default class Item extends React.Component{

	changeItemStatus(p, b){
		ItemsActions.changeItemStatus(this.props.id, b);
		console.log("change status");
	}

	render(){

		const { id, status, name, place } = this.props;

		if(status==1){//erledigt collapse
			return(
			<div class="panel panel-success">
				<div class="panel-heading">
					<h4>{name}   <a onClick={() => this.changeItemStatus(this, 2)}>
						<span class="glyphicon glyphicon-chevron-up">  </span>
					</a>
					</h4>
				</div>
				<ul class="list-group">
					<li class="list-group-item list-group-item-success"><span>Status: erledigt</span></li>
					<li class="list-group-item list-group-item-success"><span>{place}</span></li>
					<li class="list-group-item list-group-item-success"><span>Verantwortlicher</span></li>
					<li class="list-group-item list-group-item-success"><span>Vertretung</span></li>
					<li class="list-group-item"><a class="btn btn-default" onClick={
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
						<span class="glyphicon glyphicon-chevron-down">  </span>
					</a>
					</h4>
				</div>
				<ul class="list-group collapse">
					<li class="list-group-item list-group-item-success"><span>Status: erledigt</span></li>
					<li class="list-group-item list-group-item-success"><span>{place}</span></li>
					<li class="list-group-item list-group-item-success"><span>Verantwortlicher</span></li>
					<li class="list-group-item list-group-item-success"><span>Vertretung</span></li>
					<li class="list-group-item">
						<a class="btn btn-default" onClick={
							() => this.changeItemStatus(this, 3)
						}>auf NICHT ERLEDIGT setzen</a>
					</li>
				</ul>	
			</div>
			);
		}if(status==3){//nicht erledigt
			return(
			<div class="panel panel-default">
				<div class="panel-heading"><h4>{name}</h4></div>
				<ul class="list-group">
					<li class="list-group-item"><span>Status: in progress</span></li>
					<li class="list-group-item"><span>{place}</span></li>
					<li class="list-group-item"><span>Verantwortlicher</span></li>
					<li class="list-group-item"><span>Vertretung</span></li>
					<li class="list-group-item">
						<a class="btn btn-success" onClick={
							() => this.changeItemStatus(this, 2)
						}>auf ERLEDIGT setzen</a>
					</li>
				</ul>	
			</div>
		);
		}else{//noch nicht freigegeben
			return(
			<div class="panel panel-default">
				<div class="panel-heading"><h4>{name}</h4></div>
				<ul class="list-group">
					<li class="list-group-item disabled"><span>Status: in Warteschlage</span></li>
					<li class="list-group-item disabled"><span>{place}</span></li>
					<li class="list-group-item disabled"><span>Verantwortlicher</span></li>
					<li class="list-group-item disabled"><span>Vertretung</span></li>
					<li class="list-group-item disabled"><a class="btn btn-success disabled">auf ERLEDIGT setzen</a></li>
				</ul>	
			</div>
			);
		}	
	}
}