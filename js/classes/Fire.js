class Fire {

    constructor(x, y, w, dy, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.dy = dy;
        this.color = color;
    }

    getY() {
        return this.y;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.w);
        this.y -= this.dy;
        ctx.restore();
    }
}
