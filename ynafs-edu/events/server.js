const debug = require('debug')('tplus');

const dns = require("dns");
const os = require("os");
// const { logger } = require('../logs');
/**
 * Event listener for HTTP server "error" event to handle port errors
 */
function onServernError(error, port) {
  
  // logger.error(error);

  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onSeverListening(server) {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('Listening on ' + bind);

  dns.lookup(
    os.hostname(),
    {
      family: 4,
      all: true
    },
    function (err, addresses) {
      console.log(addresses)
      if (err) throw err
      // console.log(addresses)
      let localAddress = addresses.at(-1).address
      console.log(`Vist http://${localAddress}:${addr.port}/`);
    }
  )
}



module.exports = { onServernError, onSeverListening }