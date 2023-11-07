const express = require("express");
const Lessons = require("../../db/models/Lessons");
const router = express.Router();


router.get('/', async function (req, res) {
  try {
    const { category, termCode } = req.query;
    if (!category) throw new Error('category not exists');
    const lessons = await Lessons.find({ Category: category, termCode }, { __v: 0, Category: 0, Trees: 0 });

    res.status(200).json(lessons);
  } catch (err) {
    res.status(500).json({ error: { message: err.message } })
  }
})


module.exports = router;

