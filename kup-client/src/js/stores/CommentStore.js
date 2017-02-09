//js
import { EventEmitter } from "events";
//own files
import dispatcher from "../dispatcher";

/**
 * @author Kasper Nadrajkowski
 * this class represents a store for Comments
 */
class CommentStore extends EventEmitter {
	constructor(){
		super();
		this.state = {
			items: [],
		}
	}

	/**
	 * getter function for all Comments
	 * @return {array}			all Comments in store
	 */
	getAll(){
		return this.state.items;
	}

	/**
	 * updates the state with given array of Comments
	 * @param  {array} data upadated Comments
	 */
	updateComments(data){
		this.state.items = data;
		this.emit('change');
	}

	/**
	 * handles dispatches
	 * @param {action} action			action of dispatch
	 */
	handleActions(action){
		switch(action.type){
			case "FETCH_COMMENTS_FROM_API": {
				this.updateComments(action.res);
			}
		}
	}
}

const commentStore = new CommentStore;
dispatcher.register(commentStore.handleActions.bind(commentStore));
export default commentStore;
