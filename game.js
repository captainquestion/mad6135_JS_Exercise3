let threeLetterWords = ['cat', 'dog', 'run', 'bat', 'pig', 'day', 'cup', 'map', 'car', 'box'];
let fourLetterWords = ['jump', 'play', 'tree', 'bike', 'star', 'wind', 'milk', 'rose', 'book', 'game'];
let fiveLetterWords = ['house', 'grass', 'apple', 'water', 'table', 'bread', 'money', 'happy', 'watch', 'paper'];
let sixLetterWords = ['orange', 'butter', 'pencil', 'window', 'monkey', 'flower', 'muffin', 'market', 'silver', 'button'];

let word;
let score = 0;
let lives = 3;
let animationId = null;
let animationFrame;

function restart() {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('restart').style.display = 'none';
    score = 0;
    lives = 3;
    updateScore();
    updateLives();
    newWord();
}

// the rest of the code remains same



function newWord() {
    cancelAnimationFrame(animationFrame);

    // create new word element
    let wordElement = document.getElementById('word');
    wordElement.style.top = '0px';

    if (score < 10) {
        word = threeLetterWords[Math.floor(Math.random() * threeLetterWords.length)];
    } else if (score < 20) {
        word = fourLetterWords[Math.floor(Math.random() * fourLetterWords.length)];
    } else if (score < 30) {
        word = fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];
    } else if (score < 40) {
        word = sixLetterWords[Math.floor(Math.random() * sixLetterWords.length)];
    } else {
        let allWords = threeLetterWords.concat(fourLetterWords, fiveLetterWords, sixLetterWords);
        word = allWords[Math.floor(Math.random() * allWords.length)];
    }
    wordElement.innerText = word;

    // adjust speed of animation
    let speed = 10; // base speed is 10 seconds
    if (score >= 10) speed = 9; // adjust speed according to score
    if (score >= 20) speed = 8;
    if (score >= 30) speed = 7;
    if (score >= 40) speed = 6;

    let startTime = Date.now();
    let duration = speed * 1000;
    let startTop = 0;
    let endTop = window.innerHeight - wordElement.offsetHeight;
    
    function animate() {
        let now = Date.now();
        let timeFraction = Math.min(1, (now - startTime) / duration);
        let currentTop = startTop + timeFraction * (endTop - startTop);
        wordElement.style.top = currentTop + 'px';
        if (timeFraction < 1) {
            animationFrame = requestAnimationFrame(animate);
        } else {
            loseLife();
        }
    }
    animate();

    document.getElementById('input-word').value = '';
}

// the rest of the code remains same


function checkWord() {
    let input = document.getElementById('input-word').value;
    if (input === word) {
        score++;
        updateScore();
        newWord();
    }
}

function loseLife() {
    lives--;
    updateLives();
    if (lives === 0) {
        endGame();
    } else {
        newWord();
    }
}

function endGame() {
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('restart').style.display = 'block';
}

function updateScore() {
    document.getElementById('score').innerText = 'Score: ' + score;
}

function updateLives() {
    document.getElementById('lives').innerText = 'Lives: ' + lives;
}

newWord();
