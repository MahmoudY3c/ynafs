const { Schema, ObjectId } = mongoose = require("mongoose");
const LessonsSchema = new Schema({
	learningType: {
		type: String
	},
	learningTypeId: {
		type: Number
	},
	level: {
		type: String
	},
	levelId: {
		type: Number
	},
	term: {
		type: String
	},
	termId: {
		type: Number
	},
	subject: {
		type: String
	},
	subjectId: {
		type: Number
	},
	unit: {
		type: String
	},
	unitId: {
		type: Number
	},
	lesson: {
		type: String
	},
	lessonId: {
		type: Number
	},
	tree: {
		type: String
	},
	treeId: {
		type: Number
	},
	Questions: [{
		id: {
			type: mongoose.Types.ObjectId
		},
	}]
	// einURLS: {
	// 	parents: {
	// 		type: String,
	// 	},
	// 	tree: {
	// 		type: String,
	// 	},
	// 	children: {
	// 		type: String,
	// 	}
	// }
}, {timestamps: true});
module.exports = mongoose.model("Lessons", LessonsSchema);;