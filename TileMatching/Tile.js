class Tile {
    constructor() {
        this.c = color(255);
        this.value = random([1, 2, 3]);
    }

    break() {
        this.c = color(255, 0, 0);
    }

}