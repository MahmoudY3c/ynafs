const { Schema, ObjectId } = mongoose = require("mongoose");

const ImagesSchema = new Schema({
  buffer: Buffer,
  originalname: String,
  encoding: String,
  mimetype: String,
  size: Number,
  uid: String
}, { timestamps: true });
module.exports = mongoose.models.Images ? mongoose.model('Images') : mongoose.model("Images", ImagesSchema);
//;//project.document = req.files.document[0]