var mongoose = require('mongoose');
var restful = require('node-restful');
var mongoose = restful.mongoose;

var ItemSchema = new mongoose.Schema({
	phase_id: {type: String, required: true},
	status: {type: String, required: true},
	name: {type: String, required: true},
	person: {type: String, required: true},
	person_spare: {type: String, required: true},
	spare: {type: Boolean, required: true}
	}, {
	timestamps: {createAt: 'timestamp'}
});

module.exports = restful.model('Item', ItemSchema);