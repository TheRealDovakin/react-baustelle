import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PhaseStore extends EventEmitter {
	constructor(){
		super();
		this.items = [
			{
				id: 1,
				process_id: 1,
				status: 2,
				name: "IT-Phase 1",
				r_nr: 2,
			},
			{
				id: 2,
				process_id: 1,
				status: 2,
				name: "IT-Phase 2",
				r_nr: 1,
			},
			{
				id: 3,
				process_id: 2,
				status: 2,
				name: "IT-Phase 2",
				r_nr: 1,
			},
		];
	}

	getAll(){
		return this.items;
	}

	createPhase(){
		const id = Date.now();
		this.items.push({
			id,
		});
		this.emit('change');
	}

	handleActions(action){
		switch(action.type){
			case "CREATE_PHASE": {
				this.createPhase();
			};break;
		}
	}
}

const phaseStore = new PhaseStore;
dispatcher.register(phaseStore.handleActions.bind(phaseStore));
export default phaseStore;