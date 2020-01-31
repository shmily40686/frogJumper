const Game = require('./game.js');

document.addEventListener('DOMContentLoaded', () => {
    const gameCanvas = document.getElementById('game-canvas');
    const gameCanvasContext = gameCanvas.getContext('2d');

    const backgroundCanvas = document.getElementById('background-canvas');
    const backgroundCanvasContext = backgroundCanvas.getContext('2d');

    // const foregroundCanvas = document.getElementById('foreground-canvas');
    // const foregroundCanvasContext = foregroundCanvas.getContext('2d');

    const game = new Game(
        gameCanvasContext,
        gameCanvas,
        backgroundCanvasContext,
        "stop"
        )
    
    game.draw();
    window.addEventListener('keydown', game.jump);



    const buttonReStart = document.getElementById("cover-die-button")
    const cover = document.getElementById("cover-die")
    const score = document.getElementById("score")
    function reStartGame() {
        cover.style.display = "none";
        score.innerText = "0"
        const game = new Game(
            gameCanvasContext,
            gameCanvas,
            backgroundCanvasContext,
            "start"
        )
        game.draw();
        window.addEventListener('keydown', game.jump);
    }

    buttonReStart.addEventListener("click", reStartGame)
});