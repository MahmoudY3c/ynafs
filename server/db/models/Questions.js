const { Schema, ObjectId } = mongoose = require("mongoose");
const QuestionsSchema = new Schema({
	image: {
		type: Schema.Types.ObjectId, ref: 'Images'
	},
	lesson: {
		type: mongoose.Types.ObjectId, ref: 'Lessons'
	},
	//======================= start question =================================
	//answer index
	answer: {
		type: Number
	},
	question: {
		type: String
	},
	//Number of the option value
	questionType: {
		type: Number
	},
	choices: [{
		id: {
			type: Number,
			default: 0
		},
		title: {
			type: String,
		},
		isTrue: {
			type: Boolean,
		},
	}],
	//======================= end of question =================================

	//======================= start of addtionals ==========================
	LessonVocabulary: {
		type: String
	},
	LessonPrepare: {
		type: String
	},
	TeacherInstructions: {
		type: String
	},
	LessonClose: {
		type: String
	},
	//====================== end of addtionals ===========================
}, {timestamps: true});

module.exports = mongoose.model("Questions", QuestionsSchema);;

