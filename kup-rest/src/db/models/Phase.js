var restful = require('node-restful');
var mongoose = restful.mongoose;

/**
 * @author Kasper Nadrajkowski
 * Model for Phase
 * @type {mongoose}
 */
var PhaseSchema = new mongoose.Schema({
	name: {type: String, required: true},
	process_id: {type: String, required: true},
	status: {type: Number, required: true},
	r_nr: {type: Number, required: true},
	}, {
	timestamps: {createAt: 'timestamp'}
});

module.exports =  restful.model('Phases', PhaseSchema);
