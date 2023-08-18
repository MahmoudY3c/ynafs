const express = require("express");
const Categories = require("../../db/models/Categories");
const router = express.Router();

router.get('/', async function (req, res) {
  try {
    let cat = await Categories.find({}, { Lessons: 0, __v: 0 });
    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json({ error: { message: err.message } })
  }
});

module.exports = router;
