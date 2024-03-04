// Obtém uma referência para o elemento canvas
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Define as variáveis do jogo
var ballX = canvas.width / 2;
var ballY = canvas.height / 2;
var ballRadius = 10;
var dx = 2;
var dy = -2;
var paddleHeight = 75;
var paddleWidth = 10;
var paddleY = (canvas.height - paddleHeight) / 2;
var upPressed = false;
var downPressed = false;

// Função para desenhar a bola
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Função para desenhar a raquete
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(canvas.width - paddleWidth, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Função principal de desenho do jogo
function draw() {
    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha a bola
    drawBall();

    // Desenha a raquete
    drawPaddle();

    // Move a bola
    ballX += dx;
    ballY += dy;

    // Verifica as colisões com as bordas do canvas
    if (ballY + dy > canvas.height - ballRadius || ballY + dy < ballRadius) {
        dy = -dy;
    }

    // Verifica colisão com a raquete
    if (ballX + dx > canvas.width - ballRadius - paddleWidth && ballY > paddleY && ballY < paddleY + paddleHeight) {
        dx = -dx;
    }

    // Move a raquete
    if (upPressed && paddleY > 0) {
        paddleY -= 7;
    } else if (downPressed && paddleY < canvas.height - paddleHeight) {
        paddleY += 7;
    }
}

// Função principal do jogo
function gameLoop() {
    // Chama a função de desenho a cada 10 milissegundos
    setInterval(draw, 10);
}

// Registra os eventos de teclado para movimentar a raquete
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
        upPressed = true;
    } else if (event.key === "ArrowDown") {
        downPressed = true;
    }
});

document.addEventListener("keyup", function (event) {
    if (event.key === "ArrowUp") {
        upPressed = false;
    } else if (event.key === "ArrowDown") {
        downPressed = false;
    }
});

// Inicia o loop do jogo
gameLoop();
