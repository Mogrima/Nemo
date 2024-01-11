'use strict';
import { CanvasBackground } from './module/Background/CanvasBackground.js';
import { Game } from './module/Game.js';

window.addEventListener('load', function () {
    // canvas setup
    const canvas = this.document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1500;
    canvas.height = 600;

    const canvasBackground = new CanvasBackground(canvas);
    canvasBackground.init(); 
    const game = new Game(canvas);
    game.addProps();
    let lastTime = 0;

    // animation loop
    function animate(currentTime) {
        const deltaTime = currentTime - lastTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем игровое поле перед следующей анимацией
        canvasBackground.draw(ctx);
        game.draw(ctx);
        game.update(deltaTime);
        lastTime = currentTime;
        requestAnimationFrame(animate);
        // console.log(deltaTime);
    }

    animate(0);

});