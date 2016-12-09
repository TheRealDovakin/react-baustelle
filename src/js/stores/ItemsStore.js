import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class ItemsStore extends EventEmitter {
	constructor(){
		super();
		this.items = [
			/*
				1: done,
				2: done collapsed,
				3: in progress,
				4: not todo yet

			*/
			{
				id: 1,
				status: 2,
				name: "Hammer",
				place: "Bamberger"
			},
			{
				id: 2,
				status: 3,
				name: "Bohrer",
				place: "Bruckner"
			},
			{
				id: 3,
				status: 4,
				name: "Leiter",
				place: "Braunschweiger"
			}
		];
	}

	getAll(){
		return this.items;
	}

	createItem(status, name, place){
		const id = Date.now();
		this.items.push({
			id,
			status,
			collapse: 0,
			name,
			place,
		});
		this.emit('change');
	}

	changeItemStatus(id, status){
		for (var index = 0; index < this.items.length; ++index) {
    		if(this.items[index].id==id){
    			this.items[index].status = status;
    		}
		}
		this.emit('change');
	}

	handleActions(action){
		switch(action.type){
			case "CREATE_ITEM": {
				this.createItem(action.status, action.name, action.place);
			};break;
			case "CHANGE_ITEM_STATUS": {
				this.changeItemStatus(action.id, action.status);
			};break;
		}
	}
}

const itemsStore = new ItemsStore;
dispatcher.register(itemsStore.handleActions.bind(itemsStore));
export default itemsStore;