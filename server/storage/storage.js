const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const path = require("path");

function _storageConfig(filesPath) {
  return {
    destination: function (req, file, callabck) {
      callabck(null, filesPath);
    },
    filename: function (req, file, callabck) {
      const filename = uuidv4();
      const timestamp = Date.now();
      const originalname = Buffer.from(file.originalname, "latin1").toString("utf8")
      // console.log(originalname);
      //genereate unique random name for any new file
      callabck(null, `${filename}--${timestamp}${path.extname(originalname)}`);
    },
  }
}

const imagesStorage = multer.diskStorage(_storageConfig(path.join(__dirname, "../uploads/images")));

const filesStorage = multer.diskStorage(_storageConfig(path.join(__dirname, "../uploads/files")));

exports.imagesStorage = imagesStorage
exports.filesStorage = filesStorage
