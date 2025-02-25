// Función para alternar la visibilidad de la información
function toggleInfo(proposalId) {
    const info = document.getElementById(proposalId);
    info.classList.toggle('show');
}

function toggleYeinerBiography() {
    const biography = document.getElementById('yeinerBiography');
    const image = document.getElementById('yeinerImage'); // Seleccionamos la imagen por ID

    biography.classList.toggle('show');
    image.style.display = biography.classList.contains('show') ? 'none' : 'block';
}

function toggleEliezerBiography() {
    const biography = document.getElementById('eliezerBiography');
    const image = document.getElementById('eliezerImage'); // Seleccionamos la imagen por ID

    biography.classList.toggle('show');
    image.style.display = biography.classList.contains('show') ? 'none' : 'block';
}

let score = 0;
let speed = 1000;
let disappearTime = 2000;
let timeout;
let gameInterval;
let gameTimerInterval;
let startTime; // Tiempo de inicio del cronómetro
let elapsedTime = 0; // Tiempo transcurrido
let clickErrors = 0;
let xCount = 1; // Número inicial de "X"
let gameStarted = false; // Indica si el juego ha comenzado

function createX() {
    const x = document.createElement('div');
    x.className = 'x-mark';
    const container = document.getElementById('game-container');
    const maxX = container.clientWidth - 20; // 20 es el tamaño de la "X"
    const maxY = container.clientHeight - 20;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    x.style.left = `${randomX}px`;
    x.style.top = `${randomY}px`;
    x.addEventListener('click', function() {
        document.getElementById('game-over').style.display = 'block';
        clearInterval(gameInterval);
        clearInterval(gameTimerInterval);
    });
    container.appendChild(x);
}

function clearX() {
    const xMarks = document.querySelectorAll('.x-mark');
    xMarks.forEach(x => x.remove());
}

function updateTimer() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const seconds = Math.floor(elapsedTime / 1000);
    const milliseconds = elapsedTime % 1000;
    document.getElementById('time-left').innerText = `Tiempo: ${seconds}.${milliseconds}s`;
}

function moveTarget() {
    const target = document.getElementById('target');
    const container = document.getElementById('game-container');
    const gameOverScreen = document.getElementById('game-over');

    gameOverScreen.style.display = 'none';
    target.style.display = 'block';

    const maxX = container.clientWidth - target.clientWidth;
    const maxY = container.clientHeight - target.clientHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;

    // Tamaño aleatorio de la pelota (más pequeño)
    const randomSize = Math.floor(Math.random() * 30) + 20; // Tamaño entre 20 y 50
    target.style.width = `${randomSize}px`;
    target.style.height = `${randomSize}px`;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
        target.style.display = 'none';
        gameOverScreen.style.display = 'block';
        clearInterval(gameInterval);
        clearInterval(gameTimerInterval);
    }, disappearTime);

    if (!gameStarted) {
        // Iniciar el cronómetro solo al inicio del juego
        startTime = Date.now();
        updateTimer();
        gameTimerInterval = setInterval(updateTimer, 10); // Actualizar cada 10 milisegundos
        gameStarted = true;
    }

    clearX(); // Eliminar las "X" anteriores
    for (let i = 0; i < xCount; i++) {
        createX(); // Crear nuevas "X"
    }
}

document.getElementById('target').addEventListener('click', function() {
    score++;
    document.getElementById('score').innerText = `Puntuación: ${score}`;

    if (speed > 200) {
        speed -= 25; // Reducir la velocidad menos bruscamente
    }

    disappearTime = Math.max(500, disappearTime - 50);

    clearInterval(gameInterval);
    gameInterval = setInterval(moveTarget, speed);
    moveTarget();

    // No detener el cronómetro aquí

    xCount = Math.min(10, xCount + 1); // Aumentar el número de "X" hasta un máximo de 10
});

document.getElementById('game-container').addEventListener('click', function(event) {
    if (event.target.id !== 'target') {
        clickErrors++;
        if (clickErrors >= 5) {
            document.getElementById('game-over').style.display = 'block';
            clearInterval(gameInterval);
            clearInterval(gameTimerInterval);
        }
    }
});

function restartGame() {
    score = 0;
    speed = 1000;
    disappearTime = 2000;
    document.getElementById('score').innerText = `Puntuación: ${score}`;
    document.getElementById('game-over').style.display = 'none';
    moveTarget();
    gameInterval = setInterval(moveTarget, speed);
    clickErrors = 0; // Reiniciar el contador de clics erróneos
    xCount = 1; // Reiniciar el número de "X"
    elapsedTime = 0; // Reiniciar el tiempo transcurrido
    gameStarted = false; // Reiniciar el estado del juego
    clearInterval(gameTimerInterval); // Detener el cronómetro
    document.getElementById('time-left').innerText = 'Tiempo: 0.0s'; // Restablecer el texto del cronómetro
}

gameInterval = setInterval(moveTarget, speed);
moveTarget();

// Minijuego de reflejos mejorado
let reactionTimeout;
const reactionButton = document.getElementById("reaction-button");
const reactionResult = document.getElementById("reaction-result");

function startReactionGame() {
    reactionButton.disabled = true;
    reactionButton.innerText = "Espera...";
    reactionResult.innerText = "";

    const randomTime = Math.floor(Math.random() * 3000) + 2000;
    reactionTimeout = setTimeout(() => {
        reactionButton.disabled = false;
        reactionButton.innerText = "¡Presiona ahora!";
        reactionButton.onclick = recordReactionTime;
        reactionButton.dataset.startTime = Date.now();
    }, randomTime);
}

function recordReactionTime() {
    const reactionTime = Date.now() - reactionButton.dataset.startTime;
    reactionResult.innerText = `Tu tiempo de reacción: ${reactionTime} ms`;
    reactionButton.innerText = "Jugar otra vez";
    reactionButton.onclick = startReactionGame;
}

startReactionGame();

document.getElementById('suggestion-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const suggestionText = document.getElementById('suggestion-text').value;
    const whatsappNumber = '+573042429739'; // Tu número de WhatsApp

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(suggestionText)}`;

    // Crear un elemento <a> para abrir el enlace
    const link = document.createElement('a');
    link.href = whatsappLink;
    link.target = '_blank';
    link.click(); // Simular un clic en el enlace
});