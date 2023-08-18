const express = require("express");
const Trees = require("../db/models/Trees");
const router = express.Router();

router.get('/', async function (req, res) {
  try {
    const { lesson } = req.query;
    if (!lesson) throw new Error('lesson not exists');
    const trees = await Trees.find({ Lesson: lesson }, { __v: 0, Questions: 0, Lesson: 0 });
    res.status(200).json(trees);
  } catch (err) {
    res.status(500).json({ error: { message: err.message } })
  }
})


module.exports = router;

