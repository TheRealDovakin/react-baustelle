var mongoose = require('mongoose');
var restful = require('node-restful');
var mongoose = restful.mongoose;

/**
 * @author Kasper Nadrajkowski
 * Model for Comment
 * @type {mongoose}
 */
var CommentSchema = new mongoose.Schema({
	item_id: {type: String, required: true},
	commentor: {type: String, required: true},
	body: {type: String, required: true},
	}, {
	timestamps: {createAt: 'timestamp'}
});

module.exports = restful.model('Comment', CommentSchema);
