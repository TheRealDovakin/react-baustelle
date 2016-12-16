import { EventEmitter } from "events";
import $ from "jquery";
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

	fetchProcessesFromApi(data){
		this.state.items = data; //this should be replaced with setState({items: data}) but it doesn't work somehow
		this.emit('change');
	}

	createProcess(status, person_name, due_date, p_type){
		var json_data = JSON.stringify({
			status: status,
			person_name: person_name, 
			due_date: due_date, 
			p_type: p_type
		});
		console.log(json_data);
		$.ajax({
			url: 'http://172.22.23.6:3000/processes/',
			type: "POST",
			contentType: "application/json",
			data: json_data,
			success: function(res){
				document.location.href = '/';
			},
			error: function(res){
				console.log(res);
				//needs to be reaplaced
				alert("Die eingabe war nicht volständdig oder korrekt");
			}
		});
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
				this.fetchProcessesFromApi(action.res);
			}
		}
	}
}

const processStore = new ProcessStore;
dispatcher.register(processStore.handleActions.bind(processStore));
export default processStore;