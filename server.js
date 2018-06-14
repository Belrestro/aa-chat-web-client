const finalhandler = require('finalhandler');
const fs = require('fs');
const serveStatic = require('serve-static');
const http = require('http')
const io = require('socket.io')(http);
const webpack = require('webpack');
const config = require('./webpack.config');
const opn = require('opn');

const compiler = webpack(config);
const serverConfig = {
  port : 3000,
  init : false
};

// Debug required
process.env.NODE_ENV = 'development'

compiler.watch({
  ignored: /node_modules/,
  aggregateTimeout: 1000
}, (err, stats) => {
  if (!serverConfig.init) {
    opn(`http://localhost:${serverConfig.port}`);
    serverConfig.init = true;
    return;
  }
  if (!err) return io.emit('rebuild');
  console.log(err);
});

const serve = serveStatic('./dist', {
  'index': ['index.html'],
});

const server = http.createServer((req, res) => {
  serve(req, res, finalhandler(req, res));
});

io.attach(server, {
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

server.listen(serverConfig.port);
