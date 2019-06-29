import Reducer from './Reducer'
import { filters } from '../constants'
export default class NakedPairReducer extends Reducer {

    getNakedOptions(array) {
        let candiates = {}
        array = array.filter(filters.unsolved).map(item => {
            candiates[item] = (typeof candiates[item] === 'undefined') ? 1 : candiates[item] + 1
        })
        return Object.keys(candiates).filter(item => candiates[item] === item.length)
    }

    reduce(board) {
        this.board = board
        for (let i = 0; i < 9; i++) {
            let row = this.getNakedOptions(this.getRow(i))
            row.map(item => {
                this.removeRowOptions(i, item, val => val !== item)
            })

            let col = this.getNakedOptions(this.getCol(i))
            col.map(item => {
                this.removeColOptions(i, item, val => val !== item)
            })

            let box = this.getNakedOptions(this.getBox(i))
            box.map(item => {
                this.removeBoxOptions(i, item, val => val !== item)
            })
        }
    }
}