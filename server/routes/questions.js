const express = require("express")
const router = express.Router();
const Questions = require("../db/models/Questions.js");

router.post('/api/add-question', function(req, res) {
	//let {question, questionType} = req.body
	console.log(req.body);
	try {
		res.json({success: true})
	} catch(err) {
		res.json({err: err})
	}
})
module.exports = router