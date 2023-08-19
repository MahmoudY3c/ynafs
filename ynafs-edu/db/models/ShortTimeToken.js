const { milliseconds } = require('../../handlers/time');

const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShortTimeTokenSchema = new Schema({
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: milliseconds.minutes(5) }, 
});

const ShortTimeToken = mongoose.models.ShortTimeToken ? mongoose.model('ShortTimeToken') : mongoose.model("ShortTimeToken", ShortTimeTokenSchema);
module.exports = ShortTimeToken;