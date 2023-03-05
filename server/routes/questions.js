const express = require("express");
const mongoose = require("mongoose")
const router = express.Router();
const Questions = require("../db/models/Questions.js");
const Images = require("../db/models/Images.js");
const Lessons = require("../db/models/Lessons.js");
const {ObjectId} = mongoose.Types;

router.post('/api/add-question', async function(req, res) {
	try {
		let {lesson, image} = req.body
		//convert lesson string to ObjectId to use it in population 
		lesson = new ObjectId(lesson);
		//get image id by generated {uid} to use it in population 
		image = await Images.findOne({uid: req.body.image}, {buffer: 0})
		if(!image) throw "Image Not Found !"
		//setting the ids to boyd before saving the data
		req.body.image = image._id
		req.body.lesson = new ObjectId(lesson)
		//saving the question
		let q = new Questions(req.body);
		await q.save()
		//save the question id to lesson schema 
		let saveToLesson = await Lessons.findByIdAndUpdate(lesson, {
			$push: { 
				Questions: {QuestionId: q._id} 
			}
		})
		res.json({success: true})
	} catch(err) {
		console.log(err)
		res.json({err: err})
	}
});


//some population examples
// setTimeout(async() => {
// 	let q = await Questions.findById("640467d1d01ea349308b8abf")
// 	await q.populate("lesson");
// 	await q.populate({ path: 'image', select: 'originalname' });
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