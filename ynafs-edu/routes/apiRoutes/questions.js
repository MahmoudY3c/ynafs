const express = require("express");
const router = express.Router();
const Questions = require("../../db/models/Questions.js");
const Trees = require("../../db/models/Trees.js");
const Lessons = require("../../db/models/Lessons.js");


router.post('/', async function (req, res) {
	try {
		let { image, question, tree, subject, powerpoint, drivePowerPoint, /* lesson */ } = req.body
		if (!image && !question) throw new Error("No image or question is presented !");
		delete req.body.powerpoint;
		delete req.body.drivePowerPoint;

		//saving the question
		let q = new Questions(req.body);
		await q.save();

		//save the question id and powerpoint path to tree schema 
		const payload = {
			$push: {
				Questions: { QuestionId: q._id }
			}
		}
		if (powerpoint) payload.powerpoint = powerpoint;
		await Trees.findByIdAndUpdate(tree, payload);

		// save the drive powerpoint link to the subject
		if (drivePowerPoint) {
			const updatedLessons = await Lessons.updateMany({ subjectId: Number(subject) }, {
				$set: { drivePowerPoint }
			});
			console.log(updatedLessons);
		}

		res.json({ success: true })
	} catch (err) {
		console.log(err.message);
		res.json({ err: err })
	}
});

router.get('/', async function (req, res) {
	try {
		let { id, question, populate } = req.query
		let Question
		if (id) {
			Question = await Questions.findById(id)
		} else if (question) {
			Question = await Questions.find({ question: question })
		}
		if (populate === 'true') {
			if (Question.constructor === Object) {
				//get questions
				await Question.populate("lesson");
			} else if (Question.constructor === Array && Question.length) {
				for (let Q of Question) {
					//get questions
					await Q.populate("lesson");
				}
			}
			//await Question.populate('Questions.QuestionId')
		} else if (populate === "lesson") {
			await Question.populate("lesson");
		}
		res.status(200).json(Question)
	} catch (err) {
		res.status(500).json({ err: err })
	}
})

// npsome population examples
// setTimeout(async() => {
// 	let q = await Questions.find({lesson: new ObjectId("6405909f533d3944ba99b3c1")})
// 	console.log('====================================');
// 	//console.log(q);
// 	console.log('====================================');
// 	await q[0].populate("lesson");
// 	await q[0].populate({ path: 'image' });
// 	console.log(q)
// }, 5000)

// (async() => {
// 	let k = await Lessons.findById("63fa9f1f31156691edc75107")
// 	await k.populate({
//     path: 'Questions',
//     // Get friends of friends - populate the 'friends' array for every friend
//     populate: { path: 'QuestionId' }
//   });
// 	// await k.populate('Questions.QuestionId')
// 	console.log(k.Questions.filter(e => e.QuestionId))
// })()
module.exports = router