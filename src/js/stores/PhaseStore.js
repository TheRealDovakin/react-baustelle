import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PhaseStore extends EventEmitter {
	constructor(){
		super();
		this.state = {
			items: [],
		}	
	}

	getAll(){
		return this.state.items;
	}

	fetchPhasesFromApi(data){
		this.state.items = data; //this should be replaced with setState({items: data}) but it doesn't work somehow
		this.emit('change');
	}

	createPhase(process_id, status, name, r_nr){
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
			case "FETCH_PHASES_FROM_API": {
				this.fetchPhasesFromApi(action.res);
			}
		}
	}
}

const phaseStore = new PhaseStore;
dispatcher.register(phaseStore.handleActions.bind(phaseStore));
export default phaseStore;