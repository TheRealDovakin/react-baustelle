var restful = require('node-restful');
var mongoose = restful.mongoose;

/**
 * @author Kasper Nadrajkowski
 * Model for Process
 * @type {mongoose}
 */
var ProcessSchema = new mongoose.Schema({
	status: {type: Number, required: true},
	person_name: {type: String, required: true},
	person_nr: {type: String, required: false},
	short: {type: String, required: false},
	job: {type: String, required: true},
	place: {type: String, required: true},
	department: {type: String, required: true},
	due_date: {type: Date, required: true},
	p_type: {type: String, required: true},
	r_nr_progress: {type: Number, default: 0}
	}, {
	timestamps: {createAt: 'timestamp'}
});

module.exports =  restful.model('Processes', ProcessSchema);
