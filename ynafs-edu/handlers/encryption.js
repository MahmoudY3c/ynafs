
const crypto = require("crypto");
const base64url = require("base64url");
const { RSASECRET, RSAPUBLIC } = require("../configurations/appConfig");


function createSignture(data, privateKey = RSASECRET, algo = 'RSA-SHA256') {
  const signatureCreator = crypto.createSign(algo);
  const header = base64url(JSON.stringify({ algo }))
  const payload = base64url(data);

  signatureCreator.write([header, payload].join("."));
  signatureCreator.end();

  let signature = signatureCreator.sign(privateKey, 'base64')
  signature = base64url.fromBase64(signature);

  return encodeURIComponent([header, payload, signature].join("."))
}

function verifySignture(token, publicKey = RSAPUBLIC, algo = 'RSA-SHA256') {
  let verifyer = crypto.createVerify(algo);
  token = decodeURIComponent(token);
  let [Header, Payload, Signature] = token.split('.');

  verifyer.write([Header, Payload].join("."));
  verifyer.end();

  Signature = base64url.toBase64(Signature);
  let isValid = verifyer.verify(publicKey, Signature, 'base64');
  return isValid
}

function encrypt(data, key = RSASECRET, keyType = 'private', enc = 'Encrypt') {
  const arrayBuffer = Buffer.from(data, 'utf-8')
  //method is like cryptso.publicEncrypt(key, arrayBuffer)
  const encrypt = crypto[`${keyType}${enc}`](key, arrayBuffer)
  return encrypt.toString('base64');
}

function decrypt(data, key = RSAPUBLIC, keyType = 'public') {
  // console.log(key, keyType, 'Decrypt')
  return encrypt(key, data, keyType, 'Decrypt')
}

function hash(data, digest = 'hex', algo = "sha256") {
  const hash = crypto.createHash(algo);
  hash.update(data);
  const _hash = hash.digest(digest)
  return { hash: _hash, algo, digest}
}

function generateHashToken(data, key = RSASECRET, keyType = 'private', enc = 'Encrypt') {
  //first step encrypt the data
  const encrypted = encrypt(data, key, keyType, enc);

  //one more step create a hash of the encrypted data
  const hashed = hash(encrypted);

  return hashed
}

function verifyHashToken(dataHash, data, key = RSASECRET, keyType = 'private', enc = 'Encrypt') {
  //first step encrypt the data
  const encrypted = encrypt(data, key, keyType, enc);

  //create a hash from the encrypted data
  const {hash: verifyHash} = hash(encrypted);

  //check if the hash is match
  return verifyHash === dataHash
}


module.exports = {
  createSignture,
  verifySignture,
  encrypt,
  decrypt,
  hash,
  generateHashToken,
  verifyHashToken
}