const mongoose = require("mongoose");

const { Schema } = mongoose;

const TreesSchema = new Schema({
	"id": {
		type: Number,
	},
	"lessonId": {
		type: Number,
	},
	"title": {
		type: String,
	},
	"lessonOrder": {
		type: Number,
	},
	"isActive": {
		type: Boolean,
	},
	"publicType": {
		type: String,
		default: null,
	},
	"codeId": {
		type: String,
	},
	"treeId": {
		type: Number,
	},
	"subjectGroupId": {
		type: Number,
	},
	"powerpoint": {
		type: String
	},
	"Lesson": {
		type: mongoose.Types.ObjectId,
		ref: "Lessons"
	},
	"Category": {
		type: mongoose.Types.ObjectId,
		ref: "Categories"
	},
	"Questions": [{
		"QuestionId": {
			type: mongoose.Types.ObjectId,
			ref: "Questions"
		},
	}],

	//======================= start of addtionals ==========================
	"LessonVocabulary": {
		type: String
	},
	"LessonPrepare": {
		type: String
	},
	"TeacherInstructions": {
		type: String
	},
	"LessonClose": {
		type: String
	},

}, { timestamps: true });

const Trees = mongoose.models.Trees ?
	mongoose.model('Trees') :
	mongoose.model(
		"Trees",
		TreesSchema
	);

module.exports = Trees;

