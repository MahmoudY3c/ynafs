const express = require("express");
const router = express.Router();
const Lessons = require("../../db/models/Lessons.js");


router.post('/', async function (req, res) {
	try {
		let { subject, drivePowerPoint } = req.body
		if (!drivePowerPoint) throw new Error("powerpoint link isn't sent !");

		const updatedLessons = await Lessons.updateMany({ subjectId: Number(subject) }, {
			$set: { drivePowerPoint }
		});

		console.log(updatedLessons);

		res.json({ success: true });
	} catch (err) {
		console.log(err.message);
		res.json({ err: err })
	}
});

router.post('/data', async function (req, res) {
	try {
		const { subject } = req.body
		const subjects = await Lessons.find({ subjectId: Number(subject) }).populate({
			path: 'Trees.treeId',
			populate: {
				strictPopulate: false,
				path: 'Questions',
				populate: {
					path: 'QuestionId',
				}
			}
		});

		res.json(subjects);
	} catch (err) {
		console.log(err.message);
		res.json({ err: err })
	}
});

module.exports = router