
const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionsSchema = new Schema({
	image: {
		type: String
	},
	tree: {
		type: Schema.Types.ObjectId, ref: 'Trees' 
	},
	lesson: {
		type: Schema.Types.ObjectId, ref: 'Trees' 
	},
	category: {
		type: Schema.Types.ObjectId, ref: 'Trees' 
	},
	//======================= start question =================================
	//answer index
	answer: {
		type: Number
	},
	essayAnswer: {
		type: String
	},
	question: {
		type: String
	},
	//Number of the option value
	QuestionTypeValue: {
		type: String
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

const Questions = mongoose.models.Questions ?
mongoose.model('Questions') :
mongoose.model(
	"Questions",
	QuestionsSchema
);

module.exports =  Questions;

