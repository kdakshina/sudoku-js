let stat

// filters
const closedCells = cell => (typeof cell === 'number' && cell !== 0)
const openCells = cell => (typeof cell === 'string' || cell === 0)

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

board = [ /*hard*/
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

board = [ /*medium*/
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

board = [ /*easy*/
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

function initialize() {
    stat = { iteration: -1, count: { none: 0 } }
    stat.count.entry = stat.count.ientry = stat.count.iexit = getOpenCellsCount()
    log()
    board.map((row, ri) => {
        row.map((elem, ci) => {
            if (elem === 0) {
                board[ri][ci] = '123456789'
            }
        })
    })
}

function finalize() {
    stat.count.exit = stat.count.iexit
    log()
}

function finalizeIteration() {
    stat.count.iexit = getOpenCellsCount()
    if (stat.count.ientry == stat.count.iexit) {
        stat.count.none++
    } else {
        stat.count.none = 0
    }
    stat.iteration++
    log()
    stat.count.ientry = stat.count.iexit
}



function getRow(row, filter) {
    return board[row].filter(filter)
}

function getCol(col, filter) {
    return board.map((item) => { return item[col] }).filter(filter)
}

function getBox(row, col, filter, discludeSelf) {
    var boxArray = [];
    let [bx, by] = getBoxRC(row, col)
    for (let i = bx; i < (bx + 3); i++) {
        for (let j = by; j < (by + 3); j++) {
            if (!(discludeSelf && row == i && col == j)) {
                boxArray.push(board[i][j])
            }
        }
    }
    return boxArray.filter(filter)
}

function getBoxXY(index) {
    return [Math.floor(index / 3), (index % 3) * 3]
}

function getBoxRC(row, col) {
    return [Math.floor(row / 3) * 3, Math.floor(col / 3) * 3]
}

function getOpenCellsCount() {
    let count = 0
    board.map((array) => {
        count += array.filter(openCells).length
    })
    return count
}

function isValid(array) {
    return array.length === new Set(array).size;
}

function validateBoard() {
    for (let i = 0; i < 9; i++) {
        let array = getRow(i, closedCells)
        if (!isValid(array)) {
            console.log('Invalid row ' + i)
            return false
        }
        array = getCol(i, closedCells)
        if (!isValid(array)) {
            console.log('Invalid col ' + i)
            return false
        }
        let [bx, by] = getBoxXY(i)
        array = getBox(bx, by, closedCells, false)
        if (!isValid(array)) {
            console.log('Invalid box (' + bx + ',' + by + ')')
            return false
        }
    }
    return true
}

function log() {
    stat.valid = validateBoard()
    console.log(' stat => ' + JSON.stringify(stat))
    console.log(board)
    console.log('\n')
}




function reduceSingleOptionsImpl(array, row, col, elem) {
    let set = new Set(array.join('').split(''))
    let vals = elem.split('')
    let val = elem
    vals.map((c) => {
        if (set.has(c)) { val = val.replace(c, '') }
    })
    if (val.length === 1) {
        board[row][col] = Number(val)
        reduceStandardOptions(row, col, board[row][col])
        return true
    } else {
        return false
    }
}

function reduceSingleOptions(row, col, elem) {
    let array = getRow(row, (item, index) => (index != col && typeof item === 'string'))
    if (reduceSingleOptionsImpl(array, row, col, elem)) return

    array = getCol(col, (item, index) => (index != row && typeof item === 'string'))
    if (reduceSingleOptionsImpl(array, row, col, elem)) return

    array = getBox(row, col, openCells, true)
    if (reduceSingleOptionsImpl(array, row, col, elem)) return
}

function reduceAllSingleOptions() {
    board.map((row, ri) => {
        row.map((elem, ci) => {
            if (typeof elem === 'string') {
                reduceSingleOptions(ri, ci, elem)
            }
        })
    })
}

function reduceStandardOptionsImpl(row, col, val) {
    let item = board[row][col]
    if (typeof item === 'string') {
        item = item.replace(val, '')
        if (item.length === 1) {
            board[row][col] = Number(item)
            reduceStandardOptions(row, col, board[row][col])
        } else {
            board[row][col] = item
        }
    }
}

function reduceStandardOptions(row, col, val) {
    // row, column options removals
    for (let i = 0; i < 9; i++) {
        reduceStandardOptionsImpl(row, i, val)
        reduceStandardOptionsImpl(i, col, val)
    }

    // box options removals
    let [bx, by] = getBoxRC(row, col)
    for (let i = bx; i < (bx + 3); i++) {
        for (let j = by; j < (by + 3); j++) {
            reduceStandardOptionsImpl(i, j, val)
        }
    }
}

function reduceAllStandardOptions() {
    board.map((row, ri) => {
        row.map((elem, ci) => {
            if (typeof elem === 'number') {
                reduceStandardOptions(ri, ci, elem)
            }
        })
    })
}

// main code
initialize()

while (stat.count.iexit !== 0 && stat.count.none < 1) {
    reduceAllStandardOptions()
    reduceAllSingleOptions()
    // TODO: more reducers to come
    finalizeIteration()
}

finalize()