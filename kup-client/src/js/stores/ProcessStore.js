//js
import { EventEmitter } from "events";
//own files
import dispatcher from "../dispatcher";

/**
 * @author Kasper Nadrajkowski
 * this class represents a store for Processes
 */
class ProcessStore extends EventEmitter {
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
	updateProcesses(data){
		this.state.items = data;
		this.emit('change');
	}


	/**
	 * handles dispatches
	 * @param {action} action			action of dispatch
	 */
	handleActions(action){
		switch(action.type){
			case "CREATE_PROCESS": {
				this.createProcess(action.status, action.person_name, action.due_date, action.p_type);
			};break;
			case "CHANGE_PROCESS_STATUS": {
				this.changeProcessStatus(action.id, action.status);
			};break;
			case "FETCH_PROCESSES_FROM_API": {
				this.updateProcesses(action.res);
			};break;
			case "PROCESS_CREATED": {};break;
		}
	}
}

const processStore = new ProcessStore;
dispatcher.register(processStore.handleActions.bind(processStore));
export default processStore;
