const express = require("express");
const app = express();
const cors = require('cors')
const fs = require("fs");
const path = require("path");
const apiRoute = require("./routes");
const createError = require('http-errors');
const { NODE_ENV } = require("./config/appConfig");


//middleaware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({origin: NODE_ENV === 'development' ? true : false}))
app.use('/', express.static(path.join(__dirname, 'public')))
// app.use('/', express.static(path.join(__dirname, 'public/reactapp')))


//routes
app.use('/api', apiRoute);

//404 page
app.get('*', async (req, res) => {
	const _404 = await fs.readFileSync("./public/404/404.html")
	res.setHeader("Content-Type", "text/html");
	res.status(404).send(_404)
})

//========================================================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //handling method not allowed when path is available by another method
  // console.log(res, req.headers);
  //else send 404
  next(createError(404));

});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // console.log(err)
  res.locals.error = NODE_ENV === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error', {error: err});
});


module.exports = app;