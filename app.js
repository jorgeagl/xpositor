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
var html2jade = require('html2jade');
var fs  = require("fs");

app.configure(function(){
  app.use('/public', express.static(__dirname + '/public'));  
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  //app.use(express.urlencoded());
  //app.use(express.json()); 
});


app.get('/', function(req, res){
  res.render('pagina.jade');
});

app.get('/manage', function(req, res){
  res.render('manage.jade');
});

app.get('/admin', function(req, res){
  res.render('admin.jade');
});

app.post('/convert', function(req, res){
  html2jade.convertHtml(req.body.html, {bodyless:true}, function (err, jade) { //CONVERT TO JADE
  var filename='./views/pagina.jade';
  var script = 'script(src="/js/client.js", type="text/javascript", charset="utf-8")';
    
    fs.writeFile(filename, jade, function(err){
      if(!err){
        fs.appendFile(filename, script);
        res.send({ success:1 });
        res.end();
      }else{
        res.send(500, { error: err });
        throw err;
        res.end(); 
      }
    });
  });
  
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
