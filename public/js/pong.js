const canvas = document.getElementById("pingpong");
const context = canvas.getContext("2d");

var ballPositionX = 400
var ballVelocityX = Math.round(Math.random())
if (ballVelocityX == 0){ballVelocityX = -1}
var ballPositionY = 200
var ballVelocityY = 0
var playerPositionY = 170
var playerVelocityY = -1
var CPUPositionY = 170
var CPUVelocityY = 1
var gameOn = false
const startButton = document.getElementById("startButton")
var playerPoints = 0
var CPUPoints = 0
var playerTouch = false
var CPUTouch = false
var ballHitY = 200
var calcDone = false
var CPUID = ""
var CPUName = ""
var CPUIDPool = ["CPU1", "CPU2", "CPU3"]
var CPUNamePool = ["Mark", "Sandra", "Opponent", "dddddd", "LAVA", "help", "mariah", "abc", "Ludwig", "lukas", "maya"]
var time = 0
var timeMark = 0
var gameReady = false
var newRound = false
var opponentWhen = 0

startButton.addEventListener("click", startButtonPressed)

function startButtonPressed(){
    gameReady = true
    opponentWhen = time + 3 + Math.round(Math.random() * 7)
    startButton.innerHTML = "Searching for opponent..."
    startButton.classList.toggle("startButtonClick")
    startButton.removeEventListener("click", startButtonPressed)
    document.getElementById("opponentName").innerHTML = "Searching for opponent..."
}

function startGame(){
    gameReady = false
    CPUID = CPUIDPool[Math.round(Math.random() * (CPUIDPool.length - 1))]
    console.log(CPUIDPool.length);
    CPUName = CPUNamePool[Math.round(Math.random() * (CPUNamePool.length - 1))]
    document.getElementById("opponentName").innerHTML = "Opponent: " + CPUName
    startButton.classList.toggle("startButtonGone")
    newGame();
    gameOn = true
}

function clearCanvas(){
    context.fillStyle = "rgba(0, 0, 0, 0.15)";
    context.fillRect(0, 0, 800, 400)
}

function drawBall(){
    if (gameOn == true){
        ballPositionX = ballPositionX + ballVelocityX
        if (ballPositionX > 793){
            playerPoints = playerPoints + 1
            newGame();
        } 
        if (ballPositionX < 7){
            CPUPoints = CPUPoints + 1
            newGame();
        } 
        ballPositionY = ballPositionY + ballVelocityY
        if (ballPositionY < 7 || ballPositionY > 393){
            ballVelocityY = ballVelocityY * -1
        } 
    }
    if (ballPositionY >= playerPositionY - 2 && ballPositionY <= playerPositionY + 62){
        if (ballPositionX <= 32 && playerTouch == false){
        ballVelocityX = ballVelocityX * -1.1    
        ballVelocityY = 0.05 *(ballPositionY - (playerPositionY + 30))
        playerTouch = true
        CPUTouch = false
        }
    }
    if (ballPositionY >= CPUPositionY - 2 && ballPositionY <= CPUPositionY + 62){
        if (ballPositionX >= 768 && CPUTouch == false){
        ballVelocityX = ballVelocityX * -1.1    
        ballVelocityY = 0.05 *(ballPositionY - (CPUPositionY + 30))
        playerTouch = false
        CPUTouch = true
        }
    }
    if (ballVelocityX > 2 || ballVelocityX < -2){
        context.fillStyle = "rgba(255, 255, 0, 0.5)";
        context.beginPath();
        context.arc(ballPositionX - ballVelocityX, ballPositionY - ballVelocityY, 10, 0, Math.PI*2, false);
        context.closePath();
        context.fill();
    }
    if (ballVelocityX > 2.75 || ballVelocityX < -2.75){
        context.fillStyle = "rgba(255, 100, 0, 1)";
        context.beginPath();
        context.arc(ballPositionX - ballVelocityX, ballPositionY - ballVelocityY, 10, 0, Math.PI*2, false);
        context.closePath();
        context.fill();
    }
    if (ballVelocityX > 4 || ballVelocityX < -4){
        context.fillStyle = "rgba(255, 0, 0, 0.75)";
        context.beginPath();
        context.arc(ballPositionX - ballVelocityX, ballPositionY - ballVelocityY, 10, 0, Math.PI*2, false);
        context.closePath();
        context.fill();
    }
    context.fillStyle = "white";
    context.beginPath();
    context.arc(ballPositionX, ballPositionY, 10, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
}

function newGame(){
    playerTouch = false
    CPUTouch = false
    ballPositionY = 200
    ballPositionX = 400
    ballVelocityX = 0
    ballVelocityY = 0
    playerPositionY = 170
    CPUPositionY = 170
    if (playerPoints < 5 && CPUPoints < 5){
        newRound = true
        timeMark = time
    }
    if (playerPoints == 5 || CPUPoints == 5){
        clearInterval(rendering);
        context.fillStyle = "rgba(0, 0, 0, 1)";
        context.fillRect(0, 0, 800, 400)
        startButton.classList.toggle("startButtonGone")
        if (playerPoints == 5){
            startButton.innerHTML = "Game over. You win."
        }else{
            startButton.innerHTML = "Game over. You lose."
        }
    } 
}

function newGameStart(){
    newRound = false
    if (playerPoints < CPUPoints){
        ballVelocityX = -1
    }
    if (playerPoints > CPUPoints){
        ballVelocityX = 1
    }
    if (playerPoints == CPUPoints){
        ballVelocityX = Math.round(Math.random())
        if (ballVelocityX == 0){
            ballVelocityX = -1
        }
    }
}


function drawBodies(){
    playerPositionY = playerPositionY + playerVelocityY;
    if (playerPositionY <= 0 || playerPositionY >= 340){
        playerVelocityY = playerVelocityY * -1
    }
    context.fillStyle = "white";
    context.fillRect(10, playerPositionY, 15, 60);
    CPUPositionY = CPUPositionY + CPUVelocityY
    if (CPUPositionY <= 0 || CPUPositionY >= 340){
        CPUVelocityY = CPUVelocityY * -1
    }
    context.fillStyle = "white";
    context.fillRect(775, CPUPositionY, 15, 60);
}

document.onkeydown = playerMove;

function playerMove(e){
    e.preventDefault();
    if (gameOn == true){
        if (e.code == "ArrowUp" && playerPositionY > 0){
            playerVelocityY = -1.2
        }
        if (e.code == "ArrowDown" && playerPositionY < 339){
            playerVelocityY = 1.2
        }
    }
}

function drawPoints(){
    context.font = "60px Helvetica";
    context.fillStyle = "rgba(255, 255, 255, 0.2)";
    context.fillText(playerPoints, 200, 100);
    context.fillText(CPUPoints, 570, 100);
    if (newRound == true){
        context.font = "60px Helvetica";
        context.fillStyle = "rgba(255, 255, 255, 0.2)";
        context.fillText((timeMark + 3) - time, 385, 300);
    }
}

function render(){
clearCanvas();
drawBall();
drawBodies();
drawPoints();
}

function CPUPlay(){
    if (gameOn == true){   
        if (CPUID == "CPU1"){
            CPU1Play();
        }
        if (CPUID == "CPU2"){
            CPU2Play();
        }
        if (CPUID == "CPU3"){
            CPU3Play();
        }
    }
}

function CPU1Play(){
    if (ballVelocityX > 0){
        if (CPUPositionY > ballPositionY + ballVelocityY * 20 ){
            CPUVelocityY = -1.2
        }
        if (CPUPositionY + 60 < ballPositionY - ballVelocityY * 20){
            CPUVelocityY = 1.2
        }
    }
    if (ballVelocityX < 0){
        CPURand = Math.random()
        if (CPURand > 0.95 && CPUPositionY < 150) {
            CPUVelocityY = 1.2
        }
        if (CPURand > 0.95 && CPUPositionY > 190) {
            CPUVelocityY = -1.2
        }
    } 
}

function CPU2Play(){
    if (ballVelocityX > 0 && calcDone == false){
        ballHitY = ballPositionY + ((800 - ballPositionX)/ballVelocityX) * ballVelocityY
        if (ballHitY > 400){
            ballHitY = 800 - ballHitY
        }
        if (ballHitY < 0){
            ballHitY =  ballHitY * -1
        }
        calcDone = true
    }
    if (ballPositionY < 8 || ballPositionY > 392 || ballPositionX < 500){
        calcDone = false
    }
    if (ballVelocityX > 0){
        if (CPUPositionY + 10 > ballHitY + (800 - ballPositionX)/5){
            CPUVelocityY = -1.2
        }
        if (CPUPositionY + 50 < ballHitY - (770 - ballPositionX)/5){
            CPUVelocityY = 1.2
        }
    }
    if (ballVelocityX < 0){
        CPURand = Math.random()
        if (CPURand > 0.95 && CPUPositionY < 150) {
            CPUVelocityY = 1.2
        }
        if (CPURand > 0.95 && CPUPositionY > 190) {
            CPUVelocityY = -1.2
        }
    }
}

function CPU3Play(){
    if (CPUPositionY > ballPositionY){
        CPUVelocityY = -1.2
    }
    if (CPUPositionY + 60 < ballPositionY){
        CPUVelocityY = 1.2
    }
}

function pingUpdate(){
    document.getElementById("pingMS").innerHTML = "Ping is " + String(12 + Math.round(Math.random() * 3)) + " ms"
}

function timer(){
    time = time + 1
    if (time == opponentWhen && gameReady == true){
        startGame();
    }
    if (time == timeMark + 3 && newRound == true){
        newGameStart();
    }
}

pingUpdate();
setInterval(timer, 1000);
setInterval(CPUPlay, 100);
setInterval(pingUpdate, 5000)
var rendering = setInterval(render, 5);
