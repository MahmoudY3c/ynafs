const express = require("express");
const Categories = require("../../db/models/Categories");
const Semesters = require("../../db/models/Semesters");
const router = express.Router();

router.get('/', async function (req, res) {
  try {
    const { termCode } = req.query;
    const _semesters = await Semesters.findOne({ termCode }, { Lessons: 0, __v: 0 }).populate('categories');
    res.status(200).json(_semesters.categories);
  } catch (err) {
    res.status(500).json({ error: { message: err.message } })
  }
});

router.post('/', async function (req, res) {
  try {
    const { category } = req.body;
    const cat = await Categories.find({ _id: category }).populate({
      path: 'Lessons.LessonId',
      populate: {
        strictPopulate: false,
        path: 'Trees.treeId',
        populate: {
          strictPopulate: false,
          path: 'Questions',
          populate: {
            path: 'QuestionId',
          }
        }
      }
    });
    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json({ error: { message: err.message } })
  }
});

module.exports = router;
