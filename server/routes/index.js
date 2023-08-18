const express = require("express")
const router = express.Router();
const lessons = require('./lessons');
const questions = require('./questions');
const uploads = require('./uploads');
const categories = require('./categories');
const trees = require('./trees');

router.use('/trees', trees);
router.use('/categories', categories);
router.use('/questions', questions);
router.use('/uploads', uploads);
router.use('/lessons', lessons);

module.exports = router;
