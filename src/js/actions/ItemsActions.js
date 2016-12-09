import dispatcher from "../dispatcher";

export function createItem(phase_id, status, name, person, person_spare, spare){
	dispatcher.dispatch({
		type: "CREATE_ITEM",
		phase_id,
		status,
		name,
		person,
		person_spare,
		spare
	});
}

export function deleteItem(id){
	dispatcher.dispatch({
		type: "DELETE_ITEM",
		id,
	});
}

export function changeItemStatus(id, status){
	dispatcher.dispatch({
		type: "CHANGE_ITEM_STATUS",
		id,
		status,
	});
}