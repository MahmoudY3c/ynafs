const { Schema, ObjectId } = mongoose = require("mongoose");
const ImagesSchema = new Schema({
	document: {
    name: String,
    buffer: Buffer,
    type: String,
  },
}, {timestamps: true});
module.exports = mongoose.model("Images", ImagesSchema);;