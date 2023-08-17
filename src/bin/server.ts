import http from 'http';

import app from '../app';
import { config } from '../config';

/**
 * Normalize a port into a number, string, or false.
 */

const port = (function normalizePort(val: string) {
  const portNumber = parseInt(val, 10);

  if (isNaN(portNumber)) {
    // named pipe
    return val;
  }

  if (portNumber >= 0) {
    // port number
    return portNumber;
  }

  process.exit(1);
})(config.PORT);

app.set('port', port);
const server = http.createServer(app);

/**
 * Connect to mongodb and start the webserver listening on provided port, on all network interfaces.
 */
void (async function initServer() {
  try {
    // SERVER
    server.listen(port);
  } catch (error) {
    process.exit(1);
  }
})();

server.on('error', onError);
server.on('listening', onListening);

if (config.IS_LOCAL) {
  process.on('SIGINT', onInterruptSignal); // CTRL+C
  process.on('SIGQUIT', onInterruptSignal); // Keyboard quit
  process.on('SIGTERM', onInterruptSignal); // `kill` command
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: { syscall: string; code: string }) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = `${typeof port === 'string' ? 'Pipe' : 'Port'} ${port}`;
  console.log(port);
  console.log(error);
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.log(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address() || '';
  const typeofAddr = typeof addr === 'string';
  const bind = typeofAddr ? `pipe ${port}` : `port ${port}`;

  console.log(`Listening on ${bind}`);

  if (config.IS_LOCAL) {
    console.log(`Server listening on http://localhost:${port}/api-docs`);
  }
}

/**
 * Event listener for interrupt signal
 */

function onInterruptSignal() {
  try {
    console.log('Quitting app');
    process.removeAllListeners();
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
}