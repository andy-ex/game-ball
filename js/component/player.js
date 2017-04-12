class Player {

    constructor(context, x, y, r, _left, _right, _up, xLeft, xRight, color, side) {

        this.ctx = context;
        this.x = x;
        this.y = y;
        this.r = r;
        this.xLeft = xLeft;
        this.xRight = xRight;
        this.color = color;
        this.vx = 0;
        this.vy = 0;
        this.v = 0;
        this.y0 = y;
        this.t0 = 0;
        this.side = side;
        this.ctrl = {
            left: _left,
            right: _right,
            up: _up
        }
        this.isCtrls = true;
        this.score = 0;
        this.sign = this.side == 'left' ? 1 : -1;
        this.bindKeys();
    }

    win() {
        this.score++;
        if (this.score >= WIN_SCORE) {
            var event = new CustomEvent("gameover", {'detail': {'winner': this.side}});
            this.ctx.canvas.dispatchEvent(event);
        }
    }

    hideCtrls() {
        this.isCtrls = false;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, Math.PI, 0, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        //eye
        this.ctx.beginPath();
        let sign = this.side == 'left' ? -1 : 1;
        this.ctx.arc(this.x - sign * (this.r / 2 - 3), this.y - this.r / 2 + 3, this.r / 3, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(this.x - sign * (this.r / 2), this.y - this.r / 2, this.r / 8, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = 'black';
        this.ctx.fill();

        this.drawScore();
        if (this.isCtrls) {
            this.drawCtrls();
        }
    }

    drawScore() {
        this.ctx.beginPath();
        this.ctx.font = '128px serif';
        this.ctx.fillStyle = this.color;
        this.ctx.textAlign = "center";
        let x = this.side == 'left' ? 0 : V_BORDER;
        this.ctx.fillText(this.score, x + this.sign * 100, 150);
    }

    drawCtrls() {
        //505 => ?? 50 10 50 10 50 ??
        //w=50, gap=10
        //167.5=(V_BORDER/2-w*3-gap*2)/2
        this.ctx.font = '24px serif';
        this.ctx.textAlign = "center";


        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = this.color;

        let x = this.side == 'left' ? 0 : V_BORDER;

        this.ctx.beginPath();
        this.ctx.moveTo(x + this.sign * 167.5, H_BORDER - 150);
        this.ctx.lineTo(x + this.sign * (167.5 + 50), H_BORDER - 150);
        this.ctx.lineTo(x + this.sign * (167.5 + 50), H_BORDER - (150 + 50));
        this.ctx.lineTo(x + this.sign * 167.5, H_BORDER - (150 + 50));
        this.ctx.closePath();
        this.ctx.stroke();

        this.ctx.strokeText(this.ctrl.left, x + this.sign * (167.5 + 50 / 2), H_BORDER - (150 + 50 / 2 - 24 / 4));

        this.ctx.beginPath();
        this.ctx.moveTo(x + this.sign * (167.5 + 120), H_BORDER - 150);
        this.ctx.lineTo(x + this.sign * (167.5 + 50 + 120), H_BORDER - 150);
        this.ctx.lineTo(x + this.sign * (167.5 + 50 + 120), H_BORDER - (150 + 50));
        this.ctx.lineTo(x + this.sign * (167.5 + 120), H_BORDER - (150 + 50));
        this.ctx.closePath();
        this.ctx.stroke();

        this.ctx.strokeText(this.ctrl.right, x + this.sign * (167.5 + 120 + 50 / 2), H_BORDER - (150 + 50 / 2 - 24 / 4));

        this.ctx.beginPath();
        this.ctx.moveTo(x + this.sign * (167.5 + 60), H_BORDER - (150 + 60));
        this.ctx.lineTo(x + this.sign * (167.5 + 50 + 60), H_BORDER - (150 + 60));
        this.ctx.lineTo(x + this.sign * (167.5 + 50 + 60), H_BORDER - (150 + 60 + 50));
        this.ctx.lineTo(x + this.sign * (167.5 + 60), H_BORDER - (150 + 60 + 50));
        this.ctx.closePath();
        this.ctx.stroke();

        this.ctx.strokeText(this.ctrl.up, x + this.sign * (167.5 + 60 + 50 / 2), H_BORDER - (150 + 60 + 50 / 2 - 24 / 4));
    }


    jump() {
        this.hideCtrls();
        if (this.vy != 0) return;

        this.t0 = Date.now();

        this.vy = PLAYER_JUMP_VELOCITY
    }

    move() {
        let t = (Date.now() - this.t0) / TIME_SCALE;

        this.x += this.vx;
        this.y = this.y0 - (this.vy > 0 ? (this.vy * t - 0.5 * G * Math.pow(t, 2)) : 0);

        if (this.x - this.r < this.xLeft) this.x = this.xLeft + this.r;
        if (this.x + this.r > this.xRight) this.x = this.xRight - this.r;

        if (this.y >= this.y0) {
            this.vy = 0;
            this.y = this.y0;
        }
    }

    left() {
        this.hideCtrls();
        if (this.x <= this.xLeft + this.r) {
            this.x = this.xLeft + this.r;
            return;
        }
        this.x -= PLAYER_STEP;
    }

    right() {
        this.hideCtrls();
        if (this.x >= this.xRight - this.r) {
            this.x = this.xRight - this.r;
            return;
        }
        this.x += PLAYER_STEP;
    }

    leftPressed() {
        this.vx = -PLAYER_H_VELOCITY;
    }

    rightPressed() {
        this.vx = PLAYER_H_VELOCITY;
    }

    released() {
        this.vx = 0;
    }

    bindKeys() {
        keyboardJS.bind(this.ctrl.left, this.leftPressed.bind(this), this.released.bind(this));
        keyboardJS.bind(this.ctrl.right, this.rightPressed.bind(this), this.released.bind(this));
        keyboardJS.bind(this.ctrl.up, this.jump.bind(this));
    }
}