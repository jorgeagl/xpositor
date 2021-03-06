var ctx, color = "#000";
var socket = io.connect('http://localhost:19645');
document.addEventListener( "DOMContentLoaded", function(){ 
	setTimeout(function(){ 
		newCanvas();

	}, 1000); 
}, false );

function newCanvas(){
    document.getElementById("content").style.height = window.innerHeight-0;
    var canvas = '<canvas id="canvas" width="'+window.innerWidth+'" height="'+(window.innerHeight-0)+'"></canvas>';
	document.getElementById("content").innerHTML = canvas;
	ctx=document.getElementById("canvas").getContext("2d");
	ctx.strokeStyle = color;
	ctx.lineWidth = 5;	
    drawTouch();
    drawPointer();
	drawMouse();
	socket.emit('sendnew');
}
        
function selectColor(el){
    for(var i=0;i<document.getElementsByClassName("palette").length;i++){
        document.getElementsByClassName("palette")[i].style.borderColor = "#777";
        document.getElementsByClassName("palette")[i].style.borderStyle = "solid";
    }
    el.style.borderColor = "#fff";
    el.style.borderStyle = "dashed";
    color = window.getComputedStyle(el).backgroundColor;
    ctx.beginPath();
    ctx.strokeStyle = color;
    socket.emit('sendColor', { color:color });

}

var drawTouch = function() {
	var start = function(e) {
		ctx.beginPath();
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY-3;
		ctx.moveTo(x,y);
	};
	var move = function(e) {
		e.preventDefault();
		x = e.changedTouches[0].pageX;
		y = e.changedTouches[0].pageY-3;
		ctx.lineTo(x,y);
		ctx.stroke();
	};
    document.getElementById("canvas").addEventListener("touchstart", start, false);
	document.getElementById("canvas").addEventListener("touchmove", move, false);
}; 
    
var drawPointer = function() {
	var start = function(e) {
        e = e.originalEvent;
		ctx.beginPath();
		x = e.pageX;
		y = e.pageY-3;
		ctx.moveTo(x,y);
	};
	var move = function(e) {
		console.log('movimiento');
		e.preventDefault();
        e = e.originalEvent;
		x = e.pageX;
		y = e.pageY-3;
		ctx.lineTo(x,y);
		ctx.stroke();
    };
    document.getElementById("canvas").addEventListener("MSPointerDown", start, false);
	document.getElementById("canvas").addEventListener("MSPointerMove", move, false);
};        

// prototype to	start drawing on mouse using canvas moveTo and lineTo
var drawMouse = function() {
	var clicked = 0;

	var start = function(e) {
		clicked = 1;
		ctx.beginPath();
		x = e.pageX;
		y = e.pageY-3;
		ctx.moveTo(x,y);
		socket.emit('send', { xm: x, ym:y});
	};
	var move = function(e) {
		if(clicked){
			x = e.pageX;
			y = e.pageY-3;
			ctx.lineTo(x,y);
			ctx.stroke();
			socket.emit('send', { x: x, y:y});
		}
	};
	var stop = function(e) {
		clicked = 0;
	}; 
    document.getElementById("canvas").addEventListener("mousedown", start, false);
	document.getElementById("canvas").addEventListener("mousemove", move, false);
	document.addEventListener("mouseup", stop, false);

	socket.on('sendto', function(draw){
				ctx.strokeStyle = draw.draw.color;
				ctx.moveTo(draw.draw.xm,draw.draw.ym);
				ctx.lineTo(draw.draw.x,draw.draw.y);
				ctx.stroke();
			});

	socket.on('colorto', function(color){
		ctx.beginPath();
    	ctx.strokeStyle = color.color;
	});

	socket.on('newto', function(){
		document.getElementById("content").style.height = window.innerHeight-0;
	    var canvas = '<canvas id="canvas" width="'+window.innerWidth+'" height="'+(window.innerHeight-0)+'"></canvas>';
		document.getElementById("content").innerHTML = canvas;
		ctx=document.getElementById("canvas").getContext("2d");
		ctx.strokeStyle = color;
		ctx.lineWidth = 5;
		drawTouch();
	    drawPointer();
		drawMouse();
	});

};