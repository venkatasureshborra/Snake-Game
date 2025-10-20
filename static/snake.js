const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreboard = document.getElementById("scoreboard");

const box = 20; // grid size
let snake = [{x: 9*box, y: 10*box}];
let food = generateFood();
let direction = "RIGHT";
let score = 0;
let highScore = 0;
let speed = 150; // in ms
let gameInterval = setInterval(draw, speed);

// Key press events
document.addEventListener("keydown", directionChange);

function directionChange(event){
    if(event.key === "ArrowUp" && direction != "DOWN") direction = "UP";
    if(event.key === "ArrowDown" && direction != "UP") direction = "DOWN";
    if(event.key === "ArrowLeft" && direction != "RIGHT") direction = "LEFT";
    if(event.key === "ArrowRight" && direction != "LEFT") direction = "RIGHT";
}

// Draw game
function draw(){
    // Clear canvas
    ctx.fillStyle = "#000";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // Draw snake with gradient circles
    snake.forEach((segment, i) => {
        let gradient = ctx.createRadialGradient(
            segment.x + box/2, segment.y + box/2, 2,
            segment.x + box/2, segment.y + box/2, box/2
        );
        gradient.addColorStop(0, i === 0 ? "#00ff00" : "#66ff66");
        gradient.addColorStop(1, "#003300");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(segment.x + box/2, segment.y + box/2, box/2, 0, Math.PI*2);
        ctx.fill();
    });

    // Draw food as glowing circle
    ctx.fillStyle = "#ff0000";
    ctx.shadowColor = "#ff5555";
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(food.x + box/2, food.y + box/2, box/2, 0, Math.PI*2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Next head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if(direction==="LEFT") snakeX -= box;
    if(direction==="RIGHT") snakeX += box;
    if(direction==="UP") snakeY -= box;
    if(direction==="DOWN") snakeY += box;

    // Eat food
    if(snakeX === food.x && snakeY === food.y){
        score++;
        if(score > highScore) highScore = score;
        food = generateFood();
    } else {
        snake.pop();
    }

    let newHead = {x: snakeX, y: snakeY};

    // Collision with walls or self
    if(snakeX < 0 || snakeX + box > canvas.width || snakeY < 0 || snakeY + box > canvas.height || collision(newHead, snake)){
        clearInterval(gameInterval);
        alert("Game Over! Score: " + score);
        return;
    }

    snake.unshift(newHead);

    // Update scoreboard
    scoreboard.innerHTML = `Score: ${score} | High Score: ${highScore}`;
}

// Collision with self
function collision(head, array){
    for(let i=1;i<array.length;i++){
        if(head.x === array[i].x && head.y === array[i].y) return true;
    }
    return false;
}

// Generate food at random position
function generateFood(){
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}

// Restart game
function restartGame(){
    clearInterval(gameInterval);
    snake = [{x: 9*box, y: 10*box}];
    direction = "RIGHT";
    score = 0;
    food = generateFood();
    gameInterval = setInterval(draw, speed);
}
