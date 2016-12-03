import dispatcher from "../dispatcher";

export function createItem(name, place){
	dispatcher.dispatch({
		type: "CREATE_ITEM",
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