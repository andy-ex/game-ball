class Ball {

    constructor(x, y, r, velocity) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.velocity = velocity;

        this.t0 = Date.now();
        this.x0 = x;
        this.y0 = y;
    }

    draw(context) {
        Ball.circle(context, this.x, this.y, this.r);
    }

    static circle(context, x, y, r) {
        context.beginPath();
        context.arc(x, y, r, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
    }

    currentVelocity() {
        let v0 = this.velocity.v;
        let t = (Date.now() - this.t0) / 100;
        let alpha = this.velocity.a;

        return Math.sqrt(Math.pow(v0, 2) - 2 * v0 * G * t * Math.sin(alpha) + Math.pow(G * t, 2));
    }

    currentAngle() {
        let v0 = this.velocity.v;
        let t = (Date.now() - this.t0) / 100;
        let alpha = this.velocity.a;

        let angle = Math.atan((v0 * Math.sin(alpha) - G * t) / (v0 * Math.cos(alpha)));
        if (Math.cos(alpha) < 0) {
            angle += Math.PI;
        }

        return angle;
    }

    horizontalWallBounce() {
        this.bounce(0);
    }

    verticalWallBounce() {
        this.bounce(Math.tan(Math.PI / 2));
    }

    ballBounce(ball) {
        let k = Math.atan((this.y - ball.y) / (ball.x - this.x));
        let normal = k > 0 ? k - Math.PI / 2 : k + Math.PI / 2;

        k = k < 0 ? k + Math.PI : k;

        let deltaR = ball.r + this.r - this.distanceTo(ball) + BALL_COLLISION_DELTA;
        this.x += deltaR * Math.cos(k);
        this.y += V_DIRECTION * deltaR * Math.sin(k);

        this.bounce(normal);
    }

    bounce(angle) {
        this.velocity.v = this.currentVelocity();
        this.velocity.a = 2 * Math.PI - this.currentAngle() + 2 * Math.atan(angle);

        this.t0 = Date.now();
        this.x0 = this.x;
        this.y0 = this.y;
    }

    collides(another) {
        let distance = Math.sqrt(Math.pow(this.x - another.x, 2) + Math.pow(this.y - another.y, 2));

        return distance <= this.r + another.r;
    }

    distanceTo(another) {
        return Math.sqrt(Math.pow(this.x - another.x, 2) + Math.pow(this.y - another.y, 2));
    }

    move() {
        let v0 = this.velocity.v;
        let alpha = this.velocity.a;

        let t = (Date.now() - this.t0) / 100;

        this.x = this.x0 + v0 * t * Math.cos(alpha);
        this.y = this.y0 + V_DIRECTION * (v0 * t * Math.sin(alpha) - 0.5 * G * Math.pow(t, 2));

        let angle = Math.atan((v0 * Math.sin(alpha) - G * t) / (v0 * Math.cos(alpha)));
        if (Math.cos(alpha) < 0) {
            angle += Math.PI;
        }

        if ((this.x + this.r >= V_BORDER && Math.cos(alpha) > 0)
            || (this.x - this.r <= 0 && Math.cos(alpha) < 0)) {

            this.velocity.v = this.currentVelocity();
            this.velocity.a = Math.PI - angle;
            this.t0 = Date.now();
            this.x0 = this.x;
            this.y0 = this.y;

        } else if ((this.y - this.r <= 0 && V_DIRECTION * Math.sin(angle) < 0) || (
            this.y + this.r >= H_BORDER && V_DIRECTION * Math.sin(angle) > 0)) {

            this.velocity.v = this.currentVelocity();
            this.velocity.a = 2 * Math.PI - angle;
            this.t0 = Date.now();
            this.x0 = this.x;
            this.y0 = this.y;
        }
    }
}