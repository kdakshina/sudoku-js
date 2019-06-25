import Reducer from './Reducer'

export default class SingleReducer extends Reducer {
    performReduce(array, row, col, elem) {
        let set = new Set(array.join('').split(''))
        let vals = elem.split('')
        let val = elem
        vals.map((c) => {
            if (set.has(c)) { val = val.replace(c, '') }
        })
        if (val.length === 1) {
            this.board[row][col] = Number(val)
            this.resolveCell(row, col, this.board[row][col])
            return true
        } else {
            return false
        }
    }

    reduceCell(row, col, elem) {
        let array = this.getRow(row, (item, index) => (index != col && typeof item === 'string'))
        if (this.performReduce(array, row, col, elem)) return

        array = this.getCol(col, (item, index) => (index != row && typeof item === 'string'))
        if (this.performReduce(array, row, col, elem)) return

        array = this._getBox(row, col, (cell => (typeof cell === 'string' || cell === 0)), true)
        if (this.performReduce(array, row, col, elem)) return
    }

    reduce(board) {
        this.board = board
        this.board.map((row, ri) => {
            row.map((elem, ci) => {
                if (this.isString(elem)) {
                    this.reduceCell(ri, ci, elem)
                }
            })
        })
        this.validateBoard()
    }
}