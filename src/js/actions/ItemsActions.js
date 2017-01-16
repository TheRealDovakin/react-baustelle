//own files
import dispatcher from "../dispatcher";

/**
 * @author Kasper Nadrajkowski
 * collection action for Items
 */

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
