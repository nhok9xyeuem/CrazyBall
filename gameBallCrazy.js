//////////////////////////////////////
// lop ve hinh tron
function Ball(x, y, radius, speedX, speedY) {
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
    this.x = x;
    this.y = y;

    this.getRandomHex = function () {
        return Math.floor(Math.random() * 255);
    };

    this.getRandomColor = function () {
        let red = this.getRandomHex();
        let green = this.getRandomHex();
        let blue = this.getRandomHex();
        return "rgb(" + red + "," + blue + "," + green + ")";
    };

    this.drawBall = function () {
        color = this.getRandomColor();
        this.moveBall();
        ctx.beginPath();
        ctx.arc(this.x - this.radius, this.y - this.radius, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    };
    this.moveBall = function () {
        if (this.x > canvas.width - this.radius || this.x < this.radius) {
            this.speedX = -this.speedX;
        }
        if (this.y > canvas.height - this.radius || this.y < this.radius) {
            this.speedY = -this.speedY;
        }
        this.x += this.speedX;
        this.y += this.speedY;
    }

}


function drawBalls() {

    for (let i = 0; i < balls.length; i++) {
        balls[i].drawBall();
        balls[i].moveBall();
    }
}

//////////////////////////////////////////////
// / ve nhan vat padd ne
function Padd(paddX, paddY, paddWidth, paddHeight,) {
    this.paddX = paddX;
    this.paddY = paddY;
    this.paddWidth = paddWidth;
    this.paddHeight = paddHeight;

    this.drawPadd = function () {
        ctx.beginPath();
        ctx.rect(this.paddX, this.paddY, this.paddWidth, this.paddHeight);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    };
    this.movingPadd = function () {

        if (rightPressed) {
            this.paddX += 5;
            if (this.paddX + this.paddWidth > canvas.width) {
                this.paddX = canvas.width - this.paddWidth;
            }
        } else if (leftPressed) {
            this.paddX -= 5;
            if (this.paddX < 0) {
                this.paddX = 0;
            }
        }
        if (upPressed) {
            this.paddY -= 5;
            if (this.paddY < 0) {
                this.paddY = 0;
            }
        } else if (downPressed) {
            this.paddY += 5;

            if (this.paddY + this.paddHeight > canvas.height) {
                this.paddY = canvas.height - this.paddHeight;
            }
        }

    };
}

function movingPaddle(event) {

    if (event.keyCode == 37) {

        leftPressed = true;
    } else if (event.keyCode == 38) {
        upPressed = true;
    } else if (event.keyCode == 39) {
        rightPressed = true;
    } else if (event.keyCode == 40) {
        downPressed = true;
    }
}

function stoppingPaddle(event) {
    if (event.keyCode == 37) {
        leftPressed = false;
    } else if (event.keyCode == 38) {
        upPressed = false;
    } else if (event.keyCode == 39) {
        rightPressed = false;
    } else if (event.keyCode == 40) {
        downPressed = false;
    }

}

function drawPaddle() {
    padd.drawPadd();
    padd.movingPadd();
}

/////////////////////// set su va cham giua padd voi ball/////////////
function gameOver() {
    for (let i = 0; i < balls.length; i++) {
        if (balls[i].x > padd.paddX && balls[i].y > padd.paddY) {
            if (balls[i].x - (padd.paddX + padd.paddWidth) <= balls[i].radius &&
                balls[i].y - (padd.paddY + padd.paddHeight) <= balls[i].radius) {
                isGameOver = true;

            }
        }
    }
}


function drawGame() {
    if (!isGameOver) {
        if (!starTime) {
            starTime = new Date().getTime();
        } else {
            let longTime = Math.floor((new Date().getTime() - starTime) / 1000);

            score = longTime*number;
            document.getElementById('diem').innerHTML = score;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBalls();
        drawPaddle();
        gameOver();
        requestAnimationFrame(drawGame);
    } else {
        if (score > document.cookie) {
            document.cookie = score;
        }
        alert('Game Over');
    }
}