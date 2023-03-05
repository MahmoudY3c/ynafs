const express = require("express")
const router = express.Router();
const Images = require("../db/models/images.js");
const multer = require("multer");

const upload = multer();
fileUpload = upload.fields([
  { name: "file", maxCount: 1 },
]);
(async () => {
  console.log(await Images.find({}, {buffer: 0}))
})()

router.all("/api/images", fileUpload, async function (req, res) {
  try {
    const pic = req.files.file[0], { uid } = req.body
    const image = new Images(pic)
    image.uid = uid
    //await image.save()
    res.json({ fileId: image._id.toString() })
  } catch (err) {
    res.json(err)
  }
})
module.exports = router
