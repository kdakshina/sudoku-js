import Reducer from './Reducer'

const closedCells = cell => (typeof cell === 'number' && cell !== 0)
const openCells = cell => (typeof cell === 'string' || cell === 0)

export default class BoxLineReducer extends Reducer {

    reduceRows(bx, by) {
        for (let deltax = 0; deltax < 2; deltax++) {
            let brow = this.board[bx + deltax].slice(by, by + 3).filter(openCells)
            let restrow = this.board[bx + deltax].filter((item, index) => (index < by || index > by + 2)).filter(openCells)
            let boxset = new Set(brow.join('').split(''))
            let restrowset = new Set(restrow.join('').split(''))
            let difference = this.getSetDifference(boxset, restrowset)

            for (var it = difference.values(), val = null; val = it.next().value;) {
                //console.log('box row value => ' + JSON.stringify(val) + ' @' + (bx + deltax) + ',' + by)
                for (let bi = bx; bi < bx + 3; bi++) {
                    if (bi === bx + deltax) continue
                    for (let bj = by; bj < by + 3; bj++) {
                        let item = this.board[bi][bj]
                        if (typeof item === 'string' && item.indexOf(val) > -1) {
                            this.board[bi][bj] = item.replace(val, '')
                            if (this.board[bi][bj].length === 1) {
                                this.board[bi][bj] = Number(this.board[bi][bj])
                            }
                        }
                    }
                }
            }
        }
    }

    reduceColumns(bx, by) {
        for (let deltay = 0; deltay < 2; deltay++) {
            let bcol = this.getCol(by + deltay).slice(bx, bx + 3).filter(openCells)
            let restcol = this.getCol(by + deltay).filter((item, index) => (index < bx || index > bx + 2)).filter(openCells)
            let boxset = new Set(bcol.join('').split(''))
            let restcolset = new Set(restcol.join('').split(''))
            let difference = this.getSetDifference(boxset, restcolset)

            for (var it = difference.values(), val = null; val = it.next().value;) {
                //console.log('box col value => ' + JSON.stringify(val) + ' @' + bx + ',' + (by + deltay))
                for (let bj = by; bj < by + 3; bj++) {
                    if (bj === by + deltay) continue
                    for (let bi = bx; bi < bx + 3; bi++) {
                        let item = this.board[bi][bj]
                        if (typeof item === 'string' && item.indexOf(val) > -1) {
                            this.board[bi][bj] = item.replace(val, '')
                            if (this.board[bi][bj].length === 1) {
                                this.board[bi][bj] = Number(this.board[bi][bj])
                            }
                        }
                    }
                }
            }
        }
    }

    reduce(board) {
        this.board = board
        for (let i = 0; i < 9; i++) {
            let [bx, by] = this.getBoxXY(i)
            this.reduceRows(bx, by)
            this.reduceColumns(bx, by)
        }
        
    }
}