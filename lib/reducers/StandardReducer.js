import Reducer from './Reducer'

export default class StandardReducer extends Reducer {

    performReduce(row, col, value) {
        let cell = this.board[row][col]
        if (this.isString(cell)) {
            cell = cell.replace(value, '')
            if (cell.length === 1) {
                this.board[row][col] = Number(cell)
                this.reduceCell(row, col, this.board[row][col])
            } else {
                this.board[row][col] = cell
            }
        }
    }

    reduceCell(row, col, item) {
        // row, column options removals
        for (let i = 0; i < 9; i++) {
            this.performReduce(row, i, item)
            this.performReduce(i, col, item)
        }

        // box options removals
        let [bx, by] = this.getBoxRC(row, col)
        for (let i = bx; i < (bx + 3); i++) {
            for (let j = by; j < (by + 3); j++) {
                this.performReduce(i, j, item)
            }
        }
    }

    reduce(board) {
        this.board = board
        this.board.map((row, ri) => {
            row.map((item, ci) => {
                if (this.isNumber(item)) {
                    this.reduceCell(ri, ci, item)
                }
            })
        })
    }
}