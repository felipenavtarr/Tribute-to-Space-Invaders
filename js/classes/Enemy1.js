class Enemy1 {

    constructor(x, y, dx, image_path) {
        this.x = x;
        this.y = y;
        this.w = 35;
        this.veces = 0;
        this.dx = dx;
        this.ciclos = 0;
        this.num = 14;
        this.figure = true;
        this.living = true;
        this.image = new Image();
        this.image.src = image_path;
    }

    draw(ctx) {
        // retraso
        if (this.ciclos > 30) {
            // saltos
            if (this.veces > this.num) {
                this.dx *= -1;
                this.veces = 0;
                this.num = 28;
                this.y += 20;
                this.dx = (this.dx>0)?this.dx++:this.dx--;
            } else {
                this.x += this.dx; 
            }
            this.veces++;
            this.ciclos = 0;
            this.figure = !this.figure;
        } else {
            this.ciclos++;
        }

        if (this.figure) {
            ctx.drawImage(this.image, 0, 0, 40, 30, this.x, this.y, 35, 30);
        } else {
            ctx.drawImage(this.image, 50, 0, 35, 30, this.x, this.y, 35, 30);
        }
        //this.figura = !this.figura;
    }
}
