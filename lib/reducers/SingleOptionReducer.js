import Reducer from './Reducer'
import {constants, filters,maps} from '../constants'

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
        for (let i = 0 ; i < 9 ; i++) {
            var optionIndexMap = this.getOptionIndexMap(this.getRow(i))

            Object.keys(optionIndexMap).forEach(option => {
                let indices = optionIndexMap[option]
                let options = this.getMatchingOptions(optionIndexMap, option)
                let actual = options.length
                if (indices.length === actual) {
                    if (actual === 1) {
                        this.board[i][indices[0]] = Number(option)
                        this.resolveCell(i, indices[0], option)
                    } else {
                        console.log('unique row = @' + i + ' token= ' + options)
                        let filter = (item, x, y) => !indices.includes(y)
                        this.removeRowOptions(i, options.split('').join('|'), filter)
                    }
                }
            })
            
        }
        this.validateBoard()
    }
}