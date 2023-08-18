const crypto = require("crypto");
const ShortTimeToken = require("../db/models/ShortTimeToken");

const createToken = () => crypto.pseudoRandomBytes(32).toString("base64")
async function createTokenAndSave() {
  let token = createToken();
  let t = new ShortTimeToken({ token })
  await t.save()
  return token
}

function customizeErr(message, status) {
  let err = new Error();
  err.message = message;
  err.status = status;
  return err
}

module.exports = { createToken, createTokenAndSave, customizeErr }
