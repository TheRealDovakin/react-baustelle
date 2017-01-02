import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class ItemsStore extends EventEmitter {
	constructor(){
		super();
		this.state = {
			items: [],
		}
	}

	getAll(){
		return this.state.items;
	}

	updateItems(res){
		this.state.items = res;
		this.emit('change');
	}

	handleActions(action){
		switch(action.type){
			case "FETCH_ITEMS_FROM_API": {
				this.updateItems(action.res);
			};break;
		}
	}
}

const itemsStore = new ItemsStore;
dispatcher.register(itemsStore.handleActions.bind(itemsStore));
export default itemsStore;
