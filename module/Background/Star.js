export class Star {
    constructor(fieldWidth, fieldHeight) {
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight * 0.5;
        this.size = 1.5;
        this.color = '#ffff66';
        this.x = Math.random() * this.fieldWidth;
        this.y = (Math.random() * this.fieldHeight * 0.5);
    }

    update() {

    }

    draw(context) {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
}