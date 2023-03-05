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




const d = [
  {
    "learningType": "الثانوية مسارات",
    "learningTypeId": 27554,
    "level": "السنة الثانية",
    "levelId": 33498,
    "term": "الفصل الدراسي الثالث",
    "termId": 33501,
    "subject": "الأحياء 2-3",
    "subjectId": 33574,
    "unit": "التكاثر الخلوي",
    "unitId": 33579,
    "lesson": "الانقسام المتساوي وانقسام السيتوبلازم",
    "lessonId": 133807,
    "tree": "تفسير سورة إبراهيم 42 – 46",
    "treeId": 7457,
    "_treeId": 3560,
    "treeCodeId": "U",
    "treeSubjectGroupId": 2,
    "treeLessonId": 43927,
    "treeLessonOrder": 29,
    "categeory": "التعليم العام",
    "categeoryId": 5142,
    "categeoryCode": "GE",
    "learningTypeCode": "CBM",
    "levelCode": "TRC2",
    "termCode": "SM3",
    "subjectCodeId": "BLOG2.3",
    "unitCodeId": "CH",
    "lessonCodeId": "CH"
  },
  {
    "learningType": "الثانوية مسارات",
    "learningTypeId": 27554,
    "level": "السنة الثانية",
    "levelId": 33498,
    "term": "الفصل الدراسي الثالث",
    "termId": 33501,
    "subject": "الأحياء 2-3",
    "subjectId": 33574,
    "unit": "التكاثر الخلوي",
    "unitId": 33579,
    "lesson": "تنظيم دورة الخلية ",
    "lessonId": 133808,
    "tree": "تفسير سورة إبراهيم 42 – 46",
    "treeId": 7457,
    "_treeId": 3560,
    "treeCodeId": "U",
    "treeSubjectGroupId": 2,
    "treeLessonId": 43927,
    "treeLessonOrder": 29,
    "categeory": "التعليم العام",
    "categeoryId": 5142,
    "categeoryCode": "GE",
    "learningTypeCode": "CBM",
    "levelCode": "TRC2",
    "termCode": "SM3",
    "subjectCodeId": "BLOG2.3",
    "unitCodeId": "CH",
    "lessonCodeId": "CH"
  },
  {
    "learningType": "الثانوية مسارات",
    "learningTypeId": 27554,
    "level": "السنة الثانية",
    "levelId": 33498,
    "term": "الفصل الدراسي الثالث",
    "termId": 33501,
    "subject": "الأحياء 2-3",
    "subjectId": 33574,
    "unit": "التكاثر الجنسي والوراثة",
    "unitId": 33580,
    "lesson": " الوراثة المندلية",
    "lessonId": 133810,
    "tree": "تفسير سورة إبراهيم 42 – 46",
    "treeId": 7457,
    "_treeId": 3560,
    "treeCodeId": "U",
    "treeSubjectGroupId": 2,
    "treeLessonId": 43927,
    "treeLessonOrder": 29,
    "categeory": "التعليم العام",
    "categeoryId": 5142,
    "categeoryCode": "GE",
    "learningTypeCode": "CBM",
    "levelCode": "TRC2",
    "termCode": "SM3",
    "subjectCodeId": "BLOG2.3",
    "unitCodeId": "CH",
    "lessonCodeId": "CH"
  },
  {
    "learningType": "الثانوية مسارات",
    "learningTypeId": 27554,
    "level": "السنة الثانية",
    "levelId": 33498,
    "term": "الفصل الدراسي الثالث",
    "termId": 33501,
    "subject": "الأحياء 2-3",
    "subjectId": 33574,
    "unit": "التكاثر الجنسي والوراثة",
    "unitId": 33580,
    "lesson": "  ارتباط الجينات وتعدد المجموعات الكروموسومية ",
    "lessonId": 133811,
    "tree": "تفسير سورة إبراهيم 42 – 46",
    "treeId": 7457,
    "_treeId": 3560,
    "treeCodeId": "U",
    "treeSubjectGroupId": 2,
    "treeLessonId": 43927,
    "treeLessonOrder": 29,
    "categeory": "التعليم العام",
    "categeoryId": 5142,
    "categeoryCode": "GE",
    "learningTypeCode": "CBM",
    "levelCode": "TRC2",
    "termCode": "SM3",
    "subjectCodeId": "BLOG2.3",
    "unitCodeId": "CH",
    "lessonCodeId": "CH"
  },
  {
    "learningType": "الثانوية مسارات",
    "learningTypeId": 27554,
    "level": "السنة الثانية",
    "levelId": 33498,
    "term": "الفصل الدراسي الثالث",
    "termId": 33501,
    "subject": "الأحياء 2-3",
    "subjectId": 33574,
    "unit": "الوراثة المعقدة والوراثة البشرية",
    "unitId": 33581,
    "lesson": "الأنماط الوراثية المعقدة",
    "lessonId": 133813,
    "tree": "تفسير سورة إبراهيم 42 – 46",
    "treeId": 7457,
    "_treeId": 3560,
    "treeCodeId": "U",
    "treeSubjectGroupId": 2,
    "treeLessonId": 43927,
    "treeLessonOrder": 29,
    "categeory": "التعليم العام",
    "categeoryId": 5142,
    "categeoryCode": "GE",
    "learningTypeCode": "CBM",
    "levelCode": "TRC2",
    "termCode": "SM3",
    "subjectCodeId": "BLOG2.3",
    "unitCodeId": "CH",
    "lessonCodeId": "CH"
  },
  {
    "learningType": "الثانوية مسارات",
    "learningTypeId": 27554,
    "level": "السنة الثانية",
    "levelId": 33498,
    "term": "الفصل الدراسي الثالث",
    "termId": 33501,
    "subject": "الأحياء 2-3",
    "subjectId": 33574,
    "unit": "الوراثة المعقدة والوراثة البشرية",
    "unitId": 33581,
    "lesson": "الكروموسومات ووراثة الإنسان",
    "lessonId": 133814,
    "tree": "تفسير سورة إبراهيم 42 – 46",
    "treeId": 7457,
    "_treeId": 3560,
    "treeCodeId": "U",
    "treeSubjectGroupId": 2,
    "treeLessonId": 43927,
    "treeLessonOrder": 29,
    "categeory": "التعليم العام",
    "categeoryId": 5142,
    "categeoryCode": "GE",
    "learningTypeCode": "CBM",
    "levelCode": "TRC2",
    "termCode": "SM3",
    "subjectCodeId": "BLOG2.3",
    "unitCodeId": "CH",
    "lessonCodeId": "CH"
  },
  {
    "learningType": "الثانوية مسارات",
    "learningTypeId": 27554,
    "level": "السنة الثانية",
    "levelId": 33498,
    "term": "الفصل الدراسي الثالث",
    "termId": 33501,
    "subject": "الأحياء 2-3",
    "subjectId": 33574,
    "unit": "الوراثة الجزيئية",
    "unitId": 33582,
    "lesson": "DNA تضاعف",
    "lessonId": 133816,
    "tree": "تفسير سورة إبراهيم 42 – 46",
    "treeId": 7457,
    "_treeId": 3560,
    "treeCodeId": "U",
    "treeSubjectGroupId": 2,
    "treeLessonId": 43927,
    "treeLessonOrder": 29,
    "categeory": "التعليم العام",
    "categeoryId": 5142,
    "categeoryCode": "GE",
    "learningTypeCode": "CBM",
    "levelCode": "TRC2",
    "termCode": "SM3",
    "subjectCodeId": "BLOG2.3",
    "unitCodeId": "CH",
    "lessonCodeId": "CH"
  },
  {
    "learningType": "الثانوية مسارات",
    "learningTypeId": 27554,
    "level": "السنة الثانية",
    "levelId": 33498,
    "term": "الفصل الدراسي الثالث",
    "termId": 33501,
    "subject": "الأحياء 2-3",
    "subjectId": 33574,
    "unit": "الوراثة الجزيئية",
    "unitId": 33582,
    "lesson": "DNA وRNA والبروتين",
    "lessonId": 133817,
    "tree": "تفسير سورة إبراهيم 42 – 46",
    "treeId": 7457,
    "_treeId": 3560,
    "treeCodeId": "U",
    "treeSubjectGroupId": 2,
    "treeLessonId": 43927,
    "treeLessonOrder": 29,
    "categeory": "التعليم العام",
    "categeoryId": 5142,
    "categeoryCode": "GE",
    "learningTypeCode": "CBM",
    "levelCode": "TRC2",
    "termCode": "SM3",
    "subjectCodeId": "BLOG2.3",
    "unitCodeId": "CH",
    "lessonCodeId": "CH"
  },
];

// (async() => {
// 	for(let i of d) {
// 		let l = new Lessons(i)
// 		await l.save()
// 	}
// })()










module.exports = router

