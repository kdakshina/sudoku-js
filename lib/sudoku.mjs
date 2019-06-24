let stat
let board
// filters
const closedCells = cell => (typeof cell === 'number' && cell !== 0)
const openCells = cell => (typeof cell === 'string' || cell === 0)

export default () => {
    return {
        initialize(_board) {
            board = _board
            stat = { iteration: -1, count: { none: 0 } }
            stat.count.entry = stat.count.ientry = stat.count.iexit = this.getOpenCellsCount()
            this.log()
            board.map((row, ri) => {
                row.map((elem, ci) => {
                    if (elem === 0) {
                        board[ri][ci] = '123456789'
                    }
                })
            })
            stat.count.options = this.getOpenOptionsCount()
            
        },

        finalize() {
            stat.count.exit = stat.count.iexit
            this.log()
        },

        finalizeIteration() {
            stat.count.iexit = this.getOpenCellsCount()
            stat.count.options = this.getOpenOptionsCount()
            if (stat.count.ientry == stat.count.iexit) {
                stat.count.none++
            } else {
                stat.count.none = 0
            }
            stat.iteration++
            this.log()
            stat.count.ientry = stat.count.iexit
        },

        getRow(row, filter = item => (true)) {
            return board[row].filter(filter)
        },

        getCol(col, filter = item => (true)) {
            return board.map((item) => { return item[col] }).filter(filter)
        },

        getBox(row, col, filter, discludeSelf) {
            var boxArray = [];
            let [bx, by] = this.getBoxRC(row, col)
            for (let i = bx; i < (bx + 3); i++) {
                for (let j = by; j < (by + 3); j++) {
                    if (!(discludeSelf && row == i && col == j)) {
                        boxArray.push(board[i][j])
                    }
                }
            }
            return boxArray.filter(filter)
        },

        getBoxXY(index) {
            if (index > 8) index = 8  //valid 0 thru 8 only
            return [Math.floor(index / 3) * 3, (index % 3) * 3]
        },

        getBoxRC(row, col) {
            if (row > 8) row = 8  //valid 0 thru 8 only
            if (col > 8) col = 8  //valid 0 thru 8 only
            return [Math.floor(row / 3) * 3, Math.floor(col / 3) * 3]
        },

        getOpenCellsCount() {
            let count = 0
            board.map((array) => {
                count += array.filter(openCells).length
            })
            return count
        },

        getOpenOptionsCount() {
            let count = 0
            board.map((array) => {
                array.filter(openCells).map(elem => {count += elem.length})
            })
            return count
        },

        isValid(array) {
            return array.length === new Set(array).size;
        },

        validateBoard() {
            for (let i = 0; i < 9; i++) {
                let array = this.getRow(i, closedCells)
                if (!this.isValid(array)) {
                    console.log('Invalid row ' + i)
                    return false
                }
                array = this.getCol(i, closedCells)
                if (!this.isValid(array)) {
                    console.log('Invalid col ' + i)
                    return false
                }
                let [bx, by] = this.getBoxXY(i)
                array = this.getBox(bx, by, closedCells, false)
                if (!this.isValid(array)) {
                    console.log('Invalid box (' + bx + ',' + by + ')')
                    return false
                }
            }
            return true
        },

        log() {
            stat.valid = this.validateBoard()
            console.log(' stat => ' + JSON.stringify(stat))
            console.log(board)
            console.log('\n')
        },

        setDifference(setA, setB) {
            var _difference = setA;
            for (var elem of setB) {
                _difference.delete(elem);
            }
            return _difference;
        },

        reduceBoxLineOptionsRows(bx, by) {
            for (let deltax = 0; deltax < 2; deltax++) {
                let brow = board[bx + deltax].slice(by, by + 3).filter(openCells)
                let restrow = board[bx + deltax].filter((item, index) => (index < by || index > by + 2)).filter(openCells)
                let boxset = new Set(brow.join('').split(''))
                let restrowset = new Set(restrow.join('').split(''))
                let difference = this.setDifference(boxset, restrowset)

                for (var it = difference.values(), val = null; val = it.next().value;) {
                    //console.log('box row value => ' + JSON.stringify(val) + ' @' + (bx + deltax) + ',' + by)
                    for (let bi = bx; bi < bx + 3; bi++) {
                        if (bi === bx + deltax) continue
                        for (let bj = by; bj < by + 3; bj++) {
                            let item = board[bi][bj]
                            if (typeof item === 'string' && item.indexOf(val) > -1) {
                                board[bi][bj] = item.replace(val, '')
                                if (board[bi][bj].length === 1) {
                                    board[bi][bj] = Number(board[bi][bj])
                                    this.reduceStandardOptions(bi, bj, board[bi][bj])
                                }
                            }
                        }
                    }
                }
            }
        },

        reduceBoxLineOptionsColumns(bx, by) {
            for (let deltay = 0; deltay < 2; deltay++) {
                let bcol = this.getCol(by + deltay).slice(bx, bx + 3).filter(openCells)
                let restcol = this.getCol(by + deltay).filter((item, index) => (index < bx || index > bx + 2)).filter(openCells)
                let boxset = new Set(bcol.join('').split(''))
                let restcolset = new Set(restcol.join('').split(''))
                let difference = this.setDifference(boxset, restcolset)

                for (var it = difference.values(), val = null; val = it.next().value;) {
                    //console.log('box col value => ' + JSON.stringify(val) + ' @' + bx + ',' + (by + deltay))
                    for (let bj = by; bj < by + 3; bj++) {
                        if (bj === by + deltay) continue
                        for (let bi = bx; bi < bx + 3; bi++) {
                            let item = board[bi][bj]
                            if (typeof item === 'string' && item.indexOf(val) > -1) {
                                board[bi][bj] = item.replace(val, '')
                                if (board[bi][bj].length === 1) {
                                    board[bi][bj] = Number(board[bi][bj])
                                    this.reduceStandardOptions(bi, bj, board[bi][bj])
                                }
                            }
                        }
                    }
                }
            }
        },

        reduceAllBoxLineOptions() {
            for (let i = 0; i < 9; i++) {
                let [bx, by] = this.getBoxXY(i)
                this.reduceBoxLineOptionsRows(bx, by)
                this.reduceBoxLineOptionsColumns(bx,by)
            }
        },

        reduceSingleOptionsImpl(array, row, col, elem) {
            let set = new Set(array.join('').split(''))
            let vals = elem.split('')
            let val = elem
            vals.map((c) => {
                if (set.has(c)) { val = val.replace(c, '') }
            })
            if (val.length === 1) {
                board[row][col] = Number(val)
                this.reduceStandardOptions(row, col, board[row][col])
                return true
            } else {
                return false
            }
        },

        reduceSingleOptions(row, col, elem) {
            let array = this.getRow(row, (item, index) => (index != col && typeof item === 'string'))
            if (this.reduceSingleOptionsImpl(array, row, col, elem)) return

            array = this.getCol(col, (item, index) => (index != row && typeof item === 'string'))
            if (this.reduceSingleOptionsImpl(array, row, col, elem)) return

            array = this.getBox(row, col, openCells, true)
            if (this.reduceSingleOptionsImpl(array, row, col, elem)) return
        },

        reduceAllSingleOptions() {
            board.map((row, ri) => {
                row.map((elem, ci) => {
                    if (typeof elem === 'string') {
                        this.reduceSingleOptions(ri, ci, elem)
                    }
                })
            })
        },

        reduceStandardOptionsImpl(row, col, val) {
            let item = board[row][col]
            if (typeof item === 'string') {
                item = item.replace(val, '')
                if (item.length === 1) {
                    board[row][col] = Number(item)
                    this.reduceStandardOptions(row, col, board[row][col])
                } else {
                    board[row][col] = item
                }
            }
        },

        reduceStandardOptions(row, col, val) {
            // row, column options removals
            for (let i = 0; i < 9; i++) {
                this.reduceStandardOptionsImpl(row, i, val)
                this.reduceStandardOptionsImpl(i, col, val)
            }

            // box options removals
            let [bx, by] = this.getBoxRC(row, col)
            for (let i = bx; i < (bx + 3); i++) {
                for (let j = by; j < (by + 3); j++) {
                    this.reduceStandardOptionsImpl(i, j, val)
                }
            }
        },

        reduceAllStandardOptions() {
            board.map((row, ri) => {
                row.map((elem, ci) => {
                    if (typeof elem === 'number') {
                        this.reduceStandardOptions(ri, ci, elem)
                    }
                })
            })
        },

        resolve(_board) {
            // main code
            this.initialize(_board)

            while (stat.count.iexit !== 0 && stat.count.none < 1) {
                this.reduceAllStandardOptions()
                this.reduceAllSingleOptions()
                this.reduceAllBoxLineOptions()
                // TODO: more reducers to come
                this.finalizeIteration()
            }

            this.finalize()
        }

    }
}
