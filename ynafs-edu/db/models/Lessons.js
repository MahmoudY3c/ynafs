const mongoose = require("mongoose");
const { Schema } = mongoose;

const LessonsSchema = new Schema({
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
	"levelCodeId": {
		type: String
	},
	"levelItemId": {
		type: String,
	},
	"levelUnitID": {
		type: String,
	},
	"levelChapterId": {
		type: String,
	},
	"levelSubjectGroupId": {
		type: Number,
	},
	"levelTeacherGuidCount": {
		type: Number,
	},
	"levelHasTeacherGuides": {
		type: Boolean,
	},
	"level1": {
		type: String
	},
	"level1Id": {
		type: Number
	},
	"level1Code": {
		type: String
	},
	"level1CodeId": {
		type: String
	},
	"level1ItemId": {
		type: String,
	},
	"level1UnitID": {
		type: String,
	},
	"level1ChapterId": {
		type: String,
	},
	"level1SubjectGroupId": {
		type: Number,
	},
	"level1TeacherGuidCount": {
		type: Number,
	},
	"level1HasTeacherGuides": {
		type: Boolean,
	},
	"term": {
		type: String,
	},
	"termId": {
		type: Number,
	},
	"termCode": {
		type: String,
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
	"unitCodeType": {
		type: String,
		default: "UNIT",
	},
	"unitCodeId": {
		type: String,
		default: "U",
	},
	"unit": {
		type: String,
	},
	"unitParentId": {
		type: Number,
	},
	"unitSubjectBooks": {
		type: Array,
	},
	"chapter": {
		type: String,
	},
	"chapterFullPath": {
		type: String,
	},
	"chapterId": {
		type: Number,
	},
	"chapterParentId": {
		type: Number,
	},
	"Trees": [{
		treeId: {
			type: mongoose.Types.ObjectId,
			ref: "Trees"
		},
	}],
	Category: {
		type: mongoose.Types.ObjectId,
		ref: "Categories"
	}
}, { timestamps: true, /* strict: 'throw' */ });

const Lessons = mongoose.models.Lessons ?
	mongoose.model('Lessons') :
	mongoose.model(
		"Lessons",
		LessonsSchema
	);

module.exports = Lessons;

