class Net {

    constructor(context, x, height, width, color) {
        this.ctx = context;
        this.x = x;
        this.height = height;
        this.width = width;
        this.color = color;

        this.top = {x: x, y: H_BORDER - this.height, r: NET_RADIUS};
        this.left = x - NET_RADIUS;
        this.right = x + NET_RADIUS;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x - this.width / 2, H_BORDER);
        this.ctx.lineTo(this.x - this.width / 2, H_BORDER - this.height);
        this.ctx.arc(this.x, H_BORDER - this.height, this.width / 2, Math.PI, 0, false);
        this.ctx.lineTo(this.x + this.width / 2, H_BORDER);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();

    }

}