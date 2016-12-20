import dispatcher from "../dispatcher";

export function createProcess(status, person_name, due_date, p_type){
	dispatcher.dispatch({
		type: "CREATE_PROCESS",
		status,
		person_name,
		due_date,
		p_type,
	});
}

export function changeProcessStatus(id, status){
	dispatcher.dispatch({
		type: "CHANGE_PROCESS_STATUS",
		id,
	});
}

export function fetchItemsFromApi(res){
	dispatcher.dispatch({
		type: 	"FETCH_ITEMS_FROM_API",
		res,
	});
}

export function processCreated(res){
	dispatcher.dispatch({
		type: 	"PROCESS_CREATED",
		res,
	});
}