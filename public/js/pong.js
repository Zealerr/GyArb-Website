const canvas = document.getElementById("pingpong");
const context = canvas.getContext("2d");

const bodySpeed = 1.5
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
var whereCalcDone = false
var CPUID = ""
var CPUName = ""
var CPUIDPool = ["CPU1", "CPU2", "CPU3"]
var CPUNamePool = ["Mark", "Sandra", "Opponent", "dddddd", "LAVA", "help", "mariah", "abc", "Ludwig", "lukas", "maya"]
var time = 0
var timeMark = 0
var gameReady = false
var newRound = false
var opponentWhen = 0
var CPUHitRandom1 = Math.random()
var CPUHitRandom2 = Math.random()
var shakeDuration = 0
var shakeDurationSet = false
var offlineCheck = false
var CPUCallTimer = 0
var CPU3Timer = 0
var howLongCalcDone = false
var itWillDo = 0
var afk = false

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
            }  
            else{
                ballVelocityX = ballVelocityX * -1
            }
            ballVelocityY = 0.04 * (ballPositionY - (playerPositionY + 30)) * Math.abs(ballVelocityX)
            playerTouch = true
            CPUTouch = false
            whereCalcDone = false
        }
    }
    if (ballPositionY >= CPUPositionY - 2 && ballPositionY <= CPUPositionY + 62){
        if (ballPositionX >= 768 && CPUTouch == false){
            if (ballVelocityX < 6 && ballVelocityX > -6){
                ballVelocityX = ballVelocityX * -1.1
            }  
            else{
                ballVelocityX = ballVelocityX * -1
            }  
            ballVelocityY = 0.04 *(ballPositionY - (CPUPositionY + 30)) * Math.abs(ballVelocityX)
            playerTouch = false
            CPUTouch = true
            itWillDo = 0
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
    CPUID = CPUIDPool[Math.round(Math.random() * (CPUIDPool.length - 1))]
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
    shakeDuration = 0
    shakeDurationSet = false
    CPUCallTimer = 0
    whereCalcDone = false
    howLongCalcDone = false
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
    if (afk == true && playerPoints != 5 && CPUPoints != 5){
        isOffline();
        document.getElementById("offlineDiv").innerHTML = "Your opponent disconnected."
    }
    if (playerPoints >= 3 && CPUPoints == 0 && CPUHitRandom1 > 0.8){
        afk = true
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
        CPUCallTimer += 10  
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
    if (CPUCallTimer % 60 == 0){
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
}

function CPU2Play(){
    if (CPUCallTimer % 60 == 0){
        if (ballVelocityX > 0 && whereCalcDone == false && ballPositionX > 150 + Math.random()*100){
            ballHitY = ballPositionY + ((800 - ballPositionX)/ballVelocityX) * ballVelocityY
            if (ballHitY > 393){
                ballHitY = 793 - ballHitY
            }
            if (ballHitY < 7){
                ballHitY =  ballHitY * -1
            }
            if (CPUHitRandom1 * ballVelocityX > 1.75 && Math.abs(ballVelocityY) > 0.5){
                ballHitY = ballHitY + CPUHitRandom2 * 60 - 30
            }
            else if (CPUHitRandom1 * ballVelocityX > 1.5 && Math.abs(ballVelocityY) > 0.5){
                ballHitY = (4 * ballHitY + CPUPositionY) / 5 + CPUHitRandom2 * 30 - 15
            }
            whereCalcDone = true
        }
        if (ballPositionY < 8 || ballPositionY > 392 || ballPositionX < 500){
            whereCalcDone = false
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
        if (ballVelocityX > 4 + CPUHitRandom1 * 2 - 1 && ballVelocityY == 0 && CPUPositionY == 170 && CPUHitRandom2 > 0.8){
            CPUVelocityY == bodySpeed
        }
    }
}

function CPU3Play(){
    if (CPUCallTimer % 10 == 0){
        if (afk == false){
            if (ballVelocityX > 0 && whereCalcDone == false && ballPositionX > 100 + 5 * ballVelocityX + 3 * ballVelocityY){
                ballHitY = ballPositionY + ((800 - ballPositionX)/ballVelocityX) * ballVelocityY
                if (ballHitY > 393){
                    ballHitY = 793 - ballHitY
                }
                if (ballHitY < 7){
                    ballHitY =  ballHitY * -1
                }
                if (ballHitY > 393){
                    ballHitY = 793 - ballHitY
                }
                if (ballHitY < 7){
                    ballHitY =  ballHitY * -1
                }
                if (ballHitY > 393){
                    ballHitY = 793 - ballHitY
                }
                if (ballHitY < 7){
                    ballHitY =  ballHitY * -1
                }
                whereCalcDone = true
            }

            CPU3Timer -= 10

            if (ballVelocityX > 0){
                if (CPU3Timer <= 110){
                    CPUVelocityY = 0
                    if (howLongCalcDone == false){
                        howLong = Math.round(Math.abs(CPUPositionY + 30 - ballHitY) / (0.2*bodySpeed))
                        howLongCalcDone = true
                    }
                    if (CPU3Timer <= 0 && howLong > 80){
                        if (CPUPositionY + 30 > ballHitY){
                            CPUVelocityY = -bodySpeed
                            CPU3Timer = 110 + howLong
                            if (CPUHitRandom1 > 0.3){CPU3Timer += CPUHitRandom1 * 150}
                            CPUHitRandom1 -= 0.1
                            howLongCalcDone = false
                        }
                        if (CPUPositionY + 30 < ballHitY){
                            CPUVelocityY = bodySpeed
                            CPU3Timer = 110 + howLong
                            if (CPUHitRandom1 > 0.3){CPU3Timer += CPUHitRandom1 * 150}
                            CPUHitRandom1 -= 0.1
                            howLongCalcDone = false
                        }
                    }
                    else if (CPU3Timer <= 0 && howLong <= 80){
                        CPU3Timer = 500
                        howLongCalcDone = false
                    }
                }
            }

            if (ballVelocityX < 0 && ballPositionX < 700 - 20 * CPUHitRandom1){
                if (CPU3Timer <= 110 && itWillDo < CPUHitRandom2){
                    CPUVelocityY = 0
                    if (howLongCalcDone == false){
                        howLong = Math.round(Math.abs(CPUPositionY - 170 + CPUHitRandom2 * 10) / (0.2*bodySpeed))
                        howLongCalcDone = true
                        itWillDo += 0.2
                    }
                    if (CPU3Timer <= 0 && howLong > 120){
                        if (CPUPositionY + 30 > 200){
                            CPUVelocityY = -bodySpeed
                            CPU3Timer = 110 + howLong
                            if (CPUHitRandom1 > 0.3){CPU3Timer += CPUHitRandom1 * 150}
                            CPUHitRandom1 -= 0.1
                            howLongCalcDone = false
                        }
                        if (CPUPositionY + 30 < 200){
                            CPUVelocityY = bodySpeed
                            CPU3Timer = 110 + howLong
                            if (CPUHitRandom1 > 0.3){CPU3Timer += CPUHitRandom1 * 150}
                            CPUHitRandom1 -= 0.1
                            howLongCalcDone = false
                        }
                    }
                    else if (CPU3Timer <= 0 && howLong <= 120){
                        CPU3Timer = 500
                        howLongCalcDone = false
                    }
                }
                else if (itWillDo >= CPUHitRandom2){
                    CPUVelocityY = 0
                }
            }

            if (ballVelocityX == 0){
                if (CPUHitRandom1 > 0.8 && time - timeMark > (Math.random() / 2) + 0.25 && shakeDurationSet == false){
                    shakeDuration = 200 + (10 * Math.round(Math.random() * 120))
                    shakeDurationSet = true
                }
                if (shakeDurationSet == true){
                    shakeDuration -= 10
                    if ((shakeDuration - 70) % 320 == 0 || (shakeDuration - 70) % 160 == 0){
                        CPUVelocityY = 0
                    }
                    else if (shakeDuration % 320 == 0 && shakeDuration > 0){
                        CPUVelocityY = -bodySpeed
                    }
                    else if (shakeDuration % 160 == 0 && shakeDuration > 0){
                        CPUVelocityY = bodySpeed
                    } 
                }
                if (shakeDuration < 0){
                    CPUVelocityY = 0
                }
            }
        }
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
setInterval(CPUPlay, 10);
setInterval(pingUpdate, 5000)
var rendering = setInterval(render, 5);
