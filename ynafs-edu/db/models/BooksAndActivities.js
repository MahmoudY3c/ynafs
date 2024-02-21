
const mongoose = require('mongoose');
const { Schema } = mongoose;

const BooksAndActivitiesSchema = new Schema({
	book: {
		type: String,
	},
	title: {
		type: String,
	},
	tree: {
		type: mongoose.Types.ObjectId,
		ref: 'Trees',
	},
  activities: {
    type: Array,
  },
  fullPath: [{ type: String }],
  isActive: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const BooksAndActivities = mongoose.models.BooksAndActivities
	? mongoose.model('BooksAndActivities')
	: mongoose.model(
		"BooksAndActivities",
		BooksAndActivitiesSchema
	);

module.exports = BooksAndActivities;

