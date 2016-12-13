import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class ProcessStore extends EventEmitter {
	constructor(){
		super();
		this.items = [
			{
				id: 1,
				status: 1,
				person_name: "Hans Butter",
				due_date: "2017-01-02",
			},
			{
				id: 2,
				status: 2,
				person_name: "Claus Milch",
				due_date: "2017-01-01",
			},
			{
				id: 3,
				status: 2,
				person_name: "Peter Pan",
				due_date: "2017-01-03",
			},
		];
	}

	getAll(){
		return this.items;
	}

	createProcess(){
		const id = Date.now();
		this.items.push({
			id,
		});
		this.emit('change');
	}

	changeProcessStatus(id, status){
		for (var index = 0; index < this.items.length; ++index) {
    		if(this.items[index].id==id){
    			this.items[index].status = status;
    		}
		}
		this.emit('change');
	}

	handleActions(action){
		switch(action.type){
			case "CREATE_PROCESS": {
				this.createProcess();
			};break;
			case "CHANGE_PROCESS_STATUS": {
				this.changeProcessStatus(action.id, action.status);
			};break;
		}
	}
}

const processStore = new ProcessStore;
dispatcher.register(processStore.handleActions.bind(processStore));
export default processStore;