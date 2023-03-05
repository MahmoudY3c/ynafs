const express = require("express")
const router = express.Router();
const Lessons = require("../db/models/Lessons.js");
const fs = require("fs");

router.get('/status', function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.json({ status: false })
})
router.get('/ext/o.js', async function (req, res) {
  const o = await fs.readFileSync("../ext/o.js")
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(o)
})
module.exports = router