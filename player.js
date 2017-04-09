class Player {

    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;

        this.v = 0;
        this.y0 = y;
        this.t0 = 0;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.r, Math.PI, 0, false);
        context.fillStyle = PLAYER_COLOR;
        context.fill();
    }

    jump() {
        this.t0 = Date.now();

        this.v = PLAYER_JUMP_HEIGHT;
    }

    move() {
        if (this.v == 0) return;

        let t = (Date.now() - this.t0) / TIME_SCALE;

        this.y = this.y0 - (this.v * t - 0.5 * G * Math.pow(t, 2));

        if (this.y > this.y0) {
            this.v = 0;
        }

    }


}