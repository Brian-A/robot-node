describe('Robot tests', function(){
    const Robot = require('../app/robot');
    const d = Robot.DIRECTIONS;

    it('Should be created with a position of 0,0 and a direction of NORTH if no arguments are provided', function(){
        let robot = new Robot();

        console.log(robot);
        expect(robot.facing).toBe(d.NORTH);
        expect(robot.x).toBe(0);
        expect(robot.y).toBe(0);
    });

    it('Should cycle anti-clockwise through directions when turning left', function(){
        let robot = new Robot();

        expect(robot.facing).toBe(d.NORTH);
        robot.left();
        expect(robot.facing).toBe(d.WEST);
        robot.left();
        expect(robot.facing).toBe(d.SOUTH);
        robot.left();
        expect(robot.facing).toBe(d.EAST);
        robot.left();
        expect(robot.facing).toBe(d.NORTH); // Make sure it loops back around
    });

    it('Should cycle clockwise through directions when turning right', function(){
        let robot = new Robot();

        expect(robot.facing).toBe(d.NORTH);
        robot.right();
        expect(robot.facing).toBe(d.EAST);
        robot.right();
        expect(robot.facing).toBe(d.SOUTH);
        robot.right();
        expect(robot.facing).toBe(d.WEST);
        robot.right();
        expect(robot.facing).toBe(d.NORTH); // Make sure it loops back around
    });

    it('Place should update position and direction appropriately when board isn\'t set', function(){
        let robot = new Robot();

        robot.place(1, 2, d.SOUTH);
        expect(robot.facing).toBe(d.SOUTH);
        expect(robot.x).toBe(1);
        expect(robot.y).toBe(2);
    });

    it('Should not move/rotate and return false if a board is set and place is called with out of bounds coords', function () {
        let robot = new Robot();
        robot.board = require('../app/board')();

        robot.place(1, 2 ,d.WEST);
        let r = robot.place(5, 5, d.SOUTH);
        expect(r).toBe(false);
        expect(robot.x).toBe(1);
        expect(robot.y).toBe(2);
        expect(robot.facing).toBe(d.WEST)
    });

    it('Should move in the correct direction and stay bound to board', function(){
       let robot = new Robot();
       robot.board = require('../app/board')();

       robot.place(0, 0, d.NORTH);

       robot.move(4);  // Move to North edge
       expect(robot.x).toBe(0);
       expect(robot.y).toBe(4);

       robot.move(); // Try to fall off
       expect(robot.x).toBe(0);
       expect(robot.y).toBe(4);

       robot.right(); // Face East
       robot.move(4); // Move to the NE edge
       expect(robot.x).toBe(4);
       expect(robot.y).toBe(4);

       robot.move(); // Try to fall
       expect(robot.x).toBe(4);
       expect(robot.y).toBe(4);

       robot.right(); // Face South
       robot.move(4); // Move to the SE edge
       expect(robot.x).toBe(4);
       expect(robot.y).toBe(0);

       robot.move(); // Try to fall
       expect(robot.x).toBe(4);
       expect(robot.y).toBe(0);

       robot.right();
       robot.move(4); // Move to the SW edge
       expect(robot.x).toBe(0);
       expect(robot.y).toBe(0);

       robot.move(); // Try to fall
       expect(robot.x).toBe(0);
       expect(robot.y).toBe(0);

    });

    it('Should correctly log out to console when report is called', function(){
        let robot = new Robot();
        robot.board = require('../app/board')();

        // Proxy console.log so we can test.
        let orig = console.log;
        let output;

        console.log = function(){
            var args = [].slice.call(arguments);
            output = args.join(' ');
            return orig.call(this, arguments);
        };
        robot.report();

        expect(output).toBe('X: 0, Y: 0, F: NORTH');
        // Remove the proxy so we don't break anything accidentally
        console.log = orig;
    });
});

