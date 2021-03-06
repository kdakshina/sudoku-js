import Reducer from './Reducer'
import { check, filters, reducers } from '../constants'
export default class HiddenOptionsReducer extends Reducer {

    getHiddenOptions(array) {
        var unresolved = array.filter(filters.unsolved)
        var uniqueOptions = unresolved.reduce(reducers.accumulate, '').split('')
            .filter(filters.distinct)
        var minOptionLength = unresolved.reduce((result, option) => (result = (option.length < result) ? option.length : result), 9)
        var subsets = uniqueOptions.reduce((subsets, value) => subsets.concat(subsets.map(set => value + set)), [[]])
            .filter(item => item.length >= minOptionLength && item.length < uniqueOptions.length)

        var result = []
        subsets.map(candidate => {
            var hidden = {}
            let size = candidate.length
            array.map((item, index) => {
                if (check.isnumber(item)) return
                let match = item.match(this.getRegExp(candidate))
                if (match === null) return
                if (match.length === size) {
                    hidden[candidate] = check.isundefined(hidden[candidate]) ? 1 : hidden[candidate] + 1
                }
            })
            if (hidden[candidate] === size) {
                result.push(candidate)
            }
        })
        return result
    }

    getExcludeFilter(hoption) {
        return item => {
            var match = item.match(this.getRegExp(hoption))
            return match === null
        }
    }


    reduce(board) {
        this.board = board
        for (let i = 0; i < 9; i++) {
            let rowHidden = this.getHiddenOptions(this.getRow(i))
            rowHidden.map((hoption => {
                this.removeRowOptions(i, hoption, this.getExcludeFilter(hoption))
            }))

            let colHidden = this.getHiddenOptions(this.getCol(i))
            colHidden.map((hoption => {
                this.removeColOptions(i, hoption, this.getExcludeFilter(hoption))
            }))

            let boxHidden = this.getHiddenOptions(this.getBox(i))
            boxHidden.map((hoption => {
                this.removeBoxOptions(i, hoption, this.getExcludeFilter(hoption))
            }))
        }
        this.validateBoard()
    }
}