import Reducer from './Reducer'
import { check, filters, reducers } from '../constants'
export default class NakedPairReducer extends Reducer {

    getNakedOptions(array) {
        let candidates = []
        array = array.filter(filters.unsolved)
        let unique = array.join('').split('').filter(filters.distinct)
        let subsets = unique.reduce(reducers.subsets, [[]])
            .filter(item => item.length > 1)
            .map(item => new RegExp(item.split('').join('|'), 'g'))
        subsets.map(item => {
            let potential = {}
            array.map(option => {
                let match = option.match(item)
                if (match != null && match.length === option.length) {
                    potential[option] = check.isundefined(potential[option]) ? 1 : potential[option] + 1
                }
            })
            Object.keys(potential).filter(option => potential[option] === option.length).map(option => {
                candidates.push(option)
            })
        })
        return candidates
    }

    getFilter(item) {
        return val => {
            let match = item.match(new RegExp(val.split('').join('|'), 'g'))
            return match != null && match.length !== val.length
        }
    }

    reduce(board) {
        this.board = board
        for (let i = 0; i < 9; i++) {
            let row = this.getNakedOptions(this.getRow(i))
            row.map(item => {
                this.removeRowOptions(i, item, this.getFilter(item))
            })

            let col = this.getNakedOptions(this.getCol(i))
            col.map(item => {
                this.removeColOptions(i, item, this.getFilter(item))
            })

            let box = this.getNakedOptions(this.getBox(i))
            box.map(item => {
                this.removeBoxOptions(i, item, this.getFilter(item))
            })
        }
        this.validateBoard()
    }
}