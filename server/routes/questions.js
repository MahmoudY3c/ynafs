const express = require("express");
const mongoose = require("mongoose")
const router = express.Router();
const Questions = require("../db/models/Questions.js");
const {ObjectId} = mongoose.Types;

router.post('/api/add-question', function(req, res) {
	//let {question, questionType} = req.body
	//console.log(req.body);
	try {
		req.body.lesson = new ObjectId(req.body.lesson)
		let q = new Questions(req.body)
		console.log(q, req.body, 'llllllllllllllllllll')
		res.json({success: true})
	} catch(err) {
		res.json({err: err})
	}
})
module.exports = router