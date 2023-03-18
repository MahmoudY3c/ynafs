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
//image to file
//new File([new Uint8Array(obj.buffer.data)], obj.originalname, {type: obj['mimetype']})
/*

toimage:
function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}
let arr = new Uint8Array(obj.buffer.data)
new File([arr], obj.originalname, {type: obj['mimetype']})
let image = document.createElement("img");
image.src="data:image/jpeg;base64,"+_arrayBufferToBase64(arr)
document.body.append(image)

Example: 

fetch("http://ynafs.com:5000/api/lessons?level=%D8%A7%D9%84%D8%B5%D9%81%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%D8%A7%D9%84%D8%A7%D8%A8%D8%AA%D8%AF%D8%A7%D8%A6%D9%8A&populate=true").then(e=>e.json()).then(e=>e.filter(b => b.Questions.length))
.then(q => {
  function _arrayBufferToBase64( buffer ) {
    let binary = '';
    let bytes = new Uint8Array( buffer );
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }
  let data = q[1].Questions[0].QuestionId.image;
  let buff = data.buffer
  let arr = new Uint8Array(buff.data)
  let image = document.createElement("img");
  image.src="data:image/jpeg;base64,"+_arrayBufferToBase64(arr)
  document.body.append(image)
  onsole.log(buff)
)
*/

// (async () => {
//   //console.log(await Images.find({}, {buffer: 0}))
//   console.log(await Images.find({uid: 'uid'}, {_id: 1}))
// })()