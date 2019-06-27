import sudoku from './sudoku'
let board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
]

let easy1 = [ /*easy*/
    [5, 0, 0, 8, 4, 0, 9, 6, 0],
    [0, 0, 4, 1, 0, 6, 5, 0, 7],
    [1, 6, 9, 0, 3, 0, 0, 0, 4],

    [0, 0, 0, 0, 5, 1, 4, 2, 8],
    [4, 9, 0, 6, 0, 0, 7, 5, 0],
    [2, 5, 8, 0, 7, 4, 0, 0, 0],

    [0, 1, 7, 2, 0, 5, 0, 0, 0],
    [0, 0, 0, 7, 6, 3, 8, 1, 5],
    [3, 8, 5, 0, 0, 0, 0, 7, 2]
]

let medium1 = [ /*m1*/
    [0, 5, 0,   1, 0, 6,   0, 2, 9],
    [0, 0, 1,   0, 0, 0,   0, 0, 0],
    [0, 6, 9,   0, 0, 0,   1, 8, 0],

    [5, 0, 0,   0, 7, 0,   0, 0, 3],
    [0, 0, 4,   0, 5, 0,   8, 0, 0],
    [1, 0, 0,   0, 8, 0,   0, 0, 4],

    [0, 1, 7,   0, 0, 0,   0, 3, 0],
    [0, 0, 5,   0, 0, 0,   9, 0, 0],
    [9, 0, 0,   3, 0, 5,   0, 0, 2]
]


let medium2 = [ /*medium*/
    [1, 0, 6, 0, 9, 4, 0, 0, 0],
    [0, 2, 0, 8, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 6, 0, 0, 0, 2],

    [0, 0, 0, 1, 0, 0, 9, 0, 0],
    [8, 0, 0, 0, 7, 0, 0, 0, 0],
    [0, 7, 2, 0, 0, 0, 1, 3, 0],

    [0, 0, 0, 7, 0, 9, 0, 1, 5],
    [0, 3, 0, 0, 0, 0, 7, 0, 0],
    [4, 0, 0, 0, 8, 0, 0, 0, 0]
]

let hard1 = [ /*hard*/
    [0, 2, 0, 6, 0, 8, 0, 0, 0],
    [5, 8, 0, 0, 0, 9, 7, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0, 0],

    [3, 7, 0, 0, 0, 0, 5, 0, 0],
    [6, 0, 0, 0, 0, 0, 0, 0, 4],
    [0, 0, 8, 0, 0, 0, 0, 1, 3],

    [0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 9, 8, 0, 0, 0, 3, 6],
    [0, 0, 0, 3, 0, 6, 0, 9, 0]
]




sudoku().resolve(medium1)