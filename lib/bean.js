class Bean {
    constructor(canvas, ctx, speed) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.speed = speed;
        this.x = canvas.width;
        this.y = canvas.height / 2;
        this.getPosition = this.getPosition.bind(this)
        this.clean = this.clean.bind(this)
    }

    move() {
        this.x -= this.speed;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, true);
        this.ctx.fillStyle = "yellow";
        this.ctx.fill();
        this.ctx.stroke();
        this.move()
    }

    getPosition() {
        return [this.x, this.y];
    }

    clean() {
        // this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.clearRect(this.x - 50, this.y - 10, 50, 50);
        console.log("clean")
    }
}

module.exports = Bean;