class Button {
    constructor(img, x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = loadImage(img);
    }
    display() {
        push();
        imageMode(CENTER);
        image(this.img, this.x, this.y, this.width, this.height);
        pop();
    }

}