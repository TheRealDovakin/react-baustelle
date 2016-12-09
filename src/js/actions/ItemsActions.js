import dispatcher from "../dispatcher";

export function createItem(status, name, place){
	dispatcher.dispatch({
		type: "CREATE_ITEM",
		status,
		name,
		place,
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