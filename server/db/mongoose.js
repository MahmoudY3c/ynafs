const mongoose = require("mongoose");
const { mongoURI } = require("../config/appConfig");
mongoose.set('strictQuery', true);
mongoose.connect(mongoURI);
const connection = mongoose.connection;

connection.on("error", (e) => {
  console.error(e);
});

connection.once("open", () => {
  console.log("connected to db");
});