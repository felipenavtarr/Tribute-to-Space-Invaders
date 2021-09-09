class Player {
    
    constructor(x, y, dx, image_path) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.image = new Image();
        this.image.src = image_path;
    }

    getX() {
        return this.x;
    }

    setX(x) {
        this.x = x;
    }

    getY() {
        return this.y;
    }

    moveRight() {
        this.x += this.dx;
    }

    moveLeft() {
        this.x -= this.dx;
    }

    getWidth() {
        return this.image.width;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, 30, 15);
    }

    checkWallCollisions(boardWidth) {
        if (this.x > boardWidth - this.image.width) {
            this.x = boardWidth - this.image.width;
        }
        if (this.x < 0) {
            this.x = 0;
        }
    }
}
