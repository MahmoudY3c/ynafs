const express = require("express")
const router = express.Router();
const lessons = require('./apiRoutes/lessons');
const questions = require('./apiRoutes/questions');
const subjects = require('./apiRoutes/subjects');
const uploads = require('./apiRoutes/uploads');
const categories = require('./apiRoutes/categories');
const trees = require('./apiRoutes/trees');

router.use('/trees', trees);
router.use('/categories', categories);
router.use('/questions', questions);
router.use('/subjects', subjects);
router.use('/uploads', uploads);
router.use('/lessons', lessons);

module.exports = router;
