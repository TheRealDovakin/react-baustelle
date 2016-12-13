import dispatcher from "../dispatcher";

export function createProcess(){
	dispatcher.dispatch({
		type: "CREATE_ITEM",
	});
}

export function changeProcessStatus(id, status){
	dispatcher.dispatch({
		type: "CHNAGE_PROCESS_STATUS",
		id,
	});
}