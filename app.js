/*
var port = process.env.C9_PORT || 19684; 

var http = require('http'); 

http.createServer(function (req, res) { 

    res.writeHead(200, {'Content-Type': 'text/plain'}); 
    
    res.end('Que onda mundo\n'); 

}).listen(port);
*/

var express = require("express");
var app = express.createServer();
var io = require('socket.io').listen(app);


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('slides.jade');
});

app.get('/manage', function(req, res){
  res.render('manage.jade');
});



var lastSlideId = 1;

var slidesSockets = io.of("/slides");
var manageSockets = io.of("/manage");

manageSockets.on("connection", function(socket) {

  socket.on("changeto", function(slideId) {
    lastSlideId = slideId;
    slidesSockets.emit("changeto", slideId);
  });

});



slidesSockets.on("connection", function(socket) {
  socket.emit("startfrom", lastSlideId);
});



app.listen(19645);
console.log("Listening on localhost:19645");
