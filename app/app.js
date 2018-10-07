const repl = require('repl');
const replServer = repl.start('> ');
const Robot = require('./robot');
const board = require('./board')();

const robot = new Robot();
robot.board = board;
robot.place(0, 0, robot.DIRECTIONS.NORTH);

// Expopse to repl
replServer.defineCommand('left', {action: robot.left.bind(robot)});
replServer.defineCommand('right', {action: robot.right.bind(robot)});
replServer.defineCommand('move', {action: robot.move.bind(robot)});
replServer.defineCommand('report', {action: robot.report.bind(robot)});


