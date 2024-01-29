class Board {
    constructor(x, y) {
        this.x = x;
        this.y = y; 
        this.rows = 3;
        this.cols = 3;
        this.map = [];

        this.tileWidth = 40;
        this.initBoard();
        this.setRandomBoard();

    }

    initBoard() {
        this.map = Array.from({length:this.rows}, ()=>Array(this.cols).fill(0));
    }

    setRandomBoard() {
        for (let i=0; i<this.rows; i++) {
            for (let j=0; j<this.cols; j++) {
                let tile = new Tile();
                this.map[i][j] = tile;
            }
        }
    }

    match() {
        let rules = [
            [[0,0], [0,1], [0,2]],
            [[1,0], [1,1], [1,2]],
            [[2,0], [2,1], [2,2]],

            [[0,0], [1,0], [2,0]],
            [[0,1], [1,1], [2,1]],
            [[0,2], [1,2], [2,2]],
        ];

         
        for (let rule of rules) {
            
            let values = [];
            for (let i of rule) {
                values.push(this.map[i[1]][i[0]].value);
            }

            if (this.areAllElementsEqual(values)) {
                print(values);
                this.breakTiles(rule);
            }

        }
    }

    breakTiles(aRule) {
        for (let i of aRule) {
            this.map[i[1]][i[0]].break();
        }
    }

    areAllElementsEqual(arr) {
        return arr.every(element => element === arr[0]);
    }

    getTilePos(mx, my) {
        let bx = mx - this.x;
        let by = my - this.y;

        let ty = floor(bx / this.tileWidth);
        let tx = floor(by / this.tileWidth);
        print([tx, ty]);
        return [tx, ty];
    }

    moveTile(sPos, ePos) {
        let sTile = this.map[sPos[0]][sPos[1]];
        let eTile = this.map[ePos[0]][ePos[1]];

        this.map[ePos[0]][ePos[1]] = sTile;
        this.map[sPos[0]][sPos[1]] = eTile;
    }

    show() {
        for (let i=0; i<this.rows; i++) {
            for (let j=0; j<this.cols; j++) {
                
                let rx = this.x + i*this.tileWidth;
                let ry = this.y + j*this.tileWidth;

                let tile = this.map[j][i];
                fill(tile.c)
                rect(rx, ry, this.tileWidth, this.tileWidth);
                stroke(0);
                text(tile.value, rx+this.tileWidth/2, ry+this.tileWidth/2);
                
            }
        }
    }
}