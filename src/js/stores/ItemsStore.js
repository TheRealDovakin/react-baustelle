//js
import { EventEmitter } from "events";
//own files
import dispatcher from "../dispatcher";

/**
 * @author Kasper Nadrajkowski
 * this class represents a store for Items
 */
class ItemsStore extends EventEmitter {
	constructor(){
		super();
		this.state = {
			items: [],
		}
	}

	/**
	 * getter function for all Items
	 * @return {array}			all Items in store
	 */
	getAll(){
		return this.state.items;
	}

	/**
	 * updates the state with given array of Items
	 * @param  {array} res upadated Items
	 */
	updateItems(res){
		this.state.items = res;
		this.emit('change');
	}

	/**
	 * handles dispatches
	 * @param {action} action			action of dispatch
	 */
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
