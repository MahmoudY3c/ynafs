const { Schema, ObjectId } = mongoose = require("mongoose");
const QuestionsSchema = new Schema({
	//Number of the input value
	answerValue: {
		type: Number
	},
	answer: {
		type: String
	},
	lessons: [{
		id: {
			type: mongoose.Types.ObjectId
		},
	}],
	question: {
		type: String
	},
	//Number of the option value
	questionType: {
		type: Number
	},
	choices: [{
		value: {
			type: Number
		},
		text: {
			type: String
		},
		check: {
			type: Boolean
		}
	}]
}, {timestamps: true});

QuestionsSchema.pre("save", async function (next) {
  return this._id
  next();
});

module.exports = mongoose.model("Questions", QuestionsSchema);;

