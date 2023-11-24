const https = require('https');
const http = require('http')
const fs = require("fs");
const path = require("path");
const app = require("./app");
require("./db/mongoose");
const { onServernError, onSeverListening } = require("./events/server");
const { NODE_ENV, PORT, HTTPS_PORT } = require('./config/appConfig');
const { createToken } = require('./handlers/utill');


//run the http server in development / production mode but not in test mode
if ('development' === NODE_ENV || 'production' === NODE_ENV) {
	const httpServer = http.createServer(app)
	httpServer.listen(PORT);

	httpServer.on("error", (err) => onServernError(err, PORT))
	httpServer.on('listening', () => onSeverListening(httpServer))
}

if('production' === NODE_ENV) {
	const httpsConfig = {
		key: fs.readFileSync(path.resolve(__dirname, '../../etc/letsencrypt/live/ynafs.com-0001/privkey.pem')),
		cert: fs.readFileSync(path.resolve(__dirname, '../../etc/letsencrypt/live/ynafs.com-0001/fullchain.pem'))
	}
	//handle https server
	const httpsServer = https.createServer(httpsConfig, app)
	//in test mode run the https server 
	httpsServer.listen(HTTPS_PORT);

	httpsServer.on("error", (err) => onServernError(err, HTTPS_PORT))
	httpsServer.on('listening', () => onSeverListening(httpsServer))
}

// console.log(createToken());