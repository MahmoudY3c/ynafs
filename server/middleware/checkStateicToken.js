const createHttpError = require("http-errors")
const { YNAFS_KEY } = require("../config/appConfig");

async function checkStateicToken(req, res, next) {
  const { token } = req.query;
  const tokenHeader = req.headers.authorization
  if ((token || tokenHeader) !== YNAFS_KEY) return next(createHttpError(403));
  next();
}

module.exports = checkStateicToken