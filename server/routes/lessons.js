const express = require("express")
const router = express.Router();
const Lessons = require("../db/models/Lessons.js");

router.post('/api/add-lesson', function (req, res) {
  let { question, questionType } = req.body
})
router.get('/api/get-lesson', async function (req, res) {
  console.log("welcome.........")
  let l = await Lessons.find({});
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.status(200).json(l)
})

router.get('/api/get/lessonsId', async function (req, res) {
  let l = await Lessons.find({}, { _id: 1 });
  console.log("visited")
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.status(200).json(l)
})















module.exports = router

