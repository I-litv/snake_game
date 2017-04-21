var canvas = getElementById('canvas');
var ctx = canvas.getContext('2d');
var width= canvas.width;
var height= canvas.height;
var blockSize= 10;
var widthBlock = width/blockSize;
var height= height/blockSize;
var score=0;
var drawBorder = function(){
	ctx.fillStyle= "Grey";
	ctx.fillRect(0,0, width, blockSize);
	ctx.fillRect(0, height - blockSize, width, blockSize);
	ctx.fillRect(0, 0, blockSize, height);
	ctx.fillRect(width - blockSize, 0, blockSize, height);
};
var drawScore = function(){
	ctx.font = "20px Courier";
	ctx.fillStyle = "black";
	ctx.textAlign= "left";
	ctx.Baseline= "top";
	ctx.fillText("Счет: " + score, blockSize,blockSize )
};
var gameOver= function(){
	clearInterval(intervalId);
	ctx.font="60px Courier";
	ctx.fillStyle = "black";
	ctx.textAlign="center";
	ctx.Baseline="middle";
	ctx.fillText("Конец игры, " + score, width/2,height/2);
};
var block= function(col, row){
	this.col = col;
	this.row = row;
};
Block.prototype.drawSquare = function(color) {
	var x = this.col * blockSize;
	var y = this.row * blockSize;
	ctx.fillStyle = color;
	ctx.fillText(x, y, blockSize, blockSize);
};
Block.prototype.drawCircle = function(color) {
	var centerX = this.col * blockSize + blockSize/2;
	var centerY = this.row * blockSize + blockSize/2;
	ctx.fillStyle = color;
	circle(centerX, centerY, blockSize/2, true);
};
Block.prototype.equal = function(otherBlock) {
	return this.col === otherBlock.col && this.row === otherBlock.row;
};

var snake = function(){
	this.segments = [
		new Block(7, 5),
		new Block(6, 5),
		new Block(5, 5),
	];
	this.direction = "right";
	this.nextDirection = "right";
};
snake.prototype.draw = function() {
	for ( var i=0; i<this.segments.length; i++){
		this.segments[i].drawSquare("Blue");
	}
};
snake.prototype.move = function() {
	var head = this.segments[0];
	var newhead;
	this.direction = this.nextDirection;
	if (this.direction === "right"){
		newhead = new Block(head.col+ 1, head.row);
	} else if ( this.direction=== "down"){
		newhead = new Block(head.col, head.row + 1);
	} else if (this.direction=== "left"){
		newhead = new Block(head.col-1, head.row);
	} else if (this.direction === "up"){
		newhead = new Block(head.col, head.row-1);
	}	
	if (this.checkCollision(newhead)){
		gameOver();
		return;
	}
	this.segments.unshift(newhead);
	if (newhead.equal(apple.position)){
		score++;
		apple.move();
	} else {
		this.segments.pop();
	}
};
var directions= {
	37: "length";
	38: 
}
var apple = ;
var intervalId = setInterval(function(){});