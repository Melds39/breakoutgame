var canvas = document.getElementById("gameArea");
var ctx = canvas.getContext("2d");


let x= canvas.width/2;
let y= canvas.height-25;
let nx=2;
let ny=-2;
let ballRadius =12;
let paddleHeight=10;
let paddleWidth=75;
let paddleX = (canvas.width-paddleWidth)/2;
let rightPressed = false;
let leftPressed = false;
let brickRowCount = 4;
let brickColumnCount = 7;
let brickPadding = 10;
let brickHeight = 20;
let brickWidth = 60;
let brickOffsetLeft = 40;
let brickOffsetTop= 30;



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//store columns c and rows r in 2d array
var bricks = [];
for (var c = 0; c < brickColumnCount; c++){
    bricks[c]=[];
    for(var r = 0; r < brickRowCount; r++){
        bricks[c][r] = {x:0, y:0, status: 1}
    }

}
//draw bricks using declared variable values and calls randomColor function for each brick
//brickY and BrickX  used to place bricks at proper locations
function drawBricks(){
    for(var c=0; c < brickColumnCount; c++){
        for(var r=0; r < brickRowCount; r++){
            if(bricks[c][r].status ==1){
            var brickY = (r*(brickHeight+brickPadding))+ brickOffsetTop;
            var brickX = (c*(brickWidth+brickPadding))+ brickOffsetLeft;
            bricks[c][r].x=brickX;
            bricks[c][r].y=brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle="#0000FF";
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}

function keyDownHandler(e){
    if(e.key=="Right" || e.key=="ArrowRight"){
        rightPressed = true;
    }
    else if(e.key =="Left" || e.key == "ArrowLeft"){
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = false;
    }
}

function brickCollusion(){
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    ny = -ny;
                    b.status = 0;
                }
            }
        }
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#DC143C";
    ctx.fill();
    ctx.closePath();

}
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    brickCollusion();
    drawBricks();
    
if(y + ny <0){

    ny = -ny;
}

else if( y+ny >canvas.height){
    if(x > paddleX-15 && x < paddleX + paddleWidth+15){
        ny = -ny;
    }else{
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval); 
    }
  
}
if(x + nx >canvas.width || x + nx < 0){
    nx = -nx;
}


    x +=nx;
    y +=ny;

    if(rightPressed){
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    
    }
    else if(leftPressed){
        paddleX -= 7;
        if (paddleX < 0){
            paddleX =0;
        }
    }
    
}

let interval = setInterval(draw, 10);
