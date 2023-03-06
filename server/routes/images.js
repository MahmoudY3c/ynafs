const express = require("express")
const router = express.Router();
const Images = require("../db/models/Images")
const multer = require("multer");

const upload = multer();
fileUpload = upload.fields([
  { name: "file", maxCount: 1 },
]);


router.post("/api/images", fileUpload, async function (req, res) {
  console.log('there is a request')
  try {
    const pic = req.files.file[0], 
    { uid } = req.body;
    //check if unique {uid} is exist error
    const checkUID = await Images.find({uid: uid}, {_id: 1});
    if(checkUID.length) throw new Error("Try to change the image or upload it again");

    const image = new Images(pic)
    image.uid = uid
    // console.log(req.files)
    await image.save()
    res.status(200).json({ fileId: image._id.toString() })
  } catch (err) {
    res.status(500).json({
      err: err
    })
  }
})
router.get("/api/images", fileUpload, async function (req, res) {
  console.log('there is a request')
  try {
    const pic = req.files.file[0], 
    { uid } = req.body;
    //check if unique {uid} is exist error
    const checkUID = await Images.find({uid: uid}, {_id: 1});
    if(checkUID.length) throw new Error("Try to change the image or upload it again");

    const image = new Images(pic)
    image.uid = uid
    // console.log(req.files)
    await image.save()
    res.status(200).json({ fileId: image._id.toString() })
  } catch (err) {
    res.status(500).json({
      err: err
    })
  }
})
module.exports = router


// (async () => {
//   //console.log(await Images.find({}, {buffer: 0}))
//   console.log(await Images.find({uid: 'uid'}, {_id: 1}))
// })()