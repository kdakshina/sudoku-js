import Reducer from './Reducer'

export default class StandardReducer extends Reducer {

    reduce(board) {
        this.board = board
        this.board.map((row, ri) => {
            row.map((item, ci) => {
                if (this.isNumber(item)) {
                    this.resolveCell(ri, ci, item)
                }
            })
        })
        this.validateBoard()
    }
}