const DIRECTIONS = {
    NORTH: 0,
    EAST: 1,
    SOUTH: 2,
    WEST: 3
};

function Robot() {

    function directionName(n){
        return Object.keys(DIRECTIONS)[n];
    }

    this.DIRECTIONS = DIRECTIONS;
    this.facing = DIRECTIONS.NORTH;
    this.x = 0;
    this.y = 0;
    this.board = false;

    this.right = function(){
        this.facing = (this.facing === DIRECTIONS.WEST) ? DIRECTIONS.NORTH : this.facing + 1; // Wrap around to NORTH if we're
        return this.facing;
    };

    this.left = function(){
      this.facing = (this.facing === DIRECTIONS.NORTH) ? DIRECTIONS.WEST : this.facing - 1;
    };

    this.place = function(x, y, f){
        if(this.board && !this.board.inBounds(x,y)){
            return false;
        }
        this.x = x;
        this.y = y;
        this.facing = f;
        return true
    };

    this.move = function(n){
        n = n || 1; // default is a minimum of one space move NOTE: 0 will eval as falsy so move 1 space
        let newY = this.y;
        let newX = this.x;
        switch(this.facing){
            case (DIRECTIONS.NORTH):
               newY = this.y + n;
                break;
            case (DIRECTIONS.EAST):
                newX = this.x + n;
                break;
            case (DIRECTIONS.SOUTH):
                newY = this.y - n;
                break;
            case (DIRECTIONS.WEST):
                newX = this.x - n;
                break;
            default:
                throw new Error("Robot direction invalid");
        }
        // Bounding check if board is set
        if(this.board && !this.board.inBounds(newX, newY)){
            return false;
        }

        this.x = newX;
        this.y = newY;
        return { x: newX, y: newY };
    };

    this.report = function(){
        let output = "X: " + this.x + ", Y: " + this.y + ", F: " + directionName(this.facing);
        console.log(output);
        return output
    }
}

Robot.DIRECTIONS = DIRECTIONS;
module.exports = Robot;
