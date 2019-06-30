import Reducer from './Reducer'
import { filters, check } from '../constants'


export default class XWingOptionsReducer extends Reducer {

    findXWingCandiates(array, arrayIndex, xwings) {
        let imap = this.getOptionIndexMap(array)
        Object.keys(imap).map(item => {
            if (imap[item].length !== 2) {
                delete imap[item]
            } else {
                let itemvalue = item + imap[item].join('')
                if (check.isundefined(xwings[itemvalue]))
                    xwings[itemvalue] = [arrayIndex]
                else
                    xwings[itemvalue].push(arrayIndex)
            }
        })
    }

    filterXWings(xwings) {
        Object.keys(xwings).map(item => {
            if (xwings[item].length !== 2) {
                delete xwings[item]
            }
        })
    }


    reduceRow() {
        let xwings = {}
        this.board.map((row, rindex) => {
            this.findXWingCandiates(row,rindex, xwings)
        })

        this.filterXWings(xwings)

        Object.keys(xwings).map(entry => {
            let values = entry.split('')
            let filter = (item, x, y) => !xwings[entry].includes(x)
            this.removeColOptions(values[1], values[0], filter)
            this.removeColOptions(values[2], values[0], filter)
        })
    }

    reduceCol() {
        let xwings = {}
        for (let i = 0; i < 9; i++) {
            this.findXWingCandiates(this.getCol(i), i, xwings)
        }

        this.filterXWings(xwings)
        Object.keys(xwings).map(entry => {
            let values = entry.split('')
            let filter = (item, x, y) => !xwings[entry].includes(y)
            this.removeRowOptions(values[1], values[0], filter)
            this.removeRowOptions(values[2], values[0], filter)
        })
    }

    reduce(board) {
        this.board = board
        this.reduceRow()
        this.reduceCol()
        this.validateBoard()
    }
}