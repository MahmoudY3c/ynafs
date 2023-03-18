const express = require("express")
const router = express.Router();
const Lessons = require("../db/models/Lessons.js");
const Questions = require("../db/models/Questions.js");

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
});

router.post('/api/get/add-lesson', async function (req, res) {
  let lesson = new Lessons(req.body)
  await lesson.save()
  res.status(200).json(lesson._id)
})
//req: /api/lessons/?id=dsdsawdas&populate=question
router.get('/api/lessons', async function (req, res) {
  try {
    let { id, lessonName, unit, chapter, level, unitId, lessonId, treeId, populate } = req.query
    let lesson
    console.log(req.query)
    if (id) {
      lesson = await Lessons.findById(id)
    } else if (lessonName) {
      lesson = await Lessons.find({ lesson: lessonName })
    } else if (unit) {
      lesson = await Lessons.find({ unit: unit })
    } else if (chapter) {
      lesson = await Lessons.find({ chapter: chapter })
    } else if (level) {
      lesson = await Lessons.find({ level: level })
    } else if (unitId) {
      lesson = await Lessons.find({ unitId: unitId })
    } else if (lessonId) {
      lesson = await Lessons.find({ lessonId: lessonId })
    } else if (treeId) {
      lesson = await Lessons.find({ treeId1: treeId })
    }
    if (populate === 'true') {
      if (lesson.constructor === Object) {
        //get questions
        await lesson.populate({
          path: 'Questions',
          populate: { path: 'QuestionId' }
        });
        //get question image
        await lesson.populate({
          path: 'Questions',
          populate: { path: 'QuestionId.image' },
          strictPopulate: false
        })
      } else if (lesson.constructor === Array && lesson.length) {
        for (let l of lesson) {
          //get questions
          await l.populate({
            path: 'Questions',
            populate: { path: 'QuestionId' }
          });
          //get question image
          await l.populate({
            path: 'Questions',
            populate: { path: 'QuestionId.image' },
            strictPopulate: false
          })
        }
      }
      //await lesson.populate('Questions.QuestionId')
    } else if (populate === "question") {
      await lesson.populate({
        path: 'Questions',
        populate: { path: 'QuestionId' }
      });
    }
    res.status(200).json(lesson)
  } catch(err) {
    console.log(err)
    res.status(500).json({err: err})
  }
})















module.exports = router

