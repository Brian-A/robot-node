module.exports = Board;

function Board(width, height){
    if(!(this instanceof Board)) return new Board(width, height);
    this.height = height || 5;
    this.width = width || 5;

    this.inBounds = function(x, y) {
        return x >= 0 &&
            x < this.width &&
            y >= 0 &&
            y < this.height;
    };
}

