//js
import { EventEmitter } from "events";
//own files
import dispatcher from "../dispatcher";

/**
 * @author Kasper Nadrajkowski
 * this class represents a store for Phases
 */
class PhaseStore extends EventEmitter {
	constructor(){
		super();
		this.state = {
			items: [],
		}
	}

	/**
	 * getter function for all Phases
	 * @return {array}			all Phases in store
	 */
	getAll(){
		return this.state.items;
	}

	/**
	 * updates the state with given array of Phases
	 * @param  {array} data upadated Phases
	 */
	updatePhases(data){
		this.state.items = data; //this should be replaced with setState({items: data}) but it doesn't work somehow
		this.emit('change');
	}

	/**
	 * handles dispatches
	 * @param {action} action			action of dispatch
	 */
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
