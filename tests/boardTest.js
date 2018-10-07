describe('Board tests', function(){

    it('Should default to 5x5 board size if none specified', function(){
        let board = require('../app/board')();
        expect(board.width).toBe(5);
        expect(board.height).toBe(5);
    });

    it('Should correctly set the height and width of the board if constructor is called with arguments', function(){
        let board = require('../app/board')(3,4);
        expect(board.width).toBe(3);
        expect(board.height).toBe(4);
    });

    it('inBounds should return false if a location is out of bounds, true if is in bounds', function(){
        let board = require('../app/board')(3,4);
        expect(board.inBounds(0,0)).toBe(true); // SW Limit
        expect(board.inBounds(0,3)).toBe(true); // NW Limit
        expect(board.inBounds(2,0)).toBe(true); // SE Limit
        expect(board.inBounds(2,3)).toBe(true);  // NE Limit
        expect(board.inBounds(2,2)).toBe(true); // 1sq off the middle
        expect(board.inBounds(3,4)).toBe(false); // NE Out of bounds as coords are zero based
        expect(board.inBounds(4,0)).toBe(false); // E out of bounds
        expect(board.inBounds(0,4)).toBe(false); // N out of bounds
        expect(board.inBounds(-1,0)).toBe(false); // W Out of bounds
        expect(board.inBounds(0,-1)).toBe(false); // S Out of bounds
        expect(board.inBounds(-1,-1)).toBe(false); // SW Out of bounds
    });
});

