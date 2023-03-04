const express = require("express")
const router = express.Router();
const images = require("../db/models/images.js");
const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 20000000,
  },
});
fileUpload = upload.fields([
  { name: "filename", maxCount: 1 },
]);

router.post("/api/images", fileUpload, function(req, res) {
  console.log(req.file, req.body)
})
module.exports = router
