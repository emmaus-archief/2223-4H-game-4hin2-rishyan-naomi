// Set up canvas
var canvas = document.createElement("canvas");
canvas.width = 400;
canvas.height = 600;
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

// Set up game variables
var bird = {x: 50, y: canvas.height/2 - 10, gravity: 0.5, velocity: 0};
var pipeGap = 100;
var pipeWidth = 50;
var pipeSpeed = 2;
var pipes = [];
var gameOver = false;
var score = 0;

// Set up event listener for space bar
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 32) {
        bird.velocity = -10;
    }
});

// Set up functions
function updateBird() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
}

function drawBird() {
    ctx.fillStyle = "red";
    ctx.fillRect(bird.x, bird.y, 20, 20);
}

function generatePipes() {
    if (pipes.length === 0 || pipes[pipes.length-1].x < canvas.width - 200) {
        var pipeHeight = Math.random() * (canvas.height - pipeGap);
        pipes.push({x: canvas.width, y: 0, width: pipeWidth, height: pipeHeight});
        pipes.push({x: canvas.width, y: pipeHeight + pipeGap, width: pipeWidth, height: canvas.height - pipeHeight - pipeGap});
    }
}

function movePipes() {
    for (var i = 0; i < pipes.length; i++) {
        pipes[i].x -= pipeSpeed;
    }
    if (pipes.length > 0 && pipes[0].x < -pipes[0].width) {
        pipes.shift();
        pipes.shift();
        score++;
    }
}

function drawPipes() {
    for (var i = 0; i < pipes.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(pipes[i].x, pipes[i].y, pipes[i].width, pipes[i].height);
    }
}

function checkCollisions() {
    for (var i = 0; i < pipes.length; i++) {
        if (bird.x + 20 > pipes[i].x && bird.x < pipes[i].x + pipes[i].width) {
            if (bird.y < pipes[i].height || bird.y + 20 > pipes[i].height + pipeGap) {
                gameOver = true;
            }
        }
    }
    if (bird.y < 0 || bird.y + 20 > canvas.height) {
        gameOver = true;
    }
}

function gameLoop() {
    if (!gameOver) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update game state
        updateBird();
        generatePipes();
        movePipes();
        checkCollisions();

        // Draw game elements
        drawBird();
        drawPipes();

        // Update score
        ctx.fillStyle = "#000";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + score, 10, 30);
    } else {
        // Game over
        ctx.fillStyle = "#000";
        ctx.font = "30px Arial";
        ctx.fillText("Game over!", canvas.width/2 - 80, canvas.height/2 - 15);
    }

    // Request next frame
    requestAnimationFrame(gameLoop);
}

// Start game loop
gameLoop();
