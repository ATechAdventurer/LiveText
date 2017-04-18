var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));
app.get('/',function (req,res) {
    res.sendfile('public/index.html');
});
app.get('/typer/id',function (req,res) {
    res.sendfile('public/chat.html');
});

var msg = "";
io.on('connection',function (socket) {
    socket.emit('typed',msg);
    socket.on('typed',function(data){
        msg = data;
        io.emit('typed',msg);
    });
})

