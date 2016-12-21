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

	getProcess(){
		return this.state.process;
	}

	updatePhases(data){
		this.state.items = data; //this should be replaced with setState({items: data}) but it doesn't work somehow
		this.emit('change');
	}

	handleActions(action){
		switch(action.type){
			case "FETCH_PHASES_FROM_API": {
				this.updatePhases(action.res);
			}
		}
	}
}

const phaseStore = new PhaseStore;
dispatcher.register(phaseStore.handleActions.bind(phaseStore));
export default phaseStore;