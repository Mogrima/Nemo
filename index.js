'use strict';
import { Game } from './module/Game.js';

window.addEventListener('load', function () {
    // canvas setup
    const canvas = this.document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const startDisplay = this.document.getElementById('startDisplay');
    const startButton = this.document.getElementById('startButton');

    const game = new Game(canvas, ctx);
    let lastTime = 0;

    // animation loop
    function animate(currentTime) {
        const deltaTime = currentTime - lastTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем игровое поле перед следующей анимацией
        game.draw();
        game.update(deltaTime);
        lastTime = currentTime;
        requestAnimationFrame(animate);
        // console.log(deltaTime);
    }

    function startGame() {
        startDisplay.style.display = 'none';
        lastTime = performance.now();
        game.init();
        animate(0);
    }

    startButton.addEventListener('click', startGame);

});