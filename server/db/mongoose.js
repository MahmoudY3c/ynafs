const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL);

const connection = mongoose.connection;

connection.on("error", (e) => {
  console.error(e);
});
connection.once("open", () => {
  console.log("connected to db");
});