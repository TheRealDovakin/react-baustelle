import dispatcher from "../dispatcher";

export function createProcess(status, person_name, due_date){
	dispatcher.dispatch({
		type: "CREATE_PROCESS",
		status,
		person_name,
		due_date,
	});

}

export function changeProcessStatus(id, status){
	dispatcher.dispatch({
		type: "CHNAGE_PROCESS_STATUS",
		id,
	});
}