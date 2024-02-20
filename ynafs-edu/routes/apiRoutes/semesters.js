const express = require("express");
const Semesters = require("../../db/models/Semesters");
const router = express.Router();

router.get('/', async function (req, res) {
  try {
    const categories = await Semesters.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: { message: err.message } })
  }
});

module.exports = router;
