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
var bodySpeed = 1.5
var CPUHitRandom1 = Math.random()
var CPUHitRandom2 = Math.random()
var duration = 0
var durationSet = false
var shakeStill = 0
var offlineCheck = false


function clearCanvas(){
    context.fillStyle = "rgba(0, 0, 0, 0.25)";
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
            if (ballVelocityX < 6 && ballVelocityX > -6){
                ballVelocityX = ballVelocityX * -1.1 
                // console.log("MORE SPEED")
            }  
            else{
                ballVelocityX = ballVelocityX * -1
                // console.log("SAME SPEED")
            }
            ballVelocityY = 0.04 * (ballPositionY - (playerPositionY + 30)) * Math.abs(ballVelocityX)
            playerTouch = true
            CPUTouch = false
        }
    }
    if (ballPositionY >= CPUPositionY - 2 && ballPositionY <= CPUPositionY + 62){
        if (ballPositionX >= 768 && CPUTouch == false){
            if (ballVelocityX < 6 && ballVelocityX > -6){
                ballVelocityX = ballVelocityX * -1.1
                // console.log("MORE SPEED")
            }  
            else{
                ballVelocityX = ballVelocityX * -1
                // console.log("SAME SPEED")
            }  
            ballVelocityY = 0.04 *(ballPositionY - (CPUPositionY + 30)) * Math.abs(ballVelocityX)
            playerTouch = false
            CPUTouch = true
            CPUHitRandom1 = Math.random()
            CPUHitRandom2 = Math.random()
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
    if (ballVelocityX > 6 || ballVelocityX < -6){
        context.fillStyle = "rgba(78, 23, 187, 0.75)";
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

function drawBodies(){
    if (gameOn == false){
        if (playerPositionY < 0){
            playerPositionY = 0
            playerVelocityY = -playerVelocityY 
        }
        if (playerPositionY > 340){
            playerPositionY = 340
            playerVelocityY = -playerVelocityY 
        }
        if (CPUPositionY < 0){
            CPUPositionY = 0
            CPUVelocityY = -CPUVelocityY
        }
        if (CPUPositionY > 340){
            CPUPositionY = 340
            CPUVelocityY = -CPUVelocityY
        }
    }
    if (gameOn == true){
        if (playerPositionY < 0){
            playerPositionY = 0
            playerVelocityY = 0
        }
        if (playerPositionY > 340){
            playerPositionY = 340
            playerVelocityY = 0
        }
        if (CPUPositionY < 0){
            CPUPositionY = 0
            CPUVelocityY = 0
        }
        if (CPUPositionY > 340){
            CPUPositionY = 340
            CPUVelocityY = 0
        }
    } 
    playerPositionY = playerPositionY + playerVelocityY;
    context.fillStyle = "white";
    context.fillRect(10, playerPositionY, 15, 60);
    CPUPositionY = CPUPositionY + CPUVelocityY
    context.fillStyle = "white";
    context.fillRect(775, CPUPositionY, 15, 60);
}

startButton.addEventListener("click", startButtonPressed)

function startButtonPressed(){
    gameReady = true
    opponentWhen = time + 3 + Math.round(Math.random() * 7)
    startButton.innerHTML = "Searching for opponent..."
    startButton.classList.toggle("startButtonClick")
    startButton.removeEventListener("click", startButtonPressed)
}

function startGame(){
    gameReady = false
    CPUID = "CPU2"//CPUIDPool[Math.round(Math.random() * (CPUIDPool.length - 1))]
    CPUName = CPUNamePool[Math.round(Math.random() * (CPUNamePool.length - 1))]
    document.getElementsByClassName("gameInfo")[0].classList.toggle("hidden")
    startButton.classList.toggle("hidden")
    newGame();
    gameOn = true
}

function newGame(){
    playerTouch = false
    CPUTouch = false
    ballPositionY = 200
    ballPositionX = 400
    ballVelocityX = 0
    ballVelocityY = 0
    playerPositionY = 170
    playerVelocityY = 0
    CPUPositionY = 170
    CPUVelocityY = 0
    duration = 1
    durationSet = false
    if (playerPoints < 5 && CPUPoints < 5){
        newRound = true
        timeMark = time
    }
    if (playerPoints == 5 || CPUPoints == 5){
        clearInterval(rendering);
        context.fillStyle = "rgba(0, 0, 0, 1)";
        context.fillRect(0, 0, 800, 400)
        startButton.classList.toggle("hidden")
        form = document.getElementById("gameForm")
        if (playerPoints == 5){
            form.children[0].value="player"
        }
        form.submit()
    }
}

function newGameStart(){
    newRound = false
    ballVelocityY = Math.round((Math.random() * 4) - 2) / 4
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

document.onkeydown = playerMove;
document.onkeyup = playerStop;

function playerMove(e){
    e.preventDefault();
    if (gameOn == true){
        if (e.code == "ArrowUp" && playerPositionY > 0){
            playerVelocityY = -bodySpeed
        }
        if (e.code == "ArrowDown" && playerPositionY < 339){
            playerVelocityY = bodySpeed
        }
    }
}

function playerStop(e){
    e.preventDefault();
    if (gameOn == true){
        if (e.code == "ArrowUp" || e.code == "ArrowDown"){
            playerVelocityY = 0
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
        if (CPUPositionY + 20 > ballPositionY){
            CPUVelocityY = -bodySpeed
        }
        else if (CPUPositionY + 40 < ballPositionY){
            CPUVelocityY = bodySpeed
        }
        else{
            CPUVelocityY = 0
        }
    }
    if (ballVelocityX < 0){
        if (CPUPositionY + 30 > 200 + 10 * Math.abs(ballVelocityX)){
            CPUVelocityY = -bodySpeed
        }
        else if (CPUPositionY + 30 < 200 - 10 * Math.abs(ballVelocityX)){
            CPUVelocityY = bodySpeed
        }
        else{
            CPUVelocityY = 0
        }
    } 
}

function CPU2Play(){
    if (ballVelocityX > 0 && calcDone == false && ballPositionX > 150 + Math.random()*100){
        ballHitY = ballPositionY + ((800 - ballPositionX)/ballVelocityX) * ballVelocityY
        if (ballHitY > 400){
            ballHitY = 800 - ballHitY
        }
        if (ballHitY < 0){
            ballHitY =  ballHitY * -1
        }
        if (CPUHitRandom1 * ballVelocityX > 1.75 && Math.abs(ballVelocityY) > 0.5){
            ballHitY = ballHitY + CPUHitRandom2 * 60 - 30
        }
        else if (CPUHitRandom1 * ballVelocityX > 1.5 && Math.abs(ballVelocityY) > 0.5){
            ballHitY = (4 * ballHitY + CPUPositionY) / 5 + CPUHitRandom2 * 30 - 15
        }
        calcDone = true
    }
    if (ballPositionY < 8 || ballPositionY > 392 || ballPositionX < 500){
        calcDone = false
    }
    if (ballVelocityX > 0){
        if (CPUPositionY + 10 > ballHitY){
            CPUVelocityY = -bodySpeed
        }
        else if (CPUPositionY + 50 < ballHitY){
            CPUVelocityY = bodySpeed
        }
        else{
            CPUVelocityY = 0
        } 
    }
    if (ballVelocityX < 0 && ballPositionX < 500 + 250 * CPUHitRandom1 && CPUHitRandom2 > 2 - Math.abs(ballVelocityX) - Math.abs(400-CPUPositionY)/400){
        if (CPUPositionY + 30 > 200 && CPUPositionY + 30 > 220){
            CPUVelocityY = -bodySpeed
        }
        else if (CPUPositionY + 30 < 200 && CPUPositionY + 30 < 180){
            CPUVelocityY = bodySpeed
        }
        else{
            CPUVelocityY = 0
        }
    }
    if (ballVelocityX == 0){
        if (CPUHitRandom1 > 0.8 && time - timeMark > Math.random() / 2 + 0.25 && duration > 0){
            if (durationSet == false){
                duration = 30 + Math.round(Math.random() * 5)
                durationSet = true
            }
            duration = duration - 1
            console.log(duration)

            if (CPUVelocityY >= 0){
                if (duration % 5 == 0){
                    if (CPUVelocityY > 0 || shakeStill == 1 || shakeStill == 2 || shakeStill == 3){
                        CPUVelocityY = 0
                        if (Math.random() > 0.15){
                        shakeStill = shakeStill - 1
                        duration = duration + 1
                        }
                    }
                    else{
                    CPUVelocityY = -bodySpeed
                    shakeStill = 3
                    console.log("up")
                    }
                }
            }
            if (CPUVelocityY <= 0){
                if ((duration - 3) % 5 == 0){
                    if (CPUVelocityY < 0 || shakeStill == 1 || shakeStill == 2 || shakeStill == 3){
                        CPUVelocityY = 0
                        if (Math.random() > 0.15){
                            shakeStill = shakeStill - 1
                            duration = duration + 1
                        }
                    }
                    else{
                    CPUVelocityY = bodySpeed
                    console.log("down")
                    shakeStill = 3
                    }
                }
            }
        }
    }
}

//input timers?
function CPU3Play(){
    if (CPUPositionY > ballPositionY){
        CPUVelocityY = -bodySpeed
    }
    if (CPUPositionY + 60 < ballPositionY){
        CPUVelocityY = bodySpeed
    }
}

addEventListener("offline", isOffline)

document.addEventListener("visibilitychange", isOffline)

function isOffline(){
    if (offlineCheck == false){
        document.getElementById("gameContent").classList.toggle("gameContentHide")
        document.getElementById("offlineDiv").classList.toggle("offlineDiv")
        offlineCheck = true
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
setInterval(CPUPlay, 60);
setInterval(pingUpdate, 5000)
var rendering = setInterval(render, 5);
