const Move = require('../classes/Move.class');
const DEPTH = 5;
const XO = {
    X: 'X',
    O: 'O',
    EMPTY: '',
};

let serverSign = XO.X;
let playerSign = XO.O;

function getMoves(grid, sign) {
    let moves = [];
    for (let i in grid) {
        for (let j in grid[i]) {
            if (grid[i][j] == XO.EMPTY) {
                moves.push(new Move(i, j, sign));
            }
        }
    }
    return moves;
}

function gridIsFull(grid) {
    for (let i in grid) {
        for (let j in grid[i]) {
            if (grid[i][j] != XO.EMPTY) {
                return false;
            }
        }
    }
    return true;
}

function performMove(grid, move) {
    let newGrid = [];
    for (let i in grid) {
        newGrid.push([]);
        for (let j in grid[i]) {
            newGrid[i].push(grid[i][j]);
        }
    }
    newGrid[move.row][move.column] = move.sign;
    return newGrid;
}

function heuristic(grid) {
    let h = 0;
    for (let i in grid) {
        let serverCount = 0;
        let playerCount = 0;
        for (let j in grid[i]) {
            if (grid[i][j] == serverSign) {
                serverCount++;
            }
            else if (grid[i][j] == playerSign) {
                playerCount++;
            }
        }
        if (serverCount == 0 && playerCount != 0) {
            h = h - Math.pow(10, playerCount);
        }
        else if (playerCount == 0 && serverCount != 0) {
            h = h + Math.pow(10, serverCount);
        }
    }
    for (let i in grid) {
        let serverCount = 0;
        let playerCount = 0;
        for (let j in grid[i]) {
            if (grid[j][i] == serverSign) {
                serverCount++;
            }
            else if (grid[j][i] == playerSign) {
                playerCount++;
            }
        }
        if (serverCount == 0 && playerCount != 0) {
            h = h - Math.pow(10, playerCount);
        }
        else if (playerCount == 0 && serverCount != 0) {
            h = h + Math.pow(10, serverCount);
        }
    }

    for (let i in grid) {
        let serverCount = 0;
        let playerCount = 0;
        if (grid[i][i] == serverSign) {
            serverCount++;
        }
        else if (grid[i][i] == playerSign) {
            playerCount++;
        }

        if (serverCount == 0 && playerCount != 0) {
            h = h - Math.pow(10, playerCount);
        }
        else if (playerCount == 0 && serverCount != 0) {
            h = h + Math.pow(10, serverCount);
        }
    }

    for (let i in grid) {
        let serverCount = 0;
        let playerCount = 0;
        if (grid[i][grid.length - i - 1] == serverSign) {
            serverCount++;
        }
        else if (grid[i][grid.length - i - 1] == playerSign) {
            playerCount++;
        }

        if (serverCount == 0 && playerCount != 0) {
            h = h - Math.pow(10, playerCount);
        }
        else if (playerCount == 0 && serverCount != 0) {
            h = h + Math.pow(10, serverCount);
        }
    }


    return h;
}


function minimax(node, depth, maximizingPlayer) {
    if (depth == 0 || gridIsFull(node)) {
        return heuristic(node);
    }
    let bestValue = maximizingPlayer ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;
    let sign = maximizingPlayer ? serverSign : playerSign;
    let moves = getMoves(node, sign);
    for (let move of moves) {
        let child = performMove(grid, move);
        let v = minimax(child, depth - 1, !maximizingPlayer);
        bestValue = maximizingPlayer ? Math.max(bestValue, v) : Math.min(bestValue, v);
    }
    return bestValue;
}


exports.getServerMove = function (req, res, next) {
    grid = req.body.grid;
    serverSign = req.body.serverSign;
    playerSign = serverSign == XO.X ? XO.O : XO.X;
    let moves = getMoves(grid, serverSign);
    let scores = [];
    let bestValue = Number.MIN_SAFE_INTEGER;
    let goodMoves = [];
    for (let i in moves) {
        let child = performMove(grid, moves[i]);
        let v = minimax(child, DEPTH - 1, false);
        scores.push(v);
        bestValue = Math.max(bestValue, v);
    }
    for (let i in scores) {
        if (scores[i] == bestValue) {
            goodMoves.push(moves[i]);
        }
    }
    let index = Math.floor((Math.random() * goodMoves.length));
    let response = {
        row: goodMoves[index].row,
        column: goodMoves[index].column,
        sign: serverSign
    };
    res.send(response);
};