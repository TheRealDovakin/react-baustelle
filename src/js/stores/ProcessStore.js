import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class ProcessStore extends EventEmitter {
	constructor(){
		super();
		this.state = {
			items: [],
		}
	}

	getAll(){
		return this.state.items;
	}

	getProcess(id){
		
	}

	updateProcesses(data){
		this.state.items = data; //this should be replaced with setState({items: data}) but it doesn't work somehow
		this.emit('change');
	}

	changeProcessStatus(id, status){
		const it = this.state.items;
		for (var index = 0; index < it.length; ++index) {
    		if(it[index].id==id){
    			it[index].status = status;
    		}
		}
		this.emit('change');
	}

	handleActions(action){
		switch(action.type){
			case "CREATE_PROCESS": {
				console.log("create-process-store");
				this.createProcess(action.status, action.person_name, action.due_date, action.p_type);
				console.log("create-process-store-actions");
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