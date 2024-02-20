
const mongoose = require('mongoose');
const { Schema } = mongoose;

const SemestersSchema = new Schema({
	term: {
		type: String,
	},
	termCode: {
		type: String,
	},
	categories: [{
		type: mongoose.Types.ObjectId,
		ref: 'Categories',
	}],
}, { timestamps: true });

const Semesters = mongoose.models.Semesters
	? mongoose.model('Semesters')
	: mongoose.model(
		"Semesters",
		SemestersSchema
	);

module.exports = Semesters;

