import Reducer from './Reducer'
import { checks as check, filters, reducers } from '../constants'
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
                let match = candidate.match(this.getRegExp(item))
                if (match === null) return
                if (match.length === item.length) {
                    hidden[candidate] = check.isundefined(hidden[candidate]) ? 1 : hidden[candidate] + 1
                }
            })
            if (hidden[candidate] && hidden[candidate] == candidate.length) {
                result.push(candidate)
            }
        })
        return result
    }

    getExcludeFilter(hoption) {
        return item => {
            var match = hoption.match(this.getRegExp(item))
            return match === null || match.length !== item.length
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

    }
}