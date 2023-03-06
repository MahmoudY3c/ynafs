const { Schema, ObjectId } = mongoose = require("mongoose");
const LessonsSchema = new Schema({
	// learningType: {
	// 	type: String
	// },
	// learningTypeId: {
	// 	type: Number
	// },
	// level: {
	// 	type: String
	// },
	// levelId: {
	// 	type: Number
	// },
	// term: {
	// 	type: String
	// },
	// termId: {
	// 	type: Number
	// },
	// subject: {
	// 	type: String
	// },
	// subjectId: {
	// 	type: Number
	// },
	// unit: {
	// 	type: String
	// },
	// unitId: {
	// 	type: Number
	// },
	// lesson: {
	// 	type: String
	// },
	// lessonId: {
	// 	type: Number
	// },
	// tree: {
	// 	type: String
	// },
	// treeId: {
	// 	type: Number
	// },
	"categeory": {
		type: String
	},
	"categeoryId": {
		type: Number
	},
	"categeoryCode": {
		type: String
	},
	"learningType": {
		type: String
	},
	"learningTypeId": {
		type: Number
	},
	"learningTypeCode": {
		type: String
	},
	"level": {
		type: String
	},
	"levelId": {
		type: Number
	},
	"levelCode": {
		type: String
	},
	"subject": {
		type: String
	},
	"subjectId": {
		type: Number
	},
	"subjectCodeId": {
		type: String
	},
	"subjectItemId": {
		type: String,
		default: null,
	},
	"subjectUnitID": {
		type: String,
		default: null,
	},
	"subjectChapterId": {
		type: String,
		default: null,
	},
	"subjectSubjectGroupId": {
		type: Number
	},
	"subjectTeacherGuidCount": {
		type: Number,
	},
	"subjectHasTeacherGuides": {
		type: Boolean,
	},
	"unitId": {
		type: Number,
	},
	"unit": {
		type: String,
	},
	"unitParentId": {
		type: Number,
	},
	"unitSubjectBook": {
		type: Array,
	},
	"tree": {
		type: String,
	},
	"treeId1": {
		type: Number,
	},
	"treeId2": {
		type: Number,
	},
	"treeLessonId": {
		type: Number,
	},
	"treeCodeId": {
		type: String,
	},
	"lesson": {
		type: String,
	},
	"lessonId": {
		type: Number,
	},
	"lessonParentId": {
		type: Number,
	},
	"Chapter": {
		type: String,
	},
	"ChapterId": {
		type: Number,
	},
	"ChapterParentId": {
		type: Number,
	},
	Questions: [{
		QuestionId: {
			type: mongoose.Types.ObjectId,
			ref: "Questions"
		},
	}],
}, { timestamps: true });
module.exports = mongoose.model("Lessons", LessonsSchema);;
