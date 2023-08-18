const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategoriesSchema = new Schema({
	"category": {
		type: String
	},
	"categoryId": {
		type: Number
	},
	"categoryCode": {
		type: String
	},
	"Lessons": [{
		LessonId: {
			type: mongoose.Types.ObjectId,
			ref: "Lessons",
		},
	}],
}, { timestamps: true,/*  strict: 'throw' */ });

const Categories = mongoose.models.Categories ?
	mongoose.model('Categories') :
	mongoose.model(
		"Categories",
		CategoriesSchema
	);

module.exports = Categories;

