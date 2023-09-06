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


module.exports = router