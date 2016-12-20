import dispatcher from "../dispatcher";

export function createPhase(process_id, status, name, r_nr){
	dispatcher.dispatch({
		type: "CREATE_PHASE",
		process_id, 
		status, 
		name, 
		r_nr,
	});
}

export function deletePahse(id){
	dispatcher.dispatch({
		type: "DELETE_PHASE",
		id,
	});
}

export function fetchProcessFromApi(res){
	dispatcher.dispatch({
		type: 	"FETCH_PROCESS_FROM_API",
		res,
	});
}