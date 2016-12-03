import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class ItemsStore extends EventEmitter {
	constructor(){
		super();
		this.items = [
			{
				id: 1,
				name: "Hammer",
				place: "Bamberger"
			},
			{
				id: 2,
				name: "Bohrer",
				place: "Bruckner"
			},
			{
				id: 3,
				name: "Leiter",
				place: "Braunschweiger"
			}
		];
	}

	getAll(){
		return this.items;
	}

	createItem(name, place){
		const id = Date.now();
		this.items.push({
			id,
			name,
			place,
		});
		this.emit('change');
	}

	handleActions(action){
		switch(action.type){
			case "CREATE_ITEM": {
				this.createItem(action.name, action.place);
			}
		}
	}
}

const itemsStore = new ItemsStore;
dispatcher.register(itemsStore.handleActions.bind(itemsStore));
export default itemsStore;