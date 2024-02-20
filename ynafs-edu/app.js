const express = require("express");
const app = express();
const cors = require('cors')
const path = require("path");
const apiRoute = require("./routes/api");
const indexRoute = require("./routes");
const createError = require('http-errors');
const { NODE_ENV } = require("./config/appConfig");
const checkStateicToken = require("./middleware/checkStateicToken");

//middleaware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: NODE_ENV === 'development' ? true : false }))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(checkStateicToken);
app.use('/', express.static(path.join(__dirname, 'build')))


//routes
app.use('/api', apiRoute);
app.use('/', indexRoute);

//========================================================

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.status = err.status || 500;
  // console.log(err)
  res.locals.error = NODE_ENV === 'development' ? err : {};
  // render the error page
  res.status(res.locals.status);
  res.render('error');
});


module.exports = app;