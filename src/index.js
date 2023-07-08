const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const app = express();
const http = require('http');

app.set('port', 3000);
app.use(express.static(path.join(__dirname, 'public'), { type: 'text/javascript' }));

const server = http.createServer(app);
const io = socketio(server);
require('./socket')(io);

server.listen(app.get('port'), () => {
  console.log('App corriendo en el puerto: ' + app.get('port'));
});


