var mongoose = require('mongoose');
var restful = require('node-restful');
var mongoose = restful.mongoose;

var ProcessSchema = new mongoose.Schema({
	status: {type: Number, required: true},
	person_name: {type: String, required: true},
	due_date: {type: Date, required: true},
	p_type: {type: String, required: true},
	r_nr_progress: {type: Number, default: 0}
	}, {
	timestamps: {createAt: 'timestamp'}
});

module.exports =  restful.model('Processes', ProcessSchema);
