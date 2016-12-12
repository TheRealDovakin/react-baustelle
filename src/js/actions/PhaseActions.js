import dispatcher from "../dispatcher";

export function createPhase(){
	dispatcher.dispatch({
		type: "CREATE_ITEM",
	});
}

export function deletePahse(id){
	dispatcher.dispatch({
		type: "DELETE_PHASE",
		id,
	});
}