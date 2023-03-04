const express = require("express")
const router = express.Router();
const Users = require("../db/models/Users.js");

router.post('/register', function(req, res) {
	let {question, questionType} = req.body
})
router.post('/login', function(req, res) {
	let {question, questionType} = req.body
})
module.exports = router