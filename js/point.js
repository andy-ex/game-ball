var Point = function (config, opt) {
    this.anchorX = config.x;
    this.anchorY = config.y;
    this.x = config.x;
    this.y = config.y;
    this.opt = opt;
    this.setTarget();
};

Point.prototype.setTarget = function () {
    this.initialX = this.x;
    this.initialY = this.y;
    this.targetX = this.anchorX + rand(0, this.opt.range.x * 2) - this.opt.range.x;
    this.targetY = this.anchorY + rand(0, this.opt.range.y * 2) - this.opt.range.y;
    this.tick = 0;
    this.duration = rand(this.opt.duration.min, this.opt.duration.max);
}

Point.prototype.update = function () {
    var dx = this.targetX - this.x;
    var dy = this.targetY - this.y;
    var dist = Math.sqrt(dx * dx + dy * dy);

    if (Math.abs(dist) <= 0) {
        this.setTarget();
    } else {
        var t = this.tick;
        var b = this.initialY;
        var c = this.targetY - this.initialY;
        var d = this.duration;
        this.y = ease(t, b, c, d);

        b = this.initialX;
        c = this.targetX - this.initialX;
        d = this.duration;
        this.x = ease(t, b, c, d);

        this.tick++;
    }
};

Point.prototype.render = function (ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
    ctx.fillStyle = '#000';
    ctx.fill();
};


let rand = function (min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
let ease = function (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
};