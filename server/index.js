const express = require("express");
const app = express();
const cors = require('cors')
const fs = require("fs");
const dbConnection = require("./db/mongoose");
const path = require("path")
const env = require("dotenv")
const {hostname, networkInterfaces} = os = require("os");
const {lookup} = dns = require("dns");
//configuartions
env.config();
const PORT = process.env.PORT

const usersRoute = require("./routes/users.js")
const questionsRoute = require("./routes/questions.js")
const lessonsRoute = require("./routes/lessons.js")
const images = require("./routes/images.js")
const extension = require("./routes/extension.js")
const any = require("./routes/any.js")


//middleaware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({origin: true}))
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', express.static(path.join(__dirname, 'ext')))


//routes
app.use(usersRoute)
app.use(questionsRoute)
app.use(lessonsRoute)
app.use(images)
app.use(extension)

// (async() => {
// 	await User.find({})
// })()
//routes

//404 page
app.get('*', async (req, res) => {
	const _404 = await fs.readFileSync("./public/404/404.html")
	res.setHeader("Content-Type", "text/html");
	res.status(404).send(_404)
})

//getting the server ip address
const nets = networkInterfaces(), addresses = []
Object.keys(nets).forEach(net => {
	nets[net].forEach(e => {
		if(e.family.match(/ipv4/i) && e.address !== "127.0.0.1") {
			addresses.push(e.address)
		}
	})
})
console.log(addresses)
app.listen(PORT, addresses[0], function() {
	console.log(`app running on http://${addresses[0]}:${PORT}`)
})
// app.listen(PORT, 'localhost', function() {
// 	console.log(`app running on http://localhost:${PORT}`)
// })