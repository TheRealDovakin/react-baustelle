import dispatcher from "../dispatcher";



export function deleteItem(id){
	dispatcher.dispatch({
		type: "DELETE_ITEM",
		id,
	});
}

export function changeItemStatus(){
	dispatcher.dispatch({
		type: "ITEM_STATUS_CHANGED",
	});
}

