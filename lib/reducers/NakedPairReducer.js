import Reducer from './Reducer'
import { filters } from '../constants'
export default class NakedPairReducer extends Reducer {

    reduce(board) {
        this.board = board
        for (let i = 0; i < 9; i++) {
            let row = this.getRow(i, filters.length2).filter(filters.duplicate)
            row.map(item => {
                this.removeRowOptions(i, item, val => val !== item)
            })

            let col = this.getCol(i, filters.length2).filter(filters.duplicate)
            col.map(item => {
                this.removeColOptions(i, item, val => val !== item)
            })

            let box = this.getBox(i, filters.length2).filter(filters.duplicate)
            box.map(item => {
                this.removeBoxOptions(i, item, val => val !== item)
            })
        }
    }
}