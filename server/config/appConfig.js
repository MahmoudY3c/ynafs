
require("dotenv").config();
//calling logger to handle exceptions
require("../logs");

const config = {
  PORT: process.env.PORT || 5000,
  mongoURI: 'mongodb://127.0.0.1:27017/tplus',
  // 'development' === process.env.NODE_ENV ?
  //   process.env.DEV_DATABASE :
  //   process.env.NODE_ENV === 'production' ?
  //     process.env.DATABASE_URL :
  //     'mongodb://127.0.0.1:27017/tplus',
  DOMAIN: process.env.NODE_ENV === 'development' ? 'http://localhost' : process.env.DOMAIN || 'http://localhost',
  NODE_ENV: process.env.NODE_ENV || "production",
  YNAFS_KEY: process.env.YNAFS_KEY,
}

module.exports = config;
