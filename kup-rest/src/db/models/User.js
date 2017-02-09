var mongoose = require('mongoose');

/**
 * @author Kasper Nadrajkowski
 * Model for User
 * @type {mongoose}
 */
var UserSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	admin: {type: Boolean, required: false},
	}, {
	timestamps: {createAt: 'timestamp'}
});

module.exports = mongoose.model('User', UserSchema);
