// Función para alternar la visibilidad de la información
function toggleInfo(proposalId) {
    const info = document.getElementById(proposalId);
    
    // Si ya está visible, ocultarlo
    if (info.classList.contains('show')) {
        info.classList.remove('show');
    } else {
        // Si está oculto, mostrarlo con la animación
        info.classList.add('show');
    }
}

function toggleBiography() {
    const biography = document.getElementById('biography');
    const imageContainer = document.querySelector('.image-container');
    
    if (biography.classList.contains('show')) {
        biography.classList.remove('show');
        imageContainer.classList.remove('shift');
    } else {
        biography.classList.add('show');
        imageContainer.classList.add('shift');
    }
}

 let score = 0;
    let speed = 1000;
    let disappearTime = 2000;
    let timeout;
    let gameInterval;

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
        
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            target.style.display = 'none';
            gameOverScreen.style.display = 'block';
            clearInterval(gameInterval);
        }, disappearTime);
    }

    document.getElementById('target').addEventListener('click', function() {
        score++;
        document.getElementById('score').innerText = `Puntuación: ${score}`;
        
        if (speed > 200) {
            speed -= 50;
        }
        disappearTime = Math.max(1000, disappearTime - 100);
        
        clearInterval(gameInterval);
        gameInterval = setInterval(moveTarget, speed);
        moveTarget();
    });

    function restartGame() {
        score = 0;
        speed = 1000;
        disappearTime = 2000;
        document.getElementById('score').innerText = `Puntuación: ${score}`;
        document.getElementById('game-over').style.display = 'none';
        moveTarget();
        gameInterval = setInterval(moveTarget, speed);
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

    function toggleBiography() {
        const biography = document.getElementById('biography');
        biography.classList.toggle('show');
    }

    function toggleBiography() {
        const biography = document.getElementById('biography');
        const image = document.querySelector('.big-image'); // Seleccionamos la imagen
        
        if (biography.classList.contains('show')) {
            biography.classList.remove('show');
            image.style.display = 'block'; // Mostramos la imagen
        } else {
            biography.classList.add('show');
            image.style.display = 'none'; // Ocultamos la imagen
        }
    }