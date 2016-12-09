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
				4: not todo yet,
				5

			*/
			{
				id: 1,
				phase_id: 1,
				status: 2,
				name: "AD-Konto",
				person: "Hans Peter",
				person_spare: "Klaus Dieter",
				spare: false,
			},
			{
				id: 2,
				phase_id: 1,
				status: 3,
				name: "Baumann",
				person: "Klaus Dieter",
				person_spare: "Hans Peter",
				spare: true,
			},
			{
				id: 3,
				phase_id: 1,
				status: 3,
				name: "Adito",
				person: "Hans Peter",
				person_spare: "Klaus Dieter",
				spare: false,
			},
			{
				id: 4,
				phase_id: 2,
				status: 3,
				name: "PKW",
				person: "Hans Peter",
				person_spare: "Klaus Dieter",
				spare: false,
			},
			{
				id: 5,
				phase_id: 2,
				status: 3,
				name: "Handy",
				person: "Petra Meier",
				person_spare: "Horst Krämer",
				spare: true,
			},
		];
	}

	getAll(){
		return this.items;
	}

	createItem(phase_id, status, name, person, person_spare, spare){
		const id = Date.now();
		this.items.push({
			id,
			phase_id,
			status,
			name,
			person,
			person_spare,
			spare
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
				this.createItem(action.phase_id, action.status, action.name, action.person, action.person_spare, action.spare);
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