import dispatcher from "../dispatcher";

export function createProcess(status, person_name, due_date, p_type){
	dispatcher.dispatch({
		type: "CREATE_PROCESS",
		status,
		person_name,
		due_date,
		p_type,
	});
	console.log("create-process-action");
}

export function changeProcessStatus(id, status){
	dispatcher.dispatch({
		type: "CHANGE_PROCESS_STATUS",
		id,
	});
}