var express = require('express');
var app = express(); // function handler
var http = require('http').createServer(app); // http server
var io = require('socket.io')(http);
var path = require('path');

// Initialize app with route / (the root) "on getting a request to /, do the following"
app.get('/', function (req, res) {
    app.use(express.static(path.join(__dirname)));
    res.sendFile(path.join(__dirname, '../w06/assets', 'index.html'))
})

// Listen for an application request on port 8081
// use http listen, so we can provide a callback when listening begins
// use the callback to tell the user where to point their browser
http.listen(8081, function () {
    console.log('listening on http://127.0.0.1:8081/')
})

io.on('connection', function (socket) {
    socket.on('chatMessage', function (from, msg) {
        io.emit('chatMessage', from, msg);
    })
    socket.on('notifyUser', function (user) {
        io.emit('notifyUser', user);
    })
})
