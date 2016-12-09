import React from "react";

import Title from "./Header/Title";
import Item from "./Item";
import ItemsStore from "../stores/ItemsStore";
import * as ItemsActions from "../actions/ItemsActions";


export default class Content extends React.Component{
	
	constructor(){
		super();
		this.state = {
			items: ItemsStore.getAll(),
		};
	}

	handleChange(e){
		const title = e.target.value;
		this.props.changeTitle(title);
	};

	componentWillMount(){
		ItemsStore.on("change", () => {
			this.setState({
				items: ItemsStore.getAll(),
			});
		});
	}

	createItem(){
		ItemsActions.createItem(2, "Schraube", "Bamberger");
	}

	render(){
		const { items } = this.state;
		const ItemComponents = items.map((item) => {
			return <Item key={item.id} {...item}/>;
		})

		return(
			<div>
				<Title title={this.props.title} />
				<button onClick={this.createItem.bind(this)}>create</button>
				<input 
					onChange={this.handleChange.bind(this)}
					value={this.props.title}/>
				<div class="row"> {ItemComponents} </div>
			</div>
		);
	}
}