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
				name: "ABK-Phase",
				r_nr: 1,
			},
		];
	}

	getAll(){
		return this.items;
	}

	createPhase(process_id, status, name, r_nr){
		console.log("create-phase: "+process_id)
		const id = this.items.length+1;
		this.items.push({
			id,
			process_id,
			status,
			name,
			r_nr,
		});
		this.emit('change');
	}

	handleActions(action){
		switch(action.type){
			case "CREATE_PHASE": {
				this.createPhase(action.process_id, action.status, action.name, action.r_nr);
			};break;
		}
	}
}

const phaseStore = new PhaseStore;
dispatcher.register(phaseStore.handleActions.bind(phaseStore));
export default phaseStore;