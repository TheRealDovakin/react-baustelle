//js
import { EventEmitter } from "events";
//own files
import dispatcher from "../dispatcher";

/**
 * @author Kasper Nadrajkowski
 * this class represents a store for Processes
 */
class LogaStore extends EventEmitter {
	constructor(){
		super();
		this.state = {
			items: [],
		}
	}

	/**
	 * getter function for all Processes
	 * @return {array}			all Processes in store
	 */
	getAll(){
		return this.state.items;
	}

	/**
	 * updates the state with given array of Processes
	 * @param  {array} data upadated Processes
	 */
	updateLoga(data){
		this.state.items = data;
		this.emit('change');
	}


	/**
	 * handles dispatches
	 * @param {action} action			action of dispatch
	 */
	handleActions(action){
		switch(action.type){
			case "FETCH_LOGA_FROM_API": {
				this.updateLoga(action.res);
			};break;
		}
	}
}

const logaStore = new LogaStore;
dispatcher.register(logaStore.handleActions.bind(logaStore));
export default logaStore;
