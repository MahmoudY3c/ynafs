const express = require("express");
const Lessons = require("../../db/models/Lessons");
const router = express.Router();


router.get('/', async function (req, res) {
  try {
    const { category, termCode } = req.query;
    // console.log(category);
    if (!category) throw new Error('category not exists');
    // ======================> termCode <=========================
    const lessons = await Lessons.find({
      Category: category,
      $or: [
        // if exists then get who match the termCode and if not exists just get it by category id and never use termCode option
        {
          termCode: {
            $exists: true,
            $eq: termCode,
          }
        },
        {
          termCode: {
            $exists: false,
          }
        }
      ]
    }, { __v: 0, Category: 0, Trees: 0 });

    res.status(200).json(lessons);
  } catch (err) {
    res.status(500).json({ error: { message: err.message } })
  }
})


module.exports = router;

