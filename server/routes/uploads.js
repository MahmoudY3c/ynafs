const express = require('express');
const multer = require('multer');
const createHttpError = require('http-errors');
const fs = require("fs")
const router = express.Router();
const path = require("path");
const { createTokenAndSave } = require("../handlers/utill")
const { DOMAIN } = require('../config/appConfig');
const { imagesStorage, filesStorage } = require('../storage/storage.js');
const ShortTimeToken = require('../db/models/ShortTimeToken');
const uploadImages = multer({ storage: imagesStorage });
const uploadFiles = multer({ storage: filesStorage });


router.get('/images/:filename', async (req, res, next) => {
  const { filename } = req.params
  res.sendFile(path.join(__dirname + "uploads/images" + filename), {}, function (err, file) {
    if (err) return next(createHttpError(404))
    else return file
  })
});

router.get('/files/:filename', async (req, res, next) => {
  const { filename } = req.params
  res.sendFile(path.join(__dirname + "uploads/images" + filename), {}, function (err, file) {
    if (err) return next(createHttpError(404))
    else return file
  })
});

router.post('/images', uploadImages.single('file'), async (req, res, next) => {
  let { filename, path } = req.file
  path = DOMAIN + "/files/" + filename + '?token=' + encodeURIComponent(await createTokenAndSave())
  res.status(200).json({
    file: { path, filename }
  });
});

router.post('/files', uploadFiles.single('file'), async (req, res, next) => {
  let { filename, path } = req.file
  path = DOMAIN + "/files/" + filename + '?token=' + encodeURIComponent(await createTokenAndSave())
  res.status(200).json({
    file: { path, filename }
  });
});

router.post('/multiple', uploadFiles.array('files'), async (req, res, next) => {
  for (let e = 0; e < req.files.length; e++) {
    let { filename, path } = req.files[e]
    path = DOMAIN + "/files/" + filename + '?token=' + encodeURIComponent(await createTokenAndSave())
    req.files[e] = { path, filename }
  }

  res.setHeader("Content-Type", "application/json; charset=utf-8")
  res.status(200).json({
    files: req.files
  });
});

router.get('/delete/:filename', async (req, res, next) => {
  const { token } = req.query
  const { filename } = req.params

  if (token) {
    let check = await ShortTimeToken.findOne({ token })
    if (!check) return next(createHttpError(403))
  } 

  try {
    fs.unlinkSync(path.join(__dirname, 'uploads/' + filename))
    return res.status(200).send({ success: true })
  } catch (err) {
    return res.status(404).send({ err: 'file not found' })
  }
});



module.exports = router;











